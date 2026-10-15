"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Welcome.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Welcome() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================================
         ENTRANCE ANIMATION
         ========================================= */

      // const tl = gsap.timeline({
      //   defaults: {
      //     ease: "power3.out",
      //   },
      // });
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

      tl.from(".welcomeLabel", {
        opacity: 0,
        y: 20,
        duration: 0.55,
      })
        .from(
          ".welcomeTitle",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.25"
        )
        .from(
          ".welcomePanel",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=0.35"
        )
        .from(
          ".welcomeFood",
          {
            opacity: 0,
            x: -45,
            rotation: -3,
            duration: 0.8,
            ease: "back.out(1.15)",
          },
          "-=0.45"
        )
        .from(
          ".welcomeDrink",
          {
            opacity: 0,
            y: 25,
            rotation: 3,
            duration: 0.6,
            ease: "back.out(1.15)",
          },
          "-=0.55"
        )
        .from(
          ".welcomeBox",
          {
            opacity: 0,
            x: 40,
            rotation: 3,
            duration: 0.7,
            ease: "back.out(1.15)",
          },
          "-=0.5"
        )
        .from(
          ".welcomeText",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.4"
        )
        .from(
          ".welcomeButton",
          {
            opacity: 0,
            y: 12,
            duration: 0.45,
          },
          "-=0.25"
        );

      /* =========================================
         SUBTLE FLOATING
         ========================================= */

      gsap.to(".welcomeFood", {
        y: -6,
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".welcomeDrink", {
        y: -4,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.3,
      });

      gsap.to(".welcomeBox", {
        y: -5,
        duration: 3.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.6,
      });

      /* =========================================
         MOUSE PARALLAX
         ========================================= */

      const section = sectionRef.current;

      if (!section) return;

      const food = section.querySelector(".welcomeFood");
      const drink = section.querySelector(".welcomeDrink");
      const box = section.querySelector(".welcomeBox");

      const handleMouseMove = (event) => {
        const rect = section.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(food, {
          x: x * 7,
          rotation: x * 1.1,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(drink, {
          x: x * -4,
          rotation: x * -1.3,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(box, {
          x: x * 6,
          rotation: x * 1.1,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(food, {
          x: 0,
          rotation: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.to(drink, {
          x: 0,
          rotation: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.to(box, {
          x: 0,
          rotation: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      };

      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.welcome} id="about">
      <div className="rm-container">
        <div className={styles.welcomeInner}>
          {/* =========================================
              HEADING
              ========================================= */}

          <div className={styles.headingArea}>
            <p className={`${styles.label} welcomeLabel`}>WELCOME</p>

            <h2 className={`${styles.title} welcomeTitle`}>
              <span>WE WRAP THE BEST ROLLS</span>
              <span>IN THE COUNTRY</span>
            </h2>
          </div>

          {/* =========================================
              LEFT FOOD IMAGE
              ========================================= */}

          <div className={`${styles.foodImage} welcomeFood`}>
            <Image
              src="/assets/rolls-mania/welcome/welcome-food.png"
              alt="Rolls Mania rolls and fries"
              width={600}
              height={600}
              className={styles.image}
            />
          </div>

          {/* =========================================
              CENTER DRINK
              ========================================= */}

          <div className={`${styles.drinkImage} welcomeDrink`}>
            <Image
              src="/assets/rolls-mania/welcome/beverage-plain.png"
              alt="Rolls Mania beverage"
              width={180}
              height={180}
              className={styles.image}
            />
          </div>

          {/* =========================================
              RIGHT MEAL BOX
              ========================================= */}

          <div className={`${styles.boxImage} welcomeBox`}>
            <Image
              src="/assets/rolls-mania/welcome/meal-box.png"
              alt="Rolls Mania meal box"
              width={250}
              height={250}
              className={styles.image}
            />
          </div>

          {/* =========================================
              PINK CONTENT PANEL
              ========================================= */}

          <div className={`${styles.panel} welcomePanel`}>
            <div className={`${styles.textWrapper} welcomeText`}>
              <p>
                Rolls Mania being a QSR in India, Serving Rolls since 2009,
                customers find it easy to Dine IN. Delivering a heavy meal with
                great quality at an affordable price. Meals that will curb your
                hunger! With a Healthy and Pocket-friendly array of Veg and Non
                Veg on-the-go rolls, people prefer Rolls Mania as &quot;A Grab
                and GO&quot;
              </p>
            </div>

            <Link href="/AboutUs" className={`${styles.button} welcomeButton`}>
              <span>MORE ABOUT US</span>
              <span className={styles.arrow}>›</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
