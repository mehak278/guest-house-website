"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <span className="logo-icon">🏡</span>
              <span className="logo-text">{t("heroTitle")}</span>
            </Link>
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
              <li><Link href="/">{t("navHome")}</Link></li>
              <li><Link href="/locations">{t("navLocations")}</Link></li>
              <li><Link href="/rooms">{t("navRooms")}</Link></li>
              <li><Link href="/dining">{t("navDining")}</Link></li>
              <li><Link href="/services">{t("navServices")}</Link></li>
              <li><Link href="/gallery">{t("navGallery")}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t("footerColGuide")}</h4>
            <ul className="footer-links">
              <li><Link href="/about">{t("navAbout")}</Link></li>
              <li><Link href="/attractions">{t("navAttractions")}</Link></li>
              <li><Link href="/faq">{t("navFaq")}</Link></li>
              <li><Link href="/contact">{t("navContact")}</Link></li>
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
