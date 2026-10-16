"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiUser,
  FiBookOpen,
  FiBriefcase,
  FiDollarSign,
  FiShoppingBag,
  FiClipboard,
  FiCheck,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";

import styles from "./ApplicationForm.module.css";

const steps = [
  { title: "Personal", fullTitle: "Personal Information", icon: FiUser },
  {
    title: "Education",
    fullTitle: "Education Qualification",
    icon: FiBookOpen,
  },
  {
    title: "Occupation",
    fullTitle: "Occupation Information",
    icon: FiBriefcase,
  },
  {
    title: "Financial",
    fullTitle: "Financial Information",
    icon: FiDollarSign,
  },
  {
    title: "Operations",
    fullTitle: "Restaurant Operations",
    icon: FiShoppingBag,
  },
  {
    title: "Additional",
    fullTitle: "Additional Information",
    icon: FiClipboard,
  },
];

const initialValues = {
  firstName: "",
  lastName: "",
  contactNumber: "",
  email: "",
  citizenOf: "",
  state: "",
  city: "",
  zipCode: "",
  permanentAddress: "",
  dob: "",
  gender: "",
  panCardNo: "",
  aadhaarCardNumber: "",
  linkedinProfileLink: "",

  educationQualification: "",
  yearOfPassing: "",
  institutionName: "",

  currentOccupation: "",
  employerDesignation: "",
  companyNames: "",
  businessType: "",
  natureOfBusiness: "",
  productsServices: "",
  yearsInBusiness: "",
  peopleEmployed: "",
  businessTurnover: "",

  annualIncomeCurrent: "",
  annualIncomeOther: "",
  investmentComfortable: "",
  financeSource: "",
  partnershipPlan: "",

  appealsToRollsMania: "",
  visitedAsCustomer: "",
  visitFrequency: "",
  involvement: "",
  openingTimeline: "",
  numberOfStores: "",
  interestedCity: "",
  interestedArea: "",
  ownOrRent: "",
  businessSkills: "",

  legalProceedings: "",
  criminalRecord: "",
  agreeToDisclaimer: false,
};

const fieldGroups = {
  personal: [
    { name: "firstName", label: "First Name", required: true },
    { name: "lastName", label: "Last Name", required: true },
    {
      name: "contactNumber",
      label: "Contact Number",
      required: true,
      type: "tel",
      maxLength: 10,
    },
    {
      name: "email",
      label: "Email Address",
      required: true,
      type: "email",
    },
    {
      name: "citizenOf",
      label: "Citizen Of",
      required: true,
      placeholder: "Enter your citizenship",
    },
    {
      name: "state",
      label: "State",
      required: true,
      placeholder: "Enter your state",
    },
    { name: "city", label: "City", required: true },
    {
      name: "zipCode",
      label: "Zip Code",
      required: true,
      maxLength: 6,
    },
    {
      name: "permanentAddress",
      label: "Permanent Address",
      required: true,
      type: "textarea",
      full: true,
    },
    {
      name: "dob",
      label: "Date of Birth",
      required: true,
      type: "date",
    },
    {
      name: "gender",
      label: "Gender",
      required: true,
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    { name: "panCardNo", label: "PAN Card No." },
    { name: "aadhaarCardNumber", label: "Aadhaar Card Number" },
    {
      name: "linkedinProfileLink",
      label: "LinkedIn Profile Link",
      type: "url",
      full: true,
    },
  ],

  education: [
    {
      name: "educationQualification",
      label: "Education Qualification",
      required: true,
      placeholder: "Enter your highest qualification",
    },
    {
      name: "yearOfPassing",
      label: "Year of Passing",
      required: true,
      type: "number",
      placeholder: "e.g. 2025",
    },
    {
      name: "institutionName",
      label: "Name of Institution",
      required: true,
      full: true,
    },
  ],

  occupation: [
    {
      name: "currentOccupation",
      label: "Current Occupation",
      required: true,
      type: "select",
      options: ["Business", "Employed"],
      full: true,
    },
    {
      name: "employerDesignation",
      label: "Name of Current Employer / Designation",
      placeholder: "Enter employer and designation",
      full: true,
    },
  ],

  business: [
    {
      name: "companyNames",
      label: "Company Name(s)",
      required: true,
      full: true,
    },
    {
      name: "businessType",
      label: "Type of Business",
      required: true,
      type: "select",
      options: [
        "Proprietorship",
        "Partnership",
        "Private Limited",
        "Public Limited",
      ],
      full: true,
    },
    {
      name: "natureOfBusiness",
      label: "Nature of Business",
      required: true,
    },
    {
      name: "productsServices",
      label: "Products / Services",
      required: true,
    },
    {
      name: "yearsInBusiness",
      label: "Years in Business",
      required: true,
      type: "number",
    },
    {
      name: "peopleEmployed",
      label: "People Employed",
      required: true,
      type: "number",
    },
    {
      name: "businessTurnover",
      label: "Turnover (in Rs. lakhs)",
      required: true,
      type: "number",
      full: true,
    },
  ],

  financial: [
    {
      name: "annualIncomeCurrent",
      label: "Annual Income of Current Occupation",
      required: true,
      type: "number",
      placeholder: "Annual income in rupees",
    },
    {
      name: "annualIncomeOther",
      label: "Annual Income from Other Sources",
      required: true,
      type: "number",
      placeholder: "Annual income in rupees",
    },
    {
      name: "investmentComfortable",
      label: "Are you comfortable with an investment amount of ₹15–25 lakhs?",
      required: true,
      type: "radio",
      options: ["Yes", "No"],
      full: true,
    },
    {
      name: "financeSource",
      label: "How will you finance the store?",
      required: true,
      type: "radio",
      options: ["From an Individual Source", "Loan from Bank"],
      full: true,
    },
    {
      name: "partnershipPlan",
      label:
        "Are you planning to open in partnership? If yes, provide details.",
      required: true,
      type: "textarea",
      full: true,
    },
  ],

  operations: [
    {
      name: "appealsToRollsMania",
      label: "What appeals to you about owning Rolls Mania?",
      required: true,
      type: "textarea",
      full: true,
    },
    {
      name: "visitedAsCustomer",
      label: "Have you visited Rolls Mania as a customer?",
      required: true,
      type: "radio",
      options: ["Yes", "No"],
      full: true,
    },
    {
      name: "visitFrequency",
      label: "How frequently do you visit?",
      required: true,
      placeholder: "Describe your visit frequency",
      full: true,
    },
    {
      name: "involvement",
      label: "How involved will you be in operating the restaurant?",
      required: true,
      type: "radio",
      options: ["0%", "50%", "100%"],
      full: true,
    },
    {
      name: "openingTimeline",
      label: "When are you planning to open Rolls Mania?",
      required: true,
      type: "radio",
      options: [
        "1 Month",
        "2 Months",
        "3 Months",
        "4 Months",
        "Not Decided Yet",
      ],
      full: true,
    },
    {
      name: "numberOfStores",
      label: "How many stores are you planning to open?",
      required: true,
      type: "number",
    },
    {
      name: "interestedCity",
      label: "In which city are you interested in opening Rolls Mania?",
      required: true,
    },
    {
      name: "interestedArea",
      label: "Which area within the above-mentioned city?",
      required: true,
      full: true,
    },
    {
      name: "ownOrRent",
      label: "Do you have your own place to open, or will you be renting?",
      required: true,
      type: "radio",
      options: ["Own", "Rented"],
      full: true,
    },
    {
      name: "businessSkills",
      label:
        "List some skills you possess that will assist you in being a successful business partner.",
      required: true,
      type: "textarea",
      full: true,
    },
  ],

  additional: [
    {
      name: "legalProceedings",
      label:
        "Has a judgment, lien, bankruptcy, or litigation been filed against you or have you been involved in any litigation proceeding within the last 5 years?",
      required: true,
      type: "radio",
      options: ["Yes", "No"],
      full: true,
    },
    {
      name: "criminalRecord",
      label: "Do you have a criminal record?",
      required: true,
      type: "radio",
      options: ["Yes", "No"],
      full: true,
    },
  ],
};

function Field({ field, value, onChange, error }) {
  const id = `application-${field.name}`;
  const commonProps = {
    id,
    name: field.name,
    value: value ?? "",
    onChange,
    required: field.required,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
  };

  return (
    <div className={`${styles.field} ${field.full ? styles.fieldFull : ""}`}>
      <label htmlFor={id}>
        {field.label}
        {field.required && <span className={styles.required}> *</span>}
      </label>

      {field.type === "textarea" ? (
        <textarea
          {...commonProps}
          rows={4}
          placeholder={field.placeholder || "Enter your answer"}
        />
      ) : field.type === "select" ? (
        <select {...commonProps}>
          <option value="">Select an option</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "radio" ? (
        <div className={styles.radioGroup}>
          {field.options.map((option) => (
            <label className={styles.radioOption} key={option}>
              <input
                type="radio"
                name={field.name}
                value={option}
                checked={value === option}
                onChange={onChange}
                required={field.required && !value}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      ) : (
        <input
          {...commonProps}
          type={field.type || "text"}
          placeholder={
            field.placeholder || `Enter ${field.label.toLowerCase()}`
          }
          maxLength={field.maxLength}
          min={field.type === "number" ? 0 : undefined}
          autoComplete={
            field.name === "email"
              ? "email"
              : field.name === "contactNumber"
              ? "tel"
              : undefined
          }
        />
      )}

      {error && (
        <p className={styles.fieldError} id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ApplicationForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState("");

  const [foodOffset, setFoodOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const handleFoodMouseMove = (event) => {
    if (!heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setFoodOffset({
      x: x * 16,
      y: y * 16,
    });
  };

  const handleFoodMouseLeave = () => {
    setFoodOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("rollsManiaFranchiseDetails");

      if (saved) {
        const details = JSON.parse(saved);
        const nameParts = (details.name || "")
          .trim()
          .split(/\s+/)
          .filter(Boolean);

        setValues((previous) => ({
          ...previous,
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" "),
          email: details.email || "",
          contactNumber: details.phone || "",
        }));
      }
    } catch {
      // The form remains usable if session storage is unavailable.
    }
  }, []);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSubmissionMessage("");
  };

  const getFieldsForStep = (stepIndex) => {
    if (stepIndex === 0) return fieldGroups.personal;
    if (stepIndex === 1) return fieldGroups.education;

    if (stepIndex === 2) {
      return values.currentOccupation === "Business"
        ? [...fieldGroups.occupation, ...fieldGroups.business]
        : fieldGroups.occupation;
    }

    if (stepIndex === 3) return fieldGroups.financial;
    if (stepIndex === 4) return fieldGroups.operations;
    return fieldGroups.additional;
  };

  const validateStep = () => {
    const fields = getFieldsForStep(activeStep);
    const nextErrors = {};

    fields.forEach((field) => {
      const value = values[field.name];

      if (field.required && !String(value ?? "").trim()) {
        nextErrors[field.name] = "This field is required.";
        return;
      }

      if (
        field.name === "email" &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        nextErrors.email = "Please enter a valid email address.";
      }

      if (
        field.name === "contactNumber" &&
        value &&
        !/^[6-9]\d{9}$/.test(value)
      ) {
        nextErrors.contactNumber =
          "Enter a valid 10-digit Indian mobile number.";
      }

      if (field.name === "zipCode" && value && !/^\d{5,6}$/.test(value)) {
        nextErrors.zipCode = "Enter a valid 5- or 6-digit zip code.";
      }
    });

    if (activeStep === 5 && !values.agreeToDisclaimer) {
      nextErrors.agreeToDisclaimer =
        "Please accept the declaration to continue.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goToStep = (index) => {
    setActiveStep(index);
    setErrors({});
    setSubmissionMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!validateStep()) return;
    goToStep(Math.min(activeStep + 1, steps.length - 1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateStep()) return;

    // Front-end only: connect your approved submission endpoint before launch.
    setSubmissionMessage(
      "All sections are complete. The form is validated in your browser, but online submission has not been connected yet."
    );
  };

  const ActiveIcon = steps[activeStep].icon;
  const progress = ((activeStep + 1) / steps.length) * 100;
  const currentFields = getFieldsForStep(activeStep);

  return (
    <main className={styles.page}>
      <section
        className={styles.hero}
        ref={heroRef}
        onMouseMove={handleFoodMouseMove}
        onMouseLeave={handleFoodMouseLeave}
      >
        <div className={`rm-container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>ROLLS MANIA FRANCHISE</span>

            <h1>
              APPLICATION
              <br />
              <span>FORM</span>
            </h1>

            <p>
              Let’s get to know you better. Complete the steps below to apply
              for a Rolls Mania franchise.
            </p>

            <div className={styles.breadcrumb}>
              <span>Home</span>
              <span>/</span>
              <span>Open Your RM</span>
              <span>/</span>
              <strong>Application</strong>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <img
              src="/assets/rolls-mania/openyourrm/openyourrm-hero-food.png"
              alt=""
              draggable="false"
              style={{
                transform: `translate3d(${foodOffset.x}px, ${foodOffset.y}px, 0)`,
              }}
            />
          </div>
        </div>
      </section>

      <section className={styles.applicationSection}>
        <div className={styles.applicationContainer}>
          <div className={styles.pageIntro}>
            <span className={styles.sectionEyebrow}>
              YOUR FRANCHISE JOURNEY
            </span>
            <h2>Let’s build something great together.</h2>
            <p>
              Complete all six sections. Your progress is shown below so you
              always know where you are.
            </p>
          </div>

          <div className={styles.progressArea}>
            <div className={styles.progressLabels}>
              <span>
                STEP {activeStep + 1} OF {steps.length}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>

            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              aria-label="Application progress"
            >
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <nav className={styles.stepper} aria-label="Application sections">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const completed = index < activeStep;
              const active = index === activeStep;

              return (
                <button
                  type="button"
                  key={step.title}
                  className={[
                    styles.stepItem,
                    active ? styles.stepActive : "",
                    completed ? styles.stepCompleted : "",
                  ].join(" ")}
                  onClick={() => {
                    if (index <= activeStep) goToStep(index);
                  }}
                  disabled={index > activeStep}
                  aria-current={active ? "step" : undefined}
                  title={step.fullTitle}
                >
                  <span className={styles.stepCircle}>
                    {completed ? <FiCheck /> : <StepIcon />}
                  </span>
                  <span className={styles.stepLabel}>{step.title}</span>
                </button>
              );
            })}
          </nav>

          <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
            <div className={styles.formHeader}>
              <div className={styles.formIcon}>
                <ActiveIcon />
              </div>
              <div>
                <span className={styles.formStep}>
                  STEP {String(activeStep + 1).padStart(2, "0")}
                </span>
                <h2>{steps[activeStep].fullTitle}</h2>
                <p>
                  Fields marked with <span className={styles.required}>*</span>{" "}
                  are required.
                </p>
              </div>
            </div>

            <div className={styles.fieldGrid}>
              {currentFields.map((field) => (
                <Field
                  key={field.name}
                  field={field}
                  value={values[field.name]}
                  onChange={updateField}
                  error={errors[field.name]}
                />
              ))}
            </div>

            {activeStep === 5 && (
              <div className={styles.disclaimer}>
                <h3>Declaration and Disclaimer</h3>
                <p>
                  I confirm that the information provided in this application is
                  accurate and complete to the best of my knowledge. I
                  understand that the information may be reviewed by Rolls Mania
                  as part of its franchise evaluation process.
                </p>

                <label className={styles.consent}>
                  <input
                    type="checkbox"
                    name="agreeToDisclaimer"
                    checked={values.agreeToDisclaimer}
                    onChange={updateField}
                    required
                  />
                  <span>
                    I have read and agree to the declaration above.
                    <span className={styles.required}> *</span>
                  </span>
                </label>

                {errors.agreeToDisclaimer && (
                  <p className={styles.fieldError} role="alert">
                    {errors.agreeToDisclaimer}
                  </p>
                )}
              </div>
            )}

            {submissionMessage && (
              <div className={styles.notice} role="status">
                {submissionMessage}
              </div>
            )}

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.previousButton}
                onClick={() => goToStep(activeStep - 1)}
                disabled={activeStep === 0}
              >
                <FiArrowLeft aria-hidden="true" />
                Previous
              </button>

              {activeStep < steps.length - 1 ? (
                <button
                  type="button"
                  className={styles.nextButton}
                  onClick={handleNext}
                >
                  Next Section
                  <FiArrowRight aria-hidden="true" />
                </button>
              ) : (
                <button type="submit" className={styles.nextButton}>
                  Validate Application
                  <FiCheck aria-hidden="true" />
                </button>
              )}
            </div>
          </form>

          <p className={styles.formNote}>
            Your application details should be reviewed before final submission.
          </p>
        </div>
      </section>
    </main>
  );
}
