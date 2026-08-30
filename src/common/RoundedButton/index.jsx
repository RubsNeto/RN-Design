import React from 'react'
import { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import Magnetic from '../Magnetic';

export default function Index({ children, backgroundColor = "linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)", ...attributes }) {

  const circle = useRef(null);
  const timeline = useRef(null);
  const timeoutId = useRef(null);
  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true })
    timeline.current
      .to(circle.current, { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" }, "enter")
      .to(circle.current, { top: "-150%", width: "125%", duration: 0.25 }, "exit")

    return () => {
      clearTimeout(timeoutId.current)
      timeline.current?.kill()
    }
  }, [])

  const manageMouseEnter = () => {
    clearTimeout(timeoutId.current)
    timeline.current?.tweenFromTo('enter', 'exit');
  }

  const manageMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      timeline.current?.play();
    }, 300)
  }

  return (
    <Magnetic>
      <div className={styles.roundedButton} style={{ overflow: "hidden" }} onMouseEnter={() => { manageMouseEnter() }} onMouseLeave={() => { manageMouseLeave() }} {...attributes}>
        {
          children
        }
        <div ref={circle} style={{ backgroundColor }} className={styles.circle}></div>
      </div>
    </Magnetic>
  )
}
