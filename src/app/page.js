'use client';

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import styles from './page.module.scss';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';

const About = lazy(() => import('../components/About'));
const Services = lazy(() => import('../components/Services'));
const SkewCards = lazy(() => import('../components/SkewCards'));
const GlobeSection = lazy(() => import('../components/GlobeSection'));
const Process = lazy(() => import('../components/Process'));
const Projects = lazy(() => import('../components/Projects'));
const SlidingImages = lazy(() => import('../components/SlidingImages'));
const Contact = lazy(() => import('../components/Contact'));

function SectionLoader() {
  return <div className={styles.sectionLoader} aria-hidden="true" />;
}

function DeferredSection({ children, enabled, id, minHeight = '100svh' }) {
  const targetRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!enabled || shouldRender || !targetRef.current) return undefined;

    if (!('IntersectionObserver' in window)) {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: '320px 0px', threshold: 0.01 },
    );

    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [enabled, shouldRender]);

  return (
    <div
      id={id}
      ref={targetRef}
      className={styles.deferredSection}
      style={{ '--deferred-min-height': minHeight }}
    >
      {shouldRender ? (
        <Suspense fallback={<SectionLoader />}>
          {children}
        </Suspense>
      ) : (
        <div className={styles.deferredPlaceholder} aria-hidden="true" />
      )}
    </div>
  );
}

function restoreChromeState(entries) {
  entries.forEach(({ element, inert, ariaHidden }) => {
    element.inert = inert;

    if (ariaHidden === null) {
      element.removeAttribute('aria-hidden');
    } else {
      element.setAttribute('aria-hidden', ariaHidden);
    }
  });
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [isHeroAssetReady, setIsHeroAssetReady] = useState(false);
  const [hasMinimumLoadTimeElapsed, setHasMinimumLoadTimeElapsed] = useState(false);
  const [canLoadBelowFold, setCanLoadBelowFold] = useState(false);
  const bodyStateRef = useRef({ cursor: '', overflow: '' });
  const chromeStateRef = useRef([]);
  const maximumLoadTimerRef = useRef();
  const hasCompletedIntroRef = useRef(false);
  const markHeroAssetReady = useCallback(() => setIsHeroAssetReady(true), []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const previousOverflow = document.body.style.overflow;
    const previousCursor = document.body.style.cursor;

    bodyStateRef.current = { cursor: previousCursor, overflow: previousOverflow };
    document.body.style.overflow = 'hidden';
    document.body.style.cursor = 'wait';

    const chromeElements = Array.from(document.querySelectorAll('.rn-skip-link, header'));
    chromeStateRef.current = chromeElements.map((element) => ({
      element,
      inert: element.inert,
      ariaHidden: element.getAttribute('aria-hidden'),
    }));
    chromeElements.forEach((element) => {
      element.inert = true;
      element.setAttribute('aria-hidden', 'true');
    });

    const minimumTimer = window.setTimeout(
      () => setHasMinimumLoadTimeElapsed(true),
      reducedMotion ? 240 : 1500,
    );
    maximumLoadTimerRef.current = window.setTimeout(
      () => {
        maximumLoadTimerRef.current = undefined;
        setIsLoading(false);
      },
      reducedMotion ? 700 : 2800,
    );

    return () => {
      window.clearTimeout(minimumTimer);
      if (maximumLoadTimerRef.current) {
        window.clearTimeout(maximumLoadTimerRef.current);
      }
      document.body.style.overflow = previousOverflow;
      document.body.style.cursor = previousCursor;
      restoreChromeState(chromeStateRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isLoading || !hasMinimumLoadTimeElapsed || !isHeroAssetReady) return;

    if (maximumLoadTimerRef.current) {
      window.clearTimeout(maximumLoadTimerRef.current);
      maximumLoadTimerRef.current = undefined;
    }
    setIsLoading(false);
  }, [hasMinimumLoadTimeElapsed, isHeroAssetReady, isLoading]);

  useEffect(() => {
    if (!isHeroReady) return undefined;

    const releaseBelowFold = () => setCanLoadBelowFold(true);
    const releaseWithKeyboard = (event) => {
      if (['ArrowDown', 'PageDown', 'End', ' '].includes(event.key)) {
        releaseBelowFold();
      }
    };
    const deferredTimer = window.setTimeout(releaseBelowFold, 4200);

    window.addEventListener('scroll', releaseBelowFold, { passive: true, once: true });
    window.addEventListener('wheel', releaseBelowFold, { passive: true, once: true });
    window.addEventListener('touchstart', releaseBelowFold, { passive: true, once: true });
    window.addEventListener('keydown', releaseWithKeyboard);

    return () => {
      window.clearTimeout(deferredTimer);
      window.removeEventListener('scroll', releaseBelowFold);
      window.removeEventListener('wheel', releaseBelowFold);
      window.removeEventListener('touchstart', releaseBelowFold);
      window.removeEventListener('keydown', releaseWithKeyboard);
    };
  }, [isHeroReady]);

  const completeIntro = () => {
    if (hasCompletedIntroRef.current) return;

    hasCompletedIntroRef.current = true;
    setIsHeroReady(true);
    document.body.style.overflow = bodyStateRef.current.overflow;
    document.body.style.cursor = bodyStateRef.current.cursor || 'default';
    restoreChromeState(chromeStateRef.current);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <main
        id="main-content"
        className={`rn-story-page ${styles.main}`}
        aria-busy={!isHeroReady ? 'true' : undefined}
      >
        <AnimatePresence mode="wait" onExitComplete={completeIntro}>
          {isLoading && <Preloader />}
        </AnimatePresence>

        <div
          className={styles.siteContent}
          inert={!isHeroReady ? '' : undefined}
          aria-hidden={!isHeroReady ? 'true' : undefined}
        >
          <div id="home">
            <Landing
              isReady={isHeroReady}
              onHeroAssetReady={markHeroAssetReady}
            />
          </div>

          <DeferredSection id="about" enabled={canLoadBelowFold} minHeight="100svh">
            <About />
          </DeferredSection>
          <DeferredSection id="services" enabled={canLoadBelowFold} minHeight="100svh">
            <Services />
          </DeferredSection>
          <DeferredSection enabled={canLoadBelowFold} minHeight="100svh">
            <SkewCards />
          </DeferredSection>
          <DeferredSection enabled={canLoadBelowFold} minHeight="100svh">
            <GlobeSection />
          </DeferredSection>
          <DeferredSection enabled={canLoadBelowFold} minHeight="100svh">
            <Process />
          </DeferredSection>
          <DeferredSection id="work" enabled={canLoadBelowFold} minHeight="80svh">
            <Projects />
          </DeferredSection>
          <DeferredSection enabled={canLoadBelowFold} minHeight="60svh">
            <SlidingImages />
          </DeferredSection>
          <DeferredSection id="contact" enabled={canLoadBelowFold} minHeight="100svh">
            <Contact />
          </DeferredSection>
        </div>
      </main>
    </MotionConfig>
  );
}
