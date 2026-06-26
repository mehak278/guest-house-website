"use client";

import { useEffect, useState } from "react";
import { ROOMS } from "@/data/rooms";
import RoomModal from "@/components/RoomModal";
import { gsap } from "gsap";
import { useLanguage } from "@/context/LanguageContext";

export default function RoomsPage() {
  const [filter, setFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { lang, t } = useLanguage();

  // Read URL query parameter for location on mount safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const loc = params.get("location");
      if (loc && ["lahore", "islamabad", "karachi", "murree"].includes(loc)) {
        setLocationFilter(loc);
      }
    }
  }, []);

  const filteredRooms = ROOMS.filter((room) => {
    const matchesCategory = filter === "all" || room.category === filter;
    const matchesLocation = locationFilter === "all" || room.location === locationFilter;
    return matchesCategory && matchesLocation;
  });

  // Fade-in animation when rooms or filters change
  useEffect(() => {
    gsap.fromTo(
      ".room-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" }
    );
  }, [filter, locationFilter]);

  return (
    <>
      {/* Sub Header */}
      <header className="sub-header" style={{ backgroundImage: "url('/images/hotel_lobby.jpg')" }}>
        <div className="sub-header-content">
          <h1 className="sub-header-title">{t("roomsTitle")}</h1>
          <div className="breadcrumb">
            <a href="/">{t("navHome")}</a>
            <i className="fas fa-chevron-right"></i>
            <span>{t("navRooms")}</span>
          </div>
        </div>
      </header>

      {/* Room Catalog Section */}
      <section className="py-section">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{t("featuredLabel")}</span>
            <h2 className="section-title">{t("roomsTitle")}</h2>
            <p className="section-desc">{t("roomsDesc")}</p>
          </div>

          {/* Filter Controls Row */}
          <div className="rooms-filter-controls-row">
            {/* Category Filter */}
            <div className="filter-group">
              <span className="filter-label-text">{lang === "ur" ? "کمرے کی قسم:" : "Category:"}</span>
              <div className="rooms-filter-container">
                <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
                  {t("filterAll")}
                </button>
                <button className={`filter-btn ${filter === "standard" ? "active" : ""}`} onClick={() => setFilter("standard")}>
                  {t("filterStandard")}
                </button>
                <button className={`filter-btn ${filter === "deluxe" ? "active" : ""}`} onClick={() => setFilter("deluxe")}>
                  {t("filterDeluxe")}
                </button>
                <button className={`filter-btn ${filter === "suite" ? "active" : ""}`} onClick={() => setFilter("suite")}>
                  {t("filterSuite")}
                </button>
                <button className={`filter-btn ${filter === "executive" ? "active" : ""}`} onClick={() => setFilter("executive")}>
                  {t("filterExecutive")}
                </button>
              </div>
            </div>

            {/* City Location Filter */}
            <div className="filter-group">
              <span className="filter-label-text">{lang === "ur" ? "شہر / برانچ:" : "Branch City:"}</span>
              <div className="rooms-filter-container">
                <button className={`filter-btn ${locationFilter === "all" ? "active" : ""}`} onClick={() => setLocationFilter("all")}>
                  {lang === "ur" ? "تمام شہر" : "All Cities"}
                </button>
                <button className={`filter-btn ${locationFilter === "lahore" ? "active" : ""}`} onClick={() => setLocationFilter("lahore")}>
                  {lang === "ur" ? "لاہور" : "Lahore"}
                </button>
                <button className={`filter-btn ${locationFilter === "islamabad" ? "active" : ""}`} onClick={() => setLocationFilter("islamabad")}>
                  {lang === "ur" ? "اسلام آباد" : "Islamabad"}
                </button>
                <button className={`filter-btn ${locationFilter === "karachi" ? "active" : ""}`} onClick={() => setLocationFilter("karachi")}>
                  {lang === "ur" ? "کراچی" : "Karachi"}
                </button>
                <button className={`filter-btn ${locationFilter === "murree" ? "active" : ""}`} onClick={() => setLocationFilter("murree")}>
                  {lang === "ur" ? "مری" : "Murree"}
                </button>
              </div>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="rooms-grid">
            {filteredRooms.length === 0 ? (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px", color: "var(--text-light)" }}>
                {lang === "ur" ? "اس کیٹیگری یا شہر میں کوئی کمرہ دستیاب نہیں ہے۔" : "No rooms found matching your filter options."}
              </div>
            ) : (
              filteredRooms.map((room) => (
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
                    <div className="room-branch-indicator">
                      <i className="fas fa-map-marker-alt"></i> <span>{room.location.toUpperCase()}</span>
                    </div>
                    <h3 className="room-name">
                      {lang === "ur" && room.id === "standard" ? "اسٹینڈرڈ کمرہ" :
                       lang === "ur" && room.id === "deluxe" ? "ڈیلکس سوئٹ" :
                       lang === "ur" && room.id === "family" ? "فیملی سوئٹ" :
                       lang === "ur" && room.id === "executive" ? "ایگزیکٹو بزنس روم" :
                       lang === "ur" && room.id === "penthouse" ? "پینٹ ہاؤس سوئٹ" :
                       lang === "ur" && room.id === "murree_chalet" ? "پائن ویو مری شیلیٹ" :
                       lang === "ur" && room.id === "karachi_villa" ? "سمندر کنارے لگژری ولا" :
                       lang === "ur" && room.id === "islamabad_suite" ? "مارگلہ ایگزیکٹو سوئٹ" : room.name}
                    </h3>
                    <p className="room-desc">
                      {lang === "ur" && room.id === "standard" ? "ایک صاف ستھرا اور آرام دہ کمرہ جس میں تمام بنیادی سہولیات موجود ہیں — اکیلے مسافروں یا قیام کے لیے بہترین۔" :
                       lang === "ur" && room.id === "deluxe" ? "کشادہ اور بہترین فرنشڈ کمرہ جس میں عمدہ بستر اور گرم پانی کے ساتھ اٹیچڈ باتھ روم موجود ہے۔" :
                       lang === "ur" && room.id === "family" ? "خاندانوں کے لیے بہترین — دو بیڈ رومز، ایک مشترکہ لاؤنج ایریا، اور اٹیچڈ باتھ روم۔" :
                       lang === "ur" && room.id === "executive" ? "کاروباری مسافروں کے لیے تیار کردہ کمرہ جس میں کام کی میز اور تیز ترین وائی فائی کی سہولت موجود ہے۔" :
                       lang === "ur" && room.id === "penthouse" ? "گلبرگ لاہور میں عیش و عشرت کی بلندی۔ نجی جکوزی، ہوم تھیٹر اور ذاتی بٹلر سروس کے ساتھ۔" :
                       lang === "ur" && room.id === "murree_chalet" ? "مال روڈ مری پر پہاڑی اور برفانی نظاروں والا خوبصورت کمرہ۔ لکڑی کے فائر پلیس اور مرکزی ہیٹنگ کے ساتھ۔" :
                       lang === "ur" && room.id === "karachi_villa" ? "کلفٹن کراچی میں سمندر کنارے ولا۔ نجی پول، سمندری ہوا، بالکونی اور چوبیس گھنٹے بجلی کے متبادل نظام کے ساتھ۔" :
                       lang === "ur" && room.id === "islamabad_suite" ? "ایف 7 اسلام آباد میں مارگلہ پہاڑیوں کے شاندار منظر کے ساتھ۔ جدید کام کی میز، کانفرنس ہال اور سونا تک رسائی۔" : room.description}
                    </p>
                    <div className="room-features">
                      {room.features.slice(0, 4).map((f, i) => (
                        <span key={i} className="feature-tag">
                          {lang === "ur" ? (
                            f.includes("Single") || f.includes("Bed") ? "بستر کی سہولت" :
                            f.includes("Air Conditioning") || f.includes("AC") ? "اے سی" :
                            f.includes("Bathroom") || f.includes("Bath") ? "اٹیچڈ باتھ" :
                            f.includes("Wi-Fi") ? "وائی فائی" :
                            f.includes("Fireplace") ? "فائر پلیس" :
                            f.includes("Pool") ? "سوئمنگ پول" : f
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
              ))
            )}
          </div>
        </div>
      </section>

      {/* Room Details Modal */}
      <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </>
  );
}
