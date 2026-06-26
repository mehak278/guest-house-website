"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
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
      image: "images/hotel_lobby.jpg",
      address: lang === "ur" ? "123 مین گلبرگ، لاہور، پاکستان" : "123 Main Gulberg, Lahore, Pakistan",
      features: lang === "ur" 
        ? ["گلبرگ III سینٹرل لوکیشن", "باربی کیو چھت لاؤنج", "شاندار ہریالی", "24/7 سیکیورٹی"]
        : ["Gulberg III Central Location", "Rooftop BBQ Area", "Lush Greenery Garden", "24/7 Elite Security"],
    },
    {
      id: "islamabad",
      name: t("branchIslamabadName"),
      desc: t("branchIslamabadDesc"),
      image: "images/islamabad_branch.jpg",
      address: lang === "ur" ? "ایف 7 مرکز، اسلام آباد، پاکستان" : "F-7 Markaz, Islamabad, Pakistan",
      features: lang === "ur"
        ? ["مارگلہ پہاڑیوں کا منظر", "100Mbps تیز انٹرنیٹ", "کاروباری کانفرنس ہال", "خاموش اور پرسکون ماحول"]
        : ["Margalla Hills Scenic View", "100Mbps Ultra-Fast Wi-Fi", "Business Conference Room", "Quiet Residential Sector"],
    },
    {
      id: "karachi",
      name: t("branchKarachiName"),
      desc: t("branchKarachiDesc"),
      image: "images/dining_area.jpg",
      address: lang === "ur" ? "کلفٹن بلاک 4، کراچی، پاکستان" : "Block 4 Clifton, Karachi, Pakistan",
      features: lang === "ur"
        ? ["سمندر کا شاندار نظارہ", "ساحلی ہوائی لان", "پاور جنریٹر بیک اپ", "کلفٹن شاپنگ ایریاز کے قریب"]
        : ["Stunning Sea View Breeze", "Coastal View Outdoor Deck", "100% Power Generator Backup", "Close to Clifton Shopping Hubs"],
    },
    {
      id: "murree",
      name: t("branchMurreeName"),
      desc: t("branchMurreeDesc"),
      image: "images/murree_branch.jpg",
      address: lang === "ur" ? "مال روڈ نزد پائن ویو، مری، پاکستان" : "Main Mall Road, Murree, Pakistan",
      features: lang === "ur"
        ? ["مال روڈ پر واقع", "مرکزی ہیٹنگ سسٹم", "کشمیری چائے کا لاؤنج", "پائن کے جنگلات اور پہاڑ"]
        : ["Direct Mall Road Access", "Central Radiator Heating", "Kashmiri Chai Fireplace Lounge", "Pine Forest Trekking Trails"],
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
                    <i className="fas fa-directions"></i> <span>{branch.address}</span>
                  </p>
                  
                  <div className="branch-features-list">
                    {branch.features.map((feat, idx) => (
                      <span key={idx} className="branch-feat-item">
                        <i className="fas fa-check-circle"></i> {feat}
                      </span>
                    ))}
                  </div>

                  <div className="branch-footer-cta">
                    <Link href={`/rooms?location=${branch.id}`} className="btn btn-primary btn-md">
                      {lang === "ur" ? "کمرے اور سوئٹس دیکھیں" : "Explore Rooms in Branch"}
                    </Link>
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
