"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function Dining() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    gsap.from(".dining-hero-content > *", {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);

  const foodItems = [
    {
      id: "breakfast",
      title: t("foodBreakfastTitle"),
      desc: t("foodBreakfastDesc"),
      image: "images/dining_area.jpg",
      icon: "fa-egg",
      tags: lang === "ur" ? ["روایتی حلوہ پوری", "نہاری اور پراٹھے", "تازہ میٹھی لسی"] : ["Halwa Puri Platter", "Nihari & Chanay", "Sweet Lassi"],
    },
    {
      id: "bbq",
      title: t("foodBBQTitle"),
      desc: t("foodBBQDesc"),
      image: "images/lahore_attractions.jpg",
      icon: "fa-fire",
      tags: lang === "ur" ? ["ملائی چکن بوٹی", "سیخ کباب", "گرم روغنی نان"] : ["Chicken Malai Boti", "Beef Seekh Kebab", "Hot Roghni Naan"],
    },
    {
      id: "chai",
      title: t("foodChaiTitle"),
      desc: t("foodChaiDesc"),
      image: "images/standard_room.jpg",
      icon: "fa-mug-hot",
      tags: lang === "ur" ? ["گلابی کشمیری چائے", "بادام اور پستہ ٹاپنگ", "آلو سموسہ پکوڑے"] : ["Brewed Pink Tea", "Almond & Pistachios", "Samosa Platter"],
    },
    {
      id: "roomservice",
      title: t("foodRoomServiceTitle"),
      desc: t("foodRoomServiceDesc"),
      image: "images/hotel_lobby.jpg",
      icon: "fa-bell",
      tags: lang === "ur" ? ["24/7 سروس", "چکن کڑھائی و بریانی", "کانٹینینٹل کلب سینڈوچ"] : ["24/7 Active Service", "Chicken Biryani/Karahi", "Continental Club Sandwiches"],
    },
  ];

  return (
    <>
      {/* Dining Hero */}
      <section className="dining-hero" style={{ backgroundImage: "linear-gradient(rgba(28, 24, 21, 0.6), rgba(28, 24, 21, 0.6)), url('images/dining_area.jpg')" }}>
        <div className="dining-hero-content">
          <span className="section-label">{t("diningLabel")}</span>
          <h1 className="hero-title">{t("diningTitle")}</h1>
          <p className="hero-subtitle">{t("diningDesc")}</p>
        </div>
      </section>

      {/* Intro Text Section */}
      <section className="py-section">
        <div className="container">
          <div className="dining-intro-grid">
            <div className="dining-intro-text">
              <span className="section-label">{lang === "ur" ? "روایتی مہمان نوازی" : "Gourmet Kitchen"}</span>
              <h2>{t("diningIntroTitle")}</h2>
              <p>{t("diningIntroDesc")}</p>
              <p>
                {lang === "ur"
                  ? "ہمارے شیفس صرف تازہ اور بہترین اجزاء استعمال کرتے ہیں تاکہ آپ کو گھر جیسا ذائقہ اور صفائی مل سکے۔ ہم اپنے مہمانوں کے لیے خصوصی ڈائٹ پلانز اور بچوں کے لیے پسندیدہ مینو بھی فراہم کرتے ہیں۔"
                  : "We source our ingredients fresh from local organic markets daily to ensure the highest standards of hygiene and taste. Special dietary requirements, custom menus for families, and spice-free options for kids are available upon early request."}
              </p>
            </div>
            <div className="dining-intro-image">
              <img src="images/dining_area.jpg" alt="Chef's Dining Area" className="dining-img-frame" />
            </div>
          </div>
        </div>
      </section>

      {/* Signature Offerings Menu */}
      <section className="py-section bg-alt">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{t("diningLabel")}</span>
            <h2 className="section-title">{t("menuTitle")}</h2>
            <p className="section-desc">{t("menuSubtitle")}</p>
          </div>

          <div className="dining-grid">
            {foodItems.map((item) => (
              <div key={item.id} className="dining-card">
                <div className="dining-card-img">
                  <img src={item.image} alt={item.title} />
                  <div className="dining-icon-badge">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                </div>
                <div className="dining-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="dining-tags">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="dining-tag-item">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complimentary Tea Banner */}
      <section className="py-section cta-teal-accent">
        <div className="container text-center">
          <i className="fas fa-mug-hot tea-banner-icon"></i>
          <h2>{lang === "ur" ? "آمد پر کشمیری چائے پیش کی جائے گی" : "Welcome Hospitality Awaits"}</h2>
          <p>
            {lang === "ur"
              ? "ہمارے کسی بھی گیسٹ ہاؤس میں چیک ان کرنے پر تمام معزز مہمانوں کو روایتی کشمیری چائے اور لوازمات بالکل مفت پیش کیے جائیں گے۔"
              : "Enjoy a complimentary cup of authentic Kashmiri pink tea or traditional Lahori green tea brewed with cardamom and nuts immediately upon check-in at any of our branches."}
          </p>
          <Link href="/booking" className="btn btn-primary btn-lg" style={{ marginTop: "24px" }}>
            {t("navBookOnline")}
          </Link>
        </div>
      </section>
    </>
  );
}
