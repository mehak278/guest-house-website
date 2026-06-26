"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

export default function AttractionsPage() {
  const { lang, t } = useLanguage();

  // Stagger entry
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".attraction-card", {
      scrollTrigger: {
        trigger: ".attractions-grid",
        start: "top 80%",
      },
      opacity: 0,
      y: 35,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const attractions = [
    {
      title: lang === "ur" ? "بادشاہی مسجد" : "Badshahi Mosque",
      desc: lang === "ur" 
        ? "مغلیہ دور کی ایک شاندار تاریخی یادگار جو سرخ پتھروں سے بنی ہے اور لاہور کی تاریخ کا ایک اہم نشان ہے۔"
        : "Constructed in 1673 by the Mughal Emperor Aurangzeb, this grand red sandstone mosque remains one of Lahore's most iconic historical landmarks.",
      image: "images/lahore_attractions.jpg",
      distance: lang === "ur" ? "25 منٹ (15 کلومیٹر)" : "25 mins (15 km)",
      tip: lang === "ur" 
        ? "غروبِ آفتاب کے وقت جائیں جب مسجد پر سنہری روشنی کی جاتی ہے، فوٹوگرافی کے لیے بہترین وقت ہے۔"
        : "Visit during sunset for breathtaking photos and soft glow illumination.",
    },
    {
      title: lang === "ur" ? "لاہور قلعہ (شاہی قلعہ)" : "The Lahore Fort (Shahi Qila)",
      desc: lang === "ur"
        ? "لاہور کا تاریخی قلعہ جس میں شیش محل، دیوانِ خاص اور مغلیہ طرزِ تعمیر کے شاندار شاہکار موجود ہیں۔"
        : "A massive citadel showcasing centuries of architectural styles, containing the famous Sheesh Mahal (Palace of Mirrors) and grand gates.",
      image: "images/hotel_lobby.jpg",
      style: { filter: "hue-rotate(50deg)" },
      distance: lang === "ur" ? "26 منٹ (16 کلومیٹر)" : "26 mins (16 km)",
      tip: lang === "ur"
        ? "تاریخ کی مکمل تفصیلات جاننے کے لیے داخلی دروازے سے گائیڈ ہائر کریں۔"
        : "Hire an authorized local tour guide at the entrance for detailed history.",
    },
    {
      title: lang === "ur" ? "ایم ایم عالم روڈ اور فوڈ اسٹریٹ" : "M.M. Alam Road & Food Street",
      desc: lang === "ur"
        ? "لاہور میں بہترین کھانوں اور شاپنگ کے لیے سب سے مشہور مارکیٹ جہاں روایتی اور مغربی ریسٹورنٹس موجود ہیں۔"
        : "The ultimate culinary district of Lahore. Home to top cafes, fine dining spots, traditional food chains, and designer clothing boutiques.",
      image: "images/dining_area.jpg",
      style: { filter: "saturate(1.5)" },
      distance: lang === "ur" ? "10 منٹ (4.5 کلومیٹر)" : "10 mins (4.5 km)",
      tip: lang === "ur"
        ? "شام کی چہل قدمی اور روایتی کھانے جیسے لاہوری کڑھائی چکھنے کے لیے بہترین جگہ۔"
        : "Perfect place for evening walks and sampling authentic Lahori cuisine.",
    },
    {
      title: lang === "ur" ? "ایمپوریم مال" : "Emporium Mall",
      desc: lang === "ur"
        ? "پاکستان کے بڑے جدید شاپنگ مالز میں سے ایک جہاں عالمی برانڈز، تفریحی زون اور بڑا فوڈ کورٹ دستیاب ہے۔"
        : "One of the largest modern shopping malls in Pakistan, housing international retail outlets, massive food courts, and cineplexes.",
      image: "images/standard_room.jpg",
      style: { filter: "brightness(0.9) contrast(1.1)" },
      distance: lang === "ur" ? "12 منٹ (6 کلومیٹر)" : "12 mins (6 km)",
      tip: lang === "ur"
        ? "خریداری اور بچوں کے کھیل کود کے لیے بہترین انڈور شاپنگ مال۔"
        : "Ideal for indoor family recreation and high-end shopping.",
    },
  ];

  return (
    <>
      {/* Sub Header */}
      <header className="sub-header" style={{ backgroundImage: "url('images/lahore_attractions.jpg')" }}>
        <div className="sub-header-content">
          <h1 className="sub-header-title">{t("attractionsTitle")}</h1>
          <div className="breadcrumb">
            <a href="/">{t("navHome")}</a>
            <i className="fas fa-chevron-right"></i>
            <span>{t("navAttractions")}</span>
          </div>
        </div>
      </header>

      {/* Attractions Grid */}
      <section className="py-section">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{t("attractionLabel")}</span>
            <h2 className="section-title">{t("attractionTitleMain")}</h2>
            <p className="section-desc">{t("attractionsDesc")}</p>
          </div>

          <div className="attractions-grid">
            {attractions.map((att, idx) => (
              <div key={idx} className="attraction-card">
                <div className="attraction-img-wrap">
                  <img src={att.image} alt={att.title} style={att.style} />
                  <div className="attraction-dist-badge">
                    <i className="fas fa-car"></i> <span>{att.distance}</span>
                  </div>
                </div>
                <div className="attraction-body">
                  <h3>{att.title}</h3>
                  <p>{att.desc}</p>
                  <div className="attraction-tip">
                    <i className="far fa-lightbulb"></i>{" "}
                    <span>
                      <strong>{t("attractionTip")}:</strong> {att.tip}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
