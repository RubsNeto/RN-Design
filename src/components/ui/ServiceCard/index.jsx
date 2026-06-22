"use client";

import styles from "./style.module.scss";

export function ServiceCard({ imageUrl, title, stat, href = "#", themeColor }) {
	return (
		<div className={styles.card} style={{ "--theme": themeColor }}>
			<a
				href={href}
				className={styles.link}
				aria-label={`Saiba mais sobre ${title}`}
			>
				<div
					className={styles.image}
					style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
				/>
				<div className={styles.overlay} />

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
	);
}

export default ServiceCard;
