"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./Ingredients.module.css";
gsap.registerPlugin(ScrollTrigger);

export default function Ingredients() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================================
         ENTRANCE ANIMATION
         ========================================= */

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

      tl.from(".ingredientsIcon", {
        opacity: 0,
        y: -25,
        scale: 0.85,
        duration: 0.65,
        ease: "back.out(1.2)",
      })
        .from(
          ".ingredientsLabel",
          {
            opacity: 0,
            x: -30,
            duration: 0.55,
          },
          "-=0.3"
        )
        .from(
          ".ingredientsTitleLine",
          {
            opacity: 0,
            x: -35,
            duration: 0.65,
            stagger: 0.1,
          },
          "-=0.25"
        )
        .from(
          ".ingredientsFood",
          {
            opacity: 0,
            y: 55,
            scale: 0.9,
            duration: 0.9,
            ease: "back.out(1.15)",
          },
          "-=0.45"
        )
        .from(
          ".ingredientsInfo",
          {
            opacity: 0,
            x: 35,
            duration: 0.65,
          },
          "-=0.55"
        )
        .from(
          ".ingredientsArrow",
          {
            opacity: 0,
            y: -10,
            duration: 0.4,
          },
          "-=0.2"
        );

      /* =========================================
         SUBTLE FOOD FLOAT
         ========================================= */

      gsap.to(".ingredientsFood", {
        y: -7,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      /* =========================================
         ICON FLOAT
         ========================================= */

      gsap.to(".ingredientsIcon", {
        y: -4,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.2,
      });

      /* =========================================
         MOUSE PARALLAX
         ========================================= */

      const section = sectionRef.current;

      if (!section) return;

      const food = section.querySelector(".ingredientsFood");
      const icon = section.querySelector(".ingredientsIcon");

      const handleMouseMove = (event) => {
        const rect = section.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(food, {
          x: x * 14,
          y: y * 7,
          rotation: x * 1.2,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(icon, {
          x: x * -5,
          y: y * -3,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(food, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(icon, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
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
    <section ref={sectionRef} className={styles.ingredients} id="ingredients">
      {/* =========================================
          EXACT BACKGROUND ASSET
          ========================================= */}

      <div className={styles.background} aria-hidden="true">
        <Image
          src="/assets/rolls-mania/ingredients/ingredients-bg.png"
          alt=""
          fill
          priority
          className={styles.backgroundImage}
        />
      </div>

      <div className="rm-container">
        <div className={styles.inner}>
          {/* =========================================
              TOP CENTER BRAND ICON
              ========================================= */}

          <div className={`${styles.brandIcon} ingredientsIcon`}>
            <Image
              src="/assets/rolls-mania/ingredients/rollsmania-icon.png"
              alt="Rolls Mania"
              width={170}
              height={100}
              className={styles.brandIconImage}
            />
          </div>

          {/* =========================================
              LEFT CONTENT
              ========================================= */}

          <div className={styles.leftContent}>
            <p className={`${styles.label} ingredientsLabel`}>INGREDIENTS</p>

            <h2 className={styles.title}>
              <span className="ingredientsTitleLine">PREPARED</span>

              <span className="ingredientsTitleLine">WITH NATURAL</span>

              <span className="ingredientsTitleLine">INGREDIENTS</span>
            </h2>
          </div>

          {/* =========================================
              CENTER FOOD
              ========================================= */}

          <div className={`${styles.food} ingredientsFood`}>
            <Image
              src="/assets/rolls-mania/ingredients/steam-rolls.png"
              alt="Freshly prepared Rolls Mania rolls"
              width={680}
              height={579}
              className={styles.foodImage}
            />
          </div>

          {/* =========================================
              RIGHT INFORMATION
              ========================================= */}

          <div className={`${styles.info} ingredientsInfo`}>
            <h3>Fresh Bread</h3>

            <p>
              Freshly Baked Bread on Tawa giving
              <br className={styles.desktopBreak} />
              a Soft, Crispy and Flaky Base to your
              <br className={styles.desktopBreak} />
              Roll. Making you crave more!
            </p>

            <div className={`${styles.arrow} ingredientsArrow`}>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
