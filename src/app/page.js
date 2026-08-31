"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import styles from "./page.module.scss";
import Preloader from "../components/Preloader";
import Landing from "../components/Landing";
import About from "../components/About";
import Services from "../components/Services";
import GlobeSection from "../components/GlobeSection";
import Process from "../components/Process";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import PremiumExperience from "../components/PremiumExperience";
import ChapterBridge from "../components/ChapterBridge";

function StoryChapter({
  children,
  id,
  chapter = id,
  minHeight = "100svh",
  bridge = true,
}) {
  return (
    <div
      id={id}
      className={styles.deferredSection}
      style={{ "--deferred-min-height": minHeight }}
    >
      {children}
      {bridge && <ChapterBridge chapter={chapter} />}
    </div>
  );
}

function restoreChromeState(entries) {
  entries.forEach(({ element, inert, ariaHidden }) => {
    element.inert = inert;

    if (ariaHidden === null) {
      element.removeAttribute("aria-hidden");
    } else {
      element.setAttribute("aria-hidden", ariaHidden);
    }
  });
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [isHeroAssetReady, setIsHeroAssetReady] = useState(false);
  const [hasMinimumLoadTimeElapsed, setHasMinimumLoadTimeElapsed] =
    useState(false);
  const bodyStateRef = useRef({ cursor: "", overflow: "" });
  const chromeStateRef = useRef([]);
  const maximumLoadTimerRef = useRef();
  const hasCompletedIntroRef = useRef(false);
  const initialHashRef = useRef("");
  const markHeroAssetReady = useCallback(() => setIsHeroAssetReady(true), []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData = Boolean(navigator.connection?.saveData);
    const hasSeenIntro =
      window.sessionStorage.getItem("rn-intro-seen") === "true";
    initialHashRef.current = window.location.hash;

    if (hasSeenIntro) {
      hasCompletedIntroRef.current = true;
      setHasMinimumLoadTimeElapsed(true);
      setIsLoading(false);
      setIsHeroReady(true);
      return undefined;
    }

    window.sessionStorage.setItem("rn-intro-seen", "true");

    const previousOverflow = document.body.style.overflow;
    const previousCursor = document.body.style.cursor;

    bodyStateRef.current = {
      cursor: previousCursor,
      overflow: previousOverflow,
    };
    document.body.style.overflow = "hidden";
    document.body.style.cursor = "wait";

    const chromeElements = Array.from(
      document.querySelectorAll(".rn-skip-link, header"),
    );
    chromeStateRef.current = chromeElements.map((element) => ({
      element,
      inert: element.inert,
      ariaHidden: element.getAttribute("aria-hidden"),
    }));
    chromeElements.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });

    const minimumTimer = window.setTimeout(
      () => setHasMinimumLoadTimeElapsed(true),
      reducedMotion || saveData ? 180 : 1500,
    );
    maximumLoadTimerRef.current = window.setTimeout(
      () => {
        maximumLoadTimerRef.current = undefined;
        setIsLoading(false);
      },
      reducedMotion || saveData ? 520 : 2800,
    );

    return () => {
      window.clearTimeout(minimumTimer);
      if (maximumLoadTimerRef.current) {
        window.clearTimeout(maximumLoadTimerRef.current);
      }
      document.body.style.overflow = previousOverflow;
      document.body.style.cursor = previousCursor;
      restoreChromeState(chromeStateRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isLoading || !hasMinimumLoadTimeElapsed || !isHeroAssetReady) return;

    if (maximumLoadTimerRef.current) {
      window.clearTimeout(maximumLoadTimerRef.current);
      maximumLoadTimerRef.current = undefined;
    }
    setIsLoading(false);
  }, [hasMinimumLoadTimeElapsed, isHeroAssetReady, isLoading]);

  const completeIntro = () => {
    if (hasCompletedIntroRef.current) return;

    hasCompletedIntroRef.current = true;
    window.sessionStorage.setItem("rn-intro-seen", "true");
    setIsHeroReady(true);
    document.body.style.overflow = bodyStateRef.current.overflow;
    document.body.style.cursor = bodyStateRef.current.cursor || "default";
    restoreChromeState(chromeStateRef.current);
    const target = initialHashRef.current
      ? document.querySelector(initialHashRef.current)
      : null;
    if (target) {
      window.requestAnimationFrame(() =>
        target.scrollIntoView({ block: "start" }),
      );
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <main
        id="main-content"
        className={`rn-story-page ${styles.main}`}
        aria-busy={!isHeroReady ? "true" : undefined}
      >
        <AnimatePresence mode="wait" onExitComplete={completeIntro}>
          {isLoading && <Preloader />}
        </AnimatePresence>

        <div
          className={styles.siteContent}
          inert={!isHeroReady ? "" : undefined}
          aria-hidden={!isHeroReady ? "true" : undefined}
        >
          <PremiumExperience />
          <div id="home">
            <Landing
              isReady={isHeroReady}
              onHeroAssetReady={markHeroAssetReady}
            />
          </div>

          <StoryChapter id="about" minHeight="100svh">
            <About />
          </StoryChapter>
          <StoryChapter id="services" minHeight="100svh">
            <Services />
          </StoryChapter>
          <StoryChapter id="scale" minHeight="80svh">
            <GlobeSection />
          </StoryChapter>
          <StoryChapter chapter="process" minHeight="100svh">
            <Process />
          </StoryChapter>
          <StoryChapter id="work" minHeight="100svh">
            <Projects />
          </StoryChapter>
          <StoryChapter id="contact" minHeight="100svh" bridge={false}>
            <Contact />
          </StoryChapter>
        </div>
      </main>
    </MotionConfig>
  );
}
