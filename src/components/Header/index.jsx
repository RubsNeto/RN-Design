'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import rnLogo from '@rn-design/system/logo.png';
import styles from './style.module.scss';

const navigation = [
  { label: 'Sobre nós', href: '/#about' },
  { label: 'O que fazemos', href: '/#services' },
  { label: 'Projetos', href: '/#work' },
  { label: 'Contato', href: '/#contact' },
];

const whatsappLink =
  'https://wa.me/5562999299020?text=Ol%C3%A1%21%20Vim%20do%20site%20e%20quero%20conversar%20sobre%20um%20projeto.';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeWithEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', closeWithEscape);
    return () => window.removeEventListener('keydown', closeWithEscape);
  }, [isOpen]);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      progressRef.current?.style.setProperty('--rn-page-progress', progress.toFixed(4));
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <a className="rn-skip-link" href="#main-content">
        Pular para o conteúdo
      </a>

      <div ref={progressRef} className={styles.progress} aria-hidden="true">
        <span />
      </div>

      <header className={styles.header}>
        <a className={styles.brand} href="/#home" aria-label="RN Design — início">
          <Image
            src={rnLogo}
            alt="RN Design & Serviços"
            className="rn-brand-logo rn-brand-logo--nav"
            priority
          />
          <span>Design by RN</span>
        </a>

        <span className={styles.line} aria-hidden="true" />

        <nav
          id="site-navigation"
          className={styles.navigation}
          data-open={isOpen ? 'true' : 'false'}
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
              <span aria-hidden="true" />
            </a>
          ))}
          <a
            className={styles.mobileContact}
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Entre em contato
          </a>
        </nav>

        <a
          className={styles.contact}
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Entre em contato
        </a>

        <button
          ref={triggerRef}
          className={styles.menuButton}
          type="button"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-controls="site-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </header>
    </>
  );
}
