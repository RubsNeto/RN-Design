"use client";

import Image from "next/image";
import { ContainerScroll } from "../ui/ContainerScroll";
import styles from "./style.module.scss";

export default function LaptopShowcase() {
	return (
		<ContainerScroll
			titleComponent={
				<div className={styles.head}>
					<span className={styles.label}>em ação</span>
					<h2 className={styles.title}>
						Experiências que ganham vida na{" "}
						<span className={styles.accent}>tela</span>
					</h2>
				</div>
			}
		>
			<Image
				src="/images/officestudio.png"
				alt="Projeto em destaque"
				fill
				className={styles.shot}
				sizes="(max-width: 768px) 100vw, 1024px"
			/>
		</ContainerScroll>
	);
}
