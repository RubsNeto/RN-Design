"use client";

import styles from "./style.module.scss";

const cards = [
	{
		title: "Do conceito ao código",
		desc: "Design e engenharia pensados juntos — do primeiro rascunho ao deploy.",
		from: "#4FC3F7",
		to: "#0288D1",
	},
	{
		title: "Obsessão por detalhe",
		desc: "Microinterações, performance e acessibilidade como parte do design, não como extra.",
		from: "#00BCD4",
		to: "#0277BD",
	},
	{
		title: "Tecnologia com propósito",
		desc: "IA e automação aplicadas onde geram valor real, nunca como enfeite.",
		from: "#29B6F6",
		to: "#00E5FF",
	},
];

export default function SkewCards() {
	return (
		<section className={styles.section}>
			<div className={styles.header}>
				<span className={styles.label}>abordagem</span>
				<h2 className={styles.heading}>Como eu trabalho</h2>
			</div>

			<div className={styles.cards}>
				{cards.map((c, i) => (
					<div
						key={i}
						className={styles.card}
						style={{ "--from": c.from, "--to": c.to }}
					>
						<span className={styles.panel} />
						<span className={styles.panelBlur} />
						<span className={styles.blobs}>
							<span className={styles.blob1} />
							<span className={styles.blob2} />
						</span>
						<div className={styles.content}>
							<h3>{c.title}</h3>
							<p>{c.desc}</p>
							<a href="#contact" className={styles.readMore}>
								Saiba mais
							</a>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
