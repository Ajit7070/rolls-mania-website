"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiClipboard,
  FiTrendingUp,
  FiUser,
  FiUserCheck,
  FiMail,
  FiPhone,
} from "react-icons/fi";

import styles from "./OpenYourRM.module.css";

const franchiseDetails = [
  {
    title: "Required Criteria",
    icon: FiClipboard,
    points: [
      "Must have an outright or rented property, facing the main road, surrounded by colleges, schools, offices, commercial and residential areas.",
      "Carpet area should range from 200 to 300 sq ft.",
      "Must be an exclusive Rolls Mania Outlet; no shop-in-shop concept or cross branding.",
      "Parking space should be available.",
      "Should be at least 2 to 3 kms away from our existing outlet.",
    ],
  },
  {
    title: "Costs",
    icon: FiTrendingUp,
    points: [
      "An investment of ₹15–25 lacs required (includes interiors, equipment & some basic expenditure).",
    ],
  },
  {
    title: "Preferred Candidates",
    icon: FiUser,
    points: [
      "Should comply with some business background preferably.",
      "Should procure all statutory requirements (Food licence, Shop & Establishment licence, etc.).",
    ],
  },
];

export default function OpenYourRM() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const [foodOffset, setFoodOffset] = useState({ x: 0, y: 0 });

  const handleFoodMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setFoodOffset({
      x: x * 14,
      y: y * 14,
    });
  };

  const handleFoodMouseLeave = () => {
    setFoodOffset({ x: 0, y: 0 });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!name || !email || !phone) {
      setError("Please fill in all the required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    try {
      sessionStorage.setItem(
        "rollsManiaFranchiseDetails",
        JSON.stringify({ name, email, phone })
      );
    } catch {
      setError(
        "Your browser could not save these details. Please check your browser settings and try again."
      );
      return;
    }

    router.push("/OpenYourRM/ApplicationForm");
  };

  return (
    <main className={styles.page}>
      {/* HERO — kept from the existing design */}
      <section className={styles.hero}>
        <div className={styles.heroPattern} aria-hidden="true" />

        <div className={`rm-container ${styles.heroContainer}`}>
          {/* LEFT SIDE — EXISTING HERO CONTENT */}
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              YOUR BUSINESS. YOUR PASSION. OUR BRAND.
            </span>

            <h1 className={styles.heroTitle}>
              OPEN YOUR
              <span>RM</span>
            </h1>

            <p className={styles.heroDescription}>
              Turn your entrepreneurial dream into a Rolls Mania success story.
              Join a brand built around great food, bold flavours and happy
              customers.
            </p>

            <a href="#franchise-details" className={styles.heroButton}>
              EXPLORE FRANCHISE OPPORTUNITY
              <span aria-hidden="true">↘</span>
            </a>
          </div>

          {/* RIGHT SIDE — NEW FOOD IMAGE */}
          <div className={styles.heroFoodMotion} aria-hidden="true">
            <img
              src="/assets/rolls-mania/openyourrm/openyourrm-hero-food.png"
              alt=""
              className={styles.heroFoodImage}
              draggable="false"
            />
          </div>
        </div>

        {/* EXISTING HERO FOOTER TEXT */}
        {/* <div className={styles.heroBottom}>
          <span>BUILT FOR ENTREPRENEURS</span>
          <span className={styles.bottomDivider} />
          <span>MADE FOR FOOD LOVERS</span>
        </div> */}
      </section>

      {/* FRANCHISE DETAILS + ENQUIRY FORM */}
      <section className={styles.franchiseSection} id="franchise-details">
        <div className={`rm-container ${styles.franchiseLayout}`}>
          {/* LEFT: ORIGINAL FRANCHISE CONTENT */}
          <div className={styles.franchiseContent}>
            <h2 className={styles.franchiseIntro}>
              Join the Rolls Mania family and be a part of our growing success
              story.
            </h2>

            <p className={styles.franchiseDescription}>
              Rolls Mania seeks franchisees that can further develop our brand
              and celebrate our love for rolls across the country. Our franchise
              model is easy to expand, easy on the pocket and high on returns,
              making it a lucrative opportunity for franchise seekers. We look
              for passion and leadership in our franchisees along with the
              following requirements.
            </p>

            <div className={styles.franchiseGroups}>
              {franchiseDetails.map((detail) => {
                const DetailIcon = detail.icon;

                return (
                  <article className={styles.franchiseGroup} key={detail.title}>
                    <div className={styles.groupIcon}>
                      <DetailIcon aria-hidden="true" />
                    </div>

                    <div className={styles.groupContent}>
                      <h3>{detail.title}</h3>

                      <ul className={styles.groupList}>
                        {detail.points.map((point, index) => (
                          <li key={index}>
                            <span
                              className={styles.redCheck}
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>

            <a href="/Faq" className={styles.franchiseFaq}>
              FAQ
            </a>
          </div>

          {/* RIGHT: ENQUIRY FORM + FOOD IMAGE */}
          <div className={styles.enquiryColumn}>
            <div className={styles.enquiryCard}>
              <div className={styles.enquiryHeading}>
                <h2>Fill In The Details</h2>
              </div>

              <form
                className={styles.enquiryForm}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className={styles.enquiryField}>
                  <FiUserCheck aria-hidden="true" />

                  <input
                    id="franchise-name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    aria-label="Your Name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={100}
                    required
                  />
                </div>

                <div className={styles.enquiryField}>
                  <FiMail aria-hidden="true" />

                  <input
                    id="franchise-email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    aria-label="Email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={254}
                    required
                  />
                </div>

                <div className={styles.enquiryField}>
                  <FiPhone aria-hidden="true" />

                  <input
                    id="franchise-phone"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    aria-label="Phone Number"
                    autoComplete="tel-national"
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {error && (
                  <p className={styles.enquiryError} role="alert">
                    {error}
                  </p>
                )}

                <button type="submit" className={styles.enquirySubmit}>
                  <span>Go To Application Form</span>
                  <span className={styles.enquiryArrow} aria-hidden="true">
                    →
                  </span>
                </button>
              </form>
            </div>

            {/* FOOD IMAGE BELOW THE FORM */}
            <div
              className={styles.detailsFoodStage}
              onMouseMove={handleFoodMouseMove}
              onMouseLeave={handleFoodMouseLeave}
            >
              <img
                src="/assets/rolls-mania/openyourrm/details-food.png"
                alt="Freshly prepared Rolls Mania wraps"
                className={styles.detailsFoodImage}
                draggable="false"
                style={{
                  transform: `translate3d(${foodOffset.x}px, ${
                    foodOffset.y
                  }px, 0) rotate(${foodOffset.x * 0.25}deg)`,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
