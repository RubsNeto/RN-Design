'use client';
import styles from './page.module.scss'
import { useEffect, useState, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import GlobeSection from '../components/GlobeSection';
import SkewCards from '../components/SkewCards';

// Lazy load heavy components
const Landing = lazy(() => import('../components/Landing'));
const About = lazy(() => import('../components/About'));
const Services = lazy(() => import('../components/Services'));
const Process = lazy(() => import('../components/Process'));
const Projects = lazy(() => import('../components/Projects'));
const SlidingImages = lazy(() => import('../components/SlidingImages'));
const Contact = lazy(() => import('../components/Contact'));

// Simple loading fallback
const SectionLoader = () => (
  <div style={{ minHeight: '50vh', background: '#0a0a0a' }} />
);

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let lenis;
    let rafId;
    (
      async () => {
        const Lenis = (await import('lenis')).default
        lenis = new Lenis({
          duration: 1.2,
          smoothWheel: true,
          wheelMultiplier: 0.8,
        });

        const raf = (time) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default'
          window.scrollTo(0, 0);
        }, 1200)
      }
    )()

    return () => {
      if (lenis) {
        lenis.destroy();
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    }
  }, [])

  return (
    <main className={styles.main}>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Suspense fallback={<SectionLoader />}>
        <div id="home">
          <Landing />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="services">
          <Services />
        </div>
        <SkewCards />
        <GlobeSection />
        <Process />
        <div id="work">
          <Projects />
        </div>
        <SlidingImages />
        <div id="contact">
          <Contact />
        </div>
      </Suspense>
    </main>
  )
}
