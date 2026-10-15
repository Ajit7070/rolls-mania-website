"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./Footer.module.css";
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
          once: true,
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
    { label: "Home", href: "/" },
    { label: "About Us", href: "/AboutUs" },
    { label: "Menu", href: "/MenuPage" },
    { label: "Open Your RM", href: "/OpenYourRM" },
    { label: "Blogs", href: "#Blogs" },
    { label: "FAQ", href: "/Faq" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "#Careers" },
    { label: "Testimonials", href: "#Testimonials" },
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
              <a href="MenuPage" className={styles.orderButton}>
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
                key={item.label}
                href={item.href}
                className={`${styles.navItem} footerNavItem`}
              >
                {item.label}
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
            <a
              href="/assets/rolls-mania/store_locator/documents/Term-and-condition.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms and Conditions
            </a>

            <a
              href="/assets/rolls-mania/store_locator/documents/Privacy-Policy.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
