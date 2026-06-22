"use client";
import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { ContainerScroll } from '../ui/ContainerScroll';
import SplineHero from '../SplineHero';
import { TextReveal } from '../ui/TextReveal';

export default function About() {
    const container = useRef(null);
    const isInView = useInView(container, { once: true, margin: "-100px" });

    const titleWords = ["Criando", "experiências", "digitais", "que", "inspiram"];

    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.1
            }
        }
    }), []);

    const wordVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    }), []);

    const textVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    }), []);

    return (
        <section id="about" ref={container} className={styles.about}>
            {/* Static Background Orbs - No animation */}
            <div className={styles.backgroundOrbs}>
                <div className={styles.orb1} />
                <div className={styles.orb2} />
                <div className={styles.orb3} />
            </div>

            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Animated Title */}
                    <div className={styles.titleWrapper}>
                        <motion.div className={styles.titleLabel} variants={textVariants}>
                            <span className={styles.labelLine}></span>
                            <span>Sobre Nós</span>
                            <span className={styles.labelLine}></span>
                        </motion.div>

                        <h2 className={styles.title}>
                            {titleWords.map((word, index) => (
                                <motion.span
                                    key={index}
                                    variants={wordVariants}
                                    className={styles.word}
                                >
                                    <TextReveal as="span" text={word} />
                                </motion.span>
                            ))}
                        </h2>
                    </div>
                </motion.div>

                {/* Notebook 3D com hero Spline interativo */}
                <ContainerScroll titleComponent={null}>
                    <SplineHero />
                </ContainerScroll>
            </div>
        </section>
    );
}
