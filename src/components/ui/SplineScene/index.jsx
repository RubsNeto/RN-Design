"use client";

import dynamic from "next/dynamic";
import styles from "./style.module.scss";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
	ssr: false,
	loading: () => (
		<div className={styles.loaderWrap}>
			<span className={styles.loader} />
		</div>
	),
});

export function SplineScene({ scene, className }) {
	return <Spline scene={scene} className={className} />;
}

export default SplineScene;
