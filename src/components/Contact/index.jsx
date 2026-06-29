import styles from './style.module.scss';
import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import Magnetic from '../../common/Magnetic';

export default function Index() {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end end"]
	})
	const y = useTransform(scrollYProgress, [0, 1], [-200, 0])

	return (
		<motion.div style={{ y }} ref={container} className={styles.contact}>
			<div className={styles.body}>
				<div className={styles.info}>
					<div>
						<span>
							<h3>Versão</h3>
							<p>2026 © RN Design</p>
						</span>
						<span>
							<h3>Horário</h3>
							<p>GMT-3</p>
						</span>
					</div>
					<div>
						<span>
							<h3>Redes sociais</h3>
							<Magnetic>
								<a href="https://www.instagram.com/rubs_neto/" target="_blank" rel="noopener noreferrer">Instagram</a>
							</Magnetic>
						</span>
						<Magnetic>
							<a href="https://www.linkedin.com/in/dev-rubens/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
						</Magnetic>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
