"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./Menu.module.css";
gsap.registerPlugin(ScrollTrigger);
const menuItems = [
  {
    title: "Roll",
    image: "/assets/rolls-mania/menu/roll.png",
    alt: "Rolls Mania Roll",
  },
  {
    title: "Sides",
    image: "/assets/rolls-mania/menu/sides.png",
    alt: "Rolls Mania Sides",
  },
  {
    title: "Fries Menia",
    image: "/assets/rolls-mania/menu/fries-mania.png",
    alt: "Rolls Mania Fries Menia",
  },
  {
    title: "Meal Box",
    image: "/assets/rolls-mania/menu/meal-box.png",
    alt: "Rolls Mania Meal Box",
  },
  {
    title: "Bevies",
    image: "/assets/rolls-mania/menu/bevs.png",
    alt: "Rolls Mania Beverages",
  },
  {
    title: "Combos",
    image: "/assets/rolls-mania/menu/combos.png",
    alt: "Rolls Mania Combos",
  },
];

export default function Menu() {
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

      tl.from(".menuLabel", {
        opacity: 0,
        y: 18,
        duration: 0.5,
      })
        .from(
          ".menuTitle",
          {
            opacity: 0,
            y: 25,
            duration: 0.65,
          },
          "-=0.25"
        )
        .from(
          ".menuCard",
          {
            opacity: 0,
            y: 35,
            scale: 0.94,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(1.15)",
          },
          "-=0.3"
        );

      /* =========================================
         SUBTLE FLOATING
         ========================================= */

      gsap.utils.toArray(".menuCardImage").forEach((image, index) => {
        gsap.to(image, {
          y: index % 2 === 0 ? -4 : -5,
          duration: 2.8 + index * 0.12,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.12,
        });
      });

      /* =========================================
         HOVER EFFECT
         ========================================= */

      const cards = gsap.utils.toArray(".menuCard");

      cards.forEach((card) => {
        const image = card.querySelector(".menuCardImage");
        const title = card.querySelector(".menuCardTitle");

        const handleEnter = () => {
          gsap.to(image, {
            scale: 1.07,
            rotation: -1.5,
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
          });

          gsap.to(title, {
            y: -3,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const handleLeave = () => {
          gsap.to(image, {
            scale: 1,
            rotation: 0,
            duration: 0.55,
            ease: "power3.out",
            overwrite: "auto",
          });

          gsap.to(title, {
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        card.addEventListener("mouseenter", handleEnter);
        card.addEventListener("mouseleave", handleLeave);

        card._menuEnter = handleEnter;
        card._menuLeave = handleLeave;
      });

      /* =========================================
         MOUSE PARALLAX
         ========================================= */

      const section = sectionRef.current;

      if (!section) return;

      const handleMouseMove = (event) => {
        const rect = section.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        cards.forEach((card, index) => {
          const image = card.querySelector(".menuCardImage");

          const intensity = 4 + (index % 3);

          gsap.to(image, {
            x: x * intensity,
            y: y * intensity * 0.65,
            duration: 0.7,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      const handleMouseLeave = () => {
        cards.forEach((card) => {
          const image = card.querySelector(".menuCardImage");

          gsap.to(image, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      };

      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        cards.forEach((card) => {
          card.removeEventListener("mouseenter", card._menuEnter);
          card.removeEventListener("mouseleave", card._menuLeave);
        });

        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.menu} id="menu">
      <div className="rm-container">
        <div className={styles.menuInner}>
          {/* =========================================
              SECTION HEADING
              ========================================= */}

          <div className={styles.heading}>
            <p className={`${styles.label} menuLabel`}>MENU</p>

            <h2 className={`${styles.title} menuTitle`}>ORDER NOW !</h2>
          </div>

          {/* =========================================
              MENU GRID
              ========================================= */}

          <div className={styles.grid}>
            {menuItems.map((item) => (
              <Link
                href="#menu"
                className={`${styles.card} menuCard`}
                key={item.title}
                aria-label={`Order ${item.title}`}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={360}
                    height={360}
                    className={`${styles.cardImage} menuCardImage`}
                  />
                </div>

                <p className={`${styles.cardTitle} menuCardTitle`}>
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
