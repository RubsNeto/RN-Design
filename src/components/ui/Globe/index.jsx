"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";

const STANDARD_FRAME_INTERVAL = 1000 / 30;
const FALLBACK_SKY = [71, 171, 225];
const FALLBACK_CYAN = [63, 208, 233];
const FALLBACK_BLUE_SOFT = [90, 154, 238];

function parseHexColor(value, fallback) {
	const normalized = value.trim().replace('#', '');
	if (!/^[\da-f]{6}$/i.test(normalized)) return fallback;

	return [
		Number.parseInt(normalized.slice(0, 2), 16),
		Number.parseInt(normalized.slice(2, 4), 16),
		Number.parseInt(normalized.slice(4, 6), 16),
	];
}

function alphaColor([red, green, blue], alpha) {
	return `rgb${'a'}(${red}, ${green}, ${blue}, ${alpha})`;
}

const DEFAULT_MARKERS = [
	{ lat: 37.78, lng: -122.42, label: "San Francisco" },
	{ lat: 51.51, lng: -0.13, label: "London" },
	{ lat: 35.68, lng: 139.69, label: "Tokyo" },
	{ lat: -33.87, lng: 151.21, label: "Sydney" },
	{ lat: 1.35, lng: 103.82, label: "Singapore" },
	{ lat: 55.76, lng: 37.62, label: "Moscow" },
	{ lat: -23.55, lng: -46.63, label: "São Paulo" },
	{ lat: 19.43, lng: -99.13, label: "Mexico City" },
	{ lat: 28.61, lng: 77.21, label: "Delhi" },
	{ lat: -15.79, lng: -47.88, label: "Brasília" },
];

const DEFAULT_CONNECTIONS = [
	{ from: [37.78, -122.42], to: [51.51, -0.13] },
	{ from: [51.51, -0.13], to: [35.68, 139.69] },
	{ from: [35.68, 139.69], to: [-33.87, 151.21] },
	{ from: [37.78, -122.42], to: [1.35, 103.82] },
	{ from: [51.51, -0.13], to: [28.61, 77.21] },
	{ from: [37.78, -122.42], to: [-23.55, -46.63] },
	{ from: [1.35, 103.82], to: [-33.87, 151.21] },
	{ from: [-23.55, -46.63], to: [-15.79, -47.88] },
	{ from: [51.51, -0.13], to: [-23.55, -46.63] },
];

function latLngToXYZ(lat, lng, radius) {
	const phi = ((90 - lat) * Math.PI) / 180;
	const theta = ((lng + 180) * Math.PI) / 180;
	return [
		-(radius * Math.sin(phi) * Math.cos(theta)),
		radius * Math.cos(phi),
		radius * Math.sin(phi) * Math.sin(theta),
	];
}

function rotateY(x, y, z, angle) {
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	return [x * cos + z * sin, y, -x * sin + z * cos];
}

function rotateX(x, y, z, angle) {
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(x, y, z, cx, cy, fov) {
	const scale = fov / (fov + z);
	return [x * scale + cx, y * scale + cy, z];
}

export function Globe({
	className,
	autoRotateSpeed = 0.002,
	connections = DEFAULT_CONNECTIONS,
	markers = DEFAULT_MARKERS,
	rotationRef = null,
	descriptionId,
}) {
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const metricsRef = useRef({ width: 0, height: 0, dpr: 1, glow: null });
	const rotYRef = useRef(0.4);
	const rotXRef = useRef(0.3);
	const animRef = useRef(0);
	const frameIntervalRef = useRef(STANDARD_FRAME_INTERVAL);
	const maxDprRef = useRef(1.5);
	const frameTimerRef = useRef(0);
	const lastFrameRef = useRef(0);
	const timeRef = useRef(0);
	const dotsRef = useRef([]);
	const dotBucketsRef = useRef(Array.from({ length: 11 }, () => []));
	const dotPaletteRef = useRef(
		Array.from({ length: 11 }, (_, index) => alphaColor(FALLBACK_SKY, (index / 10).toFixed(2))),
	);
	const canvasColorsRef = useRef({
		arc: alphaColor(FALLBACK_CYAN, 0.5),
		marker: alphaColor(FALLBACK_BLUE_SOFT, 1),
		glowStart: alphaColor(FALLBACK_SKY, 0.04),
		glowEnd: alphaColor(FALLBACK_SKY, 0),
		outline: alphaColor(FALLBACK_CYAN, 0.06),
	});
	const canvasFontRef = useRef('"Montserrat RN", sans-serif');
	const visibleRef = useRef(false);
	const reducedMotionRef = useRef(false);
	const connectionPoints = useMemo(
		() => connections.map((connection) => ({
			from: latLngToXYZ(connection.from[0], connection.from[1], 1),
			to: latLngToXYZ(connection.to[0], connection.to[1], 1),
			phase: connection.from[0] * 0.1,
		})),
		[connections],
	);
	const markerPoints = useMemo(
		() => markers.map((marker) => ({
			...marker,
			point: latLngToXYZ(marker.lat, marker.lng, 1),
		})),
		[markers],
	);

	useEffect(() => {
		const rootStyles = window.getComputedStyle(document.documentElement);
		const sky = parseHexColor(rootStyles.getPropertyValue('--rn-color-primary'), FALLBACK_SKY);
		const cyan = parseHexColor(rootStyles.getPropertyValue('--rn-cyan'), FALLBACK_CYAN);
		const blueSoft = parseHexColor(rootStyles.getPropertyValue('--rn-blue-soft'), FALLBACK_BLUE_SOFT);
		dotPaletteRef.current = Array.from(
			{ length: 11 },
			(_, index) => alphaColor(sky, (index / 10).toFixed(2)),
		);
		canvasColorsRef.current = {
			arc: alphaColor(cyan, 0.5),
			marker: alphaColor(blueSoft, 1),
			glowStart: alphaColor(sky, 0.04),
			glowEnd: alphaColor(sky, 0),
			outline: alphaColor(cyan, 0.06),
		};
		canvasFontRef.current = rootStyles.getPropertyValue('--rn-font-sans').trim()
			|| '"Montserrat RN", sans-serif';

		const compact = window.matchMedia("(max-width: 768px)").matches;
		const saveData = Boolean(navigator.connection?.saveData);
		const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
		const lowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
		const lowPower = saveData || lowMemory || lowCpu;
		const numDots = saveData ? 360 : lowPower ? 480 : compact ? 640 : 900;
		frameIntervalRef.current = lowPower ? 1000 / 20 : STANDARD_FRAME_INTERVAL;
		maxDprRef.current = lowPower ? 1 : 1.5;
		const dots = [];
		const goldenRatio = (1 + Math.sqrt(5)) / 2;

		for (let index = 0; index < numDots; index += 1) {
			const theta = (2 * Math.PI * index) / goldenRatio;
			const phi = Math.acos(1 - (2 * (index + 0.5)) / numDots);
			dots.push([
				Math.cos(theta) * Math.sin(phi),
				Math.cos(phi),
				Math.sin(theta) * Math.sin(phi),
			]);
		}

		dotsRef.current = dots;
		reducedMotionRef.current = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return undefined;

		const context = canvas.getContext("2d", { alpha: true, desynchronized: true });
		if (!context) return undefined;
		contextRef.current = context;

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			const width = Math.max(1, Math.round(rect.width));
			const height = Math.max(1, Math.round(rect.height));
			const dpr = Math.min(window.devicePixelRatio || 1, maxDprRef.current);
			const previous = metricsRef.current;

			if (
				previous.width === width
				&& previous.height === height
				&& previous.dpr === dpr
			) return;

			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			context.setTransform(dpr, 0, 0, dpr, 0, 0);

			const cx = width / 2;
			const cy = height / 2;
			const radius = Math.min(width, height) * 0.38;
			const glow = context.createRadialGradient(
				cx,
				cy,
				radius * 0.8,
				cx,
				cy,
				radius * 1.5,
			);
			glow.addColorStop(0, canvasColorsRef.current.glowStart);
			glow.addColorStop(1, canvasColorsRef.current.glowEnd);
			metricsRef.current = { width, height, dpr, glow };
		};

		resize();
		if (typeof ResizeObserver === "undefined") {
			window.addEventListener("resize", resize, { passive: true });
			return () => window.removeEventListener("resize", resize);
		}

		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(canvas);
		return () => resizeObserver.disconnect();
	}, []);

	const draw = useCallback((timestamp = 0) => {
		if (!visibleRef.current) return;

		const previousFrame = lastFrameRef.current;
		const frameInterval = frameIntervalRef.current;
		const elapsed = previousFrame ? timestamp - previousFrame : frameInterval;
		lastFrameRef.current = timestamp;
		const scheduleNextFrame = () => {
			window.clearTimeout(frameTimerRef.current);
			frameTimerRef.current = window.setTimeout(() => {
				animRef.current = window.requestAnimationFrame(draw);
			}, frameInterval * 0.66);
		};

		const context = contextRef.current;
		const { width, height, glow } = metricsRef.current;
		if (!context || !width || !height || !glow) {
			scheduleNextFrame();
			return;
		}

		const frameScale = Math.min(elapsed / (1000 / 60), 3);
		const cx = width / 2;
		const cy = height / 2;
		const radius = Math.min(width, height) * 0.38;
		const fov = 600;

		if (rotationRef && rotationRef.current != null) {
			rotYRef.current = rotationRef.current;
		} else {
			rotYRef.current += autoRotateSpeed * frameScale;
		}

		timeRef.current += 0.015 * frameScale;
		const time = timeRef.current;
		context.clearRect(0, 0, width, height);
		context.fillStyle = glow;
		context.fillRect(0, 0, width, height);

		context.beginPath();
		context.arc(cx, cy, radius, 0, Math.PI * 2);
		context.strokeStyle = canvasColorsRef.current.outline;
		context.lineWidth = 1;
		context.stroke();

		const rotationY = rotYRef.current;
		const rotationX = rotXRef.current;
		const buckets = dotBucketsRef.current;
		buckets.forEach((bucket) => { bucket.length = 0; });

		for (const dot of dotsRef.current) {
			let [x, y, z] = dot;
			x *= radius;
			y *= radius;
			z *= radius;
			[x, y, z] = rotateX(x, y, z, rotationX);
			[x, y, z] = rotateY(x, y, z, rotationY);
			if (z > 0) continue;

			const [screenX, screenY] = project(x, y, z, cx, cy, fov);
			const depthAlpha = Math.max(0.1, 1 - (z + radius) / (2 * radius));
			const paletteIndex = Math.max(0, Math.min(10, Math.round(depthAlpha * 10)));
			buckets[paletteIndex].push(screenX, screenY, 1 + depthAlpha * 0.8);
		}

		buckets.forEach((bucket, paletteIndex) => {
			if (!bucket.length) return;
			context.beginPath();
			for (let index = 0; index < bucket.length; index += 3) {
				const x = bucket[index];
				const y = bucket[index + 1];
				const size = bucket[index + 2];
				context.moveTo(x + size, y);
				context.arc(x, y, size, 0, Math.PI * 2);
			}
			context.fillStyle = dotPaletteRef.current[paletteIndex];
			context.fill();
		});

		for (const connection of connectionPoints) {
			let [x1, y1, z1] = connection.from.map((value) => value * radius);
			let [x2, y2, z2] = connection.to.map((value) => value * radius);
			[x1, y1, z1] = rotateX(x1, y1, z1, rotationX);
			[x1, y1, z1] = rotateY(x1, y1, z1, rotationY);
			[x2, y2, z2] = rotateX(x2, y2, z2, rotationX);
			[x2, y2, z2] = rotateY(x2, y2, z2, rotationY);
			if (z1 > radius * 0.3 && z2 > radius * 0.3) continue;

			const [screenX1, screenY1] = project(x1, y1, z1, cx, cy, fov);
			const [screenX2, screenY2] = project(x2, y2, z2, cx, cy, fov);
			const middleX = (x1 + x2) / 2;
			const middleY = (y1 + y2) / 2;
			const middleZ = (z1 + z2) / 2;
			const middleLength = Math.sqrt(
				middleX * middleX + middleY * middleY + middleZ * middleZ,
			);
			const arcHeight = radius * 1.25;
			const [controlX, controlY] = project(
				(middleX / middleLength) * arcHeight,
				(middleY / middleLength) * arcHeight,
				(middleZ / middleLength) * arcHeight,
				cx,
				cy,
				fov,
			);

			context.beginPath();
			context.moveTo(screenX1, screenY1);
			context.quadraticCurveTo(controlX, controlY, screenX2, screenY2);
			context.strokeStyle = canvasColorsRef.current.arc;
			context.lineWidth = 1.2;
			context.stroke();

			const progress = (Math.sin(time * 1.2 + connection.phase) + 1) / 2;
			const pointX = (1 - progress) ** 2 * screenX1
				+ 2 * (1 - progress) * progress * controlX
				+ progress ** 2 * screenX2;
			const pointY = (1 - progress) ** 2 * screenY1
				+ 2 * (1 - progress) * progress * controlY
				+ progress ** 2 * screenY2;
			context.beginPath();
			context.arc(pointX, pointY, 2, 0, Math.PI * 2);
			context.fillStyle = canvasColorsRef.current.marker;
			context.fill();
		}

		context.font = `10px ${canvasFontRef.current}`;
		for (const marker of markerPoints) {
			let [x, y, z] = marker.point.map((value) => value * radius);
			[x, y, z] = rotateX(x, y, z, rotationX);
			[x, y, z] = rotateY(x, y, z, rotationY);
			if (z > radius * 0.1) continue;

			const [screenX, screenY] = project(x, y, z, cx, cy, fov);
			const pulse = Math.sin(time * 2 + marker.lat) * 0.5 + 0.5;
			context.beginPath();
			context.arc(screenX, screenY, 4 + pulse * 4, 0, Math.PI * 2);
			context.strokeStyle = canvasColorsRef.current.marker.replace(
				"1)",
				`${(0.2 + pulse * 0.15).toFixed(2)})`,
			);
			context.lineWidth = 1;
			context.stroke();
			context.beginPath();
			context.arc(screenX, screenY, 2.5, 0, Math.PI * 2);
			context.fillStyle = canvasColorsRef.current.marker;
			context.fill();

			if (marker.label) {
				context.fillStyle = canvasColorsRef.current.marker.replace("1)", "0.6)");
				context.fillText(marker.label, screenX + 8, screenY + 3);
			}
		}

		if (visibleRef.current && !reducedMotionRef.current) {
			scheduleNextFrame();
		}
	}, [autoRotateSpeed, connectionPoints, markerPoints, rotationRef]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return undefined;

		const start = () => {
			window.cancelAnimationFrame(animRef.current);
			window.clearTimeout(frameTimerRef.current);
			lastFrameRef.current = 0;
			animRef.current = window.requestAnimationFrame(draw);
		};
		const stop = () => {
			window.cancelAnimationFrame(animRef.current);
			window.clearTimeout(frameTimerRef.current);
		};
		const observer = new IntersectionObserver(
			([entry]) => {
				const nextVisible = entry.isIntersecting && entry.intersectionRatio > 0;
				visibleRef.current = nextVisible;
				if (nextVisible && !document.hidden) start();
				else stop();
			},
			{ threshold: 0.01 },
		);

		observer.observe(canvas);
		const handleVisibility = () => {
			if (document.hidden) stop();
			else if (visibleRef.current) start();
		};
		document.addEventListener("visibilitychange", handleVisibility);

		return () => {
			observer.disconnect();
			document.removeEventListener("visibilitychange", handleVisibility);
			window.cancelAnimationFrame(animRef.current);
			window.clearTimeout(frameTimerRef.current);
		};
	}, [draw]);

	return (
		<canvas
			ref={canvasRef}
			className={className}
			style={{ width: "100%", height: "100%" }}
			role="img"
			aria-label="Rede internacional animada"
			aria-describedby={descriptionId}
		/>
	);
}

export default Globe;
