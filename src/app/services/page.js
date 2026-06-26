"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPage() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { lang, t } = useLanguage();

  const amenities = [
    { 
      icon: "fa-wifi", 
      title: lang === "ur" ? "تیز رفتار انٹرنیٹ" : "High-Speed Wi-Fi", 
      desc: lang === "ur" ? "پورے گیسٹ ہاؤس، لابی اور کھانے کے کمرے میں لامحدود تیز رفتار فائبر وائی فائی کی سہولت۔" : "Unlimited high-speed fiber internet coverage across bedrooms, lobby, and dining areas." 
    },
    { 
      icon: "fa-snowflake", 
      title: lang === "ur" ? "ایئر کنڈیشنگ (اے سی)" : "Air Conditioning", 
      desc: lang === "ur" ? "گرمی کے موسم کے لیے ہر کمرے میں انفرادی طور پر کنٹرولڈ انورٹر اے سی نصب ہیں۔" : "Independently controlled luxury split inverter air conditioning fitted inside all rooms." 
    },
    { 
      icon: "fa-utensils", 
      title: lang === "ur" ? "مشترکہ کچن" : "Shared Kitchen", 
      desc: lang === "ur" ? "کھانا گرم کرنے، چائے بنانے یا فریج استعمال کرنے کے لیے تمام برتنوں سے لیس مشترکہ کچن۔" : "Fully equipped kitchen space containing refrigerator, microwave, and stove for guest usage." 
    },
    { 
      icon: "fa-shield-alt", 
      title: lang === "ur" ? "24/7 سیکیورٹی گارڈ" : "24/7 Security", 
      desc: lang === "ur" ? "محفوظ رہائشی علاقہ، چوبیس گھنٹے سیکیورٹی گارڈ اور سی سی ٹی وی کیمروں کی نگرانی۔" : "Highly guarded location with CCTV surveillance cameras and security personnel on site." 
    },
    { 
      icon: "fa-dumbbell", 
      title: lang === "ur" ? "جدید فٹنس جِم" : "Premium Gym & Fitness", 
      desc: lang === "ur" ? "مہمانوں کے لیے جدید ترین ورزش کی مشینیں اور ٹریڈمل بالکل مفت دستیاب ہیں۔" : "Fully equipped fitness gym featuring advanced treadmills, free weights, and cross-trainers." 
    },
    { 
      icon: "fa-swimming-pool", 
      title: lang === "ur" ? "گرم سوئمنگ پول" : "Heated Swimming Pool", 
      desc: lang === "ur" ? "لاہور اور اسلام آباد شاخوں پر سال بھر کھلا رہنے والا خوبصورت گرم سوئمنگ پول۔" : "Year-round heated pool with comfortable poolside sun loungers (available in Lahore & Islamabad)." 
    },
    { 
      icon: "fa-gamepad", 
      title: lang === "ur" ? "بچوں کا پلے زون" : "Kids Play Area", 
      desc: lang === "ur" ? "فیملیز کے بچوں کے لیے اندرونی محفوظ اور تفریحی پلے ایریا جس میں سلائیڈز اور کھلونے شامل ہیں۔" : "Indoor fun zone for kids containing slides, ball pool, soft toys, and board games." 
    },
    { 
      icon: "fa-spa", 
      title: lang === "ur" ? "اسپا اور سونا" : "Luxury Spa & Sauna", 
      desc: lang === "ur" ? "تھکاوٹ دور کرنے کے لیے مساج سروسز اور گرم بھاپ والا پرسکون سونا روم۔" : "Rejuvenating Swedish massages, steam baths, and sauna room to wind down after a busy day." 
    },
    { 
      icon: "fa-tshirt", 
      title: lang === "ur" ? "لانڈری سروس" : "Laundry Service", 
      desc: lang === "ur" ? "مہمانوں کے لیے کپڑے دھونے، استری کرنے اور ڈرائی کلیننگ کی فوری سہولیات۔" : "Professional quick-wash laundry and steam ironing facilities available on demand." 
    },
    { 
      icon: "fa-parking", 
      title: lang === "ur" ? "محفوظ کار پارکنگ" : "Secure Parking", 
      desc: lang === "ur" ? "گیسٹ ہاؤس کے احاطے کے اندر مہمانوں کی گاڑیوں کے لیے بالکل مفت اور محفوظ پارکنگ۔" : "Free, secure on-site courtyard parking area dedicated for our lodging guests." 
    },
    { 
      icon: "fa-coffee", 
      title: lang === "ur" ? "روایتی ناشتہ اور چائے" : "Breakfast Options", 
      desc: lang === "ur" ? "لذیذ لاہوری ناشتہ (حلوہ پوری، چنے، پراٹھا، انڈا) اور الائچی دار کڑک چائے آپ کے کمرے میں دستیاب۔" : "Delicious traditional Pakistani breakfast spread (Halwa Puri, Lahori Chana, Paratha, Eggs) and Elaichi Chai." 
    },
    { 
      icon: "fa-tv", 
      title: lang === "ur" ? "اسمارٹ کیبل ٹی وی" : "Smart Cable TV", 
      desc: lang === "ur" ? "ہر کمرے میں ایل ای ڈی اسمارٹ ٹی وی جس پر نیٹ فلکس اور تمام پاکستانی چینلز دستیاب ہیں۔" : "High definition TV entertainment screens loaded with Netflix and local satellite channels." 
    }
  ];

  const regulations = [
    {
      icon: "fa-clock",
      title: lang === "ur" ? "آمد اور روانگی کی پالیسی" : "Check-in & Check-out Policies",
      content: lang === "ur" 
        ? "چیک ان کا وقت دوپہر <strong>2:00 بجے کے بعد</strong> ہے اور رخصتی کا وقت دوپہر <strong>12:00 بجے سے پہلے</strong> ہے۔ پہلے آمد یا دیر سے رخصتی کی درخواست کمرے کی دستیابی سے مشروط ہے۔"
        : "Our standard check-in time is from <strong>2:00 PM onwards</strong>, and check-out is before <strong>12:00 PM (Noon)</strong>. Early check-in or late check-out requests are subject to room availability."
    },
    {
      icon: "fa-id-card",
      title: lang === "ur" ? "شناختی دستاویزات کی ضرورت" : "Identification Requirements",
      content: lang === "ur"
        ? "ملکی قوانین کے مطابق تمام پاکستانی مہمانوں کے لیے اصل <strong>شناختی کارڈ (CNIC)</strong> اور غیر ملکیوں کے لیے اصل <strong>پاسپورٹ اور ویزا</strong> چیک ان کے وقت دکھانا لازمی ہے۔"
        : "As per local security laws, all domestic guests are required to produce a valid CNIC card, and foreign nationals must show an original passport with a valid visa."
    },
    {
      icon: "fa-ban",
      title: lang === "ur" ? "ملاقاتی اور سگریٹ نوشی کی پالیسی" : "Visitors & Smoking Policies",
      content: lang === "ur"
        ? "مہمانوں کے آرام اور رازداری کے لیے رات 10:00 بجے کے بعد بیرونی ملاقاتیوں کا کمروں میں جانا منع ہے۔ تمام کمرے سگریٹ نوشی سے پاک ہیں، لان میں مخصوص جگہ دستیاب ہے۔"
        : "To guarantee privacy, out-of-house visitors are restricted inside guest rooms after 10:00 PM. Additionally, all bedrooms are strictly non-smoking."
    },
    {
      icon: "fa-history",
      title: lang === "ur" ? "منسوخی اور تبدیلی کی پالیسی" : "Cancellation & Modification",
      content: lang === "ur"
        ? "آمد کی تاریخ سے <strong>24 گھنٹے پہلے</strong> بکنگ منسوخ یا تبدیل کرنے پر کوئی فیس چارج نہیں کی جائے گی۔ اس کے بعد منسوخی پر ایک رات کا کرایہ چارج ہوگا۔"
        : "Reservations can be cancelled or modified free of charge up to <strong>24 hours prior</strong> to the scheduled check-in date."
    }
  ];

  // GSAP animations
  useEffect(() => {
    // Animate service cards immediately on mount
    gsap.from(".service-card", {
      opacity: 0,
      y: 30,
      stagger: 0.06,
      duration: 0.6,
      ease: "power2.out"
    });

    // Animate accordion items immediately on mount
    gsap.from(".accordion-item", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out"
    });
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <>
      {/* Sub Header */}
      <header className="sub-header" style={{ backgroundImage: "url('/images/dining_area.jpg')" }}>
        <div className="sub-header-content">
          <h1 className="sub-header-title">{t("servicesTitle")}</h1>
          <div className="breadcrumb">
            <a href="/">{t("navHome")}</a>
            <i className="fas fa-chevron-right"></i>
            <span>{t("navServices")}</span>
          </div>
        </div>
      </header>

      {/* Amenities Catalog */}
      <section className="py-section">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{t("serviceLabel")}</span>
            <h2 className="section-title">{t("serviceTitleMain")}</h2>
            <p className="section-desc">{t("servicesDesc")}</p>
          </div>

          <div className="services-grid">
            {amenities.map((am, i) => (
              <div key={i} className="service-card">
                <div className="service-icon-wrap">
                  <i className={`fas ${am.icon}`}></i>
                </div>
                <h3>{am.title}</h3>
                <p>{am.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulations Accordion */}
      <section className="py-section bg-alt">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{t("rulesTitle")}</span>
            <h2 className="section-title">{t("rulesTitle")}</h2>
            <p className="section-desc">{t("rulesDesc")}</p>
          </div>

          <div className="rules-container">
            {regulations.map((reg, idx) => (
              <div key={idx} className={`accordion-item ${activeAccordion === idx ? "active" : ""}`}>
                <div className="accordion-header" onClick={() => toggleAccordion(idx)}>
                  <h3>
                    <i className={`far ${reg.icon}`}></i> {reg.title}
                  </h3>
                  <i className="fas fa-chevron-down accordion-icon"></i>
                </div>
                <div
                  className="accordion-content"
                  style={{
                    maxHeight: activeAccordion === idx ? "300px" : "0px",
                    transition: "max-height 0.4s ease-out"
                  }}
                >
                  <div className="accordion-content-inner" dangerouslySetInnerHTML={{ __html: reg.content }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
