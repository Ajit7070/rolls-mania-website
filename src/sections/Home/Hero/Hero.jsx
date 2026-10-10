"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";

import {
  FiArrowRight,
  FiMapPin,
  FiTruck,
  FiShoppingBag,
  FiCoffee,
} from "react-icons/fi";

import styles from "./Hero.module.css";

const highlights = [
  {
    icon: FiTruck,
    title: "Fast Delivery",
    text: "Promise to deliver within 30 mins",
  },
  {
    icon: FiShoppingBag,
    title: "Pick Up",
    text: "Pick up delivery at your doorstep",
  },
  {
    icon: FiCoffee,
    title: "Dine In",
    text: "Enjoy your food fresh, crispy and hot",
  },
];

export default function Hero() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      /* =================================
       HERO ENTRANCE
       ================================= */

      tl.from(".heroEyebrow", {
        opacity: 0,
        y: 25,
        duration: 0.65,
      })

        .from(
          ".heroTitleLine",
          {
            opacity: 0,
            y: 35,
            duration: 0.65,
            stagger: 0.1,
          },
          "-=0.3"
        )

        .from(
          ".heroActions",
          {
            opacity: 0,
            y: 20,
            duration: 0.55,
          },
          "-=0.3"
        )

        .from(
          ".heroVisualImage",
          {
            opacity: 0,
            y: 80,
            scale: 0.92,
            duration: 1.1,
            ease: "back.out(1.25)",
          },
          "-=0.45"
        )

        .from(
          ".heroService",
          {
            opacity: 0,
            x: 30,
            duration: 0.55,
            stagger: 0.13,
          },
          "-=0.65"
        );

      /* =================================
       SUBTLE FLOATING
       ================================= */

      gsap.to(".heroVisualImage", {
        y: "-=6",

        duration: 3,

        ease: "sine.inOut",

        repeat: -1,

        yoyo: true,

        delay: 1.2,
      });

      /* =================================
       MOUSE PARALLAX
       ================================= */

      const image = document.querySelector(".heroVisualImage");
      const visual = document.querySelector(`.${styles.visual}`);

      if (!image || !visual) return;

      const handleMouseMove = (event) => {
        const rect = visual.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;

        const y = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(image, {
          x: x * 14,

          y: y * 10,

          rotationY: x * 2.5,

          rotationX: y * -2.5,

          duration: 0.6,

          ease: "power2.out",

          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(image, {
          x: 0,

          y: 0,

          rotationX: 0,

          rotationY: 0,

          duration: 0.8,

          ease: "power3.out",
        });
      };

      visual.addEventListener("mousemove", handleMouseMove);

      visual.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        visual.removeEventListener("mousemove", handleMouseMove);

        visual.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} id="home">
      <div className="rm-container">
        <div className={styles.heroInner}>
          {/* =========================================
              LEFT CONTENT
              ========================================= */}

          <div className={styles.content}>
            <p className={`${styles.eyebrow} heroEyebrow`}>
              ROLLIN&apos; GOODNESS
            </p>

            <h1 className={styles.title}>
              <span className="heroTitleLine">GOODNESS</span>
              <span className="heroTitleLine">ROLLED</span>
              <span className="heroTitleLine">WITH LOVE</span>
            </h1>

            <div className={`${styles.actions} heroActions`}>
              <Link href="#menu" className={styles.primaryButton}>
                <span>ORDER NOW</span>
                <FiArrowRight />
              </Link>

              <Link href="#store-locator" className={styles.secondaryButton}>
                <FiMapPin />
                <span>FIND OUTLETS</span>
              </Link>
            </div>
          </div>

          {/* =========================================
              CENTER HERO IMAGE
              ========================================= */}

          <div className={styles.visual} data-hero-visual>
            <Image
              src="/assets/rolls-mania/hero/hero-composition.png"
              alt="Friends enjoying Rolls Mania"
              width={1133}
              height={1388}
              priority
              className={`${styles.heroVisualImage} heroVisualImage`}
            />
          </div>

          {/* =========================================
              RIGHT SERVICE HIGHLIGHTS
              ========================================= */}

          <div className={styles.highlights}>
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className={`${styles.highlight} heroService`}
                  key={item.title}
                >
                  <div className={styles.icon}>
                    <Icon />
                  </div>

                  <div className={styles.highlightContent}>
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
