'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import rnLogo from '@rn-design/system/logo.png';
import styles from './style.module.scss';
import {
  COMPANY_LEGAL_NAME,
  PROJECT_WHATSAPP_LINK,
  SOCIAL_LINKS,
} from '../../config/site';

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Contact() {
  const footerRef = useRef(null);
  const orbitRef = useRef(null);
  const isInView = useInView(footerRef, { margin: '-12% 0px' });
  const isOrbitInView = useInView(orbitRef, { margin: '20% 0px' });

  return (
    <footer
      ref={footerRef}
      className={`${styles.contact} rn-story-scene rn-story-scene--deep`}
      data-ambient={isInView ? 'running' : 'paused'}
      aria-labelledby="contact-title"
    >
      <span className="rn-scene-grid" aria-hidden="true" />
      <span className={styles.closingGlow} aria-hidden="true" />
      <span
        ref={orbitRef}
        className={styles.brandOrbit}
        data-ambient={isOrbitInView ? 'running' : 'paused'}
        aria-hidden="true"
      >
        <Image src="/images/estrela-rn-contorno.svg" fill sizes="36rem" alt="" />
      </span>

      <div className={`rn-story-scene__inner ${styles.inner}`}>
        <div className={styles.closingGrid}>
          <motion.div
            className={styles.headingBlock}
            initial={{ y: 24 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="rn-section-meta" data-scene="dark">
              <span className="rn-section-index">06</span>
              Próximo passo
            </p>
            <h2 id="contact-title" className="rn-story-heading">
              Seu próximo produto começa com <span>uma conversa clara.</span>
            </h2>
            <p className={`rn-story-copy ${styles.closingCopy}`}>
              Conte o contexto, o objetivo e o momento do seu projeto. A RN organiza o
              caminho e mostra qual é o próximo passo mais inteligente.
            </p>
          </motion.div>

          <motion.aside
            className={`rn-story-ticket ${styles.ticket}`}
            aria-label="Iniciar um projeto com a RN Design"
            initial={{ y: 28, scale: 0.985 }}
            whileInView={{ y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.72, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.ticketTop}>
              <Image
                src={rnLogo}
                alt="RN Design & Serviços"
                className={styles.ticketLogo}
              />
              <span className={styles.availability}><i aria-hidden="true" /> Atendimento direto</span>
            </div>
            <div className={styles.ticketBody}>
              <span>Conversa inicial</span>
              <strong>Vamos entender o que precisa ser construído.</strong>
              <p>Sem formulário longo. Você fala diretamente com quem conduz o projeto.</p>
              <dl className={styles.ticketFacts}>
                <div><dt>Canal</dt><dd>WhatsApp</dd></div>
                <div><dt>Condução</dt><dd>Direta</dd></div>
                <div><dt>Formato</dt><dd>Remoto</dd></div>
              </dl>
            </div>
            <a className="rn-premium-button" href={PROJECT_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Conversar pelo WhatsApp
              <Arrow />
              <span className="rn-visually-hidden"> (abre em nova aba)</span>
            </a>
          </motion.aside>
        </div>

        <nav className={styles.socialNav} aria-label="Canais da RN Design">
          {SOCIAL_LINKS.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel={item.label === 'WhatsApp' ? 'noopener noreferrer' : 'me noopener noreferrer'}
              aria-label={`${item.label} da RN Design (abre em nova aba)`}
              initial={{ y: 14 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item.label}</strong>
              <Arrow />
            </motion.a>
          ))}
        </nav>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} {COMPANY_LEGAL_NAME}</p>
          <div>
            <a href="/politica-de-privacidade">Política de Privacidade</a>
            <a href="/termos-de-uso">Termos de Uso</a>
          </div>
          <a href="#home">Voltar ao início <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
