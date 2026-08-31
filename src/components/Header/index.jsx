"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import rnLogo from "@rn-design/system/logo.png";
import styles from "./style.module.scss";
import { PROJECT_WHATSAPP_LINK } from "../../config/site";

const navigation = [
  { label: "Sobre nós", href: "/#about", section: "about" },
  { label: "O que fazemos", href: "/#services", section: "services" },
  { label: "Processo", href: "/#process", section: "process" },
  { label: "Projetos", href: "/#work", section: "work" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [brandSignal, setBrandSignal] = useState(false);
  const headerRef = useRef(null);
  const triggerRef = useRef(null);
  const firstLinkRef = useRef(null);
  const progressRef = useRef(null);
  const brandTimerRef = useRef();

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => () => window.clearTimeout(brandTimerRef.current), []);

  useEffect(() => {
    if (pathname !== "/") return undefined;

    const sections = ["home", ...navigation.map(({ section }) => section)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.34;
      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= readingLine && rect.bottom > readingLine;
      });
      if (current?.id) setActiveSection(current.id);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    updateActiveSection();
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => firstLinkRef.current?.focus());

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        headerRef.current?.querySelectorAll(
          "a[href], button:not([disabled])",
        ) || [],
      ).filter((element) => element.offsetParent !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const handleOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleOutside);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 48.0625rem)");
    const closeOnDesktop = (event) => {
      if (event.matches) setIsOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      progressRef.current?.style.setProperty(
        "--rn-page-progress",
        progress.toFixed(4),
      );
      setIsScrolled(window.scrollY > 18);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);
  const signalBrand = () => {
    setBrandSignal(true);
    window.clearTimeout(brandTimerRef.current);
    brandTimerRef.current = window.setTimeout(() => setBrandSignal(false), 760);
  };

  return (
    <>
      <a className="rn-skip-link" href="#main-content">
        Pular para o conteúdo
      </a>

      <div ref={progressRef} className={styles.progress} aria-hidden="true">
        <span />
      </div>

      <header
        ref={headerRef}
        className={styles.header}
        data-scrolled={isScrolled ? "true" : "false"}
        data-menu-open={isOpen ? "true" : "false"}
        data-brand-signal={brandSignal ? "true" : "false"}
      >
        <a
          className={styles.brand}
          href="/#home"
          aria-label="RN Design — início"
          onClick={signalBrand}
        >
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
          data-open={isOpen ? "true" : "false"}
          aria-label="Navegação principal"
        >
          {navigation.map((item, index) => (
            <a
              key={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={item.href}
              aria-current={
                pathname === "/" && activeSection === item.section
                  ? "location"
                  : undefined
              }
              onClick={closeMenu}
            >
              <span className={styles.menuIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
              <span className={styles.activeDot} aria-hidden="true" />
            </a>
          ))}
          <a
            className={styles.mobileContact}
            href={PROJECT_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Entre em contato
            <span className="rn-visually-hidden"> (abre em nova aba)</span>
          </a>
        </nav>

        <a
          className={styles.contact}
          href={PROJECT_WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          Entre em contato
          <span className="rn-visually-hidden"> (abre em nova aba)</span>
        </a>

        <button
          ref={triggerRef}
          className={styles.menuButton}
          type="button"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
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
