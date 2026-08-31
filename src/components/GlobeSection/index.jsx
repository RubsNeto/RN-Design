'use client';

import dynamic from 'next/dynamic';
import { motion, useInView, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';

const Globe = dynamic(
  () => import('../ui/Globe').then((module) => module.Globe),
  { ssr: false },
);

const foundations = [
  ['Performance', 'Experiências rápidas em qualquer dispositivo.'],
  ['Acessibilidade', 'Interfaces preparadas para mais pessoas.'],
  ['Integrações', 'Tecnologia conectada à operação real.'],
];

export default function GlobeSection() {
  const sectionRef = useRef(null);
  const rotationRef = useRef(0.4);
  const [shouldMountGlobe, setShouldMountGlobe] = useState(false);
  const isInView = useInView(sectionRef, { margin: '-10% 0px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    rotationRef.current = 0.4 + value * Math.PI * 1.55;
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMountGlobe(true);
          observer.disconnect();
        }
      },
      { rootMargin: '520px 0px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} rn-story-scene rn-story-scene--stage`}
      data-ambient={isInView ? 'running' : 'paused'}
      aria-labelledby="scale-title"
    >
      <span className="rn-scene-grid" aria-hidden="true" />
      <span className={styles.orbitLarge} aria-hidden="true" />
      <span className={styles.orbitSmall} aria-hidden="true" />

      <div className={`rn-story-scene__inner ${styles.inner}`}>
        <motion.div
          className={styles.content}
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.34 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="rn-section-meta" data-scene="dark">
            <span className="rn-section-index">03</span>
            Escala e engenharia
          </p>
          <h2 id="scale-title" className="rn-story-heading">
            Engenharia sólida. <span className={styles.scaleLine}>Escala sem fronteiras.</span>
          </h2>
          <p className={`rn-story-copy ${styles.copy}`}>
            Da arquitetura à interface, cada produto nasce com uma base sólida para
            carregar rápido, integrar serviços e acompanhar o crescimento da sua operação.
          </p>

          <ul className={styles.foundationList} aria-label="Fundamentos técnicos">
            {foundations.map(([title, description], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className={styles.globeStage}
          initial={{ scale: 0.96, y: 24 }}
          whileInView={{ scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.globeHalo} aria-hidden="true" />
          <div className={styles.globeWrap}>
            {shouldMountGlobe ? (
              <Globe rotationRef={rotationRef} descriptionId="globe-description" />
            ) : (
              <span className={styles.globePlaceholder} aria-hidden="true" />
            )}
          </div>
          <p id="globe-description" className="rn-visually-hidden">
            Visualização de uma rede internacional conectando cidades e mercados a uma
            base técnica construída pela RN Design.
          </p>
          <div className={styles.coordinate} aria-hidden="true">
            <span>16.6869° S</span>
            <span>49.2648° W</span>
          </div>
          <span className={styles.liveSignal} aria-hidden="true">
            <i /> Sistema conectado
          </span>
        </motion.div>
      </div>
    </section>
  );
}
