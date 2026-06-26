"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function Locations() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    gsap.from(".location-hero-content > *", {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);

  const branches = [
    {
      id: "lahore",
      name: t("branchLahoreName"),
      desc: t("branchLahoreDesc"),
      image: "/images/hotel_lobby.jpg",
      address: lang === "ur" ? "123 مین گلبرگ III، لاہور، پاکستان" : "123 Main Gulberg III, Lahore, Pakistan",
      phone: "+92 300 0000000",
      checkin: "2:00 PM",
      checkout: "12:00 PM",
      badge: "LAHORE",
      features: lang === "ur"
        ? ["گلبرگ III سینٹرل لوکیشن", "چھت پر باربی کیو لاؤنج", "شاندار ہریالی باغ", "24/7 سیکیورٹی گارڈ", "مفت پارکنگ"]
        : ["Gulberg III Central Location", "Rooftop BBQ Lounge", "Lush Green Garden", "24/7 Security Guard", "Free Parking"],
    },
    {
      id: "islamabad",
      name: t("branchIslamabadName"),
      desc: t("branchIslamabadDesc"),
      image: "/images/islamabad_branch.jpg",
      address: lang === "ur" ? "F-7 مرکز، اسلام آباد، پاکستان" : "F-7 Markaz, Islamabad, Pakistan",
      phone: "+92 321 0000000",
      checkin: "2:00 PM",
      checkout: "12:00 PM",
      badge: "ISLAMABAD",
      features: lang === "ur"
        ? ["مارگلہ پہاڑیوں کا شاندار منظر", "100Mbps تیز انٹرنیٹ", "کانفرنس روم دستیاب", "پرسکون رہائشی سیکٹر", "مفت پارکنگ"]
        : ["Margalla Hills Scenic View", "100Mbps Fiber Wi-Fi", "Business Conference Room", "Quiet F-7 Residential Sector", "Free Parking"],
    },
    {
      id: "karachi",
      name: t("branchKarachiName"),
      desc: t("branchKarachiDesc"),
      image: "/images/dining_area.jpg",
      address: lang === "ur" ? "بلاک 4 کلفٹن، کراچی، پاکستان" : "Block 4 Clifton, Karachi, Pakistan",
      phone: "+92 333 0000000",
      checkin: "2:00 PM",
      checkout: "12:00 PM",
      badge: "KARACHI",
      features: lang === "ur"
        ? ["سمندر کا شاندار نظارہ", "ساحلی ہوائی بالکونی", "پاور جنریٹر بیک اپ", "کلفٹن شاپنگ ایریا کے قریب", "نجی سوئمنگ پول"]
        : ["Stunning Sea View Terrace", "Coastal Breeze Balcony", "100% Generator Power Backup", "Near Clifton Shopping", "Private Pool Access"],
    },
    {
      id: "murree",
      name: t("branchMurreeName"),
      desc: t("branchMurreeDesc"),
      image: "/images/murree_branch.jpg",
      address: lang === "ur" ? "مال روڈ، مری، پنجاب، پاکستان" : "Main Mall Road, Murree, Punjab, Pakistan",
      phone: "+92 345 0000000",
      checkin: "2:00 PM",
      checkout: "12:00 PM",
      badge: "MURREE",
      features: lang === "ur"
        ? ["مال روڈ سے براہ راست رسائی", "مرکزی ہیٹنگ سسٹم", "لکڑی کا فائر پلیس", "کشمیری چائے لاؤنج", "پائن کے جنگل میں پیدل سیر"]
        : ["Direct Mall Road Access", "Central Radiator Heating", "Classic Wood Fireplace", "Kashmiri Chai Lounge", "Pine Forest Trekking Trails"],
    },
  ];

  return (
    <>
      {/* Locations Hero */}
      <section className="locations-hero">
        <div className="location-hero-content">
          <span className="section-label">{t("locationsLabel")}</span>
          <h1 className="hero-title">{t("locationsTitle")}</h1>
          <p className="hero-subtitle">{t("locationsDesc")}</p>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-section bg-alt">
        <div className="container branches-container">
          <div className="branches-grid-sec">
            {branches.map((branch) => (
              <div key={branch.id} className="branch-card">
                <div className="branch-img">
                  <img src={branch.image} alt={branch.name} />
                  <div className="branch-badge">
                    <i className="fas fa-map-marker-alt"></i> {branch.id.toUpperCase()}
                  </div>
                </div>
                <div className="branch-info">
                  <h3>{branch.name}</h3>
                  <p className="branch-desc">{branch.desc}</p>

                  <p className="branch-address">
                    <i className="fas fa-map-marker-alt"></i> <span>{branch.address}</span>
                  </p>
                  <p className="branch-address" style={{ marginBottom: "4px" }}>
                    <i className="fas fa-phone-alt"></i> <span>{branch.phone}</span>
                  </p>
                  <p className="branch-address" style={{ marginBottom: "20px" }}>
                    <i className="fas fa-clock"></i>
                    <span>
                      {lang === "ur" ? "آمد" : "Check-in"}: {branch.checkin} &nbsp;|&nbsp; {lang === "ur" ? "رخصتی" : "Check-out"}: {branch.checkout}
                    </span>
                  </p>

                  <div className="branch-features-list">
                    {branch.features.map((feat, idx) => (
                      <span key={idx} className="branch-feat-item">
                        <i className="fas fa-check-circle"></i> {feat}
                      </span>
                    ))}
                  </div>

                  <div className="branch-footer-cta" style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
                    <a href={`/rooms?location=${branch.id}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                      {lang === "ur" ? "کمرے دیکھیں" : "View Rooms"}
                    </a>
                    <a
                      href={`https://wa.me/923000000000?text=${encodeURIComponent(lang === "ur" ? `السلام علیکم! مجھے ${branch.name} میں بکنگ کروانی ہے۔` : `Hello! I'd like to book a room at ${branch.name}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      style={{ flex: 1 }}
                    >
                      <i className="fab fa-whatsapp"></i> {lang === "ur" ? "واٹس ایپ" : "WhatsApp"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Guide Showcase */}
      <section className="py-section">
        <div className="container">
          <div className="map-showcase-grid">
            <div className="map-info-panel">
              <span className="section-label">{lang === "ur" ? "رہنمائی" : "Travel Guide"}</span>
              <h2>{lang === "ur" ? "ہمارے تمام گیسٹ ہاؤسز انتہائی محفوظ مقامات پر ہیں" : "Secure, Premium & Convenient Stay"}</h2>
              <p>
                {lang === "ur" 
                  ? "دی کمفرٹ اِن کے تمام گیسٹ ہاؤسز پاکستان کے محفوظ ترین علاقوں میں بنائے گئے ہیں۔ تمام شاخوں پر سیکیورٹی گارڈز، سی سی ٹی وی کیمرے اور نجی پارکنگ کی سہولت دستیاب ہے۔"
                  : "All of Comfort Inn's locations are situated in gated or highly patrolled secure residential sectors of Gulberg (Lahore), F-7 (Islamabad), Clifton (Karachi), and Mall Road (Murree). We provide safe parking and private spaces for corporate executives and traveling families."}
              </p>
              <div className="map-perks">
                <div className="map-perk-item">
                  <i className="fas fa-shield-halved"></i>
                  <div>
                    <h4>{lang === "ur" ? "24/7 سیکیورٹی اور کیمرے" : "24/7 Gated CCTV Security"}</h4>
                    <p>{lang === "ur" ? "مکمل فول پروفر سیکیورٹی فراہم کی جاتی ہے" : "Ensuring peace of mind for you and your family."}</p>
                  </div>
                </div>
                <div className="map-perk-item">
                  <i className="fas fa-bolt"></i>
                  <div>
                    <h4>{lang === "ur" ? "بجلی کا متبادل نظام" : "Full Power Generator Backup"}</h4>
                    <p>{lang === "ur" ? "بغیر کسی تعطل کے اے سی اور وائی فائی کی فراہمی" : "Stay connected and cool with zero load-shedding."}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="map-graphic">
              {/* Mock Map Layout using Styled CSS Grid */}
              <div className="mock-map">
                <div className="mock-map-bg">
                  <div className="map-road horizontal"></div>
                  <div className="map-road vertical"></div>
                  <div className="map-pin lahore">
                    <span className="pin-dot"></span>
                    <span className="pin-lbl">Lahore (Gulberg)</span>
                  </div>
                  <div className="map-pin islamabad">
                    <span className="pin-dot"></span>
                    <span className="pin-lbl">Islamabad (F-7)</span>
                  </div>
                  <div className="map-pin karachi">
                    <span className="pin-dot"></span>
                    <span className="pin-lbl">Karachi (Clifton)</span>
                  </div>
                  <div className="map-pin murree">
                    <span className="pin-dot"></span>
                    <span className="pin-lbl">Murree (Mall Road)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
