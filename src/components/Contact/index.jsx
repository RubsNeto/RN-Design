"use client";

import styles from "./style.module.scss";
import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

const social = [
	{
		label: "Instagram",
		href: "https://www.instagram.com/rubs_neto/",
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/dev-rubens/",
	},
	{
		label: "WhatsApp",
		href: "https://wa.me/5562999299020?text=Vim%20do%20site%20e%20gostaria%20de%20saber%20mais",
	},
];

const reveal = {
	hidden: { opacity: 0, y: 42 },
	visible: (i = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
	}),
};

const Arrow = () => (
	<svg
		className={styles.arrow}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path
			d="M7 17L17 7M17 7H8M17 7V16"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default function Index() {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end end"],
	});
	const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);

	return (
		<motion.div style={{ y }} ref={container} className={styles.contact}>
			<div className={styles.body}>
				<motion.span
					className={styles.label}
					variants={reveal}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.6 }}
				>
					vamos trabalhar juntos
				</motion.span>

				<motion.h2
					className={styles.heading}
					variants={reveal}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.6 }}
				>
					Vamos criar algo <span className={styles.accent}>excepcional</span>
				</motion.h2>

				{/* Efeito 1: links contornados que preenchem no hover + seta */}
				<nav className={styles.links}>
					{social.map((s, i) => (
						<motion.a
							key={s.label}
							href={s.href}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.link}
							custom={i + 1}
							variants={reveal}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.3 }}
						>
							<span className={styles.linkText}>{s.label}</span>
							<Arrow />
						</motion.a>
					))}
				</nav>

				<div className={styles.info}>
					<div>
						<span>
							<h3>Versão</h3>
							<p>2026 © RN Design</p>
						</span>
						<span>
							<h3>Horário</h3>
							<p>GMT-3</p>
						</span>
					</div>
					<div>
						<span>
							<h3>Contato</h3>
							<a
								href="https://wa.me/5562999299020?text=Vim%20do%20site%20e%20gostaria%20de%20saber%20mais"
								target="_blank"
								rel="noopener noreferrer"
							>
								+55 62 99929-9020
							</a>
						</span>
					</div>
				</div>
			</div>

			{/* Efeito 2: wordmark gigante com fade-out */}
			<motion.div
				className={styles.wordmark}
				aria-hidden="true"
				initial={{ opacity: 0, y: 60 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
			>
				RN Design
			</motion.div>
		</motion.div>
	);
}
