'use client';
import styles from './style.module.scss'
import { useState, useEffect, useRef } from 'react';
import Project from './components/project';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';

const projects = [
  {
    title: "Subsolo",
    src: "Subsolo.png",
    color: "var(--rn-color-scene-deep)"
  },
  {
    title: "Amanda Castro Estética",
    src: "Amanda.png",
    color: "var(--rn-color-surface-soft)"
  },
  {
    title: "Pandia",
    src: "Pandia.png",
    color: "var(--rn-color-accent)"
  },
  {
    title: "Palmiex",
    src: "Palmiex.png",
    color: "var(--rn-blue-soft)"
  }
]

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
}

export default function Home() {

  const [modal, setModal] = useState({ active: false, index: 0 })
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    const modalElement = modalContainer.current;
    const cursorElement = cursor.current;
    const cursorLabelElement = cursorLabel.current;

    //Move Container
    xMoveContainer.current = gsap.quickTo(modalElement, "left", { duration: 0.8, ease: "power3" })
    yMoveContainer.current = gsap.quickTo(modalElement, "top", { duration: 0.8, ease: "power3" })
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursorElement, "left", { duration: 0.5, ease: "power3" })
    yMoveCursor.current = gsap.quickTo(cursorElement, "top", { duration: 0.5, ease: "power3" })
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabelElement, "left", { duration: 0.45, ease: "power3" })
    yMoveCursorLabel.current = gsap.quickTo(cursorLabelElement, "top", { duration: 0.45, ease: "power3" })

    return () => {
      gsap.killTweensOf([
        modalElement,
        cursorElement,
        cursorLabelElement,
      ])
    }
  }, [])

  const moveItems = (x, y) => {
    xMoveContainer.current(x)
    yMoveContainer.current(y)
    xMoveCursor.current(x)
    yMoveCursor.current(y)
    xMoveCursorLabel.current(x)
    yMoveCursorLabel.current(y)
  }
  const manageModal = (active, index, x, y) => {
    moveItems(x, y)
    setModal({ active, index })
  }

  return (
    <section
      onMouseMove={(e) => {
        if (active) moveItems(e.clientX, e.clientY)
      }}
      className={`${styles.projects} rn-brand-canvas rn-brand-canvas--editorial`}
      aria-labelledby="projects-title"
    >
      <header className={styles.header}>
        <p className="rn-eyebrow">Projetos RN Design</p>
        <h2 id="projects-title" className="rn-story-heading">
          Soluções que <span>saíram do papel.</span>
        </h2>
        <p className={styles.subtitle}>
          Produtos reais construídos para operações reais.
        </p>
      </header>
      <div className={styles.body}>
        {
          projects.map((project, index) => {
            return <Project index={index} title={project.title} manageModal={manageModal} key={index} />
          })
        }
      </div>
      <Rounded>
        <p>Mais projetos</p>
      </Rounded>
      <>
        <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className={styles.modalContainer}>
          <div style={{ transform: `translateY(${-index * 100}%)` }} className={styles.modalSlider}>
            {
              projects.map((project, index) => {
                const { src, color } = project
                return <div className={styles.modal} style={{ backgroundColor: color }} key={`modal_${index}`}>
                  <Image
                    src={`/images/${src}`}
                    width={300}
                    height={0}
                    alt={`Interface do projeto ${project.title}`}
                  />
                </div>
              })
            }
          </div>
        </motion.div>
        <motion.div ref={cursor} className={styles.cursor} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}></motion.div>
        <motion.div ref={cursorLabel} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}>Ver</motion.div>
      </>
    </section>
  )
}
