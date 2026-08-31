"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./style.module.scss";

const projects = [
  {
    slug: "subsolo",
    title: "Subsolo",
    year: "2026",
    category: "Produto",
    type: "Produto digital · Desenvolvimento",
    summary:
      "Uma experiência imersiva com navegação direta e presença visual forte.",
    image: "/images/Subsolo.png",
    imageAlt:
      "Interface do projeto Subsolo em uma composição visual escura e imersiva",
    story: [
      [
        "Contexto",
        "Transformar uma proposta de forte personalidade em uma experiência digital fácil de percorrer.",
      ],
      [
        "Direção",
        "Construir uma navegação direta sem diluir a atmosfera visual do projeto.",
      ],
      [
        "Entrega",
        "Direção de interface e desenvolvimento tratados como uma única camada.",
      ],
      [
        "Impacto",
        "Uma presença digital coerente, imersiva e pronta para operar.",
      ],
    ],
    hotspots: ["Navegação direta", "Contraste editorial", "Atmosfera imersiva"],
  },
  {
    slug: "amanda-castro",
    title: "Amanda Castro",
    year: "2026",
    category: "Marca",
    type: "Marca · Experiência web",
    summary: "Posicionamento premium traduzido em uma jornada leve e objetiva.",
    image: "/images/Amanda.png",
    imageAlt:
      "Página do projeto Amanda Castro com direção visual premium e tipografia editorial",
    story: [
      [
        "Contexto",
        "Levar um posicionamento pessoal premium para um ambiente digital claro e contemporâneo.",
      ],
      [
        "Direção",
        "Equilibrar presença editorial, leveza e objetividade em uma mesma jornada.",
      ],
      [
        "Entrega",
        "Sistema visual e experiência web desenvolvidos para atuar em conjunto.",
      ],
      [
        "Impacto",
        "Uma apresentação mais coerente com o valor e a personalidade da marca.",
      ],
    ],
    hotspots: ["Hierarquia editorial", "Ritmo leve", "Presença de marca"],
  },
  {
    slug: "pandia",
    title: "Pandia",
    year: "2026",
    category: "Plataforma",
    type: "UI/UX · Plataforma",
    summary: "Informação complexa organizada para decisões mais rápidas.",
    image: "/images/Pandia.png",
    imageAlt:
      "Interface da plataforma Pandia organizando informações em uma jornada objetiva",
    story: [
      [
        "Contexto",
        "Organizar uma experiência com alta densidade de informação sem aumentar o esforço cognitivo.",
      ],
      [
        "Direção",
        "Dar prioridade à leitura, aos fluxos e à previsibilidade das decisões.",
      ],
      [
        "Entrega",
        "Arquitetura de interface, componentes e experiência de plataforma.",
      ],
      ["Impacto", "Uma base mais clara para navegar, compreender e decidir."],
    ],
    hotspots: [
      "Densidade controlada",
      "Fluxos previsíveis",
      "Componentes consistentes",
    ],
  },
  {
    slug: "palmiex",
    title: "Palmiex",
    year: "2026",
    category: "Marca",
    type: "Branding · Desenvolvimento",
    summary: "Identidade e tecnologia trabalhando como um único sistema.",
    image: "/images/Palmiex.png",
    imageAlt:
      "Experiência digital Palmiex combinando identidade de marca e desenvolvimento web",
    story: [
      [
        "Contexto",
        "Traduzir a identidade da marca em uma experiência digital consistente e funcional.",
      ],
      [
        "Direção",
        "Usar os mesmos princípios de marca para orientar interface, ritmo e comportamento.",
      ],
      [
        "Entrega",
        "Branding e desenvolvimento conectados desde a estrutura até os detalhes.",
      ],
      [
        "Impacto",
        "Uma presença digital reconhecível e coerente em todos os pontos de contato.",
      ],
    ],
    hotspots: [
      "Sistema de marca",
      "Consistência visual",
      "Tecnologia integrada",
    ],
  },
];

const filters = ["Todos", "Produto", "Plataforma", "Marca"];
const devices = ["Desktop", "Tablet", "Mobile"];

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

export default function Projects() {
  const sectionRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const lastTriggerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8% 0px" });
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState(null);
  const [device, setDevice] = useState("Desktop");
  const [layer, setLayer] = useState(38);
  const visibleProjects = useMemo(
    () =>
      activeFilter === "Todos"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  const openProject = (project, trigger) => {
    lastTriggerRef.current = trigger;
    setSelectedProject(project);
    setDevice("Desktop");
    setLayer(38);
    window.history.replaceState(null, "", `#case-${project.slug}`);
  };

  const closeProject = () => {
    setSelectedProject(null);
    window.history.replaceState(null, "", "#work");
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  useEffect(() => {
    const slug = window.location.hash.replace("#case-", "");
    const project = projects.find((item) => item.slug === slug);
    if (project) setSelectedProject(project);
  }, []);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeProject();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll("button, a[href], input") || [],
      ).filter((element) => !element.disabled);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  const showNextProject = () => {
    const index = projects.findIndex(
      (project) => project.slug === selectedProject.slug,
    );
    const next = projects[(index + 1) % projects.length];
    setSelectedProject(next);
    setDevice("Desktop");
    setLayer(38);
    window.history.replaceState(null, "", `#case-${next.slug}`);
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={`${styles.projects} rn-story-scene`}
        aria-labelledby="projects-title"
      >
        <span className="rn-scene-grid" aria-hidden="true" />
        <span className={styles.stageGlow} aria-hidden="true" />
        <div className={`rn-story-scene__inner ${styles.inner}`}>
          <header className={styles.header}>
            <motion.div
              className={styles.headingBlock}
              initial={{ y: 24, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="rn-section-meta">
                <span className="rn-section-index">05</span>Projetos
                selecionados
              </p>
              <h2 id="projects-title" className="rn-story-heading">
                Projetos que saíram do papel{" "}
                <span>e entraram em operação.</span>
              </h2>
            </motion.div>
            <motion.div
              className={styles.headerAside}
              initial={{ y: 18, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 18, opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="rn-story-copy">
                Uma seleção em que direção, interface e código foram tratados
                como partes da mesma entrega.
              </p>
              <span>
                {String(projects.length).padStart(2, "0")} projetos · Imagens
                reais · Entregas RN
              </span>
            </motion.div>
          </header>

          <div className={styles.filterBar} aria-label="Filtrar projetos">
            <span>Arquivo de trabalho</span>
            <div>
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className={styles.projectGrid}>
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.article
                  key={project.slug}
                  layout
                  className={styles.projectCard}
                  data-featured={
                    index === 0 ||
                    (activeFilter === "Todos" && project.slug === "palmiex")
                      ? "true"
                      : "false"
                  }
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 16, opacity: 0 }}
                  transition={{
                    duration: 0.56,
                    delay: index * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <motion.div
                    className={styles.projectMedia}
                    layoutId={`project-media-${project.slug}`}
                  >
                    <Image
                      src={project.image}
                      fill
                      sizes={
                        index === 0
                          ? "(max-width: 768px) 100vw, 64vw"
                          : "(max-width: 768px) 100vw, 38vw"
                      }
                      alt={project.imageAlt}
                    />
                    <span className={styles.mediaTint} aria-hidden="true" />
                    <span className={styles.cornerTop} aria-hidden="true" />
                    <span className={styles.cornerBottom} aria-hidden="true" />
                    <span className={styles.openLabel} aria-hidden="true">
                      Abrir case <Arrow />
                    </span>
                    <span className={styles.fragmentField} aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                  </motion.div>
                  <div className={styles.projectInfo}>
                    <span className={styles.projectIndex}>
                      {String(
                        projects.findIndex(
                          (item) => item.slug === project.slug,
                        ) + 1,
                      ).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                    </div>
                    <dl>
                      <div>
                        <dt>Escopo</dt>
                        <dd>{project.type}</dd>
                      </div>
                      <div>
                        <dt>Ano</dt>
                        <dd>{project.year}</dd>
                      </div>
                    </dl>
                  </div>
                  <button
                    type="button"
                    className={styles.projectTrigger}
                    onClick={(event) =>
                      openProject(project, event.currentTarget)
                    }
                    aria-label={`Abrir case ${project.title}`}
                  >
                    <span className="rn-visually-hidden">
                      Abrir case {project.title}
                    </span>
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className={styles.projectFooter}>
            <p>
              Seu projeto pode ser o próximo case construído com esse mesmo
              nível de cuidado.
            </p>
            <a className="rn-premium-button" href="#contact">
              Conversar sobre meu projeto <Arrow />
            </a>
          </div>
          <div className="rn-story-handoff">
            <span>Prova antes da promessa</span>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className={styles.caseOverlay}
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.32 }}
            onPointerDown={(event) => {
              if (event.target === event.currentTarget) closeProject();
            }}
          >
            <motion.div
              ref={dialogRef}
              className={styles.caseDialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-title"
              initial={reduceMotion ? false : { y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { y: 24, opacity: 0 }}
              transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.caseTopbar}>
                <span>
                  RN / CASE{" "}
                  {String(
                    projects.findIndex(
                      (project) => project.slug === selectedProject.slug,
                    ) + 1,
                  ).padStart(2, "0")}
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closeProject}
                  aria-label="Fechar case"
                >
                  <span />
                  <span />
                </button>
              </div>
              <div className={styles.caseHero}>
                <div>
                  <p>
                    {selectedProject.type} · {selectedProject.year}
                  </p>
                  <h3 id="case-title">{selectedProject.title}</h3>
                  <span>{selectedProject.summary}</span>
                </div>
                <motion.div
                  className={styles.caseDevice}
                  data-device={device.toLowerCase()}
                  layoutId={`project-media-${selectedProject.slug}`}
                >
                  <div className={styles.deviceChrome}>
                    <i />
                    <i />
                    <i />
                  </div>
                  <Image
                    src={selectedProject.image}
                    fill
                    sizes="(max-width: 768px) 90vw, 62vw"
                    alt={selectedProject.imageAlt}
                  />
                  <div
                    className={styles.interfaceLayer}
                    style={{ opacity: layer / 100 }}
                    aria-hidden="true"
                  >
                    <span />
                    <span />
                    <span />
                  </div>
                  {selectedProject.hotspots.map((hotspot, index) => (
                    <span
                      key={hotspot}
                      className={styles.hotspot}
                      style={{ "--hotspot-index": index }}
                    >
                      <i />
                      <b>{hotspot}</b>
                    </span>
                  ))}
                </motion.div>
              </div>

              <div className={styles.caseTools}>
                <div className={styles.devicePicker}>
                  <span>Visualização</span>
                  <div>
                    {devices.map((item) => (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={device === item}
                        onClick={() => setDevice(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <label className={styles.layerControl}>
                  Camada de interface{" "}
                  <input
                    type="range"
                    min="0"
                    max="82"
                    value={layer}
                    onChange={(event) => setLayer(Number(event.target.value))}
                  />
                  <output>{layer}%</output>
                </label>
              </div>

              <ol className={styles.caseStory}>
                {selectedProject.story.map(([title, copy], index) => (
                  <li key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h4>{title}</h4>
                      <p>{copy}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className={styles.artifactSection}>
                <header>
                  <span>Sistema em detalhe</span>
                  <p>
                    A mesma entrega observada em três recortes complementares.
                  </p>
                </header>
                <div className={styles.artifactRail}>
                  {[
                    "Visão geral",
                    "Detalhe de interface",
                    "Sistema visual",
                  ].map((label, index) => (
                    <figure key={label}>
                      <div>
                        <Image
                          src={selectedProject.image}
                          fill
                          sizes="(max-width: 768px) 80vw, 28vw"
                          alt=""
                          style={{
                            objectPosition: `${50 + index * 18}% ${50 - index * 12}%`,
                          }}
                        />
                      </div>
                      <figcaption>
                        {String(index + 1).padStart(2, "0")} · {label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              <div className={styles.caseFooter}>
                <div>
                  <span>Próximo case</span>
                  <strong>
                    {
                      projects[
                        (projects.findIndex(
                          (project) => project.slug === selectedProject.slug,
                        ) +
                          1) %
                          projects.length
                      ].title
                    }
                  </strong>
                </div>
                <button type="button" onClick={showNextProject}>
                  Continuar explorando <Arrow />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
