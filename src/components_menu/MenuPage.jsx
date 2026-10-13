"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowDown,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import styles from "./MenuPage.module.css";

gsap.registerPlugin(ScrollTrigger);

const menuCategories = [
  {
    id: "new-arrivals",
    label: "New Arrivals",
    short: "New Arrivals",
    alt: "New arrival signature rolls",
  },
  {
    id: "crunchy-wraps",
    label: "Exclusive Crunchy Wraps",
    short: "Crunchy Wraps",
    alt: "Exclusive crunchy wraps",
  },
  {
    id: "pocket-friendly",
    label: "Pocket Friendly Bites",
    short: "Pocket Bites",
    alt: "Pocket friendly rolls and bites",
  },
  {
    id: "fusion-bites",
    label: "Popular Fusion Bites",
    short: "Fusion Bites",
    alt: "Popular fusion rolls",
  },
  {
    id: "spicy-delight",
    label: "Spicy Delight",
    short: "Spicy Delight",
    alt: "Spicy signature rolls",
  },
  {
    id: "all-day-bites",
    label: "All Day Bites",
    short: "All Day Bites",
    alt: "All day favourite rolls",
  },
  {
    id: "king-size-bites",
    label: "King Size Bites",
    short: "King Size Bites",
    alt: "King size loaded rolls",
  },
  {
    id: "meal-boxes",
    label: "Meal Box & Rice Bowls",
    short: "Meal Boxes",
    alt: "Meal boxes and rice bowls",
  },
  {
    id: "saver-mania",
    label: "Saver Mania",
    short: "Saver Mania",
    alt: "Saver Mania meal combinations",
  },
  {
    id: "upgrade-your-roll",
    label: "Upgrade Your Roll",
    short: "Upgrades",
    alt: "Dips and extras to upgrade a roll",
  },
  { id: "brew", label: "Brew", short: "Brew", alt: "Cold drinks and frappes" },
  {
    id: "fries-mania",
    label: "Fries Mania",
    short: "Fries Mania",
    alt: "Loaded fries",
  },
  { id: "sides", label: "Sides", short: "Sides", alt: "Sides and snacks" },
  {
    id: "make-it-a-meal",
    label: "Make It A Meal",
    short: "Make It A Meal",
    alt: "Drink and fries meal add-ons",
  },
  {
    id: "combos",
    label: "Combos",
    short: "Combos",
    alt: "Rolls Mania combo meals",
  },
];

const sections = [
  {
    id: "new-arrivals",
    title: "New Arrivals",
    subtitle: "Fresh additions to your favourite menu.",
    featured: true,
    items: [
      ["Amritsari Chole Roll", true],
      ["Rajma Masala Roll", true],
      ["Harabara Kebab Roll", true],
      ["Chicken Seekh Kebab Roll", true],
      ["Chicken Kathi Kebab Roll", true],
      ["Tandoori Chicken Tikka Roll", true],
      ["Chicken Tikka Masala Roll", true],
      ["Mutton Seekh Roll", true],
      ["Mutton Kheema Roll", true],
      ["Mutton Galouti Roll", false],
    ],
  },
  {
    id: "crunchy-wraps",
    title: "Exclusive Crunchy Wraps",
    subtitle: "A crunchy twist. A whole lot of goodness.",
    banner: true,
    items: [
      ["Veg Crunchy Wrap", false],
      ["Chicken Crunchy Wrap", false],
    ],
  },
  {
    id: "pocket-friendly",
    title: "Pocket Friendly Bites",
    subtitle: "Delicious bites for every mood.",
    featured: true,
    items: [
      ["Aloo Fry Roll", true],
      ["Aloo Chilly Roll", true],
      ["Mix Veg Roll", true],
      ["Egg Omelette Roll", false],
      ["Double Egg Omelette Roll", false],
    ],
  },
  {
    id: "fusion-bites",
    title: "Popular Fusion Bites",
    subtitle: "Classic favourites with a flavour-packed twist.",
    items: [
      ["Aloo Cheese Roll", true],
      ["Veg Cheese Roll", true],
      ["Veg Paneer Roll", true],
      ["Cheesy Corn Roll", true],
      ["Paneer Mayonnaise Roll", true],
      ["Paneer Mughlai Roll", true],
      ["Soya Chaap Mughlai Roll", true],
      ["Chicken Mayonnaise Roll", true],
      ["Chicken Mughlai Roll", true],
      ["Chicken Cheese Roll", true],
      ["Cheesy BBQ Chicken Roll", true],
      ["Cheesy BBQ Paneer Roll", true],
      ["Butter Chicken Roll", true],
      ["Paneer Makhani Roll", true],
      ["Soya Chaap Makhani Roll", true],
      ["Cheesy BBQ Soya Chaap Roll", true],
    ],
  },
  {
    id: "spicy-delight",
    title: "Spicy Delight",
    subtitle: "Turn up the heat with bold, spicy flavours.",
    items: [
      ["Mushroom Chilly Roll", true],
      ["Cheese Chilly Manchurian Roll", true],
      ["Paneer Chilly Roll", true],
      ["Paneer Bhuna Roll", true],
      ["Soya Chaap Bhuna Roll", true],
      ["Chicken Chilly Roll", true],
      ["Chicken Bhuna Roll", true],
    ],
  },
  {
    id: "all-day-bites",
    title: "All Day Bites",
    subtitle: "Goodness worth coming back to, any time of day.",
    items: [
      ["Paneer Masala Roll", true],
      ["Soya Chaap Masala Roll", true],
      ["Mushroom Masala Roll", true],
      ["Cheese Masala Roll", true],
      ["Paneer Hot Garlic Roll", true],
      ["Paneer Hariyali Roll", true],
      ["Chicken Fry Roll", true],
      ["Chicken Kheema Roll", true],
      ["Chicken Hot Garlic Roll", true],
      ["Chicken Hariyali Roll", true],
    ],
  },
  {
    id: "king-size-bites",
    title: "King Size Bites",
    subtitle: "Big cravings call for bigger bites.",
    items: [
      ["Paneer Cheese Masala Roll", false],
      ["Double Omelette Chicken Roll", false],
      ["Double Chicken Roll", false],
      ["Double Chicken Omelette Roll", false],
      ["Double Omelette Double Chicken Roll", false],
    ],
  },
  {
    id: "meal-boxes",
    title: "Meal Box & Rice Bowls",
    subtitle: "A hearty meal, ready to roll with you.",
    items: [
      ["Amritsari Chole Meal Box", false],
      ["Rajma Masala Meal Box", false],
      ["Paneer Mughlai Meal Box", false],
      ["Paneer Bhuna Meal Box", false],
      ["Paneer Makhani Meal Box", false],
      ["Chicken Kheema Meal Box", false],
      ["Chicken Mughlai Meal Box", false],
      ["Chicken Bhuna Meal Box", false],
      ["Butter Chicken Meal Box", false],
      ["Mutton Galouti Meal Box", false],
      ["Amritsari Chole Rice Box", false],
      ["Rajma Masala Rice Box", false],
      ["Dal Makhani Rice Box", false],
      ["Paneer Bhuna Rice Box", false],
      ["Paneer Makhani Rice Box", false],
      ["Chicken Bhuna Rice Box", false],
      ["Butter Chicken Rice Box", false],
      ["Mutton Galouti Rice Box", false],
    ],
  },
  {
    id: "saver-mania",
    title: "Saver Mania",
    subtitle: "More favourites together. More reasons to smile.",
    items: [
      ["Paneer Masala Saver Mania", false],
      ["Paneer Mughlai Saver Mania", false],
      ["Paneer Chilli Saver Mania", false],
      ["Cheesy BBQ Paneer Saver Mania", false],
      ["Chicken Chilli Saver Mania", false],
      ["Chicken Mughlai Saver Mania", false],
      ["Chicken Bhuna Saver Mania", false],
      ["Butter Chicken Saver Mania", false],
      ["Cheesy BBQ Chicken Saver Mania", false],
      ["Paneer Masala Roll + Cheesy BBQ Paneer Roll Saver Mania", false],
      ["Paneer Mughlai Roll + Paneer Chilli Roll Saver Mania", false],
      ["Chicken Mughlai Roll + Cheesy BBQ Chicken Roll Saver Mania", false],
      ["Chicken Bhuna Roll + Butter Chicken Roll Saver Mania", false],
    ],
  },
  {
    id: "upgrade-your-roll",
    title: "Upgrade Your Roll",
    subtitle: "Make your favourite roll even more you.",
    compact: true,
    items: [
      ["Tang Sauce", false],
      ["Hot Garlic Dip", false],
      ["Salsa Dip", false],
      ["Cheese Dip", false],
      ["Mayonnaise", false],
      ["Cheese", false],
      ["Peri Peri", false],
      ["Egg", false],
    ],
  },
  {
    id: "brew",
    title: "Brew",
    subtitle: "Cool sips and creamy treats.",
    compact: true,
    items: [
      ["Iced Tea (Peach / Lemon)", false],
      ["Watermelon Iced Tea", false],
      ["Bubblegum Iced Tea", false],
      ["Cold Coffee", false],
      ["Hazelnut Cold Coffee", false],
      ["Irish Cold Coffee", false],
      ["Blue Lagoon", false],
      ["Mint Mojito", false],
      ["Pink Tango", false],
      ["Strawberry Frappe", false],
      ["Butterscotch Frappe", false],
      ["Blueberry Frappe", false],
      ["Chocolate Frappe", false],
    ],
  },
  {
    id: "fries-mania",
    title: "Fries Mania",
    subtitle: "Fries with a Mania-sized personality.",
    featured: true,
    items: [
      ["French Fries", false],
      ["Peri Peri Fries", false],
      ["Cheesy Barbeque Fries", false],
      ["Chilly Garlic Jalapeno Fries", false],
      ["Butter Chicken Fries", false],
      ["Punjabi Fries", false],
    ],
  },
  {
    id: "sides",
    title: "Sides",
    subtitle: "Little extras. Big-time snacking.",
    items: [
      ["Chilli Garlic Poppers", false],
      ["Cheese Poppers", false],
      ["Chicken Popcorn", false],
      ["Chicken Cheese Nuggets", false],
      ["Nachos", false],
      ["Salsa Nachos", false],
      ["Punjabi Nachos", false],
      ["Butter Chicken Nachos", false],
    ],
  },
  {
    id: "make-it-a-meal",
    title: "Make It A Meal",
    subtitle: "Add a little extra to your favourite.",
    items: [
      ["Iced Tea + French Fries", false],
      ["Cold Coffee + French Fries", false],
    ],
  },
  {
    id: "combos",
    title: "Combos",
    subtitle: "Good food is even better together.",
    items: [
      ["Stag Combo", false],
      ["Couple Combo", false],
      ["Family Combo", false],
    ],
  },
];

const popularCards = [
  { name: "Veg Crunchy Wrap", alt: "Veg crunchy wrap" },
  { name: "Chicken Crunchy Wrap", alt: "Chicken crunchy wrap" },
  { name: "Chicken Cheese Roll", alt: "Chicken cheese roll" },
  { name: "Butter Chicken Fries", alt: "Butter chicken fries" },
];

function FoodPlaceholder({ name, className = "" }) {
  return (
    <div
      className={`${styles.foodPlaceholder} ${className}`}
      role="img"
      aria-label={name}
      data-food-placeholder
    >
      <span className={styles.placeholderRing} aria-hidden="true" />
      <span className={styles.placeholderText}>{name}</span>
    </div>
  );
}

function MenuItem({ item, index }) {
  const [name, availableWithEgg] = item;
  return (
    <article className={styles.menuItem} key={`${name}-${index}`}>
      <div className={styles.itemVisual}>
        <FoodPlaceholder name={`Food image: ${name}`} />
      </div>
      <h3>{name}</h3>
      {availableWithEgg && <p className={styles.eggNote}>Available with egg</p>}
    </article>
  );
}

export default function Menu() {
  const menuRef = useRef(null);

  useLayoutEffect(() => {
    const root = menuRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reducedMotion) return;

      root.querySelectorAll("[data-menu-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      root.querySelectorAll("[data-menu-section]").forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll(".menuCardReveal"),
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.045,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 86%",
              once: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main ref={menuRef} className={styles.menuPage}>
      {/* HERO */}
      <section className={styles.hero} aria-labelledby="menu-hero-title">
        <div className={styles.heroTexture} aria-hidden="true" />
        <div className={`rm-container ${styles.heroInner}`}>
          <div className={styles.heroCopy} data-menu-reveal>
            <span className={styles.eyebrow}>
              FRESH INGREDIENTS. BOLD FLAVOURS.
            </span>
            <h1 id="menu-hero-title" className={styles.heroTitle}>
              <span>OUR</span>
              <span className={styles.heroAccent}>MENU</span>
            </h1>
            <p>
              Fresh ingredients. Bold flavours.
              <br />
              Always Rolls Mania.
            </p>
            <a className={styles.heroButton} href="#menu-categories">
              EXPLORE THE MENU <FiArrowDown aria-hidden="true" />
            </a>
          </div>

          <div className={styles.heroVisual} data-menu-reveal>
            <div className={styles.heroFoodFrame}>
              <Image
                src="/assets/rolls-mania/menu_page/menu-hero-food.png"
                alt="Rolls Mania signature wraps, loaded fries, dipping sauce and food packaging"
                width={1400}
                height={1100}
                priority
                unoptimized
                className={styles.heroFoodImage}
              />
            </div>
            <span
              className={`${styles.doodle} ${styles.doodleOne}`}
              aria-hidden="true"
            >
              ✳
            </span>
            {/* <span
              className={`${styles.doodle} ${styles.doodleTwo}`}
              aria-hidden="true"
            >
              ✦
            </span>
            <span className={styles.handwritten} aria-hidden="true">
              Good Food.
              <br />
              Good Mood.
            </span> */}
          </div>
        </div>
        <div className={styles.heroBottomEdge} aria-hidden="true" />
      </section>

      {/* CATEGORY HUB */}
      <section
        id="menu-categories"
        className={styles.categoryHub}
        aria-labelledby="category-hub-title"
      >
        <div className="rm-container">
          <div className={styles.hubIntro} data-menu-reveal>
            <span className={styles.sectionLabel}>FIND YOUR FAVOURITE</span>
            <h2 id="category-hub-title" className={styles.sectionTitle}>
              WHAT ARE YOU <span>CRAVING?</span>
            </h2>
            <p>Pick a category and roll straight to the good stuff.</p>
          </div>

          <nav className={styles.categoryGrid} aria-label="Menu categories">
            {menuCategories.map((category, index) => (
              <button
                className={styles.categoryButton}
                key={category.id}
                type="button"
                onClick={() => scrollToSection(category.id)}
                aria-label={`Jump to ${category.label}`}
              >
                <span className={styles.categoryImageWrap}>
                  <FoodPlaceholder
                    name={category.alt}
                    className={styles.categoryImage}
                  />
                  <span className={styles.categoryNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className={styles.categoryName}>{category.short}</span>
              </button>
            ))}
          </nav>
          <div className={styles.hubArrow} aria-hidden="true">
            <FiArrowDown />
          </div>
        </div>
      </section>

      {/* MENU SECTIONS */}
      <div className={styles.menuSections}>
        {sections.map((section, sectionIndex) => (
          <section
            id={section.id}
            className={`${styles.menuSection} ${
              section.banner ? styles.wrapSection : ""
            } ${section.compact ? styles.compactSection : ""}`}
            key={section.id}
            data-menu-section
            aria-labelledby={`${section.id}-title`}
          >
            {section.banner ? (
              <div className={`rm-container ${styles.bannerContainer}`}>
                <div className={styles.crunchyBanner} data-menu-reveal>
                  <div className={styles.bannerCopy}>
                    <span className={styles.bannerEyebrow}>
                      CRUNCH INTO HAPPINESS
                    </span>
                    <h2 id={`${section.id}-title`}>{section.title}</h2>
                    <p>{section.subtitle}</p>
                    <a
                      href="#crunchy-wraps-items"
                      className={styles.lightButton}
                    >
                      VIEW WRAPS <FiArrowRight aria-hidden="true" />
                    </a>
                  </div>

                  <div className={styles.bannerFood}>
                    <Image
                      src="/assets/rolls-mania/menu_page/crunchy-wrap-food.png"
                      alt="Rolls Mania exclusive crunchy wraps in branded packaging"
                      width={1144}
                      height={1375}
                      priority
                      unoptimized
                      className={styles.bannerFoodImage}
                    />

                    <span className={styles.bannerDoodle} aria-hidden="true">
                      ✧
                    </span>
                  </div>
                </div>
                <div id="crunchy-wraps-items" className={styles.bannerItems}>
                  {section.items.map((item, index) => (
                    <MenuItem item={item} index={index} key={item[0]} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="rm-container">
                <div className={styles.sectionHeading} data-menu-reveal>
                  <div>
                    <span className={styles.sectionLabel}>
                      {sectionIndex === 0
                        ? "ROLLIN' INTO SOMETHING NEW"
                        : `ROLLS MANIA · ${String(sectionIndex + 1).padStart(
                            2,
                            "0"
                          )}`}
                    </span>
                    <h2
                      id={`${section.id}-title`}
                      className={styles.sectionTitle}
                    >
                      {section.title}
                    </h2>
                    <p>{section.subtitle}</p>
                  </div>
                  {section.featured && (
                    <a href={`#${section.id}-all`} className={styles.viewAll}>
                      VIEW ALL <FiArrowRight aria-hidden="true" />
                    </a>
                  )}
                </div>

                {section.featured ? (
                  <div className={styles.featuredRail}>
                    <button
                      type="button"
                      className={styles.railArrow}
                      aria-label={`Scroll ${section.title} items left`}
                      onClick={() =>
                        document
                          .getElementById(`${section.id}-track`)
                          ?.scrollBy({ left: -280, behavior: "smooth" })
                      }
                    >
                      <FiChevronLeft />
                    </button>
                    <div
                      className={styles.featuredTrack}
                      id={`${section.id}-track`}
                    >
                      {section.items.map((item, index) => (
                        <div
                          className={`${styles.featuredCard} menuCardReveal`}
                          key={item[0]}
                        >
                          <MenuItem item={item} index={index} />
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className={styles.railArrow}
                      aria-label={`Scroll ${section.title} items right`}
                      onClick={() =>
                        document
                          .getElementById(`${section.id}-track`)
                          ?.scrollBy({ left: 280, behavior: "smooth" })
                      }
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                ) : (
                  <div
                    className={`${styles.itemsGrid} ${
                      section.compact ? styles.compactItemsGrid : ""
                    }`}
                    id={`${section.id}-all`}
                  >
                    {section.items.map((item, index) => (
                      <div
                        className={`${styles.gridCard} menuCardReveal`}
                        key={item[0]}
                      >
                        <MenuItem item={item} index={index} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* FINAL CTA */}
      <section className={styles.finalCta} aria-labelledby="menu-cta-title">
        <div className={`rm-container ${styles.finalCtaInner}`}>
          <div className={styles.finalCtaCopy} data-menu-reveal>
            <span className={styles.sectionLabel}>
              YOUR NEXT FAVOURITE IS WAITING
            </span>
            <h2 id="menu-cta-title" className={styles.sectionTitle}>
              FEELING HUNGRY? <span>LET'S ROLL.</span>
            </h2>
            <p>
              Explore the menu, choose your favourites, and make it a Mania
              moment.
            </p>
            <Link href="/#menu" className={styles.heroButton}>
              ORDER YOUR FAVOURITE <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.finalCtaFood} data-menu-reveal>
            <FoodPlaceholder name="Rolls Mania rolls and sides" />
          </div>
        </div>
      </section>
    </main>
  );
}
