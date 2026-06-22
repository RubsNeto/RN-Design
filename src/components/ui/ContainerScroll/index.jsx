"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./style.module.scss";

export function ContainerScroll({ titleComponent, children }) {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({ target: containerRef });
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Reta (0°) enquanto o notebook está visível; só dobra ao sair do bloco.
	const rotate = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0, 22]);
	const translate = useTransform(scrollYProgress, [0, 1], [0, -60]);
	const scaleVal = isMobile ? 0.9 : 1;

	return (
		<div className={styles.container} ref={containerRef}>
			<div className={styles.inner} style={{ perspective: "1000px" }}>
				<motion.div style={{ translateY: translate }} className={styles.header}>
					{titleComponent}
				</motion.div>
				<motion.div
					style={{
						rotateX: rotate,
						scale: scaleVal,
						boxShadow:
							"0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
					}}
					className={styles.card}
				>
					<div className={styles.screen}>{children}</div>
				</motion.div>
			</div>
		</div>
	);
}

export default ContainerScroll;
