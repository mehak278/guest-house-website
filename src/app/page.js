"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROOMS } from "@/data/rooms";
import RoomModal from "@/components/RoomModal";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { lang, t } = useLanguage();

  const testimonials = [
    {
      text: lang === "ur" 
        ? "کمرہ بالکل صاف ستھرا تھا، اور بستر انتہائی آرام دہ تھا۔ میزبان نے بکنگ کے دوران بھرپور مدد کی، جس سے چیک ان آسان ہو گیا۔ اکیلے مسافروں کے لیے بہترین جگہ!"
        : "The room was absolutely spotless, and the bed was incredibly comfortable. The host was helpful, making check-in a breeze. Strongly recommended for solo travelers!",
      author: lang === "ur" ? "زینب ملک" : "Zainab Malik",
      location: lang === "ur" ? "کاروباری مسافر | اسلام آباد" : "Business Traveler | Islamabad",
      stars: 5,
    },
    {
      text: lang === "ur"
        ? "ہم فیملی سوئٹ میں 3 راتیں قیام پذیر رہے۔ کمرے کشادہ تھے، اے سی بہترین کام کر رہے تھے، اور کچن کی سہولت بہت اچھی تھی۔ علاقہ پرسکون اور بالکل محفوظ ہے۔"
        : "We stayed at the Family Suite for 3 nights. Super spacious, fully functional ACs, clean bathrooms and a great common kitchen. The location is safe and quiet.",
      author: lang === "ur" ? "فرحان احمد" : "Farhan Ahmed",
      location: lang === "ur" ? "فیملی ٹور | کراچی" : "Family Vacation | Karachi",
      stars: 5,
    },
    {
      text: lang === "ur"
        ? "کاروباری دورے کے دوران میں نے ایگزیکٹو روم استعمال کیا۔ تیز وائی فائی، بڑی میز، اور پرسکون ماحول کام کرنے کے لیے بہترین تھا۔ اگلے مہینے دوبارہ بکنگ کروں گا۔"
        : "As a corporate traveler, I loved the Executive Room. Fast Wi-Fi, perfect desk, and very quiet environment to focus. Will definitely book again next month.",
      author: lang === "ur" ? "عثمان شیخ" : "Usman Sheikh",
      location: lang === "ur" ? "سافٹ ویئر کنسلٹنٹ | لاہور" : "Software Consultant | Lahore",
      stars: 5,
    },
  ];

  // GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text
    gsap.from(".hero-tagline", { opacity: 0, y: -20, duration: 1, delay: 0.8, ease: "power3.out" });
    gsap.from(".hero-title", { opacity: 0, y: 30, duration: 1.2, delay: 1, ease: "power3.out" });
    gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 1.2, delay: 1.2, ease: "power3.out" });
    gsap.from(".hero-actions", { opacity: 0, scale: 0.95, duration: 1, delay: 1.4, ease: "power3.out" });
    gsap.from(".hero-badges .badge", { opacity: 0, y: 20, stagger: 0.15, duration: 1, delay: 1.6, ease: "power3.out" });

    // Intro Scroll Triggers
    gsap.from(".intro-text-block > *", {
      scrollTrigger: {
        trigger: ".intro-text-block",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(".intro-image-frame", {
      scrollTrigger: {
        trigger: ".intro-image-block",
        start: "top 80%",
      },
      opacity: 0,
      x: 40,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(".floating-badge", {
      scrollTrigger: {
        trigger: ".intro-image-block",
        start: "top 80%",
      },
      opacity: 0,
      scale: 0.8,
      delay: 0.4,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const featuredRooms = ROOMS.filter((r) => r.highlight || r.id === "standard");

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home" style={{ backgroundImage: "url('images/hotel_lobby.jpg')" }}>
        <div className="hero-content">
          <p className="hero-tagline">{t("heroTagline")}</p>
          <h1 className="hero-title">{t("heroTitle")}</h1>
          <p className="hero-subtitle">{t("heroSubtitle")}</p>
          <div className="hero-actions">
            <Link href="/rooms" className="btn btn-primary btn-lg">
              {t("heroExplore")}
            </Link>
            <Link href="/booking" className="btn btn-light btn-lg">
              {t("heroBook")}
            </Link>
          </div>
        </div>
        <div className="hero-badges">
          <div className="badge">
            <i className="fas fa-star"></i> {t("heroBadgeRating")}
          </div>
          <div className="badge">
            <i className="fas fa-wifi"></i> {t("heroBadgeWifi")}
          </div>
          <div className="badge">
            <i className="fas fa-map-marker-alt"></i> {t("heroBadgeLocation")}
          </div>
        </div>
      </section>

      {/* Intro Story Section */}
      <section className="py-section">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-text-block">
              <span className="section-label">{t("introLabel")}</span>
              <h2 className="section-title">{t("introTitle")}</h2>
              <p>{t("introDesc1")}</p>
              <p>{t("introDesc2")}</p>

              <div className="intro-signature">
                <span className="sig-img">{t("heroTitle")}</span>
                <div>
                  <p className="sig-name">{lang === "ur" ? "محمد احسن" : "M. Ahsan"}</p>
                  <p className="sig-title">{t("directorTitle")}</p>
                </div>
              </div>
            </div>
            <div className="intro-image-block">
              <div className="intro-image-frame">
                <img src="images/standard_room.jpg" alt="Guest House Interior" />
              </div>
              <div className="floating-badge">
                <span className="num">5+</span>
                <span className="lbl">{lang === "ur" ? "سالہ مہمان نوازی" : t("yearsStat")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-section bg-alt" id="featuredRooms">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{t("featuredLabel")}</span>
            <h2 className="section-title">{t("featuredTitle")}</h2>
            <p className="section-desc">{t("featuredDesc")}</p>
          </div>

          <div className="rooms-grid">
            {featuredRooms.map((room) => (
              <div
                key={room.id}
                className={`room-card ${room.highlight ? "highlighted" : ""} ${!room.available ? "unavailable" : ""}`}
              >
                {room.highlight && (
                  <div className="room-badge">
                    <i className="fas fa-star"></i> {lang === "ur" ? "خاص کمرہ" : "Featured"}
                  </div>
                )}
                {!room.available && <div className="room-badge unavailable">{lang === "ur" ? "مکمل بک" : "Fully Booked"}</div>}
                <div className="room-img-container">
                  <img src={room.image} alt={room.name} />
                </div>
                <div className="room-body">
                  <h3 className="room-name">
                    {lang === "ur" && room.id === "standard" ? "اسٹینڈرڈ کمرہ" :
                     lang === "ur" && room.id === "deluxe" ? "ڈیلکس سوئٹ" : room.name}
                  </h3>
                  <p className="room-desc">
                    {lang === "ur" && room.id === "standard" ? "ایک صاف ستھرا اور آرام دہ کمرہ جس میں تمام بنیادی سہولیات موجود ہیں — اکیلے مسافروں یا مختصر قیام کے لیے بہترین۔" :
                     lang === "ur" && room.id === "deluxe" ? "کشادہ اور بہترین فرنشڈ کمرہ جس میں عمدہ بستر اور گرم پانی کے ساتھ اٹیچڈ باتھ روم موجود ہے۔" : room.description}
                  </p>
                  <div className="room-features">
                    {room.features.slice(0, 4).map((f, i) => (
                      <span key={i} className="feature-tag">
                        {lang === "ur" ? (
                          f.includes("Single") || f.includes("Bed") ? "بستر کی سہولت" :
                          f.includes("Air Conditioning") || f.includes("AC") ? "اے سی" :
                          f.includes("Bathroom") || f.includes("Bath") ? "اٹیچڈ باتھ" :
                          f.includes("Wi-Fi") ? "وائی فائی" : f
                        ) : f}
                      </span>
                    ))}
                  </div>
                  <div className="room-footer">
                    <div className="room-price">
                      <span className="price-amount" style={{ fontFamily: "inherit" }}>
                        {room.currency} {room.price.toLocaleString()}
                      </span>
                      <span className="price-per">/ {room.per === "night" ? (lang === "ur" ? "رات" : "night") : room.per}</span>
                    </div>
                    {room.available ? (
                      <button className="btn btn-primary btn-sm" onClick={() => setSelectedRoom(room)}>
                        {t("btnDetailsBook")}
                      </button>
                    ) : (
                      <button className="btn btn-disabled btn-sm" disabled>
                        {t("btnUnavailable")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: "48px" }}>
            <Link href="/rooms" className="btn btn-outline">
              {t("btnViewAllRooms")}
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-section testimonial-sec">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{t("testLabel")}</span>
            <h2 className="section-title">{t("testTitle")}</h2>
            <p className="section-desc">{t("testDesc")}</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((test, index) => (
              <div key={index} className="testimonial-card">
                <span className="quote-icon">“</span>
                <p className="testimonial-text">{test.text}</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{test.author}</h4>
                    <p>{test.location}</p>
                    <div className="rating">
                      {Array.from({ length: test.stars }).map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="cta-banner" style={{ backgroundImage: "url('images/dining_area.jpg')" }}>
        <div className="cta-content">
          <h2>{t("ctaTitle")}</h2>
          <p>{t("ctaDesc")}</p>
          <Link href="/booking" className="btn btn-primary btn-lg">
            {t("navBookOnline")}
          </Link>
        </div>
      </section>

      {/* Room Detail Modal popup */}
      <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </>
  );
}
