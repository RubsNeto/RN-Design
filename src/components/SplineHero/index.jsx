"use client";

import { SplineScene } from "../ui/SplineScene";
import styles from "./style.module.scss";

export default function SplineHero() {
	return (
		<div className={styles.hero}>
			{/* Topbar — como o header de um site real */}
			<header className={styles.topbar}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="/images/Logo_RN.png" alt="RN Design" className={styles.logo} />
				<nav className={styles.nav}>
					<span>sobre</span>
					<span>trabalho</span>
					<span>contato</span>
				</nav>
			</header>

			<div className={styles.body}>
				<div className={styles.left}>
					<span className={styles.eyebrow}>interativo · 3d</span>
					<h3 className={styles.title}>
						Design que você pode <span className={styles.accent}>tocar</span>
					</h3>
					<p className={styles.desc}>
						Interfaces tridimensionais e interativas, com performance — onde a
						marca ganha profundidade de verdade.
					</p>
				</div>
				<div className={styles.right}>
					<SplineScene
						scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
						className={styles.scene}
					/>
				</div>
			</div>
		</div>
	);
}
