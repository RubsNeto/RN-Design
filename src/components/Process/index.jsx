'use client';

import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';

const steps = [
  {
    title: 'Descoberta',
    description: 'Entendemos negócio, público, contexto e restrições antes de propor a forma.',
    deliverable: 'Diagnóstico e objetivos',
  },
  {
    title: 'Estratégia',
    description: 'Organizamos prioridades, jornada, arquitetura e critérios que vão orientar a entrega.',
    deliverable: 'Plano e direção',
  },
  {
    title: 'Design',
    description: 'Transformamos decisões em fluxos, interface, protótipo e sistema visual consistente.',
    deliverable: 'Protótipo validável',
  },
  {
    title: 'Desenvolvimento',
    description: 'Construímos com código limpo, performance, acessibilidade e integrações confiáveis.',
    deliverable: 'Produto funcional',
  },
  {
    title: 'Lançamento',
    description: 'Validamos conteúdo, comportamento, métricas e infraestrutura antes de publicar.',
    deliverable: 'Entrada em produção',
  },
  {
    title: 'Evolução',
    description: 'Acompanhamos uso e resultado para priorizar melhorias sem perder consistência.',
    deliverable: 'Ciclo contínuo',
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const stepRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);
  const isInView = useInView(sectionRef, { once: true, margin: '-8% 0px' });
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 65%', 'end 45%'],
  });
  const railProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.32 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActiveStep(Number(current.target.dataset.step));
      },
      { rootMargin: '-28% 0px -48% 0px', threshold: [0, 0.25, 0.55] },
    );
    stepRefs.current.filter(Boolean).forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className={`${styles.process} rn-story-scene`}
      aria-labelledby="process-title"
    >
      <span className="rn-scene-grid" aria-hidden="true" />
      <span className={styles.motif} aria-hidden="true" />

      <div className={`rn-story-scene__inner ${styles.inner}`}>
        <header className={styles.header}>
          <motion.div
            className={styles.headerInner}
            initial={{ y: 24 }}
            animate={isInView ? { y: 0 } : { y: 24 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="rn-section-meta">
              <span className="rn-section-index">04</span>
              Como trabalhamos
            </p>
            <h2 id="process-title" className="rn-story-heading">
              Um processo visível. <span>Sem caixa-preta.</span>
            </h2>
            <p className={`rn-story-copy ${styles.headerCopy}`}>
              Você sabe o que está sendo decidido, o que vem depois e qual resultado cada
              etapa precisa produzir.
            </p>
            <a className="rn-premium-button" href="#contact">
              Planejar meu projeto
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </header>

        <div ref={timelineRef} className={styles.timeline}>
          <span className={styles.timelineRail} aria-hidden="true">
            <motion.i style={{ scaleY: railProgress }} />
          </span>

          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <motion.li
                key={step.title}
                ref={(node) => { stepRefs.current[index] = node; }}
                data-step={index}
                data-active={activeStep === index ? 'true' : 'false'}
                aria-current={activeStep === index ? 'step' : undefined}
                initial={{ x: 20, opacity: 0.95 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0.95 }}
                transition={{
                  duration: 0.58,
                  delay: 0.12 + index * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.stepContent}>
                  <div className={styles.stepHeading}>
                    <h3>{step.title}</h3>
                    <span>{step.deliverable}</span>
                  </div>
                  <p>{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="rn-story-handoff">
          <span>Clareza em cada etapa</span>
        </div>
      </div>
    </section>
  );
}
