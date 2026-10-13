"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./Testimonials.module.css";
gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const youtubeEmbedUrl =
    "https://www.youtube-nocookie.com/embed/BumL45FNj4M?autoplay=1&rel=0";

  const testimonials = [
    {
      name: "DIVYA SAWANT",
      image: "/assets/rolls-mania/testimonials/divya-sawant.png",
      rating: 5,
    },
    {
      name: "DIPESH BHOSLE",
      image: "/assets/rolls-mania/testimonials/dipesh-bhosle.png",
      rating: 4,
    },
    {
      name: "VIKAS KORI",
      image: "/assets/rolls-mania/testimonials/vikas-kori.png",
      rating: 4.5,
    },
  ];

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

      tl.from(".testimonialCard", {
        opacity: 0,
        y: 45,
        duration: 0.7,
        stagger: 0.15,
      }).from(
        ".testimonialPlay",
        {
          opacity: 0,
          scale: 0.65,
          duration: 0.6,
          ease: "back.out(1.5)",
          stagger: 0.12,
        },
        "-=0.4"
      );

      gsap.to(`.${styles.testimonialImage}`, {
        y: -7,
        rotation: 0.5,
        scale: 1.015,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.35,
          from: "start",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Close popup with Escape and prevent background scrolling.
  useEffect(() => {
    if (!isVideoOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen]);

  return (
    <>
      <section
        ref={sectionRef}
        className={styles.testimonials}
        id="testimonials"
      >
        <div className="rm-container">
          <div className={styles.inner}>
            <div className={styles.grid}>
              {testimonials.map((testimonial) => (
                <div
                  className={`${styles.card} testimonialCard`}
                  key={testimonial.name}
                >
                  {/* IMAGE */}
                  <div className={styles.imageWrapper}>
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.name} Rolls Mania testimonial`}
                      width={1280}
                      height={1280}
                      className={styles.testimonialImage}
                    />

                    {/* PLAY BUTTON */}
                    <button
                      type="button"
                      className={`${styles.playButton} testimonialPlay`}
                      aria-label={`Watch ${testimonial.name} testimonial video`}
                      onClick={() => setIsVideoOpen(true)}
                    >
                      <span className={styles.playOuter}>
                        <span className={styles.playInner}>
                          <span className={styles.playTriangle}></span>
                        </span>
                      </span>
                    </button>
                  </div>

                  {/* NAME */}
                  <h3 className={styles.name}>{testimonial.name}</h3>

                  {/* STARS */}
                  <div
                    className={styles.stars}
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, starIndex) => {
                      const isHalf =
                        testimonial.rating % 1 !== 0 &&
                        starIndex === Math.floor(testimonial.rating);

                      const isFilled =
                        starIndex < Math.floor(testimonial.rating);

                      return (
                        <span
                          key={starIndex}
                          className={`${styles.star} ${
                            isFilled ? styles.filled : ""
                          } ${isHalf ? styles.half : ""}`}
                        >
                          ★
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO POPUP */}
      {isVideoOpen && (
        <div
          className={styles.videoModal}
          role="dialog"
          aria-modal="true"
          aria-label="Rolls Mania testimonial video"
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
              src={youtubeEmbedUrl}
              title="Rolls Mania testimonial video"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
