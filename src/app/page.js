'use client';
import styles from './page.module.scss'
import { useEffect, useState, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import { HandWrittenTitle } from '../components/ui/HandWrittenTitle';
import GlobeSection from '../components/GlobeSection';
import SkewCards from '../components/SkewCards';

// Lazy load heavy components
const Landing = lazy(() => import('../components/Landing'));
const About = lazy(() => import('../components/About'));
const Services = lazy(() => import('../components/Services'));
const Process = lazy(() => import('../components/Process'));
const Projects = lazy(() => import('../components/Projects'));
const Description = lazy(() => import('../components/Description'));
const SlidingImages = lazy(() => import('../components/SlidingImages'));
const Contact = lazy(() => import('../components/Contact'));

// Simple loading fallback
const SectionLoader = () => (
  <div style={{ minHeight: '50vh', background: '#0a0a0a' }} />
);

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let locomotiveScroll;
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default
        locomotiveScroll = new LocomotiveScroll({
          lenisOptions: {
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 0.8,
          }
        });

        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default'
          window.scrollTo(0, 0);
        }, 1200)
      }
    )()

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
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
        <Description />
        <SlidingImages />
        <section style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f1419 50%, #0a0a0a 100%)' }}>
          <HandWrittenTitle prefix="Vamos criar algo" highlight="excepcional" subtitle="Disponível para novos projetos" />
        </section>
        <div id="contact">
          <Contact />
        </div>
      </Suspense>
    </main>
  )
}
