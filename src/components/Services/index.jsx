"use client";
import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { ServiceCard } from '../ui/ServiceCard';

export default function Services() {
    const container = useRef(null);
    const isInView = useInView(container, { once: true, margin: "-100px" });

    const services = [
        {
            title: "UI/UX Design",
            stat: "Interfaces que encantam e convertem",
            theme: "200 85% 50%",
            image: "/images/services/uiux.png",
        },
        {
            title: "Desenvolvimento Web",
            stat: "Sites rápidos, responsivos e escaláveis",
            theme: "190 90% 42%",
            image: "/images/services/web.png",
        },
        {
            title: "Branding & Identidade",
            stat: "Marcas fortes e memoráveis",
            theme: "228 72% 56%",
            image: "/images/services/branding.png",
        },
        {
            title: "Marketing Digital",
            stat: "Crescimento orientado por dados",
            theme: "205 92% 46%",
            image: "/images/services/marketing.png",
        },
        {
            title: "Consultoria",
            stat: "Estratégia para transformação digital",
            theme: "195 88% 44%",
            image: "/images/services/consultoria.png",
        },
        {
            title: "Manutenção & Suporte",
            stat: "Evolução contínua e suporte 24/7",
            theme: "210 68% 48%",
            image: "/images/services/suporte.png",
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
        <section id="services" ref={container} className={styles.services}>
            <div className={styles.backgroundGrid} />
            <div className={styles.backgroundOrbs}>
                <motion.div
                    className={styles.orb1}
                    animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className={styles.orb2}
                    animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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
