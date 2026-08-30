"use client";
import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Process() {
    const container = useRef(null);
    const isInView = useInView(container, { once: true, margin: "-100px" });
    const isAmbientInView = useInView(container, { margin: "-10% 0px -10% 0px" });
    const [activeStep, setActiveStep] = useState(null);

    const steps = [
        {
            number: "01",
            title: "Descoberta",
            description: "Entendimento profundo do negócio, objetivos e necessidades. Pesquisa de mercado e análise competitiva detalhada.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            number: "02",
            title: "Estratégia",
            description: "Definição de personas e jornadas do usuário. Planejamento de arquitetura da informação e fluxos de navegação.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            number: "03",
            title: "Design",
            description: "Wireframes de alta fidelidade e protótipos interativos. Testes de usabilidade e refinamentos baseados em feedback.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19L19 12L22 15L15 22L12 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 2L9.586 9.586" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="11" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        },
        {
            number: "04",
            title: "Desenvolvimento",
            description: "Código limpo, performático e otimizado para SEO. Integração de tecnologias modernas e APIs.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="16,18 22,12 16,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="8,6 2,12 8,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            number: "05",
            title: "Lançamento",
            description: "Deploy seguro em ambiente de produção. Configurações finais, otimizações e treinamento da equipe.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            number: "06",
            title: "Evolução",
            description: "Monitoramento constante de métricas e análises. Melhorias contínuas baseadas em dados reais.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 6H23V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        }
    ];

    const titleWords = ["Nosso", "Processo"];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const wordVariants = {
        hidden: {
            opacity: 0,
            y: 60,
            rotateX: -60,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const stepVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: i * 0.15
            }
        })
    };

    const lineVariants = {
        hidden: { scaleY: 0 },
        visible: {
            scaleY: 1,
            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }
        }
    };

    return (
        <section id="process" ref={container} className={styles.process}>
            {/* Background Elements */}
            <div className={styles.backgroundOrbs}>
                <motion.div
                    className={styles.orb1}
                    animate={isAmbientInView ? {
                        x: [0, 40, 0],
                        y: [0, -30, 0],
                    } : { x: 0, y: 0 }}
                    transition={isAmbientInView
                        ? { duration: 10, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0 }}
                />
                <motion.div
                    className={styles.orb2}
                    animate={isAmbientInView ? {
                        x: [0, -30, 0],
                        y: [0, 40, 0],
                    } : { x: 0, y: 0 }}
                    transition={isAmbientInView
                        ? { duration: 12, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0 }}
                />
            </div>

            <div className={styles.container}>
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className={styles.header}
                >
                    <motion.div className={styles.titleLabel} variants={wordVariants}>
                        <span className={styles.labelLine}></span>
                        <span>Como trabalhamos</span>
                        <span className={styles.labelLine}></span>
                    </motion.div>

                    <h2 className={styles.title}>
                        {titleWords.map((word, index) => (
                            <motion.span
                                key={index}
                                variants={wordVariants}
                                className={`${styles.word} ${word === "Processo" ? styles.highlight : ""}`}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h2>

                    <motion.p variants={wordVariants} className={styles.subtitle}>
                        Uma metodologia testada e comprovada para resultados excepcionais
                    </motion.p>
                </motion.div>

                {/* Timeline */}
                <div className={styles.timeline}>
                    {/* Animated Line */}
                    <motion.div
                        className={styles.timelineLine}
                        variants={lineVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className={styles.stepsContainer}
                    >
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={stepVariants}
                                className={`${styles.step} ${activeStep === index ? styles.active : ''}`}
                                onMouseEnter={() => setActiveStep(index)}
                                onMouseLeave={() => setActiveStep(null)}
                            >
                                {/* Step Number Circle */}
                                <motion.div
                                    className={styles.numberWrapper}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className={styles.numberGlow} />
                                    <div className={styles.number}>
                                        <span className={styles.numberText}>{step.number}</span>
                                        <div className={styles.numberIcon}>{step.icon}</div>
                                    </div>
                                </motion.div>

                                {/* Connector Line */}
                                <div className={styles.connector}>
                                    <motion.div
                                        className={styles.connectorLine}
                                        initial={{ scaleX: 0 }}
                                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                                        transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
                                    />
                                </div>

                                {/* Content Card */}
                                <motion.div
                                    className={styles.content}
                                    whileHover={{
                                        y: -5,
                                        transition: { type: "spring", stiffness: 300 }
                                    }}
                                >
                                    <div className={styles.contentGlow} />
                                    <div className={styles.contentBorder} />
                                    <div className={styles.contentInner}>
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
