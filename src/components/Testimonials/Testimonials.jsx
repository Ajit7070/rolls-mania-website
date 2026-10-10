"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const sectionRef = useRef(null);

  const youtubeUrl = "https://www.youtube.com/watch?v=BumL45FNj4M";

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

      /* =========================================================
       SUBTLE TESTIMONIAL IMAGE FLOAT
       ========================================================= */

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

  return (
    <section ref={sectionRef} className={styles.testimonials} id="testimonials">
      <div className="rm-container">
        <div className={styles.inner}>
          <div className={styles.grid}>
            {testimonials.map((testimonial, index) => (
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
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.playButton} testimonialPlay`}
                    aria-label={`Watch ${testimonial.name} testimonial video`}
                  >
                    <span className={styles.playOuter}>
                      <span className={styles.playInner}>
                        <span className={styles.playTriangle}></span>
                      </span>
                    </span>
                  </a>
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

                    const isFilled = starIndex < Math.floor(testimonial.rating);

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
  );
}
