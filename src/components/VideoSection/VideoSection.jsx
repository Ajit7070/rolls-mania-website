"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import styles from "./VideoSection.module.css";

export default function VideoSection() {
  const sectionRef = useRef(null);

  const youtubeUrl = "https://www.youtube.com/watch?v=BumL45FNj4M";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".videoContent", {
        opacity: 0,
        y: 25,
        duration: 0.6,
      })
        .from(
          ".videoLabel",
          {
            opacity: 0,
            x: -25,
            duration: 0.45,
          },
          "-=0.3"
        )
        .from(
          ".videoTitleLine",
          {
            opacity: 0,
            x: -35,
            duration: 0.55,
            stagger: 0.08,
          },
          "-=0.25"
        )
        .from(
          ".videoPlayButton",
          {
            opacity: 0,
            scale: 0.65,
            duration: 0.7,
            ease: "back.out(1.5)",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.videoSection} id="intro-video">
      {/* =====================================================
          VECTOR BACKGROUND
          ===================================================== */}

      <div className={styles.background}>
        <Image
          src="/assets/rolls-mania/video/video-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.backgroundImage}
        />
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="rm-container">
        <div className={styles.inner}>
          <div className={`${styles.content} videoContent`}>
            <p className={`${styles.label} videoLabel`}>INTRO VIDEO</p>

            <h2 className={styles.title}>
              <span className="videoTitleLine">FRESH TASTE AT A</span>

              <span className="videoTitleLine">GREAT PRICE, ONLY FOR</span>

              <span className="videoTitleLine">DELICIOUS FOOD LOVER.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* =====================================================
          PLAY BUTTON
          OPENS YOUTUBE IN NEW TAB
          ===================================================== */}

      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.playButton} videoPlayButton`}
        aria-label="Watch Rolls Mania intro video on YouTube"
      >
        <span className={styles.playOuter}>
          <span className={styles.playInner}>
            <span className={styles.playTriangle}></span>
          </span>
        </span>
      </a>
    </section>
  );
}
