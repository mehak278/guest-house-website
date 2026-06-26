"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { lang, t } = useLanguage();

  const faqs = [
    {
      q: lang === "ur" ? "کیا کار پارکنگ کی سہولت دستیاب ہے؟" : "Is secure parking available on site?",
      a: lang === "ur" 
        ? "جی ہاں، گیسٹ ہاؤس کے احاطے میں کار پارکنگ کے لیے محفوظ جگہ دستیاب ہے جو 24/7 سیکیورٹی کیمروں کی نگرانی میں ہوتی ہے۔ تمام چیک ان مہمانوں کے لیے پارکنگ بالکل مفت ہے۔"
        : "Yes, we have a secure gated parking courtyard monitored 24/7 by CCTV and security personnel. Parking is completely free of charge for all checked-in lodging guests.",
    },
    {
      q: lang === "ur" ? "کیا میں وقت سے پہلے چیک ان یا دیر سے چیک آؤٹ کر سکتا ہوں؟" : "Can I request early check-in or late check-out?",
      a: lang === "ur"
        ? "ہمارا معیاری چیک ان وقت دوپہر 2:00 بجے اور چیک آؤٹ دوپہر 12:00 بجے ہے۔ کمروں کی دستیابی کے مطابق ہم آپ کی درخواست قبول کرنے کی ہر ممکن کوشش کرتے ہیں۔"
        : "Our standard check-in is 2:00 PM and check-out is 12:00 PM. Early check-in or late check-out can be requested when booking. We try our best to accommodate these free of charge based on room availability.",
    },
    {
      q: lang === "ur" ? "کیا کمرے کے کرایہ میں ناشتہ شامل ہے؟" : "Is breakfast included in the room price?",
      a: lang === "ur"
        ? "ہم مہمانوں کو صبح کی چائے/کافی اور بسکٹ بالکل مفت پیش کرتے ہیں۔ مکمل روایتی لاہوری ناشتہ (حلوہ پوری، انڈا پراٹھا اور چائے) معمولی ادائیگی پر دستیاب ہے۔"
        : "We offer complementary continental morning tea, coffee, and biscuits. Full breakfast platters (traditional omelets, paratha or English breakfast) can be prepared fresh on request and added to your bill for a nominal charge.",
    },
    {
      q: lang === "ur" ? "میں اپنی بکنگ کیسے تبدیل یا منسوخ کر سکتا ہوں؟" : "How can I modify or cancel my reservation?",
      a: lang === "ur"
        ? "آپ چیک ان کی تاریخ سے 24 گھنٹے پہلے تک اپنی بکنگ مفت منسوخ یا تبدیل کر سکتے ہیں۔ اس کے لیے ہمارے ہیلپ لائن نمبر پر رابطہ کریں۔"
        : "You can cancel or modify your reservation free of charge up to 24 hours before your check-in date. Simply call our booking team or email us with your confirmation number.",
    },
    {
      q: lang === "ur" ? "ادائیگی کا طریقہ کار کیا ہے؟" : "What payment methods do you accept?",
      a: lang === "ur"
        ? "ہم آمد پر کیش (PKR)، ایزی پیسہ، جاز کیش اور آن لائن بینک ٹرانسفر قبول کرتے ہیں۔ مکمل کرایہ چیک ان کے وقت وصول کیا جاتا ہے۔"
        : "We accept Cash (PKR), Easypaisa, JazzCash, bank transfers, and major credit cards at the reception desk. Payment for the scheduled duration is collected in full at the time of check-in.",
    },
    {
      q: lang === "ur" ? "کیا کمروں میں تیز رفتار وائی فائی کی سہولت موجود ہے؟" : "Do you have high-speed Wi-Fi in the rooms?",
      a: lang === "ur"
        ? "جی ہاں، پورے گیسٹ ہاؤس میں 50 Mbps رفتار کا تیز ترین فائبر وائی فائی کنکشن دستیاب ہے جس کے سگنلز تمام کمروں میں بالکل کلیئر آتے ہیں۔"
        : "Yes, our property is connected to a dedicated high-speed fiber broadband connection. We have dual-band Wi-Fi access points covering all bedrooms, dining areas, and balconies with average speeds exceeding 50 Mbps.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stagger entry
  useEffect(() => {
    gsap.fromTo(
      ".accordion-item",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" }
    );
  }, [searchTerm]);

  const toggleAccordion = (idx) => {
    setActiveAccordion(activeAccordion === idx ? null : idx);
  };

  return (
    <>
      {/* Sub Header */}
      <header className="sub-header" style={{ backgroundImage: "url('images/hotel_lobby.jpg')" }}>
        <div className="sub-header-content">
          <h1 className="sub-header-title">{t("faqTitle")}</h1>
          <div className="breadcrumb">
            <a href="/">{t("navHome")}</a>
            <i className="fas fa-chevron-right"></i>
            <span>{t("navFaq")}</span>
          </div>
        </div>
      </header>

      {/* FAQ Interactive Accordions */}
      <section className="py-section">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{t("faqLabel")}</span>
            <h2 className="section-title">{t("faqTitleMain")}</h2>
            <p className="section-desc">{t("faqDesc")}</p>
          </div>

          {/* Search Box */}
          <div className="faq-search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder={t("faqSearchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rules-container">
            {filteredFaqs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "var(--text-light)" }}>
                {lang === "ur" ? "آپ کی تلاش کے مطابق کوئی سوال نہیں ملا۔" : "No FAQs matched your search keyword."}
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => (
                <div key={idx} className={`accordion-item ${activeAccordion === idx ? "active" : ""}`}>
                  <div className="accordion-header" onClick={() => toggleAccordion(idx)}>
                    <h3>
                      <i className="far fa-question-circle"></i> {faq.q}
                    </h3>
                    <i className="fas fa-chevron-down accordion-icon"></i>
                  </div>
                  <div
                    className="accordion-content"
                    style={{
                      maxHeight: activeAccordion === idx ? "300px" : "0px",
                      transition: "max-height 0.4s ease-out",
                    }}
                  >
                    <div className="accordion-content-inner">{faq.a}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
