"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiPhoneCall,
  FiMail,
  FiMapPin,
  FiClock,
  FiArrowRight,
  FiChevronRight,
} from "react-icons/fi";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./contact.module.css";
gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  {
    title: "CALL US",
    detail: "+91 98765 43210",
    description: "Mon - Sun | 11 AM - 11 PM",
    icon: FiPhoneCall,
    href: "tel:+919876543210",
    accent: "rose",
  },
  {
    title: "EMAIL US",
    detail: "info@rollsmania.com",
    description: "We typically reply within 24 hrs",
    icon: FiMail,
    href: "mailto:info@rollsmania.com",
    accent: "mint",
  },
  {
    title: "VISIT US",
    detail: "Find your nearest outlet",
    description: "Fresh rolls, made with love",
    icon: FiMapPin,
    href: "#contact-location",
    accent: "rose",
  },
  {
    title: "WORKING HOURS",
    detail: "Monday - Sunday",
    description: "11:00 AM - 11:00 PM",
    icon: FiClock,
    href: null,
    accent: "mint",
  },
];

export default function ContactPage() {
  const pageRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    verification: "",
  });

  const [formStatus, setFormStatus] = useState("");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const { reduceMotion } = context.conditions;

          if (reduceMotion) return;

          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .from(".contactHeroContent", {
              opacity: 0,
              x: -35,
              duration: 0.8,
            })
            .from(
              ".contactHeroBreadcrumb",
              {
                opacity: 0,
                y: 12,
                duration: 0.5,
              },
              "-=0.35"
            );

          gsap.from(".contactFormCard", {
            scrollTrigger: {
              trigger: ".contactFormCard",
              start: "top 75%",
              once: true,
            },
            opacity: 0,
            y: 35,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.15,
          });

          /* Right-side food card entrance */
          gsap.from(".contactFoodCard", {
            opacity: 0,
            x: 35,
            y: 18,
            duration: 0.85,
            delay: 0.2,
            ease: "power3.out",
          });

          /* Food image entrance */
          gsap.from(".contactFoodImage", {
            opacity: 0,
            y: 45,
            scale: 0.9,
            duration: 1.1,
            delay: 0.35,
            ease: "power3.out",
          });

          /* Gentle floating animation */
          gsap.to(".contactFoodImage", {
            y: -12,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.45,
          });

          gsap.from(".contactInfoCard", {
            opacity: 0,
            y: 25,
            duration: 0.65,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.2,
          });

          gsap.from(".contactPromoContent", {
            opacity: 0,
            y: 25,
            duration: 0.75,
            ease: "power3.out",
          });
          /* Food image entrance animation */

          gsap.from(".contactHeroFood", {
            opacity: 0,
            x: 65,
            y: 24,
            scale: 0.92,
            duration: 1.15,
            delay: 0.15,
            ease: "power3.out",
          });

          /* Gentle floating effect */

          gsap.to(".contactHeroFood", {
            y: -12,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.3,
          });
        }
      );

      return () => mm.revert();
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormStatus("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.phone.replace(/\D/g, "").length !== 10) {
      setFormStatus("Please enter a valid 10-digit phone number.");
      return;
    }

    if (formData.verification.trim() !== "2932") {
      setFormStatus("Please enter the correct verification code.");
      return;
    }

    setFormStatus(
      "Your details are valid. Connect your email/API endpoint to enable message delivery."
    );
  };

  return (
    <div ref={pageRef} className={styles.contactPage}>
      <Header />

      <main>
        {/* =========================================
            HERO
        ========================================= */}

        {/* <section className={styles.contactHero} aria-labelledby="contact-title">
          <div className={styles.heroInner}>
            <div className={`${styles.heroContent} contactHeroContent`}>
              <p className={styles.heroEyebrow}>CONTACT US</p>

              <h1 id="contact-title" className={styles.heroTitle}>
                WE’RE HERE
                <span>FOR YOU</span>
              </h1>

              <p className={styles.heroDescription}>
                Questions, feedback or just craving a great roll?
                <br className={styles.desktopBreak} />
                Drop us a message!
              </p>

              <nav
                className={`contactHeroBreadcrumb ${styles.breadcrumb}`}
                aria-label="Breadcrumb"
              >
                <Link href="/">Home</Link>
                <FiChevronRight aria-hidden="true" />
                <span aria-current="page">Contact Us</span>
              </nav>
            </div>
          </div>
        </section> */}

        {/* =========================================
    CONTACT HERO
========================================= */}

        <section className={styles.contactHero} aria-labelledby="contact-title">
          {/* Food Image */}
          <div
            className={`${styles.heroFoodWrap} contactHeroFood`}
            aria-hidden="true"
          >
            <img
              src="/assets/rolls-mania/contact/contact-bg-food.png"
              alt=""
              className={styles.heroFoodImage}
              draggable="false"
            />
          </div>

          <div className={styles.heroInner}>
            <div className={`${styles.heroContent} contactHeroContent`}>
              <p className={styles.heroEyebrow}>CONTACT US</p>

              <h1 id="contact-title" className={styles.heroTitle}>
                WE’RE HERE
                <span>FOR YOU</span>
              </h1>

              <p className={styles.heroDescription}>
                Questions, feedback or just craving a great roll?
                <br className={styles.desktopBreak} />
                Drop us a message!
              </p>

              <nav
                className={`contactHeroBreadcrumb ${styles.breadcrumb}`}
                aria-label="Breadcrumb"
              >
                <Link href="/">Home</Link>

                <FiChevronRight aria-hidden="true" />

                <span aria-current="page">Contact Us</span>
              </nav>
            </div>
          </div>
        </section>

        {/* =========================================
            CONTACT FORM
        ========================================= */}

        {/* =========================================
    CONTACT FORM + FOOD PROMO CARD
========================================= */}

        <section
          className={styles.formSection}
          aria-labelledby="contact-form-title"
        >
          {/* <div className={styles.formDecoration} aria-hidden="true">
            <span />
            <span />
            <span />
          </div> */}

          <div className={styles.formContainer}>
            <div className={styles.formLayout}>
              {/* LEFT: EXISTING FORM — FUNCTIONALITY UNCHANGED */}
              <div className={`${styles.formCard} contactFormCard`}>
                <p className={styles.sectionEyebrow}>FILL IN THE DETAILS</p>

                <h2 id="contact-form-title" className={styles.formTitle}>
                  SEND US A MESSAGE
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className={styles.formFields}>
                    <div className={styles.field}>
                      <label htmlFor="contact-name">Your Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-email">Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-phone">Phone Number</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        autoComplete="tel"
                        inputMode="numeric"
                        maxLength={15}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                      <small>Please enter a 10-digit number.</small>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-message">
                        Write Your Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        placeholder="Write Your Message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.verificationRow}>
                    <div
                      className={styles.verificationCode}
                      aria-label="Demo verification code: 2932"
                    >
                      2932
                    </div>

                    <label
                      className={styles.srOnly}
                      htmlFor="contact-verification"
                    >
                      Enter the verification code
                    </label>

                    <input
                      id="contact-verification"
                      type="text"
                      name="verification"
                      placeholder="Type the text in the image"
                      autoComplete="off"
                      maxLength={4}
                      value={formData.verification}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <p className={styles.verificationHelp}>
                    Demo code shown above. A production form should use
                    server-side validation or a proper CAPTCHA.
                  </p>

                  {formStatus && (
                    <p className={styles.formStatus} role="status">
                      {formStatus}
                    </p>
                  )}

                  <button type="submit" className={styles.submitButton}>
                    <span>SEND A MESSAGE</span>
                    <FiArrowRight aria-hidden="true" />
                  </button>
                </form>
              </div>

              {/* RIGHT: ANIMATED FOOD CARD */}
              <aside
                className={`${styles.foodPromoCard} contactFoodCard`}
                aria-label="Good Food, Good Conversations"
              >
                <div className={styles.foodPromoText}>
                  <span>Good Food</span>
                  <span>Good Conversations!</span>
                </div>

                {/* <div className={styles.foodPromoDecor} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div> */}

                <img
                  src="/assets/rolls-mania/contact/contact-form-food.png"
                  alt="Crispy Rolls Mania snacks served in a yellow branded cup"
                  className={`${styles.foodPromoImage} contactFoodImage`}
                  draggable="false"
                />
              </aside>
            </div>
          </div>
        </section>

        {/* =========================================
            CONTACT INFORMATION
        ========================================= */}

        {/* <section
          className={styles.contactInfoSection}
          aria-labelledby="contact-info-title"
        >
          <div className="rm-container">
            <div className={styles.infoHeading}>
              <p className={styles.infoEyebrow}>OTHER WAYS TO REACH US</p>

              <h2 id="contact-info-title" className={styles.infoTitle}>
                WE’D LOVE TO HEAR FROM YOU
              </h2>
            </div>

            <div className={styles.infoGrid}>
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className={`${styles.infoCard} contactInfoCard`}
                  >
                    <div
                      className={`${styles.infoIcon} ${
                        item.accent === "rose"
                          ? styles.iconRose
                          : styles.iconMint
                      }`}
                    >
                      <Icon aria-hidden="true" />
                    </div>

                    <h3>{item.title}</h3>

                    {item.href ? (
                      <a className={styles.infoDetail} href={item.href}>
                        {item.detail}
                      </a>
                    ) : (
                      <p className={styles.infoDetail}>{item.detail}</p>
                    )}

                    <p className={styles.infoDescription}>{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section> */}

        {/* =========================================
            PROMOTIONAL BANNER
        ========================================= */}

        {/* <section className={styles.contactPromo} id="contact-location">
         
          <div className={styles.promoFoodWrap}>
            <img
              src="/assets/rolls-mania/contact/contact-promo-food.png"
              alt="Freshly prepared Rolls Mania wraps"
              className={styles.promoFoodImage}
              loading="lazy"
            />
          </div>
          <div className={`rm-container ${styles.promoInner}`}>
            <div className={`${styles.promoContent} contactPromoContent`}>
              <p className={styles.promoEyebrow}>
                GOOD FOOD, GOOD CONVERSATIONS
              </p>

              <h2 className={styles.promoTitle}>
                CRAVINGS?
                <span>WE’RE JUST A</span>
                <span>MESSAGE AWAY!</span>
              </h2>

              
            </div>

            <div className={styles.promoDoodles} aria-hidden="true">
              <span className={styles.doodleOne}>✳</span>
              <span className={styles.doodleTwo}>〰</span>
              <span className={styles.doodleThree}>✳</span>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
}
