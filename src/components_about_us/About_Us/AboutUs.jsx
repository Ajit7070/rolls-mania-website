"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

import styles from "./AboutUs.module.css";

gsap.registerPlugin(ScrollTrigger);

const ASSETS = "/assets/rolls-mania/aboutus";

const values = [
  {
    title: "QUALITY",
    description:
      "Best-quality products made with care, fresh ingredients and attention to every roll.",
    icon: "quality.png",
    color: "red",
  },
  {
    title: "QUANTITY",
    description:
      "A wholesome, satisfying meal with generous portions and flavours worth coming back for.",
    icon: "quantity.png",
    color: "orange",
  },
  {
    title: "QUICK SERVICE",
    description:
      "Quick to serve, easy to enjoy and made for people who are always on the move.",
    icon: "quick-service.png",
    color: "green",
  },
];

const milestones = [
  {
    year: "2009",
    title: "Where It Started",
    description: "The beginning of our rolling journey.",
  },
  {
    year: "2012",
    title: "Taking Shape",
    description: "Building the foundation for growth.",
  },
  {
    year: "2015",
    title: "New Opportunities",
    description: "Growing our reach and possibilities.",
  },
  {
    year: "2018",
    title: "Growing Together",
    description: "Taking the Rolls Mania experience further.",
  },
  {
    year: "2019",
    title: "More Goodness",
    description: "Continuing to serve our roll-loving community.",
  },
  {
    year: "2021",
    title: "The Journey Continues",
    description: "Moving forward with the same love for rolls.",
  },
];

const team = [
  {
    name: "Mr. Puneet Kansal",
    role: "Director",
    quote:
      "Dream it. Chase it. One day, Success will be history and you will be building empire based on that one dream",
    image: "team4.png",
    number: "01",
  },
  {
    name: "Mr. Sukhpreet Sial",
    role: "Director",
    quote:
      "Sky is not limit;your belief system is. So belive in yorself - dream big to grow big!",
    image: "team5.png",
    number: "02",
  },
  {
    name: "Mr. Gagan Sial",
    role: "Director",
    quote:
      "In the graph called Life success is achieved with the highs and lows",
    image: "team6.png",
    number: "03",
  },
];

export default function AboutUs() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const cursorCleanups = [];

    const ctx = gsap.context(() => {
      // EXISTING SCROLL REVEAL ANIMATIONS — PRESERVED
      const revealElements = root.querySelectorAll("[data-about-reveal]");

      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: 35,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      // EXISTING HERO FOOD ENTRANCE — PRESERVED
      gsap.fromTo(
        root.querySelector(".aboutHeroFood"),
        {
          autoAlpha: 0,
          x: 55,
          scale: 0.94,
        },
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 1.1,
          delay: 0.15,
          ease: "power3.out",
        }
      );

      // EXISTING HERO TEXT ENTRANCE — PRESERVED
      gsap.fromTo(
        root.querySelector(".aboutHeroCopy"),
        {
          autoAlpha: 0,
          x: -35,
        },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // EXISTING JOURNEY TIMELINE ANIMATION — PRESERVED
      gsap.fromTo(
        root.querySelectorAll(".aboutTimelineItem"),
        {
          autoAlpha: 0,
          y: 25,
        },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.querySelector(".aboutTimeline"),
            start: "top 82%",
            once: true,
          },
        }
      );

      /* JOURNEY BACKGROUND — GSAP PARALLAX */
      const journeySection = root.querySelector(`.${styles.journey}`);

      if (journeySection) {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        if (!prefersReducedMotion) {
          gsap.fromTo(
            journeySection,
            {
              backgroundPosition: "center 35%",
            },
            {
              backgroundPosition: "center 65%",
              ease: "none",
              scrollTrigger: {
                trigger: journeySection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }

      // EXISTING FOOD IMAGE SCALE + ROTATION ANIMATIONS — PRESERVED
      const foodImageClasses = [
        styles.heroImage,
        styles.storyImage,
        styles.philosophyImage,
        styles.foodBannerImage,
        styles.visionImage,
        styles.finalCtaImage,
      ];

      const foodImages = foodImageClasses.flatMap((className) =>
        Array.from(root.querySelectorAll(`.${className}`))
      );

      foodImages.forEach((image) => {
        gsap.fromTo(
          image,
          {
            scale: 0.94,
            rotation: -1.5,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: image,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      // NEW CURSOR-FOLLOW ANIMATION FOR FOOD IMAGES
      // Runs on desktop devices with a mouse/trackpad.
      const canHover =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      if (canHover) {
        const foodVisualClasses = [
          "aboutHeroFood",
          styles.storyVisual,
          styles.philosophyVisual,
          styles.foodBannerVisual,
          styles.visionVisual,
          styles.finalCtaVisual,
        ];

        foodVisualClasses.forEach((className) => {
          const visual = root.querySelector(
            className.startsWith("aboutHeroFood")
              ? `.${className}`
              : `.${className}`
          );

          if (!visual) return;

          const image = visual.querySelector("img");
          if (!image) return;

          const moveX = gsap.quickTo(image, "x", {
            duration: 0.55,
            ease: "power3.out",
          });

          const moveY = gsap.quickTo(image, "y", {
            duration: 0.55,
            ease: "power3.out",
          });

          const handleMouseMove = (event) => {
            const rect = visual.getBoundingClientRect();

            if (!rect.width || !rect.height) return;

            const mouseX = (event.clientX - rect.left) / rect.width;
            const mouseY = (event.clientY - rect.top) / rect.height;

            // Subtle movement in the opposite direction of the cursor.
            const offsetX = (mouseX - 0.5) * 36;
            const offsetY = (mouseY - 0.5) * 30;

            moveX(offsetX);
            moveY(offsetY);
          };

          const handleMouseLeave = () => {
            moveX(0);
            moveY(0);
          };

          visual.addEventListener("mousemove", handleMouseMove);
          visual.addEventListener("mouseleave", handleMouseLeave);

          // Remove listeners when the component unmounts.
          cursorCleanups.push(() => {
            visual.removeEventListener("mousemove", handleMouseMove);
            visual.removeEventListener("mouseleave", handleMouseLeave);
          });
        });
      }
    }, root);

    return () => {
      cursorCleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <main ref={pageRef} className={styles.aboutPage}>
      {/* ================================================
          HERO
      ================================================= */}

      <section className={styles.hero} aria-labelledby="about-hero-title">
        <div className={styles.heroTexture} aria-hidden="true" />

        <div className={`rm-container ${styles.heroContainer}`}>
          <div className={styles.heroCopy}>
            <div className={`${styles.heroText} aboutHeroCopy`}>
              <span className={styles.eyebrow}>ROLLIN' GOODNESS</span>

              <h1 id="about-hero-title" className={styles.heroTitle}>
                <span className={styles.heroLineOne}>GOOD FOOD.</span>
                <span className={styles.heroLineTwo}>GOOD MOOD.</span>
                <span className={styles.heroLineThree}>OUR STORY.</span>
              </h1>

              <p className={styles.heroDescription}>
                India&apos;s favourite rolls quick-service restaurant chain,
                serving great food and happy people since 2009.
              </p>

              <Link href="#our-story" className={styles.darkButton}>
                <span>OUR JOURNEY</span>
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className={`${styles.heroVisual} aboutHeroFood`}>
            <Image
              src={`${ASSETS}/about-us-hero-food.png`}
              alt="Rolls Mania rolls, fries and signature food packaging"
              width={1450}
              height={1050}
              priority
              sizes="(max-width: 767px) 95vw, (max-width: 1199px) 52vw, 650px"
              className={styles.heroImage}
            />

            <Image
              src={`${ASSETS}/drawing2.png`}
              alt=""
              aria-hidden="true"
              width={300}
              height={300}
              className={styles.heroDoodle}
            />

            {/* <span className={styles.heroHandwritten} aria-hidden="true">
              Great
              <br />
              Good Food.
              <br />
              Good Mood!
            </span> */}
          </div>
        </div>

        <div className={styles.heroBottomEdge} aria-hidden="true" />
      </section>

      {/* ================================================
          OUR STORY
      ================================================= */}

      <section
        id="our-story"
        className={styles.story}
        aria-labelledby="about-story-title"
      >
        <div className={`rm-container ${styles.storyGrid}`}>
          <div className={styles.storyVisual} data-about-reveal>
            <Image
              src={`${ASSETS}/who-we-are-food3.png`}
              alt="A customer enjoying a Rolls Mania roll"
              width={1450}
              height={1050}
              sizes="(max-width: 767px) 92vw, 48vw"
              className={styles.storyImage}
            />

            {/* <Image
              src={`${ASSETS}/drawing.png`}
              alt=""
              aria-hidden="true"
              width={300}
              height={400}
              className={styles.storyDoodle}
            /> */}
          </div>

          <div className={styles.storyContent} data-about-reveal>
            <span className={styles.sectionLabel}>WHO WE ARE</span>

            <h2 id="about-story-title" className={styles.sectionTitle}>
              INDIA&apos;S BIGGEST ROLLS
              <br />
              QUICK SERVICE
              <span>RESTAURANT CHAIN.</span>
            </h2>

            <p className={styles.bodyText}>
              Rolls Mania is a quick-service restaurant chain built around great
              food, happy people and innovation. We serve a wide range of
              delicious rolls, meals and sides prepared with fresh ingredients,
              unique flavours and a whole lot of love.
            </p>

            <p className={styles.bodyText}>
              From a quick bite to a satisfying meal, our aim is to bring
              flavour, convenience and a memorable food experience to every
              customer.
            </p>

            <Link href="/MenuPage" className={styles.mintButton}>
              <span>EXPLORE OUR MENU</span>
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================
          OUR PHILOSOPHY
      ================================================= */}

      <section
        className={styles.philosophy}
        aria-labelledby="about-philosophy-title"
      >
        <div className={`rm-container ${styles.philosophyGrid}`}>
          <div className={styles.philosophyVisual} data-about-reveal>
            <Image
              src={`${ASSETS}/philosophy-food.png`}
              alt="A freshly prepared roll held in hand against a red brush circle"
              width={1200}
              height={1200}
              sizes="(max-width: 767px) 85vw, 40vw"
              className={styles.philosophyImage}
            />
          </div>

          <div className={styles.philosophyContent} data-about-reveal>
            <span className={styles.sectionLabel}>OUR PHILOSOPHY</span>

            <h2 id="about-philosophy-title" className={styles.sectionTitle}>
              A NUTRITION MEAL
              <span>ON-THE-GO!</span>
            </h2>

            <p className={styles.bodyText}>
              We believe a great meal should bring together satisfying food,
              generous portions and quick, convenient service.
            </p>

            <div className={styles.valuesGrid}>
              {values.map((value) => (
                <article
                  className={`${styles.valueCard} ${styles[value.color]}`}
                  key={value.title}
                >
                  <div className={styles.valueIcon}>
                    <Image
                      src={`${ASSETS}/${value.icon}`}
                      alt={value.title}
                      width={220}
                      height={220}
                      sizes="(max-width: 767px) 100px, 140px"
                    />
                  </div>

                  <h3>{value.title}</h3>

                  <p>{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          BRAND VIDEO / FOOD BANNER
      ================================================= */}

      <section
        className={styles.foodBanner}
        aria-labelledby="about-food-banner-title"
      >
        <div className={styles.foodBannerOverlay} />

        <div className={`rm-container ${styles.foodBannerInner}`}>
          <div className={styles.foodBannerCopy} data-about-reveal>
            <span className={styles.bannerEyebrow}>MADE FOR ROLL LOVERS</span>

            <h2 id="about-food-banner-title">
              FRESH TASTE AT A
              <br />
              GREAT PRICE, ONLY FOR
              <span>DELICIOUS FOOD LOVERS.</span>
            </h2>

            <Link href="/MenuPage" className={styles.bannerLink}>
              DISCOVER OUR MENU <FiArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.foodBannerVisual} data-about-reveal>
            <Image
              src={`${ASSETS}/video-food.png`}
              alt="Rolls Mania rolls, fries, snacks and drinks"
              width={1835}
              height={900}
              sizes="(max-width: 767px) 92vw, 55vw"
              className={styles.foodBannerImage}
            />
          </div>
        </div>
      </section>

      {/* ================================================
          VISION
      ================================================= */}

      <section className={styles.vision} aria-labelledby="about-vision-title">
        <div className={`rm-container ${styles.visionGrid}`}>
          <div className={styles.visionVisual} data-about-reveal>
            <Image
              src={`${ASSETS}/ourvision-food.png`}
              alt="Rolls Mania signature rolls and snacks"
              width={1450}
              height={1050}
              sizes="(max-width: 767px) 90vw, 40vw"
              className={styles.visionImage}
            />
          </div>

          <div className={styles.visionContent} data-about-reveal>
            <span className={styles.sectionLabel}>OUR VISION</span>

            <h2 id="about-vision-title" className={styles.sectionTitle}>
              A GLOBAL LEADER IN
              <span>QUICK-SERVICE DINING,</span>
              SERVING QUALITY FOOD
              <span>WITH PROMPT SERVICE.</span>
            </h2>

            {/* <p className={styles.bodyText}>
              Our vision is to keep building a trusted food brand through
              quality, convenience, innovation and a love for great rolls.
            </p> */}
          </div>
        </div>
      </section>

      {/* ================================================
          TEAM
      ================================================= */}

      <section className={styles.team} aria-labelledby="about-team-title">
        <div className="rm-container">
          <div className={styles.teamHeading} data-about-reveal>
            <span className={styles.sectionLabel}>THE PEOPLE BEHIND IT</span>

            <h2 id="about-team-title" className={styles.sectionTitle}>
              BEHIND THE <span>TASTE.</span>
            </h2>

            <p className={styles.bodyText}>
              Every great roll is backed by people who share a passion for food,
              service and building something special.
            </p>
          </div>

          <div className={styles.teamGrid}>
            {team.map((member) => (
              <article
                className={styles.teamCard}
                key={member.name}
                data-about-reveal
              >
                <div className={styles.teamVisual}>
                  <span className={styles.teamNumber} aria-hidden="true">
                    {member.number}
                  </span>

                  <div className={styles.teamBlob}>
                    <Image
                      src={`${ASSETS}/${member.image}`}
                      alt={member.name}
                      width={700}
                      height={850}
                      sizes="(max-width: 767px) 75vw, (max-width: 991px) 30vw, 300px"
                      className={styles.teamPhoto}
                    />
                  </div>
                </div>

                <div className={styles.teamInfo}>
                  <h3>{member.name}</h3>
                  <span className={styles.teamRole}>{member.role}</span>
                  <p className={styles.teamQuote}>
                    &ldquo;{member.quote}&rdquo;
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          OUR JOURNEY
      ================================================= */}

      <section className={styles.journey} aria-labelledby="about-journey-title">
        <div className={styles.journeyEdgeTop} aria-hidden="true" />

        <div className="rm-container">
          <div className={styles.journeyHeading} data-about-reveal>
            <span className={styles.sectionLabel}>OUR JOURNEY</span>

            <h2 id="about-journey-title" className={styles.sectionTitle}>
              THIS IS HOW WE <span>WALKED ON.</span>
            </h2>

            <p className={styles.bodyText}>
              Every milestone is another step in our journey of bringing good
              food to more people.
            </p>
          </div>

          <div className={`${styles.timeline} aboutTimeline`}>
            <div className={styles.timelineRoad} aria-hidden="true" />

            {milestones.map((milestone, index) => (
              <article
                className={`${styles.timelineItem} aboutTimelineItem`}
                key={milestone.year}
              >
                <span className={styles.timelineDot} aria-hidden="true" />

                <div className={styles.timelineYear}>{milestone.year}</div>

                <div className={styles.timelineText}>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>

                {index < milestones.length - 1 && (
                  <span
                    className={styles.timelineConnector}
                    aria-hidden="true"
                  />
                )}
              </article>
            ))}
          </div>
        </div>

        <div className={styles.journeyEdgeBottom} aria-hidden="true" />
      </section>

      {/* ================================================
          FINAL CTA
      ================================================= */}

      <section className={styles.finalCta} aria-labelledby="about-cta-title">
        <div className={styles.finalCtaTexture} aria-hidden="true" />

        <div className={`rm-container ${styles.finalCtaInner}`}>
          <div className={styles.finalCtaCopy} data-about-reveal>
            <span>FEELING HUNGRY?</span>

            <h2 id="about-cta-title">
              ORDER YOUR
              <br />
              FAVORITE ROLL NOW!
            </h2>

            <Link href="/#menu" className={styles.darkButton}>
              <span>ORDER ONLINE</span>
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.finalCtaVisual} data-about-reveal>
            <Image
              src={`${ASSETS}/about-us-hero-food.png`}
              alt="Enjoy the Rolls Mania food collection"
              width={1450}
              height={1050}
              sizes="(max-width: 767px) 90vw, 50vw"
              className={styles.finalCtaImage}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
