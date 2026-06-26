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
      q: lang === "ur" ? "چیک ان اور چیک آؤٹ کا وقت کیا ہے؟" : "What are the check-in and check-out times?",
      a: lang === "ur"
        ? "معیاری چیک ان وقت دوپہر <strong>2:00 بجے کے بعد</strong> اور چیک آؤٹ دوپہر <strong>12:00 بجے سے پہلے</strong> ہے۔ کمروں کی دستیابی کے مطابق ہم جلدی آمد یا دیر سے روانگی کی درخواست قبول کر سکتے ہیں — ہمیں واٹس ایپ پر پہلے اطلاع دیں۔"
        : "Standard check-in is from <strong>2:00 PM onwards</strong> and check-out is before <strong>12:00 PM (Noon)</strong>. Early check-in or late check-out may be arranged on request based on room availability — WhatsApp us in advance.",
    },
    {
      q: lang === "ur" ? "کیا کار پارکنگ کی سہولت دستیاب ہے؟" : "Is secure parking available on site?",
      a: lang === "ur"
        ? "جی ہاں، گیسٹ ہاؤس کے احاطے میں کار پارکنگ کے لیے محفوظ جگہ دستیاب ہے جو 24/7 سیکیورٹی کیمروں کی نگرانی میں ہوتی ہے۔ تمام چیک ان مہمانوں کے لیے پارکنگ بالکل مفت ہے۔"
        : "Yes, we have a secure gated parking courtyard monitored 24/7 by CCTV and security personnel. Parking is completely free of charge for all checked-in lodging guests.",
    },
    {
      q: lang === "ur" ? "کیا کمرے کے کرایہ میں ناشتہ شامل ہے؟" : "Is breakfast included in the room price?",
      a: lang === "ur"
        ? "ہم مہمانوں کو صبح کی چائے/کافی اور بسکٹ بالکل مفت پیش کرتے ہیں۔ مکمل روایتی لاہوری ناشتہ (حلوہ پوری، انڈا پراٹھا اور چائے) معمولی ادائیگی پر دستیاب ہے۔"
        : "We offer complimentary morning tea, coffee, and biscuits. A full traditional Lahori breakfast (Halwa Puri, egg paratha, and Kashmiri Chai) can be arranged fresh on request for a nominal additional charge.",
    },
    {
      q: lang === "ur" ? "ادائیگی کے کون سے طریقے قبول کیے جاتے ہیں؟" : "What payment methods do you accept?",
      a: lang === "ur"
        ? "ہم آمد پر کیش (PKR)، <strong>ایزی پیسہ</strong>، <strong>جاز کیش</strong>، براہ راست بینک ٹرانسفر (ABL)، اور کریڈٹ/ڈیبٹ کارڈز قبول کرتے ہیں۔ مکمل کرایہ چیک ان کے وقت وصول کیا جاتا ہے۔"
        : "We accept <strong>Cash (PKR)</strong>, <strong>Easypaisa</strong>, <strong>JazzCash</strong>, bank transfers (Allied Bank), and credit/debit cards at reception. Full payment for the booked duration is collected at check-in.",
    },
    {
      q: lang === "ur" ? "میں اپنی بکنگ کیسے تبدیل یا منسوخ کر سکتا ہوں؟" : "How can I modify or cancel my reservation?",
      a: lang === "ur"
        ? "آپ چیک ان کی تاریخ سے <strong>24 گھنٹے پہلے</strong> تک اپنی بکنگ بالکل مفت منسوخ یا تبدیل کر سکتے ہیں۔ اس کے لیے ہمارے واٹس ایپ یا ہیلپ لائن نمبر پر رابطہ کریں اور اپنی بکنگ آئی ڈی بتائیں۔"
        : "Reservations can be cancelled or modified completely free of charge up to <strong>24 hours before</strong> the check-in date. Contact us on WhatsApp or call with your Booking ID to make changes.",
    },
    {
      q: lang === "ur" ? "کیا کمروں میں تیز رفتار وائی فائی کی سہولت موجود ہے؟" : "Do you have high-speed Wi-Fi in the rooms?",
      a: lang === "ur"
        ? "جی ہاں، پورے گیسٹ ہاؤس میں <strong>50+ Mbps</strong> رفتار کا فائبر وائی فائی کنکشن دستیاب ہے۔ تمام کمروں، لابی اور چھت پر سگنل بالکل کلیئر آتے ہیں — پاس ورڈ چیک ان پر دیا جاتا ہے۔"
        : "Yes, we have a dedicated high-speed <strong>fiber broadband</strong> connection with dual-band Wi-Fi covering all rooms, the lobby, rooftop, and dining area at speeds consistently above 50 Mbps. Password provided at check-in.",
    },
    {
      q: lang === "ur" ? "کیا لانڈری سروس دستیاب ہے؟" : "Is laundry service available?",
      a: lang === "ur"
        ? "جی ہاں، ہم مہمانوں کے لیے وقفے کے روزانہ کپڑے دھونے اور استری کی سروس پیش کرتے ہیں۔ کپڑے صبح دیں اور شام تک واپس پائیں۔ معمولی فیس لاگو ہوتی ہے۔"
        : "Yes, we offer a same-day laundry and steam ironing service for guests. Drop off your clothes in the morning and collect them pressed by evening. A nominal service fee applies.",
    },
    {
      q: lang === "ur" ? "کیا ایئرپورٹ ٹرانسفر کی سہولت دستیاب ہے؟" : "Do you offer airport pickup or transfer service?",
      a: lang === "ur"
        ? "ہاں، ہم لاہور اور اسلام آباد کے ہوائی اڈوں سے گیسٹ ہاؤس تک گاڑی کی سہولت فراہم کر سکتے ہیں۔ بکنگ کے وقت یا واٹس ایپ پر ایک دن پہلے درخواست دیں۔ الگ فیس لاگو ہوگی۔"
        : "Yes, we can arrange car transfers from Lahore (Allama Iqbal Airport) and Islamabad airports to the guest house. Request at the time of booking or WhatsApp us at least 24 hours before arrival. Separate fee applies.",
    },
    {
      q: lang === "ur" ? "کیا گروپ بکنگ کے لیے خصوصی قیمتیں ہیں؟" : "Are there group booking discounts available?",
      a: lang === "ur"
        ? "جی ہاں، 3 یا زیادہ کمروں کی ایک ساتھ بکنگ پر ہم خصوصی ڈسکاؤنٹ پیش کرتے ہیں۔ گروپ بکنگ کے لیے ہمارے نمبر پر واٹس ایپ کریں اور تاریخیں اور کمروں کی تعداد بتائیں۔"
        : "Yes, we offer special group rates for bookings of 3 or more rooms simultaneously. WhatsApp us with your travel dates, number of rooms needed, and group size for a customized quote.",
    },
    {
      q: lang === "ur" ? "کیا گیسٹ ہاؤس میں بچوں کے لیے اضافی بستر کا انتظام ہو سکتا ہے؟" : "Can extra beds or cribs be arranged for children?",
      a: lang === "ur"
        ? "ہاں، چھوٹے بچوں کے لیے کوٹ (crib) اور 10 سال سے بڑے بچوں کے لیے فولڈنگ بیڈ دستیاب ہے۔ بکنگ کے وقت یا چیک ان سے 24 گھنٹے پہلے اطلاع دیں۔ معمولی اضافی چارج ہو سکتا ہے۔"
        : "Yes, cribs for infants and rollaway fold-out beds for older children can be arranged on request. Please notify us at booking time or at least 24 hours before check-in. A small additional charge may apply.",
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
      <header className="sub-header" style={{ backgroundImage: "url('/images/hotel_lobby.jpg')" }}>
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
                    <div className="accordion-content-inner" dangerouslySetInnerHTML={{ __html: faq.a }}></div>
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
