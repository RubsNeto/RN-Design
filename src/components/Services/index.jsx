"use client";
import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { ServiceCard } from '../ui/ServiceCard';

export default function Services() {
    const container = useRef(null);
    const isInView = useInView(container, { once: true, margin: "-100px" });
    const isAmbientInView = useInView(container, { margin: "-10% 0px -10% 0px" });

    const services = [
        {
            title: "UI/UX Design",
            stat: "Interfaces que encantam e convertem",
            theme: "var(--rn-color-primary)",
            image: "/images/services/uiux.webp",
        },
        {
            title: "Desenvolvimento Web",
            stat: "Sites rápidos, responsivos e escaláveis",
            theme: "var(--rn-cyan)",
            image: "/images/services/web.webp",
        },
        {
            title: "Branding & Identidade",
            stat: "Marcas fortes e memoráveis",
            theme: "var(--rn-blue-soft)",
            image: "/images/services/branding.webp",
        },
        {
            title: "Marketing Digital",
            stat: "Crescimento orientado por dados",
            theme: "var(--rn-color-primary)",
            image: "/images/services/marketing.webp",
        },
        {
            title: "Consultoria",
            stat: "Estratégia para transformação digital",
            theme: "var(--rn-color-link-hover)",
            image: "/images/services/consultoria.webp",
        },
        {
            title: "Manutenção & Suporte",
            stat: "Evolução contínua e suporte 24/7",
            theme: "var(--rn-cyan)",
            image: "/images/services/suporte.webp",
        },
    ];

    const titleWords = ["Nossos", "Serviços"];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 60, rotateX: -60 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { type: "spring", stiffness: 100, damping: 12 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 12, delay: i * 0.1 }
        })
    };

    return (
        <section
            ref={container}
            className={`${styles.services} rn-brand-canvas rn-brand-canvas--editorial`}
        >
            <div className={styles.backgroundGrid} />
            <div className={styles.backgroundOrbs}>
                <motion.div
                    className={styles.orb1}
                    animate={isAmbientInView ? { x: [0, 30, 0], y: [0, -20, 0] } : { x: 0, y: 0 }}
                    transition={isAmbientInView
                        ? { duration: 10, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0 }}
                />
                <motion.div
                    className={styles.orb2}
                    animate={isAmbientInView ? { x: [0, -40, 0], y: [0, 30, 0] } : { x: 0, y: 0 }}
                    transition={isAmbientInView
                        ? { duration: 12, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0 }}
                />
            </div>

            <div className={styles.container}>
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className={styles.header}
                >
                    <motion.div className={styles.titleLabel} variants={wordVariants}>
                        <span className={styles.labelLine}></span>
                        <span>O que fazemos</span>
                        <span className={styles.labelLine}></span>
                    </motion.div>

                    <h2 className={styles.title}>
                        {titleWords.map((word, index) => (
                            <motion.span
                                key={index}
                                variants={wordVariants}
                                className={`${styles.word} ${word === "Serviços" ? styles.highlight : ""}`}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h2>

                    <motion.p variants={wordVariants} className={styles.subtitle}>
                        Soluções completas para transformar sua presença digital
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className={styles.grid}
                >
                    {services.map((service, index) => (
                        <motion.div key={index} custom={index} variants={cardVariants}>
                            <ServiceCard
                                title={service.title}
                                stat={service.stat}
                                themeColor={service.theme}
                                imageUrl={service.image}
                                href="#contact"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
