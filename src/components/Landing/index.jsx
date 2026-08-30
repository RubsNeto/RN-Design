'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { RnAnimatedWordmark } from '@rn-design/system/react';
import styles from './style.module.scss';

const entryEase = [0.22, 1, 0.36, 1];
const emphasizedEase = [0.16, 1, 0.3, 1];
const ambientStartDelay = 1850;

export default function Landing({ isReady = false, onHeroAssetReady }) {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { amount: 0.15 });
  const [hasMounted, setHasMounted] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);
  const [hasEntranceSettled, setHasEntranceSettled] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);
    setHasMounted(true);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);

    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    const image = photoRef.current;
    if (!image) return undefined;

    let isCancelled = false;
    const markPhotoReady = () => {
      if (isCancelled || image.naturalWidth === 0) return;

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
    if (!isReady || !allowsMotion) return undefined;

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
    && allowsMotion
    && isInView
    && isDocumentVisible;

  const handlePhotoLoad = () => {
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
    >
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
          <div className={styles.brandContour} aria-hidden="true">
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
              </div>
            </div>
          </div>
          <div className={styles.photoStage}>
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

      <RnAnimatedWordmark
        key={isReady && allowsMotion ? 'hero-intro' : 'hero-static'}
        animated={isReady && allowsMotion}
        size="hero"
        timing="overlap"
      />
    </section>
  );
}
