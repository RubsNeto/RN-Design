"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./style.module.scss";

export function HandWrittenTitle({
	prefix = "",
	highlight = "",
	suffix = "",
	subtitle = "",
	ctaLabel = "",
	ctaHref = "",
}) {
	const ref = useRef(null);

	// Progresso do scroll dentro da seção -> desenha/desfaz o círculo (reversível).
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.9", "center 0.55"],
	});
	const opacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

	return (
		<div className={styles.wrap} ref={ref}>
			<motion.h2
				className={styles.title}
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.6 }}
				transition={{ duration: 0.7 }}
			>
				{prefix && <span>{prefix} </span>}
				<span className={styles.circled}>
					{highlight}
					<svg
						className={styles.circle}
						viewBox="0 0 300 120"
						fill="none"
						aria-hidden="true"
					>
						<motion.path
							d="M150 12 C 72 8, 18 30, 18 60 C 18 92, 92 110, 172 108 C 252 106, 286 80, 280 52 C 274 24, 196 8, 112 16"
							stroke="currentColor"
							strokeWidth="6"
							strokeLinecap="round"
							strokeLinejoin="round"
							className={styles.circlePath}
							style={{ pathLength: scrollYProgress, opacity }}
						/>
					</svg>
				</span>
				{suffix && <span> {suffix}</span>}
			</motion.h2>

			{subtitle && (
				<motion.p
					className={styles.subtitle}
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, amount: 0.6 }}
					transition={{ delay: 0.4, duration: 0.6 }}
				>
					{subtitle}
				</motion.p>
			)}

			{ctaLabel && (
				<motion.a
					className={styles.cta}
					href={ctaHref}
					target="_blank"
					rel="noopener noreferrer"
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.6 }}
					transition={{ delay: 0.55, duration: 0.6 }}
				>
					<span>{ctaLabel}</span>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M5 12H19M19 12L12 5M19 12L12 19"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</motion.a>
			)}
		</div>
	);
}

export default HandWrittenTitle;
