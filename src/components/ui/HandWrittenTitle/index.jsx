"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./style.module.scss";

export function HandWrittenTitle({
	prefix = "",
	highlight = "",
	suffix = "",
	subtitle = "",
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
						viewBox="0 0 300 130"
						fill="none"
						aria-hidden="true"
					>
						<motion.path
							d="M148 16 C 60 12, 16 40, 22 70 C 28 104, 130 120, 214 112 C 286 105, 298 74, 284 50 C 268 24, 180 14, 96 22"
							stroke="currentColor"
							strokeWidth="7"
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
		</div>
	);
}

export default HandWrittenTitle;
