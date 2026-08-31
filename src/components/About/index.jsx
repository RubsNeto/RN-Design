"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./style.module.scss";

const proofPoints = [
  { value: "Ponta a ponta", label: "Da estratégia ao produto publicado" },
  {
    value: "6 disciplinas",
    label: "Design, código, marca, growth, IA e suporte",
  },
  { value: "Evolução contínua", label: "Decisões guiadas por uso e resultado" },
];

const reveal = {
  resting: { y: 24, opacity: 0.94 },
  visible: { y: 0, opacity: 1 },
};

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-12% 0px" });

  return (
    <section
      ref={sectionRef}
      className={`${styles.about} rn-story-scene`}
      aria-labelledby="about-title"
    >
      <span className="rn-scene-grid" aria-hidden="true" />
      <span className={styles.brandMotif} aria-hidden="true">
        <Image
          src="/images/estrela-rn-contorno.svg"
          fill
          sizes="32rem"
          alt=""
        />
      </span>

      <div className={`rn-story-scene__inner ${styles.inner}`}>
        <div className={styles.intro}>
          <motion.div
            className={styles.headingBlock}
            variants={reveal}
            initial="resting"
            animate={isInView ? "visible" : "resting"}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="rn-section-meta">
              <span className="rn-section-index">01</span>
              Sobre a RN
            </p>
            <h2 id="about-title" className="rn-story-heading">
              Estratégia antes do efeito.{" "}
              <span>Resultado antes da tendência.</span>
            </h2>
          </motion.div>

          <motion.div
            className={`rn-story-copy ${styles.copy}`}
            variants={reveal}
            initial="resting"
            animate={isInView ? "visible" : "resting"}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p>
              A RN Design combina direção criativa e engenharia para transformar
              uma ideia em uma experiência clara, rápida e pronta para crescer.
            </p>
            <p>
              <strong>Você conversa com quem pensa e executa o projeto.</strong>{" "}
              Cada decisão conecta marca, interface, tecnologia e objetivo de
              negócio.
            </p>
          </motion.div>
        </div>

        <motion.div
          className={styles.founderStage}
          initial={{ y: 28, scale: 0.985 }}
          animate={isInView ? { y: 0, scale: 1 } : { y: 28, scale: 0.985 }}
          transition={{ duration: 0.72, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.photoFrame}>
            <Image
              src="/images/capa.jpg"
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              alt="Rubens Neto, fundador da RN Design, em retrato profissional"
              className={styles.photo}
            />
            <span className={styles.photoGrid} aria-hidden="true" />
            <span className={styles.frameLabel} aria-hidden="true">
              RN / Direção 01
            </span>
            <span className={styles.frameCoordinates} aria-hidden="true">
              16°41&apos;S · 49°15&apos;W
            </span>
          </div>

          <aside
            className={styles.founderCard}
            aria-label="Responsável pelos projetos"
          >
            <span className={styles.cardEyebrow}>Direção responsável</span>
            <strong>Rubens Neto</strong>
            <p>Fundador · Product Designer · Engenheiro de Software</p>
            <span className={styles.signature}>RN / 2026</span>
          </aside>
        </motion.div>

        <ul className={styles.proofList} aria-label="Como a RN entrega valor">
          {proofPoints.map((item, index) => (
            <motion.li
              key={item.value}
              initial={{ y: 18, opacity: 0.94 }}
              animate={
                isInView ? { y: 0, opacity: 1 } : { y: 18, opacity: 0.94 }
              }
              transition={{
                duration: 0.52,
                delay: 0.18 + index * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.value}</strong>
              <p>{item.label}</p>
            </motion.li>
          ))}
        </ul>

        <div className="rn-story-handoff">
          <span>Da visão para a entrega</span>
        </div>
      </div>
    </section>
  );
}
