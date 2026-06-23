"use client";

import dynamic from "next/dynamic";
import { Component } from "react";
import styles from "./style.module.scss";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
	ssr: false,
	loading: () => (
		<div className={styles.loaderWrap}>
			<span className={styles.loader} />
		</div>
	),
});

// Isola falhas do runtime do Spline (ex.: "Super constructor null") para que
// um erro no 3D não derrube a página inteira (client-side exception).
class SplineErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error) {
		if (typeof console !== "undefined") {
			console.warn("[SplineScene] 3D desativado por erro de runtime:", error?.message);
		}
	}
	render() {
		if (this.state.hasError) {
			return this.props.fallback ?? null;
		}
		return this.props.children;
	}
}

export function SplineScene({ scene, className }) {
	return (
		<SplineErrorBoundary
			fallback={
				<div className={styles.loaderWrap}>
					<span className={styles.loader} />
				</div>
			}
		>
			<Spline scene={scene} className={className} />
		</SplineErrorBoundary>
	);
}

export default SplineScene;
