'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { RnBrandMark } from '@rn-design/system/react';
import styles from './style.module.scss';
import { opacity, slideUp } from './anim';

const words = ['Hello', 'Bonjour', 'Ciao', 'やあ', 'Hallå', 'Guten Tag', 'Hola', 'Olá'];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const allowsMotion = shouldReduceMotion === false;

  useEffect(() => {
    if (!allowsMotion || index === words.length - 1) return undefined;

    const wordTimer = window.setTimeout(
      () => setIndex((currentIndex) => currentIndex + 1),
      index === 0 ? 420 : 135,
    );

    return () => window.clearTimeout(wordTimer);
  }, [allowsMotion, index]);

  const containerExit = shouldReduceMotion
    ? { opacity: 0, transition: { duration: 0.12 } }
    : slideUp.exit;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={containerExit}
      className={styles.introduction}
      role="status"
      aria-live="polite"
      aria-label="Carregando o site da RN Design"
    >
      <div className={styles.brand} aria-hidden="true">
        <RnBrandMark size="md" />
        <span>RN Design</span>
      </div>

      <motion.p
        aria-hidden="true"
        variants={opacity}
        initial="initial"
        animate={allowsMotion ? 'enter' : { opacity: 0.75 }}
      >
        <span className={styles.dot} aria-hidden="true" />
        <motion.span
          key={words[index]}
          className={styles.word}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: allowsMotion ? 0.14 : 0 }}
        >
          {words[index]}
        </motion.span>
      </motion.p>
    </motion.div>
  );
}
