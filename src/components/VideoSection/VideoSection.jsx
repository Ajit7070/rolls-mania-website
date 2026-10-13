"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./VideoSection.module.css";
gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const youtubeEmbedUrl =
    "https://www.youtube-nocookie.com/embed/BumL45FNj4M?autoplay=1&rel=0";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
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

  // Close the popup using the Escape key.
  useEffect(() => {
    if (!isVideoOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling while the popup is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isVideoOpen]);

  return (
    <>
      <section
        ref={sectionRef}
        className={styles.videoSection}
        id="intro-video"
      >
        {/* VECTOR BACKGROUND */}

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

        {/* CONTENT */}

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

        {/* PLAY BUTTON */}

        <button
          type="button"
          className={`${styles.playButton} videoPlayButton`}
          aria-label="Play Rolls Mania intro video"
          onClick={() => setIsVideoOpen(true)}
        >
          <span className={styles.playOuter}>
            <span className={styles.playInner}>
              <span className={styles.playTriangle}></span>
            </span>
          </span>
        </button>
      </section>

      {/* VIDEO POPUP */}

      {isVideoOpen && (
        <div
          className={styles.videoModal}
          role="dialog"
          aria-modal="true"
          aria-label="Rolls Mania intro video"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsVideoOpen(false);
            }
          }}
        >
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close video"
            onClick={() => setIsVideoOpen(false)}
          >
            &times;
          </button>

          <div className={styles.videoModalContent}>
            <iframe
              key="rolls-mania-intro-video"
              src={youtubeEmbedUrl}
              title="Rolls Mania Intro Video"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
