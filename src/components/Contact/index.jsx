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
	hidden: { opacity: 0, y: 24 },
	visible: (i = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
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
				{/* Redes — pequenas, Gotham Black, contorno que preenche no hover */}
				<nav className={styles.links}>
					{social.map((s, i) => (
						<motion.a
							key={s.label}
							href={s.href}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.link}
							custom={i}
							variants={reveal}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.4 }}
						>
							<span className={styles.linkText}>{s.label}</span>
							<Arrow />
						</motion.a>
					))}
				</nav>
			</div>

			{/* Wordmark gigante com fade-out + copyright por cima */}
			<div className={styles.wordmarkWrap}>
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
				<span className={styles.copyright}>2026 © RN Design</span>
			</div>
		</motion.div>
	);
}
