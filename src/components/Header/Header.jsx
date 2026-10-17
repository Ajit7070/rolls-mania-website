"use client";

import { useState } from "react";
import Image from "next/image";
import { FiMenu, FiX, FiMapPin } from "react-icons/fi";
import styles from "./Header.module.css";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/AboutUs",
  },
  {
    label: "Menu",
    href: "/MenuPage",
  },
  {
    label: "FAQ",
    href: "/Faq",
  },
  {
    label: "Store Locator",
    href: "/StoreLocator",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className="rm-container">
        <div className={styles.navbar}>
          {/* Logo */}
          <a
            href="/"
            className={styles.logo}
            aria-label="Rolls Mania Home"
            onClick={closeMenu}
          >
            <Image
              src="/assets/rolls-mania/logo/rollsmania-header-logo.png?v=2"
              alt="Rolls Mania"
              width={420}
              height={120}
              priority
              unoptimized
              className={styles.logoImage}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}

            <a href="/OpenYourRM" className={styles.rmButton}>
              OPEN YOUR RM
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((previous) => !previous)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${styles.mobileNav} ${
            menuOpen ? styles.mobileNavOpen : ""
          }`}
        >
          <nav aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={styles.mobileNavLink}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}

            <a
              href="/OpenYourRM"
              className={styles.mobileRmButton}
              onClick={closeMenu}
            >
              <FiMapPin />
              OPEN YOUR RM
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
