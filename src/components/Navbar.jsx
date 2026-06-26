"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  // Scroll Shadow Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme Init & LocalStorage sync
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const closeMenu = () => setIsOpen(false);

  // Link Active state checker
  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
      <div className="container nav-inner">
        <Link href="/" className="logo" onClick={closeMenu}>
          <span className="logo-icon">🏡</span>
          <span className="logo-text">{t("heroTitle")}</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link href="/" className={isActive("/") ? "active" : ""}>
              {t("navHome")}
            </Link>
          </li>
          <li>
            <Link href="/locations" className={isActive("/locations") ? "active" : ""}>
              {t("navLocations")}
            </Link>
          </li>
          <li>
            <Link href="/rooms" className={isActive("/rooms") ? "active" : ""}>
              {t("navRooms")}
            </Link>
          </li>
          <li>
            <Link href="/dining" className={isActive("/dining") ? "active" : ""}>
              {t("navDining")}
            </Link>
          </li>
          <li>
            <Link href="/services" className={isActive("/services") ? "active" : ""}>
              {t("navServices")}
            </Link>
          </li>
          <li>
            <Link href="/gallery" className={isActive("/gallery") ? "active" : ""}>
              {t("navGallery")}
            </Link>
          </li>
          <li>
            <Link href="/about" className={isActive("/about") ? "active" : ""}>
              {t("navAbout")}
            </Link>
          </li>
          <li>
            <Link href="/attractions" className={isActive("/attractions") ? "active" : ""}>
              {t("navAttractions")}
            </Link>
          </li>
          <li>
            <Link href="/faq" className={isActive("/faq") ? "active" : ""}>
              {t("navFaq")}
            </Link>
          </li>
          <li>
            <Link href="/contact" className={isActive("/contact") ? "active" : ""}>
              {t("navContact")}
            </Link>
          </li>
        </ul>

        <div className="nav-right">
          {/* Language Switcher */}
          <button
            className="theme-toggle"
            onClick={() => setLang(lang === "en" ? "ur" : "en")}
            aria-label="Toggle language"
            style={{
              fontFamily: lang === "en" ? "'Noto Nastaliq Urdu', serif" : "'Outfit', sans-serif",
              fontSize: "0.85rem",
              fontWeight: "600",
            }}
          >
            {lang === "en" ? "اردو" : "EN"}
          </button>
          
          {/* Theme Toggle */}
          <button className="theme-toggle" id="themeToggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"} id="themeIcon"></i>
          </button>
          
          <Link href="/booking" className="btn btn-primary btn-sm">
            {t("navBookNow")}
          </Link>
        </div>

        <button className={`hamburger ${isOpen ? "active" : ""}`} id="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`} id="mobileMenu">
        <Link href="/" className={`mobile-link ${isActive("/") ? "active" : ""}`} onClick={closeMenu}>
          {t("navHome")}
        </Link>
        <Link href="/locations" className={`mobile-link ${isActive("/locations") ? "active" : ""}`} onClick={closeMenu}>
          {t("navLocations")}
        </Link>
        <Link href="/rooms" className={`mobile-link ${isActive("/rooms") ? "active" : ""}`} onClick={closeMenu}>
          {t("navRooms")}
        </Link>
        <Link href="/dining" className={`mobile-link ${isActive("/dining") ? "active" : ""}`} onClick={closeMenu}>
          {t("navDining")}
        </Link>
        <Link href="/services" className={`mobile-link ${isActive("/services") ? "active" : ""}`} onClick={closeMenu}>
          {t("navServices")}
        </Link>
        <Link href="/gallery" className={`mobile-link ${isActive("/gallery") ? "active" : ""}`} onClick={closeMenu}>
          {t("navGallery")}
        </Link>
        <Link href="/about" className={`mobile-link ${isActive("/about") ? "active" : ""}`} onClick={closeMenu}>
          {t("navAbout")}
        </Link>
        <Link href="/attractions" className={`mobile-link ${isActive("/attractions") ? "active" : ""}`} onClick={closeMenu}>
          {t("navAttractions")}
        </Link>
        <Link href="/faq" className={`mobile-link ${isActive("/faq") ? "active" : ""}`} onClick={closeMenu}>
          {t("navFaq")}
        </Link>
        <Link href="/contact" className={`mobile-link ${isActive("/contact") ? "active" : ""}`} onClick={closeMenu}>
          {t("navContact")}
        </Link>
        <Link href="/booking" className="btn btn-primary mobile-btn" onClick={closeMenu}>
          {t("navBookOnline")}
        </Link>
      </div>
    </nav>
  );
}
