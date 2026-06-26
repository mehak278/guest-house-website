"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="logo">
              <span className="logo-icon">
                <svg viewBox="0 0 100 100" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
                  <path d="M50 8L15 38V88C15 90.2 16.8 92 19 92H81C83.2 92 85 90.2 85 88V38L50 8Z" stroke="var(--accent)" strokeWidth="6" strokeLinejoin="round"/>
                  <path d="M35 92V58C35 49.7 41.7 43 50 43C58.3 43 65 49.7 65 58V92" stroke="var(--accent)" strokeWidth="6" strokeLinejoin="round"/>
                  <circle cx="50" cy="26" r="7" fill="var(--accent)"/>
                </svg>
              </span>
              <span className="logo-text">{t("heroTitle")}</span>
            </a>
            <p>{t("footerBrandDesc")}</p>
            <div className="footer-socials">
              <a href="#" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t("footerColLinks")}</h4>
            <ul className="footer-links">
              <li><a href="/">{t("navHome")}</a></li>
              <li><a href="/locations">{t("navLocations")}</a></li>
              <li><a href="/rooms">{t("navRooms")}</a></li>
              <li><a href="/dining">{t("navDining")}</a></li>
              <li><a href="/services">{t("navServices")}</a></li>
              <li><a href="/gallery">{t("navGallery")}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t("footerColGuide")}</h4>
            <ul className="footer-links">
              <li><a href="/about">{t("navAbout")}</a></li>
              <li><a href="/attractions">{t("navAttractions")}</a></li>
              <li><a href="/faq">{t("navFaq")}</a></li>
              <li><a href="/contact">{t("navContact")}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t("footerColContact")}</h4>
            <ul className="footer-contact">
              <li><i className="fas fa-phone-alt"></i> <span>{t("footerPhone")}</span></li>
              <li><i className="fas fa-envelope"></i> <span>{t("footerEmail")}</span></li>
              <li><i className="fas fa-map-marker-alt"></i> <span>{t("footerAddress")}</span></li>
              <li><i className="fas fa-clock"></i> <span dangerouslySetInnerHTML={{ __html: t("footerTimings") }}></span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t("footerCopy")}</p>
          <div className="footer-bottom-links">
            <a href="#">{t("footerPrivacy")}</a>
            <a href="#">{t("footerTerms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
