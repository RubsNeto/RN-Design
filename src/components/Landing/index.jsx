'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { RnAnimatedWordmark } from '@rn-design/system/react';
import styles from './style.module.scss';

const entryEase = [0.22, 1, 0.36, 1];
const emphasizedEase = [0.16, 1, 0.3, 1];
const ambientStartDelay = 1850;

const heroEffectSequence = [
  { name: 'star-echo', duration: 1750, gap: 2200 },
  { name: 'signal-handshake', duration: 1700, gap: 2400 },
  { name: 'semantic-handoff', duration: 1500, gap: 2400 },
  { name: 'constellation', duration: 2650, gap: 2600 },
  { name: 'wordmark-glint', duration: 1000, gap: 2600 },
  { name: 'grid-tide', duration: 2000, gap: 2600 },
  { name: 'star-sparks', duration: 1600, gap: 2400 },
  { name: 'shoulder-reflection', duration: 1300, gap: 2800 },
  { name: 'rare-alignment', duration: 1200, gap: 3000 },
  { name: 'silence-beat', duration: 2600, gap: 3200 },
];

const constellationPoints = [
  ['18%', '29%'],
  ['32%', '67%'],
  ['51%', '38%'],
  ['69%', '62%'],
  ['84%', '26%'],
];

const sparkPoints = [
  ['50%', '2%'],
  ['80%', '19%'],
  ['98%', '50%'],
  ['80%', '81%'],
  ['50%', '98%'],
  ['20%', '81%'],
  ['2%', '50%'],
  ['20%', '19%'],
  ['50%', '50%'],
];

function HeroEffects({ haloRef, magneticGridRef }) {
  return (
    <div className={styles.effectsLayer} aria-hidden="true">
      <span className={styles.atmosphere} />
      <span className={styles.gridTide}>
        <i className={styles.gridTideHorizontal} />
        <i className={styles.gridTideVertical} />
      </span>
      <span className={styles.signalPath}>
        <i className={styles.signalLine} />
        <i className={styles.signalDot} />
      </span>
      <span className={styles.constellation}>
        {constellationPoints.map(([left, top], index) => (
          <i
            key={`${left}-${top}`}
            style={{ '--rn-effect-index': index, left, top }}
          />
        ))}
      </span>
      <span ref={haloRef} className={styles.cursorHalo} />
      <span ref={magneticGridRef} className={styles.magneticGrid}>
        <i />
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

function PortraitEffects() {
  return (
    <div className={styles.portraitEffects} aria-hidden="true">
      <span className={styles.portraitShadow} />
      <span className={styles.starEchoes}>
        <i className={styles.starEcho}>
          <Image src="/images/estrela-rn-contorno.svg" fill sizes="44rem" alt="" />
        </i>
        <i className={styles.starEcho}>
          <Image src="/images/estrela-rn-contorno.svg" fill sizes="44rem" alt="" />
        </i>
      </span>
      <span className={styles.rareAlignment}>
        <i />
        <i />
        <b />
      </span>
      <span className={styles.starSparks}>
        {sparkPoints.map(([left, top], index) => (
          <i
            key={`${left}-${top}`}
            style={{ '--rn-effect-index': index, left, top }}
          />
        ))}
      </span>
    </div>
  );
}

export default function Landing({ isReady = false, onHeroAssetReady }) {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const contourMotionRef = useRef(null);
  const photoStageRef = useRef(null);
  const photoEchoRef = useRef(null);
  const haloRef = useRef(null);
  const magneticGridRef = useRef(null);
  const hasReportedPhotoReady = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { amount: 0.15 });
  const [hasMounted, setHasMounted] = useState(false);
  const [supportsFinePointer, setSupportsFinePointer] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);
  const [hasEntranceSettled, setHasEntranceSettled] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const updatePointerCapability = () => setSupportsFinePointer(pointerQuery.matches);
    setHasMounted(true);
    updateVisibility();
    updatePointerCapability();
    document.addEventListener('visibilitychange', updateVisibility);
    pointerQuery.addEventListener('change', updatePointerCapability);

    return () => {
      document.removeEventListener('visibilitychange', updateVisibility);
      pointerQuery.removeEventListener('change', updatePointerCapability);
    };
  }, []);

  useEffect(() => {
    const image = photoRef.current;
    if (!image) return undefined;

    let isCancelled = false;
    const markPhotoReady = () => {
      if (
        isCancelled
        || image.naturalWidth === 0
        || hasReportedPhotoReady.current
      ) return;

      hasReportedPhotoReady.current = true;
      setIsPhotoLoaded(true);
      onHeroAssetReady?.();
    };

    if (image.complete) {
      markPhotoReady();
    } else {
      image.decode().then(markPhotoReady).catch(() => undefined);
    }

    return () => {
      isCancelled = true;
    };
  }, [onHeroAssetReady]);

  const allowsMotion = hasMounted && shouldReduceMotion === false;

  useEffect(() => {
    if (!isReady || !allowsMotion) {
      setHasEntranceSettled(false);
      return undefined;
    }

    const ambientTimer = window.setTimeout(
      () => setHasEntranceSettled(true),
      ambientStartDelay,
    );

    return () => window.clearTimeout(ambientTimer);
  }, [allowsMotion, isReady]);

  const entranceTransition = (duration, delay = 0, ease = entryEase) => (
    allowsMotion ? { delay, duration, ease } : { duration: 0 }
  );
  const shouldRunAmbientMotion = hasEntranceSettled
    && isReady
    && allowsMotion
    && isInView
    && isDocumentVisible;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (!shouldRunAmbientMotion) {
      section.dataset.heroEffect = 'idle';
      return undefined;
    }

    let effectIndex = 0;
    let effectTimer;
    let gapTimer;

    const playNextEffect = () => {
      const effect = heroEffectSequence[effectIndex];
      section.dataset.heroEffect = effect.name;

      effectTimer = window.setTimeout(() => {
        section.dataset.heroEffect = 'idle';
        effectIndex = (effectIndex + 1) % heroEffectSequence.length;
        gapTimer = window.setTimeout(playNextEffect, effect.gap);
      }, effect.duration);
    };

    gapTimer = window.setTimeout(playNextEffect, 750);

    return () => {
      window.clearTimeout(effectTimer);
      window.clearTimeout(gapTimer);
      section.dataset.heroEffect = 'idle';
    };
  }, [shouldRunAmbientMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !shouldRunAmbientMotion) return undefined;

    let animationFrame = 0;
    let latestPointerX = 0;
    let latestPointerY = 0;
    let pointerNeedsUpdate = false;
    let scrollNeedsUpdate = true;
    let lastScrollProgress = -1;
    let lastMagneticGridX = null;
    let lastMagneticGridY = null;
    let logoInteractionOnCooldown = false;
    let logoInteractionResetTimer;
    let logoInteractionCooldownTimer;

    const triggerLogoInteraction = () => {
      if (logoInteractionOnCooldown) return;

      logoInteractionOnCooldown = true;
      section.dataset.logoInteraction = 'active';
      logoInteractionResetTimer = window.setTimeout(() => {
        section.dataset.logoInteraction = 'idle';
      }, 1200);
      logoInteractionCooldownTimer = window.setTimeout(() => {
        logoInteractionOnCooldown = false;
      }, 9000);
    };

    const flushMotionFrame = () => {
      const bounds = section.getBoundingClientRect();

      if (pointerNeedsUpdate) {
        const localX = latestPointerX - bounds.left;
        const localY = latestPointerY - bounds.top;
        const normalizedX = Math.max(-1, Math.min(1, (localX / bounds.width - 0.5) * 2));
        const normalizedY = Math.max(-1, Math.min(1, (localY / bounds.height - 0.5) * 2));

        contourMotionRef.current?.style.setProperty('--rn-contour-pointer-x', `${normalizedX * 5}px`);
        contourMotionRef.current?.style.setProperty('--rn-contour-pointer-y', `${normalizedY * 3}px`);
        photoStageRef.current?.style.setProperty('--rn-photo-pointer-x', `${normalizedX * -2.5}px`);
        photoStageRef.current?.style.setProperty('--rn-photo-pointer-y', `${normalizedY * -1.5}px`);
        photoEchoRef.current?.style.setProperty('--rn-photo-echo-x', `${normalizedX * 5}px`);
        haloRef.current?.style.setProperty('--rn-halo-x', `${localX - 110}px`);
        haloRef.current?.style.setProperty('--rn-halo-y', `${localY - 110}px`);

        const snappedGridX = Math.round(localX / 160) * 160;
        const snappedGridY = Math.round(localY / 180) * 180;
        if (snappedGridX !== lastMagneticGridX || snappedGridY !== lastMagneticGridY) {
          magneticGridRef.current?.style.setProperty('--rn-magnetic-x', `${snappedGridX}px`);
          magneticGridRef.current?.style.setProperty('--rn-magnetic-y', `${snappedGridY}px`);
          lastMagneticGridX = snappedGridX;
          lastMagneticGridY = snappedGridY;
        }

        if (
          localY > bounds.height * 0.72
          && localX > bounds.width * 0.12
          && localX < bounds.width * 0.88
        ) {
          triggerLogoInteraction();
        }
        pointerNeedsUpdate = false;
      }

      if (scrollNeedsUpdate) {
        const progress = Math.max(0, Math.min(1, -bounds.top / (bounds.height * 0.1)));

        if (Math.abs(progress - lastScrollProgress) > 0.002) {
          section.style.setProperty('--rn-scroll-photo-y', `${progress * -9}px`);
          section.style.setProperty('--rn-scroll-contour-rotation', `${progress * 4}deg`);
          section.style.setProperty('--rn-scroll-copy-spread', `${progress * 6}px`);
          section.style.setProperty('--rn-wordmark-scroll-opacity', `${1 - progress * 0.14}`);
          section.style.setProperty('--rn-wordmark-scroll-y', `${progress * 18}px`);
          section.style.setProperty('--rn-wordmark-scroll-scale', `${1 - progress * 0.04}`);
          section.style.setProperty('--rn-handoff-progress', `${progress}`);
          lastScrollProgress = progress;
        }
        scrollNeedsUpdate = false;
      }

      animationFrame = 0;
    };

    const scheduleMotionFrame = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(flushMotionFrame);
      }
    };

    const setPointerPosition = (event) => {
      latestPointerX = event.clientX;
      latestPointerY = event.clientY;
      pointerNeedsUpdate = true;

      if (section.dataset.pointerActive !== 'true') {
        section.dataset.pointerActive = 'true';
      }

      scheduleMotionFrame();
    };

    const resetPointerPosition = () => {
      pointerNeedsUpdate = false;
      section.dataset.pointerActive = 'false';
      contourMotionRef.current?.style.setProperty('--rn-contour-pointer-x', '0px');
      contourMotionRef.current?.style.setProperty('--rn-contour-pointer-y', '0px');
      photoStageRef.current?.style.setProperty('--rn-photo-pointer-x', '0px');
      photoStageRef.current?.style.setProperty('--rn-photo-pointer-y', '0px');
      photoEchoRef.current?.style.setProperty('--rn-photo-echo-x', '0px');
      magneticGridRef.current?.style.setProperty('--rn-magnetic-x', '-20rem');
      magneticGridRef.current?.style.setProperty('--rn-magnetic-y', '-20rem');
      lastMagneticGridX = null;
      lastMagneticGridY = null;
    };

    const updateScrollDepth = () => {
      scrollNeedsUpdate = true;
      scheduleMotionFrame();
    };

    if (supportsFinePointer) {
      section.addEventListener('pointermove', setPointerPosition, { passive: true });
      section.addEventListener('pointerleave', resetPointerPosition);
    }

    window.addEventListener('scroll', updateScrollDepth, { passive: true });
    updateScrollDepth();

    return () => {
      if (supportsFinePointer) {
        section.removeEventListener('pointermove', setPointerPosition);
        section.removeEventListener('pointerleave', resetPointerPosition);
      }
      window.removeEventListener('scroll', updateScrollDepth);
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(logoInteractionResetTimer);
      window.clearTimeout(logoInteractionCooldownTimer);
      section.dataset.logoInteraction = 'idle';
      resetPointerPosition();
    };
  }, [shouldRunAmbientMotion, supportsFinePointer]);

  const handlePhotoLoad = () => {
    if (hasReportedPhotoReady.current) return;

    hasReportedPhotoReady.current = true;
    setIsPhotoLoaded(true);
    onHeroAssetReady?.();
  };

  return (
    <section
      ref={sectionRef}
      className={`rn-story-hero ${styles.landing}`}
      aria-labelledby="hero-title"
      data-hero-ready={isReady}
      data-brand-ambient={shouldRunAmbientMotion ? 'true' : 'false'}
      data-hero-effect="idle"
      data-hero-settled={hasEntranceSettled ? 'true' : 'false'}
      data-logo-interaction="idle"
    >
      <HeroEffects haloRef={haloRef} magneticGridRef={magneticGridRef} />
      <div className={`rn-story-hero__content ${styles.heroContent}`}>
        <div className={styles.primary}>
          <motion.div
            className={styles.primaryCopy}
            initial={false}
            animate={{
              opacity: isReady ? 1 : 0,
              y: isReady || !allowsMotion ? 0 : 12,
            }}
            transition={entranceTransition(0.65, 0.06, emphasizedEase)}
          >
            <p className={`rn-eyebrow ${styles.eyebrow}`}>
              UI/UX Design · Desenvolvimento Web · Sistemas com IA
            </p>
            <h1 id="hero-title" className={`rn-story-title ${styles.title}`}>
              <span className={styles.titleLead}>Experiências digitais</span>
              <span className={styles.titleAccent}>excepcionais.</span>
            </h1>
          </motion.div>
        </div>

        <figure className={styles.portrait}>
          <PortraitEffects />
          <div ref={contourMotionRef} className={styles.brandContour} aria-hidden="true">
            <div className={styles.brandBalance}>
              <div
                className={styles.contourReveal}
                data-contour-state={
                  !isReady ? 'hidden' : allowsMotion ? 'animated' : 'visible'
                }
              >
                <div
                  className={styles.contourAmbient}
                  data-ambient-active={shouldRunAmbientMotion ? 'true' : 'false'}
                >
                  <Image
                    src="/images/estrela-rn-contorno.svg"
                    fill
                    sizes="(max-width: 720px) 32rem, (max-width: 1150px) 38rem, 44rem"
                    alt=""
                    className={styles.contourImage}
                  />
                  <i className={`${styles.orbitDot} ${styles.orbitDotPrimary}`} />
                  <i className={`${styles.orbitDot} ${styles.orbitDotSecondary}`} />
                </div>
              </div>
            </div>
          </div>
          <div ref={photoStageRef} className={styles.photoStage}>
            {supportsFinePointer && (
              <div ref={photoEchoRef} className={styles.photoEcho} aria-hidden="true">
                <Image
                  src="/images/rubens-hero.png"
                  fill
                  sizes="(max-width: 720px) 128vw, (max-width: 1150px) 75vw, 54rem"
                  alt=""
                  className={styles.photoEchoImage}
                />
              </div>
            )}
            <motion.div
              className={styles.photoReveal}
              initial={false}
              animate={{
                opacity: isReady && isPhotoLoaded ? 1 : 0,
                y: (isReady && isPhotoLoaded) || !allowsMotion ? 0 : 12,
              }}
              transition={entranceTransition(0.72, 0.02, emphasizedEase)}
            >
              <Image
                ref={photoRef}
                src="/images/rubens-hero.png"
                fill
                sizes="(max-width: 720px) 128vw, (max-width: 1150px) 75vw, 54rem"
                alt="Rubens Neto, fundador da RN Design"
                priority
                onLoad={handlePhotoLoad}
                onLoadingComplete={handlePhotoLoad}
                onError={onHeroAssetReady}
                className={styles.photo}
              />
            </motion.div>
            <span className={styles.shoulderReflection} aria-hidden="true" />
          </div>
        </figure>

        <div className={styles.aside}>
          <motion.div
            className={styles.asideCopy}
            initial={false}
            animate={{
              opacity: isReady ? 1 : 0,
              y: isReady || !allowsMotion ? 0 : 12,
            }}
            transition={entranceTransition(0.65, 0.1, emphasizedEase)}
          >
            <p className={`rn-eyebrow ${styles.asideEyebrow}`}>
              Branding · Marketing Digital · Consultoria · Suporte
            </p>
            <h2 className={`rn-story-title ${styles.asideTitle}`}>
              <span className={styles.asideTitleLead}>Estratégia aplicada</span>
              <span className={styles.asideTitleAccent}>a resultados.</span>
            </h2>
          </motion.div>
        </div>
      </div>

      <span className={styles.scrollHandoff} aria-hidden="true" />
      <span className={styles.silenceSurface} aria-hidden="true" />

      <RnAnimatedWordmark
        key={isReady && allowsMotion ? 'hero-intro' : 'hero-static'}
        animated={isReady && allowsMotion}
        size="hero"
        timing="overlap"
      />
    </section>
  );
}
