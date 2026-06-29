"use client";

import { useCallback, useRef } from "react";
import styles from "./style.module.scss";

export function ServiceCard({ imageUrl, title, stat, href = "#", themeColor }) {
	const cardRef = useRef(null);
	const rafRef = useRef(0);

	const handleMove = useCallback((e) => {
		const el = cardRef.current;
		if (!el) return;
		const { clientX, clientY } = e;
		cancelAnimationFrame(rafRef.current);
		rafRef.current = requestAnimationFrame(() => {
			const rect = el.getBoundingClientRect();
			const px = (clientX - rect.left) / rect.width; // 0..1
			const py = (clientY - rect.top) / rect.height; // 0..1
			const max = 14; // graus máximos de inclinação
			el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
			el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
			el.style.setProperty("--mx", `${px * 100}%`);
			el.style.setProperty("--my", `${py * 100}%`);
		});
	}, []);

	const handleEnter = useCallback(() => {
		const el = cardRef.current;
		if (el) el.style.setProperty("--active", "1");
	}, []);

	const handleLeave = useCallback(() => {
		const el = cardRef.current;
		if (!el) return;
		cancelAnimationFrame(rafRef.current);
		el.style.setProperty("--rx", "0deg");
		el.style.setProperty("--ry", "0deg");
		el.style.setProperty("--active", "0");
	}, []);

	return (
		<div className={styles.scene}>
			<div
				ref={cardRef}
				className={styles.card}
				style={{ "--theme": themeColor }}
				onMouseMove={handleMove}
				onMouseEnter={handleEnter}
				onMouseLeave={handleLeave}
			>
				<a
					href={href}
					className={styles.link}
					aria-label={`Saiba mais sobre ${title}`}
				>
					<div className={styles.media}>
						<div
							className={styles.image}
							style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
						/>
						<div className={styles.overlay} />
						<div className={styles.glare} />
					</div>

					<div className={styles.content}>
						<h3 className={styles.title}>{title}</h3>
						<p className={styles.stat}>{stat}</p>

						<div className={styles.button}>
							<span>Saiba mais</span>
							<svg
								className={styles.arrow}
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
						</div>
					</div>
				</a>
			</div>
		</div>
	);
}

export default ServiceCard;
