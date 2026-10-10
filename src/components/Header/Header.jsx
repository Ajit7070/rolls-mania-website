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
    href: "#about",
  },
  {
    label: "Menu",
    href: "#menu",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
  {
    label: "Store Locator",
    href: "#store-locator",
  },
  {
    label: "Contact Us",
    href: "contact",
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
              src="/assets/rolls-mania/logo/logo-horizontal.png?v=2"
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

            <a href="#open-your-rm" className={styles.rmButton}>
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
              href="#open-your-rm"
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
