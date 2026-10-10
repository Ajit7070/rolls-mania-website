"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import styles from "./Footer.module.css";

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".footerLogo", {
        opacity: 0,
        x: -30,
        duration: 0.7,
      })
        .from(
          ".footerCta",
          {
            opacity: 0,
            y: 25,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".footerOrder",
          {
            opacity: 0,
            x: 30,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".footerNavItem",
          {
            opacity: 0,
            y: 15,
            duration: 0.4,
            stagger: 0.06,
          },
          "-=0.3"
        )
        .from(
          ".footerBottom",
          {
            opacity: 0,
            y: 10,
            duration: 0.4,
          },
          "-=0.2"
        );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const navigation = [
    "Home",
    "About Us",
    "Menu",
    "Open Your RM",
    "Blogs",
    "FAQ",
    "Contact",
    "Careers",
    "Testimonials",
  ];

  return (
    <footer ref={footerRef} className={styles.footer}>
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className={styles.background} aria-hidden="true">
        <Image
          src="/assets/rolls-mania/footer/footer-bg4.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.backgroundImage}
        />
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="rm-container">
        <div className={styles.inner}>
          {/* =================================================
              TOP CONTENT
              ================================================= */}

          <div className={styles.topContent}>
            {/* LOGO */}

            <div className={`${styles.logoWrapper} footerLogo`}>
              <Image
                src="/assets/rolls-mania/footer/rollsmania-footer-logo.png"
                alt="Rolls Mania"
                width={310}
                height={203}
                className={styles.logo}
              />
            </div>

            {/* CENTER CTA */}

            <div className={`${styles.cta} footerCta`}>
              <p className={styles.ctaSmall}>FEELING HUNGRY!</p>

              <h2 className={styles.ctaTitle}>
                <span>ORDER YOUR</span>
                <span>FAVORITE ROLL NOW!</span>
              </h2>
            </div>

            {/* ORDER BUTTON */}

            <div className={`${styles.orderWrapper} footerOrder`}>
              <a href="#menu" className={styles.orderButton}>
                <span>ORDER NOW</span>

                <span className={styles.buttonArrow}>
                  <span></span>
                </span>
              </a>
            </div>
          </div>

          {/* =================================================
              NAVIGATION
              ================================================= */}

          <nav className={styles.navigation} aria-label="Footer navigation">
            {navigation.map((item) => (
              <a
                key={item}
                href={
                  item === "Home"
                    ? "#home"
                    : `#${item
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace("about-us", "about")
                        .replace("open-your-rm", "open-your-rm")}`
                }
                className={`${styles.navItem} footerNavItem`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* =================================================
              DIVIDER
              ================================================= */}

          <div className={styles.divider}></div>

          {/* =================================================
              BOTTOM LINKS
              ================================================= */}

          <div className={`${styles.bottomLinks} footerBottom`}>
            <a href="#terms">Terms and Conditions</a>

            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
