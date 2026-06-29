"use client";

import { Component, useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";

/**
 * Renderiza uma cena Spline usando o runtime oficial (@splinetool/runtime).
 *
 * - Carrega o runtime nativo (ESM moderno) do CDN com `webpackIgnore`, para o
 *   webpack/SWC do Next NÃO transpilar o pacote (a transpilação quebra a
 *   herança de classes do runtime: "Super constructor null...").
 * - Pré-aquece runtime + cena no idle e só pinta perto da viewport — assim
 *   o 3D aparece bem mais rápido sem pesar o carregamento inicial.
 * - Tudo isolado num ErrorBoundary: se o runtime 3D quebrar, a página continua.
 */
const RUNTIME_URL =
	"https://unpkg.com/@splinetool/runtime@1.12.97/build/runtime.js";

// Promise do runtime compartilhada entre instâncias: importa o módulo uma única
// vez e reaproveita o cache do navegador.
let runtimePromise = null;
function loadRuntime() {
	if (!runtimePromise) {
		runtimePromise = import(/* webpackIgnore: true */ RUNTIME_URL);
	}
	return runtimePromise;
}

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

function SplineSceneInner({ scene, className }) {
	const wrapRef = useRef(null);
	const canvasRef = useRef(null);
	const [inView, setInView] = useState(false);
	const [loading, setLoading] = useState(true);
	const [failed, setFailed] = useState(false);

	// Pré-aquece o runtime (JS/WASM) e a cena assim que o navegador fica ocioso,
	// independentemente da viewport. Quando o usuário chega na seção, falta só
	// pintar — em vez de esperar DNS + download + parsing do zero.
	useEffect(() => {
		const schedule =
			typeof window !== "undefined" && window.requestIdleCallback
				? window.requestIdleCallback
				: (cb) => setTimeout(cb, 200);
		const cancel =
			typeof window !== "undefined" && window.cancelIdleCallback
				? window.cancelIdleCallback
				: clearTimeout;

		const id = schedule(() => {
			// Carrega o runtime já para o cache do módulo.
			loadRuntime().catch(() => {});
			// Aquece o cache HTTP do asset pesado da cena.
			if (scene) fetch(scene, { mode: "cors" }).catch(() => {});
		});

		return () => cancel(id);
	}, [scene]);

	// Dispara a renderização bem antes de entrar na viewport.
	useEffect(() => {
		if (inView || !wrapRef.current) return;
		const el = wrapRef.current;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					setInView(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "1200px" }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [inView]);

	useEffect(() => {
		if (!inView) return;
		let app;
		let disposed = false;

		(async () => {
			try {
				const mod = await loadRuntime();
				const Application = mod.Application ?? mod.default?.Application;
				if (!Application) throw new Error("Application não encontrado no runtime");
				if (disposed || !canvasRef.current) return;

				app = new Application(canvasRef.current);
				await app.load(scene);
				if (!disposed) setLoading(false);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error("Erro ao carregar a cena Spline:", err);
				if (!disposed) {
					setFailed(true);
					setLoading(false);
				}
			}
		})();

		return () => {
			disposed = true;
			try {
				app?.dispose();
			} catch (_) {
				/* noop */
			}
		};
	}, [inView, scene]);

	return (
		<div ref={wrapRef} className={`${styles.wrap} ${className ?? ""}`}>
			{loading && !failed && (
				<div className={styles.loaderWrap}>
					<span className={styles.loader} />
				</div>
			)}
			{failed && (
				<div className={styles.loaderWrap}>
					<span className={styles.errorText}>cena 3d indisponível</span>
				</div>
			)}
			{inView && <canvas ref={canvasRef} className={styles.canvas} />}
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
