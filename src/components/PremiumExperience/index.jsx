"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";

const scenes = [
  { id: "home", index: "00", label: "Abertura" },
  { id: "about", index: "01", label: "Direção" },
  { id: "services", index: "02", label: "Capacidades" },
  { id: "scale", index: "03", label: "Engenharia" },
  { id: "process", index: "04", label: "Processo" },
  { id: "work", index: "05", label: "Projetos" },
  { id: "contact", index: "06", label: "Contato" },
];

function playTone(context) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(420, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    680,
    context.currentTime + 0.08,
  );
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.16);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.17);
}

export default function PremiumExperience() {
  const shouldReduceMotion = useReducedMotion();
  const [activeScene, setActiveScene] = useState(scenes[0]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const audioContextRef = useRef(null);

  useEffect(
    () => () => {
      audioContextRef.current?.close();
    },
    [],
  );

  useEffect(() => {
    const connection = navigator.connection;
    const lowQuality = Boolean(
      connection?.saveData ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4),
    );
    document.documentElement.dataset.rnQuality = lowQuality
      ? "economy"
      : "premium";
    return () => {
      delete document.documentElement.dataset.rnQuality;
    };
  }, []);

  useEffect(() => {
    const elements = scenes
      .map((scene) => ({ scene, element: document.getElementById(scene.id) }))
      .filter(({ element }) => element);
    let frame = 0;
    let lastY = window.scrollY;
    let idleTimer;
    let energyTimer;

    const markActive = () => {
      frame = 0;
      const currentY = window.scrollY;
      const readingLine = window.innerHeight * 0.42;
      const current = elements.find(({ element }) => {
        const rect = element.getBoundingClientRect();
        return rect.top <= readingLine && rect.bottom > readingLine;
      });
      if (current) setActiveScene(current.scene);

      const velocity = Math.min(Math.abs(currentY - lastY) / 48, 1);
      document.documentElement.style.setProperty(
        "--rn-scroll-energy",
        velocity.toFixed(3),
      );
      window.clearTimeout(energyTimer);
      energyTimer = window.setTimeout(() => {
        document.documentElement.style.setProperty("--rn-scroll-energy", "0");
      }, 140);
      document.documentElement.dataset.scrollDirection =
        currentY > lastY ? "down" : "up";
      lastY = currentY;
    };

    const resetIdle = () => {
      setIsIdle(false);
      window.clearTimeout(idleTimer);
      window.clearTimeout(energyTimer);
      idleTimer = window.setTimeout(() => setIsIdle(true), 8000);
    };
    const schedule = () => {
      resetIdle();
      if (!frame) frame = window.requestAnimationFrame(markActive);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("pointerdown", resetIdle, { passive: true });
    window.addEventListener("keydown", resetIdle);
    markActive();
    resetIdle();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointerdown", resetIdle);
      window.removeEventListener("keydown", resetIdle);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
      document.documentElement.style.removeProperty("--rn-scroll-energy");
      delete document.documentElement.dataset.scrollDirection;
    };
  }, []);

  useEffect(() => {
    if (!soundEnabled) return undefined;
    const handleAction = (event) => {
      if (!event.target.closest("a, button")) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audioContextRef.current ||= new AudioContext();
      if (audioContextRef.current.state === "suspended")
        audioContextRef.current.resume();
      playTone(audioContextRef.current);
    };
    document.addEventListener("pointerdown", handleAction);
    return () => document.removeEventListener("pointerdown", handleAction);
  }, [soundEnabled]);

  return (
    <div
      className={styles.experience}
      data-idle={isIdle ? "true" : "false"}
      data-scene={activeScene.id}
    >
      <AnimatePresence mode="popLayout">
        {!shouldReduceMotion && activeScene.id !== "home" && (
          <motion.div
            key={activeScene.id}
            className={styles.sceneSignature}
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: [0, 0.2, 0], scale: [0.72, 1, 1.08] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <Image
              src="/images/estrela-rn-contorno.svg"
              fill
              sizes="38rem"
              alt=""
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.sceneRail} aria-hidden="true">
        <span>{activeScene.index}</span>
        <i>
          <b style={{ "--rn-scene-progress": Number(activeScene.index) / 6 }} />
        </i>
        <strong>{activeScene.label}</strong>
      </div>

      <button
        type="button"
        className={styles.soundToggle}
        tabIndex={activeScene.id === "home" ? -1 : undefined}
        aria-hidden={activeScene.id === "home" ? "true" : undefined}
        aria-label={
          soundEnabled
            ? "Desativar sons da interface"
            : "Ativar sons da interface"
        }
        aria-pressed={soundEnabled}
        onClick={() => setSoundEnabled((enabled) => !enabled)}
      >
        <span aria-hidden="true">
          {soundEnabled ? "Sound on" : "Sound off"}
        </span>
        <i aria-hidden="true" />
      </button>
    </div>
  );
}
