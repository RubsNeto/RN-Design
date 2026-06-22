"use client";
import Image from "next/image";
import styles from "./style.module.scss";

export default function Home() {
	return (
		<main className={styles.landing}>
			<Image
				src="/images/capa.jpg"
				fill
				alt="Fundo RN Design"
				priority
				className={styles.cover}
			/>
			<div className={styles.scrim} />

			<div className={styles.content}>
				<span className={styles.eyebrow}>design · desenvolvimento · ia</span>
				<h1 className={styles.title}>
					Experiências digitais <span className={styles.accent}>excepcionais</span>.
				</h1>
				<p className={styles.role}>
					Interfaces, performance e inteligência artificial aplicada a
					produtos digitais.
				</p>
			</div>

			<div
				className={styles.formations}
				data-scroll
				data-scroll-speed={0.1}
			>
				<svg
					width="9"
					height="9"
					viewBox="0 0 9 9"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
						fill="#4FC3F7"
					/>
				</svg>
				<p>Mestrando em Inteligência Artificial · HGU</p>
				<p>MBA em Engenharia de Software · USP</p>
				<p>Cientista da Computação · UFJ</p>
			</div>

			<div
				className={styles.sliderContainer}
				aria-hidden="true"
				data-scroll
				data-scroll-speed={0.1}
			>
				<div className={styles.slider}>
					<p>RN Design —</p>
					<p>RN Design —</p>
					<p>RN Design —</p>
					<p>RN Design —</p>
				</div>
			</div>

			<div className={styles.scrollIndicator} aria-hidden="true">
				<div className={styles.scrollLine}>
					<div className={styles.scrollDot} />
				</div>
				<span>scroll</span>
			</div>
		</main>
	);
}
