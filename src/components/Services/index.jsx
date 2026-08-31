"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./style.module.scss";

const services = [
  {
    title: "UI/UX Design",
    outcome: "Interfaces claras que reduzem atrito e conduzem a decisão.",
    scope: "Pesquisa · Fluxos · Prototipação",
    image: "/images/services/uiux.webp",
  },
  {
    title: "Desenvolvimento Web",
    outcome: "Sites rápidos, responsivos e preparados para evoluir.",
    scope: "Front-end · Back-end · Integrações",
    image: "/images/services/web.webp",
  },
  {
    title: "Branding & Identidade",
    outcome: "Uma marca reconhecível em cada ponto de contato.",
    scope: "Estratégia · Identidade · Sistema visual",
    image: "/images/services/branding.webp",
  },
  {
    title: "Marketing Digital",
    outcome: "Aquisição e conteúdo conectados aos objetivos do negócio.",
    scope: "Campanhas · Conteúdo · Performance",
    image: "/images/services/marketing.webp",
  },
  {
    title: "Consultoria",
    outcome: "Prioridades técnicas e de produto transformadas em direção.",
    scope: "Diagnóstico · Roadmap · Validação",
    image: "/images/services/consultoria.webp",
  },
  {
    title: "Manutenção & Suporte",
    outcome: "Evolução contínua com estabilidade e resposta próxima.",
    scope: "Monitoramento · Melhorias · Suporte",
    image: "/images/services/suporte.webp",
  },
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={sectionRef}
      className={`${styles.services} rn-story-scene`}
      aria-labelledby="services-title"
    >
      <span className="rn-scene-grid" aria-hidden="true" />
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.pixelMark} aria-hidden="true">
        <Image
          src="/images/estrela-rn-contorno.svg"
          fill
          sizes="24rem"
          alt=""
        />
      </span>

      <div className={`rn-story-scene__inner ${styles.inner}`}>
        <header className={styles.header}>
          <motion.div
            className={styles.headingBlock}
            initial={{ y: 24, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="rn-section-meta">
              <span className="rn-section-index">02</span>O que fazemos
            </p>
            <h2 id="services-title" className="rn-story-heading">
              Uma equipe enxuta. <span>Seis frentes conectadas.</span>
            </h2>
          </motion.div>

          <motion.p
            className={`rn-story-copy ${styles.introCopy}`}
            initial={{ y: 18, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 18, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Estratégia, design, tecnologia e crescimento avançam na mesma
            direção. Você conversa com uma equipe que entende o todo.
          </motion.p>
        </header>

        <div className={styles.serviceList}>
          {services.map((service, index) => (
            <motion.a
              key={service.title}
              href="#contact"
              className={styles.service}
              aria-label={`${service.title}: ${service.outcome}`}
              initial={{ y: 22, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 22, opacity: 0 }}
              transition={{
                duration: 0.56,
                delay: 0.12 + index * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className={styles.serviceNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.serviceCopy}>
                <h3>{service.title}</h3>
                <p>{service.outcome}</p>
                <span>{service.scope}</span>
              </div>
              <div className={styles.serviceMedia} aria-hidden="true">
                <Image
                  src={service.image}
                  fill
                  sizes="(max-width: 768px) 36vw, 12rem"
                  alt=""
                />
                <span />
              </div>
              <span className={styles.arrow} aria-hidden="true">
                <Arrow />
              </span>
            </motion.a>
          ))}
        </div>

        <div className="rn-story-handoff">
          <span>Capacidade aplicada ao contexto</span>
        </div>
      </div>
    </section>
  );
}
