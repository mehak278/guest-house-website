"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme init
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Close "More" dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setMoreOpen(false);
  };

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Primary links always visible in desktop nav
  const primaryLinks = [
    { href: "/", label: t("navHome") },
    { href: "/rooms", label: t("navRooms") },
    { href: "/dining", label: t("navDining") },
    { href: "/gallery", label: t("navGallery") },
    { href: "/contact", label: t("navContact") },
  ];

  // Secondary links hidden in "More" dropdown
  const moreLinks = [
    { href: "/locations", label: t("navLocations") },
    { href: "/services", label: t("navServices") },
    { href: "/about", label: t("navAbout") },
    { href: "/attractions", label: t("navAttractions") },
    { href: "/faq", label: t("navFaq") },
  ];

  const isMoreActive = moreLinks.some((l) => isActive(l.href));

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
      <div className="container nav-inner">
        {/* Logo */}
        <a href="/" className="logo" onClick={closeMenu}>
          <span className="logo-icon">
            <svg viewBox="0 0 100 100" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
              <path d="M50 8L15 38V88C15 90.2 16.8 92 19 92H81C83.2 92 85 90.2 85 88V38L50 8Z" stroke="var(--accent)" strokeWidth="6" strokeLinejoin="round"/>
              <path d="M35 92V58C35 49.7 41.7 43 50 43C58.3 43 65 49.7 65 58V92" stroke="var(--accent)" strokeWidth="6" strokeLinejoin="round"/>
              <circle cx="50" cy="26" r="7" fill="var(--accent)"/>
            </svg>
          </span>
          <span className="logo-text">{t("heroTitle")}</span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          {primaryLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={isActive(link.href) ? "active" : ""}>
                {link.label}
              </a>
            </li>
          ))}

          {/* More Dropdown */}
          <li className="nav-more-wrapper" ref={moreRef}>
            <button
              className={`nav-more-btn ${moreOpen || isMoreActive ? "active" : ""}`}
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
            >
              {lang === "ur" ? "مزید" : "More"}
              <i className={`fas fa-chevron-down nav-more-arrow ${moreOpen ? "open" : ""}`}></i>
            </button>

            {moreOpen && (
              <div className="nav-dropdown">
                {moreLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`nav-dropdown-item ${isActive(link.href) ? "active" : ""}`}
                    onClick={() => setMoreOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Right Controls */}
        <div className="nav-right">
          {/* Language Toggle */}
          <button
            className="theme-toggle lang-toggle"
            onClick={() => setLang(lang === "en" ? "ur" : "en")}
            aria-label="Toggle language"
          >
            {lang === "en" ? "اردو" : "EN"}
          </button>

          {/* Theme Toggle */}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"}></i>
          </button>

          <a href="/booking" className="btn btn-primary btn-sm">
            {t("navBookNow")}
          </a>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile Menu — all links */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        {[...primaryLinks, ...moreLinks].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`mobile-link ${isActive(link.href) ? "active" : ""}`}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
        <a href="/booking" className="btn btn-primary mobile-btn" onClick={closeMenu}>
          {t("navBookOnline")}
        </a>
      </div>
    </nav>
  );
}
