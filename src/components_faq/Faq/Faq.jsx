"use client";

import { useState } from "react";
import { FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";
import styles from "./Faq.module.css";

// const categories = ["All Questions", "Our Food", "Orders", "Stores"];
const categories = [
  "All Questions",
  "Investment & Costs",
  "Franchise & Eligibility",
  "Store & Support",
];
const faqItems = [
  {
    id: 1,
    category: "Franchise & Eligibility",
    question: "Why should I join the ROLLS MANIA team?",
    answer:
      "Joining the ROLLS MANIA® team gives you a lucrative opportunity to own your own business, a proven business with a modest investment, simple operations, flexible floor plans, national and local support, national and regional advertising, a training program, ongoing learning for our owners and their staff, store development assistance, design support; lease negotiations, construction guidance and much more",
  },
  {
    id: 2,
    category: "Investment & Costs",
    question: " How much is the investment for franchisee?",
    answer:
      "The investment can start from INR 15,00,000 onward. This includes the initial franchise fee. For a better idea of the Franchise Model, contact us.",
  },
  {
    id: 3,
    category: "Investment & Costs",
    question: "How much does it cost to open a ROLLS MANIA?",
    answer:
      "In addition to the franchise fee, each location is different and the initial investment varies depending on restaurant, build out costs, location, etc. For a better idea of the capital requirements, contact us.",
  },
  {
    id: 4,
    category: "Store & Support",
    question: "What is an Area Manager?",
    answer:
      "An Area Manager is a local, on-site representative of the ROLLS MANIA® concept. Your Area Manager will be your primary contact in your local area and will be able to provide local support not only throughout the application process but continued support as you operate your store.",
  },
  {
    id: 5,
    category: "Franchise & Eligibility",
    question:
      "What is the required criteria for a preferred Franchisee for ROLLS MANIA?",
    answer:
      "The preferred candidate should comply with some business background. Also, he/she should procure all statutory requirements (Food licence, Shop & Establishment licence, etc.). It is also preferred, not necessary, but ideal that the candidate be well aware of Basic English language and basic Mathematics.",
  },
  {
    id: 6,
    category: "Store & Support",
    question:
      "What factors should I consider when selecting a store for a ROLLS MANIA outlet?",
    answer:
      "You must own or rent a property with parking space - facing the main road, surrounded by colleges, schools, offices, commercial and residential area. The store must have a carpet area of minimum 300 sq. ft. for dine – in store and minimum 150 to 200 sq. ft. for take away and delivery store",
  },
  {
    id: 7,
    category: "Store & Support",
    question: "What is the duration of the Franchisee Agreement?",
    answer:
      "The Franchisee Agreement is valid for 5 years and can be renewed every 5 years.",
  },
  {
    id: 8,
    category: "Store & Support",
    question: "Will you provide the training for the staff?",
    answer:
      "Yes. An in-depth training of the Kitchen staff is done from our end before the inception of any outlet. We have set standard training modules and we also provide online training whenever required.",
  },
  {
    id: 9,
    category: "Store & Support",
    question:
      "What are the other benefits of owning a franchise with ROLLS MANIA?",
    answer:
      "Most business experts associated with us agree that owning a franchises has a higher likelihood of success than independent businesses, as we have a proven business model in place, which has been tried and tested. Our franchise model works, because we are only as successful as our franchisees.",
  },
];

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [openItem, setOpenItem] = useState(1);

  const filteredItems =
    activeCategory === "All Questions"
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setOpenItem(null);
  };

  const toggleItem = (id) => {
    setOpenItem((current) => (current === id ? null : id));
  };

  return (
    <div className={styles.faqPage} id="faq">
      {/* =========================================
          FAQ HERO
          ========================================= */}

      <section className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden="true" />

        <div className={`rm-container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>WE HAVE ANSWERS</span>

            <h1 className={styles.heroTitle}>
              GOT
              <span>QUESTIONS?</span>
            </h1>

            <p className={styles.heroDescription}>
              Everything you want to know about your favourite rolls, orders,
              and Rolls Mania.
            </p>

            <a href="#faq-questions" className={styles.heroButton}>
              EXPLORE FAQs
              <FiArrowRight aria-hidden="true" />
            </a>
          </div>

          <div
            className={styles.heroFood}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();

              const x = (event.clientX - rect.left) / rect.width - 0.5;
              const y = (event.clientY - rect.top) / rect.height - 0.5;

              event.currentTarget.style.setProperty(
                "--hero-tilt-x",
                `${y * -8}deg`
              );

              event.currentTarget.style.setProperty(
                "--hero-tilt-y",
                `${x * 10}deg`
              );
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.setProperty("--hero-tilt-x", "0deg");
              event.currentTarget.style.setProperty("--hero-tilt-y", "0deg");
            }}
          >
            <img
              src="/assets/rolls-mania/faq/faq-hero-food.png"
              alt="Delicious Rolls Mania food"
              className={styles.heroFoodImage}
            />
          </div>

          <span className={styles.heroDecoration} aria-hidden="true">
            GOODNESS
            <br />
            ROLLED
          </span>
        </div>

        {/* <div className={styles.heroBottomLine} aria-hidden="true">
          GOODNESS ROLLED WITH LOVE
        </div> */}
      </section>

      {/* =========================================
          FAQ CONTENT
          ========================================= */}

      <section className={styles.faqSection} id="faq-questions">
        <div className="rm-container">
          <div className={styles.sectionHeading}>
            <span className={styles.sectionLabel}>HERE TO HELP</span>

            <h2 className={styles.sectionTitle}>
              FREQUENTLY ASKED
              <span>QUESTIONS</span>
            </h2>

            <p className={styles.sectionDescription}>
              Curious about something? Find your answer below.
            </p>
          </div>

          {/* Category filters */}

          <div
            className={styles.categoryList}
            role="group"
            aria-label="Filter frequently asked questions"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`${styles.categoryButton} ${
                  activeCategory === category ? styles.categoryButtonActive : ""
                }`}
                onClick={() => handleCategoryChange(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ accordion */}

          <div className={styles.faqLayout}>
            <div className={styles.faqList}>
              {filteredItems.map((item, index) => {
                const isOpen = openItem === item.id;

                return (
                  <article
                    className={`${styles.faqItem} ${
                      isOpen ? styles.faqItemOpen : ""
                    }`}
                    key={item.id}
                  >
                    <button
                      type="button"
                      className={styles.faqQuestion}
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <span className={styles.questionNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className={styles.questionText}>
                        {item.question}
                      </span>

                      <span className={styles.questionIcon}>
                        {isOpen ? (
                          <FiMinus aria-hidden="true" />
                        ) : (
                          <FiPlus aria-hidden="true" />
                        )}
                      </span>
                    </button>

                    <div
                      className={styles.answerWrapper}
                      id={`faq-answer-${item.id}`}
                      hidden={!isOpen}
                    >
                      <div className={styles.faqAnswer}>{item.answer}</div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Side information card */}

            <div className={styles.helpSidebar}>
              <aside className={styles.helpCard}>
                <span className={styles.helpLabel}>STILL CURIOUS?</span>

                <h3 className={styles.helpTitle}>
                  LET&apos;S
                  <br />
                  TALK
                  <span>FOOD!</span>
                </h3>

                <p className={styles.helpDescription}>
                  Can&apos;t find what you&apos;re looking for? Get in touch
                  with our team for more information.
                </p>

                <a href="/contact" className={styles.helpButton}>
                  CONTACT US
                  <FiArrowRight aria-hidden="true" />
                </a>

                <span className={styles.helpDecoration} aria-hidden="true">
                  RM
                </span>
              </aside>

              <div
                className={styles.sidebarFood}
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();

                  const x = (event.clientX - rect.left) / rect.width - 0.5;
                  const y = (event.clientY - rect.top) / rect.height - 0.5;

                  event.currentTarget.style.setProperty(
                    "--tilt-x",
                    `${y * -10}deg`
                  );

                  event.currentTarget.style.setProperty(
                    "--tilt-y",
                    `${x * 12}deg`
                  );
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.setProperty("--tilt-x", "0deg");
                  event.currentTarget.style.setProperty("--tilt-y", "0deg");
                }}
              >
                <img
                  src="/assets/rolls-mania/faq/faq-sidebar-food.png"
                  alt="Delicious Rolls Mania rolls"
                  className={styles.sidebarFoodImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          BOTTOM CTA
          ========================================= */}

      <section className={styles.bottomCta}>
        <div className="rm-container">
          <div className={styles.bottomCtaInner}>
            <div>
              <span className={styles.bottomCtaLabel}>
                HUNGER DOESN&apos;T WAIT
              </span>

              <h2 className={styles.bottomCtaTitle}>READY TO ROLL?</h2>
            </div>

            <a href="/MenuPage" className={styles.bottomCtaButton}>
              EXPLORE OUR MENU
              <FiArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
