"use client";

import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Globe } from "../ui/Globe";
import styles from "./style.module.scss";

export default function GlobeSection() {
	const sectionRef = useRef(null);
	const rotationRef = useRef(0.4);

	// Rotação dirigida pelo scroll: desce gira, sobe reverte.
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});
	useMotionValueEvent(scrollYProgress, "change", (v) => {
		rotationRef.current = 0.4 + v * Math.PI * 4;
	});

	return (
		<section ref={sectionRef} className={styles.section}>
			<div className={styles.orb} />
			<div className={styles.inner}>
				<div className={styles.text}>
					<span className={styles.label}>alcance global</span>
					<h2 className={styles.title}>
						Produtos que funcionam em{" "}
						<span className={styles.accent}>qualquer lugar</span>
					</h2>
					<p className={styles.desc}>
						Da arquitetura à interface, construo experiências escaláveis —
						pensadas para performance, acessibilidade e times distribuídos
						pelo mundo.
					</p>
				</div>
				<div className={styles.globeWrap}>
					<Globe rotationRef={rotationRef} />
				</div>
			</div>
		</section>
	);
}
