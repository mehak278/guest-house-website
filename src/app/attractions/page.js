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
      image: "/images/lahore_attractions.jpg",
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
      image: "/images/hotel_lobby.jpg",
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
      image: "/images/dining_area.jpg",
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
      image: "/images/standard_room.jpg",
      style: { filter: "brightness(0.9) contrast(1.1)" },
      distance: lang === "ur" ? "12 منٹ (6 کلومیٹر)" : "12 mins (6 km)",
      tip: lang === "ur"
        ? "خریداری اور بچوں کے کھیل کود کے لیے بہترین انڈور شاپنگ مال۔"
        : "Ideal for indoor family recreation and high-end shopping.",
    },
    {
      title: lang === "ur" ? "مینار پاکستان" : "Minar-e-Pakistan",
      desc: lang === "ur"
        ? "1960 میں تعمیر کردہ قومی یادگار جہاں 23 مارچ 1940 کو تاریخی قرارداد پاکستان منظور کی گئی تھی۔ اندر سیڑھیاں چڑھ کر لاہور کا پرانا شہر دیکھا جا سکتا ہے۔"
        : "This iconic national monument marks the site where the Pakistan Resolution was passed in 1940. Climb to the top for a panoramic view of historical Lahore's walled city.",
      image: "/images/hotel_lobby.jpg",
      style: { filter: "brightness(0.85) sepia(0.2)" },
      distance: lang === "ur" ? "22 منٹ (13 کلومیٹر)" : "22 mins (13 km)",
      tip: lang === "ur"
        ? "صبح 9 بجے سے پہلے جائیں — کم بھیڑ ہوتی ہے اور تصویریں بھی اچھی آتی ہیں۔"
        : "Arrive before 9 AM for fewer crowds and better photography conditions.",
    },
    {
      title: lang === "ur" ? "جہانگیر کا مقبرہ" : "Tomb of Jahangir",
      desc: lang === "ur"
        ? "مغل بادشاہ نورالدین جہانگیر کا شاندار مقبرہ جو 17ویں صدی کی مغلیہ فن تعمیر کا بہترین نمونہ ہے — سنگِ مرمر اور جڑاؤ کام کے ساتھ نقش و نگار سے مزین۔"
        : "The stunning 17th-century Mughal mausoleum of Emperor Jahangir, featuring intricate marble inlay work, frescoed ceilings, and lush Charbagh gardens.",
      image: "/images/standard_details.jpg",
      style: {},
      distance: lang === "ur" ? "30 منٹ (18 کلومیٹر)" : "30 mins (18 km)",
      tip: lang === "ur"
        ? "باغ میں پکنک کے لیے چادر اور کھانا ساتھ لے جائیں — خوبصورت اور پرسکون ماحول ہے۔"
        : "Pack a picnic and enjoy the peaceful Charbagh garden around the mausoleum.",
    },
    {
      title: lang === "ur" ? "گلبرگ اور لبرٹی مارکیٹ" : "Gulberg & Liberty Market",
      desc: lang === "ur"
        ? "لاہور کا سب سے مشہور شاپنگ اور تفریح کا علاقہ — کپڑے، جوتے، زیورات، کتابیں اور پاکستانی ملبوسات کے لیے بہترین۔ بہترین ریسٹورنٹس بھی قدم قدم پر ملیں گے۔"
        : "The most vibrant commercial and social hub of Lahore. Perfect for traditional Pakistani clothing, footwear, jewellery, street food, and some of the city's finest restaurants.",
      image: "/images/dining_area.jpg",
      style: { filter: "brightness(1.05) saturate(1.2)" },
      distance: lang === "ur" ? "8 منٹ (3 کلومیٹر)" : "8 mins (3 km)",
      tip: lang === "ur"
        ? "ہفتے کے آخر میں شام 6-9 بجے کے درمیان جائیں — زیادہ دکانیں کھلی ہوتی ہیں اور رونق بھی زیادہ ہوتی ہے۔"
        : "Visit on weekend evenings between 6–9 PM for the best shopping atmosphere and street food experience.",
    },
  ];

  return (
    <>
      {/* Sub Header */}
      <header className="sub-header" style={{ backgroundImage: "url('/images/lahore_attractions.jpg')" }}>
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
