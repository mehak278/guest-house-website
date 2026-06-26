"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROOMS } from "@/data/rooms";
import RoomModal from "@/components/RoomModal";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("1");
  const { lang, t } = useLanguage();

  const testimonials = [
    {
      text: lang === "ur"
        ? "کمرہ بالکل صاف ستھرا تھا، اور بستر انتہائی آرام دہ تھا۔ میزبان نے بکنگ کے دوران بھرپور مدد کی، جس سے چیک ان آسان ہو گیا۔ اکیلے مسافروں کے لیے بہترین جگہ!"
        : "The room was absolutely spotless, and the bed was incredibly comfortable. The host was super helpful through the whole booking process. Strongly recommended for solo travelers!",
      author: lang === "ur" ? "زینب ملک" : "Zainab Malik",
      location: lang === "ur" ? "کاروباری مسافر | اسلام آباد" : "Business Traveler · Islamabad",
      stars: 5,
    },
    {
      text: lang === "ur"
        ? "ہم فیملی سوئٹ میں 3 راتیں قیام پذیر رہے۔ کمرے کشادہ تھے، اے سی بہترین کام کر رہے تھے، اور کچن کی سہولت بہت اچھی تھی۔ علاقہ پرسکون اور بالکل محفوظ ہے۔"
        : "We stayed in the Family Suite for 3 nights. Super spacious, fully functional AC, clean bathrooms and a fantastic common kitchen. The area is safe and very peaceful.",
      author: lang === "ur" ? "فرحان احمد" : "Farhan Ahmed",
      location: lang === "ur" ? "فیملی ٹور | کراچی" : "Family Vacation · Karachi",
      stars: 5,
    },
    {
      text: lang === "ur"
        ? "کاروباری دورے کے دوران میں نے ایگزیکٹو روم استعمال کیا۔ تیز وائی فائی، بڑی میز، اور پرسکون ماحول کام کرنے کے لیے بہترین تھا۔ اگلے مہینے دوبارہ بکنگ کروں گا۔"
        : "As a corporate traveler, I loved the Executive Room. Fast Wi-Fi, perfect work desk, and an incredibly quiet environment to focus. Will definitely book again next month.",
      author: lang === "ur" ? "عثمان شیخ" : "Usman Sheikh",
      location: lang === "ur" ? "سافٹ ویئر کنسلٹنٹ | لاہور" : "Software Consultant · Lahore",
      stars: 5,
    },
  ];

  const whyUs = [
    {
      icon: "fa-shield-alt",
      title: lang === "ur" ? "100% محفوظ ماحول" : "100% Secure Environment",
      desc: lang === "ur"
        ? "سی سی ٹی وی نگرانی اور 24/7 سیکیورٹی گارڈ کے ساتھ آپ کی حفاظت ہماری ذمہ داری ہے۔"
        : "CCTV surveillance and round-the-clock security staff ensure your safety at all times.",
    },
    {
      icon: "fa-medal",
      title: lang === "ur" ? "پریمیم معیار کی ضمانت" : "Premium Quality Guarantee",
      desc: lang === "ur"
        ? "ہر کمرہ روزانہ صاف کیا جاتا ہے۔ بستر، تولیے اور سہولیات بین الاقوامی معیار کے مطابق ہیں۔"
        : "Every room is cleaned daily. Bedding, towels, and amenities meet international hospitality standards.",
    },
    {
      icon: "fa-headset",
      title: lang === "ur" ? "24/7 مہمان سپورٹ" : "24/7 Guest Support",
      desc: lang === "ur"
        ? "کسی بھی وقت واٹس ایپ یا کال پر ہمارا عملہ آپ کی مدد کے لیے دستیاب ہے۔"
        : "Our team is reachable anytime on WhatsApp or call to handle all your requests promptly.",
    },
    {
      icon: "fa-tags",
      title: lang === "ur" ? "بہترین قیمت کی ضمانت" : "Best Price Guarantee",
      desc: lang === "ur"
        ? "براہ راست بک کریں اور کسی بھی آن لائن پلیٹ فارم سے بہتر قیمت پائیں۔"
        : "Book directly with us and get the best available rate — better than any third-party platform.",
    },
  ];

  // GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text — faster delays so content appears immediately after loader
    gsap.from(".hero-tagline", { opacity: 0, y: -20, duration: 0.7, delay: 0.1, ease: "power3.out" });
    gsap.from(".hero-title", { opacity: 0, y: 30, duration: 0.9, delay: 0.25, ease: "power3.out" });
    gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 0.9, delay: 0.4, ease: "power3.out" });
    gsap.from(".hero-actions", { opacity: 0, scale: 0.95, duration: 0.7, delay: 0.55, ease: "power3.out" });
    gsap.from(".hero-badges .badge", { opacity: 0, y: 20, stagger: 0.1, duration: 0.6, delay: 0.65, ease: "power3.out" });

    // Quick Booking Bar
    gsap.from(".quick-book-bar", {
      opacity: 0, y: 20, duration: 0.8, delay: 0.9, ease: "power2.out",
    });

    // Intro text
    gsap.from(".intro-text-block > *", {
      scrollTrigger: { trigger: ".intro-text-block", start: "top 80%" },
      opacity: 0, y: 30, stagger: 0.15, duration: 1, ease: "power2.out",
    });

    gsap.from(".intro-image-frame", {
      scrollTrigger: { trigger: ".intro-image-block", start: "top 80%" },
      opacity: 0, x: 40, duration: 1.2, ease: "power3.out",
    });

    gsap.from(".floating-badge", {
      scrollTrigger: { trigger: ".intro-image-block", start: "top 80%" },
      opacity: 0, scale: 0.8, delay: 0.4, duration: 0.8, ease: "back.out(1.7)",
    });

    // Why Us cards
    gsap.from(".why-card", {
      scrollTrigger: { trigger: ".why-grid", start: "top 80%" },
      opacity: 0, y: 25, stagger: 0.12, duration: 0.8, ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const featuredRooms = ROOMS.filter((r) => r.highlight || r.id === "standard");

  const handleQuickBook = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    if (guests) params.set("guests", guests);
    window.location.href = `/booking?${params.toString()}`;
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="hero" id="home" style={{ backgroundImage: "url('/images/hotel_lobby.jpg')" }}>
        <div className="hero-content">
          <p className="hero-tagline">{t("heroTagline")}</p>
          <h1 className="hero-title">{t("heroTitle")}</h1>
          <p className="hero-subtitle">{t("heroSubtitle")}</p>
          <div className="hero-actions">
            <a href="/rooms" className="btn btn-primary btn-lg">
              {t("heroExplore")}
            </a>
            <a href="/booking" className="btn btn-light btn-lg">
              {t("heroBook")}
            </a>
          </div>
        </div>
        <div className="hero-badges">
          <div className="badge"><i className="fas fa-star"></i> {t("heroBadgeRating")}</div>
          <div className="badge"><i className="fas fa-wifi"></i> {t("heroBadgeWifi")}</div>
          <div className="badge"><i className="fas fa-map-marker-alt"></i> {t("heroBadgeLocation")}</div>
          <div className="badge"><i className="fas fa-shield-alt"></i> {lang === "ur" ? "24/7 سیکیورٹی" : "24/7 Security"}</div>
        </div>
      </section>

      {/* ─── QUICK BOOKING BAR ─── */}
      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <form className="quick-book-bar" onSubmit={handleQuickBook}>
          <div className="quick-book-field">
            <label><i className="fas fa-sign-in-alt"></i> {lang === "ur" ? "آمد" : "Check-in"}</label>
            <input
              type="date"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              placeholder="dd-mm-yyyy"
            />
          </div>
          <div className="quick-book-divider"></div>
          <div className="quick-book-field">
            <label><i className="fas fa-sign-out-alt"></i> {lang === "ur" ? "رخصتی" : "Check-out"}</label>
            <input
              type="date"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
            />
          </div>
          <div className="quick-book-divider"></div>
          <div className="quick-book-field">
            <label><i className="fas fa-users"></i> {lang === "ur" ? "مہمان" : "Guests"}</label>
            <select value={guests} onChange={(e) => setGuests(e.target.value)}>
              <option value="1">{lang === "ur" ? "1 مہمان" : "1 Guest"}</option>
              <option value="2">{lang === "ur" ? "2 مہمان" : "2 Guests"}</option>
              <option value="3">{lang === "ur" ? "3 مہمان" : "3 Guests"}</option>
              <option value="4">{lang === "ur" ? "4 مہمان" : "4 Guests"}</option>
              <option value="5+">{lang === "ur" ? "5+ مہمان" : "5+ Guests"}</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ flexShrink: 0, alignSelf: "flex-end" }}>
            <i className="fas fa-search"></i> {lang === "ur" ? "کمرہ تلاش کریں" : "Search Rooms"}
          </button>
        </form>
      </div>

      {/* ─── TRUST STRIP ─── */}
      <div className="trust-strip">
        <div className="container">
          <div className="trust-strip-inner">
            <div className="trust-item">
              <i className="fas fa-check-circle"></i>
              <span>{lang === "ur" ? "فوری بکنگ تصدیق" : "Instant Booking Confirmation"}</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <i className="fas fa-ban"></i>
              <span>{lang === "ur" ? "24 گھنٹے مفت منسوخی" : "Free 24h Cancellation"}</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <i className="fas fa-money-bill-wave"></i>
              <span>{lang === "ur" ? "کوئی پوشیدہ چارجز نہیں" : "No Hidden Charges"}</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <i className="fas fa-id-card"></i>
              <span>{lang === "ur" ? "محفوظ اور نجی قیام" : "Safe & Private Stay"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── INTRO STORY ─── */}
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
                <img src="/images/standard_room.jpg" alt="Guest House Interior" loading="lazy" />
              </div>
              <div className="floating-badge">
                <span className="num">5+</span>
                <span className="lbl">{lang === "ur" ? "سالہ مہمان نوازی" : t("yearsStat")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-section bg-alt">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{lang === "ur" ? "ہمیں کیوں چنیں؟" : "Why Choose Us"}</span>
            <h2 className="section-title">{lang === "ur" ? "آپ کا آرام ہماری ترجیح" : "Your Comfort, Our Priority"}</h2>
            <p className="section-desc">
              {lang === "ur"
                ? "ہم صرف ایک گیسٹ ہاؤس نہیں — ہم آپ کو گھر کا سکون فراہم کرتے ہیں۔"
                : "We're not just a guest house — we deliver the warmth and comfort of home with professional hospitality."}
            </p>
          </div>
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "28px", marginTop: "0" }}>
            {whyUs.map((item, i) => (
              <div key={i} className="why-card service-card">
                <div className="service-icon-wrap">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED ROOMS ─── */}
      <section className="py-section" id="featuredRooms">
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
                {!room.available && (
                  <div className="room-badge unavailable">{lang === "ur" ? "مکمل بک" : "Fully Booked"}</div>
                )}
                <div className="room-img-container">
                  <img src={room.image} alt={room.name} loading="lazy" />
                </div>
                <div className="room-body">
                  <h3 className="room-name">
                    {lang === "ur" && room.id === "standard" ? "اسٹینڈرڈ کمرہ" :
                     lang === "ur" && room.id === "deluxe" ? "ڈیلکس سوئٹ" :
                     lang === "ur" && room.id === "penthouse" ? "پینٹ ہاؤس سوئٹ" : room.name}
                  </h3>
                  <p className="room-desc">
                    {lang === "ur" && room.id === "standard"
                      ? "ایک صاف ستھرا اور آرام دہ کمرہ جس میں تمام بنیادی سہولیات موجود ہیں۔"
                      : lang === "ur" && room.id === "deluxe"
                      ? "کشادہ اور بہترین فرنشڈ کمرہ جس میں عمدہ بستر اور گرم پانی کے ساتھ اٹیچڈ باتھ روم موجود ہے۔"
                      : room.description}
                  </p>
                  <div className="room-features">
                    {room.features.slice(0, 4).map((f, i) => (
                      <span key={i} className="feature-tag">
                        {lang === "ur"
                          ? f.includes("Bed") ? "بستر کی سہولت"
                          : f.includes("Air") || f.includes("AC") ? "اے سی"
                          : f.includes("Bath") ? "اٹیچڈ باتھ"
                          : f.includes("Wi-Fi") ? "وائی فائی"
                          : f.includes("TV") ? "سمارٹ ٹی وی"
                          : f
                          : f}
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
            <a href="/rooms" className="btn btn-outline">
              {t("btnViewAllRooms")} <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
            </a>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
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
                <span className="quote-icon">"</span>
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

      {/* ─── CTA BANNER ─── */}
      <section className="cta-banner" style={{ backgroundImage: "url('/images/dining_area.jpg')" }}>
        <div className="cta-content">
          <h2>{t("ctaTitle")}</h2>
          <p>{t("ctaDesc")}</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/booking" className="btn btn-primary btn-lg">
              {t("navBookOnline")}
            </a>
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light btn-lg"
            >
              <i className="fab fa-whatsapp"></i> {lang === "ur" ? "واٹس ایپ پر پوچھیں" : "WhatsApp Us"}
            </a>
          </div>
        </div>
      </section>

      {/* Room Detail Modal */}
      <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </>
  );
}
