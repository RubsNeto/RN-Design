"use client";

import { Component, useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";

const RUNTIME_URL =
	"https://unpkg.com/@splinetool/runtime@1.12.97/build/runtime.js";

let runtimePromise = null;
function loadRuntime() {
	if (!runtimePromise) {
		runtimePromise = import(/* webpackIgnore: true */ RUNTIME_URL);
	}
	return runtimePromise;
}

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
			console.warn(
				"[SplineScene] 3D desativado por erro de runtime:",
				error?.message,
			);
		}
	}

	render() {
		if (this.state.hasError) return this.props.fallback ?? null;
		return this.props.children;
	}
}

function SplineSceneInner({ scene, className }) {
	const wrapRef = useRef(null);
	const canvasRef = useRef(null);
	const applicationRef = useRef(null);
	const isVisibleRef = useRef(false);
	const reducedMotionRef = useRef(false);
	const [shouldLoad, setShouldLoad] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const syncMotionPreference = () => {
			reducedMotionRef.current = mediaQuery.matches;
			const application = applicationRef.current;
			if (!application) return;

			if (mediaQuery.matches) application.stop();
			else if (isVisibleRef.current && !document.hidden) application.play();
		};

		syncMotionPreference();
		mediaQuery.addEventListener("change", syncMotionPreference);
		return () => mediaQuery.removeEventListener("change", syncMotionPreference);
	}, []);

	// O runtime só é solicitado quando a cena se aproxima da tela. Assim, o
	// parsing WebGL não concorre com a coreografia inicial do hero.
	useEffect(() => {
		const element = wrapRef.current;
		if (!element || shouldLoad) return undefined;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setShouldLoad(true);
				observer.disconnect();
			},
			{ rootMargin: "160px 0px", threshold: 0.01 },
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, [shouldLoad]);

	// Um segundo observer controla play/stop pela viewport real.
	useEffect(() => {
		const element = wrapRef.current;
		if (!element) return undefined;

		const observer = new IntersectionObserver(
			([entry]) => {
				const nextVisible = entry.isIntersecting && entry.intersectionRatio > 0;
				isVisibleRef.current = nextVisible;
				setIsVisible(nextVisible);
			},
			{ threshold: 0.01 },
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!shouldLoad) return undefined;

		let application;
		let disposed = false;

		(async () => {
			try {
				const runtimeModule = await loadRuntime();
				const Application = runtimeModule.Application ?? runtimeModule.default?.Application;
				if (!Application) throw new Error("Application não encontrado no runtime");
				if (disposed || !canvasRef.current) return;

				application = new Application(canvasRef.current, { renderMode: "auto" });
				await application.load(scene);
				if (disposed) {
					application.dispose();
					return;
				}

				applicationRef.current = application;
				if (
					!isVisibleRef.current
					|| document.hidden
					|| reducedMotionRef.current
				) application.stop();
				setLoading(false);
			} catch (error) {
				console.error("Erro ao carregar a cena Spline:", error);
				if (!disposed) {
					setFailed(true);
					setLoading(false);
				}
			}
		})();

		return () => {
			disposed = true;
			applicationRef.current = null;
			try {
				application?.dispose();
			} catch (_) {
				/* noop */
			}
		};
	}, [scene, shouldLoad]);

	useEffect(() => {
		const syncPlayback = () => {
			const application = applicationRef.current;
			if (!application) return;

			if (isVisible && !document.hidden && !reducedMotionRef.current) application.play();
			else application.stop();
		};

		syncPlayback();
		document.addEventListener("visibilitychange", syncPlayback);
		return () => document.removeEventListener("visibilitychange", syncPlayback);
	}, [isVisible]);

	return (
		<div ref={wrapRef} className={`${styles.wrap} ${className ?? ""}`}>
			{shouldLoad && loading && !failed && (
				<div className={styles.loaderWrap}>
					<span className={styles.loader} />
				</div>
			)}
			{failed && (
				<div className={styles.loaderWrap}>
					<span className={styles.errorText}>cena 3d indisponível</span>
				</div>
			)}
			{shouldLoad && <canvas ref={canvasRef} className={styles.canvas} />}
		</div>
	);
}

export function SplineScene({ scene, className }) {
	return (
		<SplineErrorBoundary
			fallback={
				<div className={styles.loaderWrap}>
					<span className={styles.errorText}>cena 3d indisponível</span>
				</div>
			}
		>
			<SplineSceneInner scene={scene} className={className} />
		</SplineErrorBoundary>
	);
}

export default SplineScene;
