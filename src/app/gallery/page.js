"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLanguage } from "@/context/LanguageContext";

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { lang, t } = useLanguage();

  const galleryItems = [
    { src: "images/hotel_lobby.jpg", category: "lobby", title: lang === "ur" ? "مین لابی" : "Main Lobby" },
    { src: "images/standard_room.jpg", category: "rooms", title: lang === "ur" ? "اسٹینڈرڈ کمرہ" : "Standard Room" },
    { src: "images/deluxe_room.jpg", category: "rooms", title: lang === "ur" ? "ڈیلکس سوئٹ" : "Deluxe Suite" },
    { src: "images/dining_area.jpg", category: "dining", title: lang === "ur" ? "روایتی ڈائننگ" : "Boutique Dining" },
    { src: "images/family_suite.jpg", category: "rooms", title: lang === "ur" ? "فیملی سوئٹ" : "Family Suite" },
    { src: "images/executive_room.jpg", category: "rooms", title: lang === "ur" ? "ایگزیکٹو بزنس روم" : "Executive Room" },
    { src: "images/lahore_attractions.jpg", category: "city", title: lang === "ur" ? "بادشاہی مسجد" : "Lahore Landmark" },
  ];

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter((i) => i.category === filter);

  // Stagger loading
  useEffect(() => {
    gsap.fromTo(
      ".gallery-item",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: "power2.out" }
    );
  }, [filter]);

  const openLightbox = (itemSrc) => {
    const idx = galleryItems.findIndex((i) => i.src === itemSrc);
    setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, galleryItems.length]);

  return (
    <>
      {/* Sub Header */}
      <header className="sub-header" style={{ backgroundImage: "url('images/hotel_lobby.jpg')" }}>
        <div className="sub-header-content">
          <h1 className="sub-header-title">{t("galleryTitle")}</h1>
          <div className="breadcrumb">
            <a href="/">{t("navHome")}</a>
            <i className="fas fa-chevron-right"></i>
            <span>{t("navGallery")}</span>
          </div>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="py-section">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{t("galleryLabel")}</span>
            <h2 className="section-title">{t("galleryTitleMain")}</h2>
            <p className="section-desc">{t("galleryDesc")}</p>
          </div>

          {/* Filters */}
          <div className="gallery-filter-container rooms-filter-container">
            <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
              {t("filterAll")}
            </button>
            <button className={`filter-btn ${filter === "rooms" ? "active" : ""}`} onClick={() => setFilter("rooms")}>
              {t("navRooms")}
            </button>
            <button className={`filter-btn ${filter === "lobby" ? "active" : ""}`} onClick={() => setFilter("lobby")}>
              {t("filterLobby")}
            </button>
            <button className={`filter-btn ${filter === "dining" ? "active" : ""}`} onClick={() => setFilter("dining")}>
              {t("filterDining")}
            </button>
            <button className={`filter-btn ${filter === "city" ? "active" : ""}`} onClick={() => setFilter("city")}>
              {t("filterCity")}
            </button>
          </div>

          {/* Grid */}
          <div className="gallery-grid" id="galleryGrid">
            {filteredItems.map((item, idx) => (
              <div key={idx} className="gallery-item" onClick={() => openLightbox(item.src)}>
                <img src={item.src} alt={item.title} />
                <div className="gallery-overlay">
                  <div className="gallery-icon-wrap">
                    <i className="fas fa-search-plus"></i>
                  </div>
                  <p>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Popups */}
      {lightboxIndex !== null && (
        <div className="lightbox active" id="galleryLightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
            <i className="fas fa-times"></i>
          </button>
          <button className="lightbox-nav lightbox-prev" onClick={prevImage} aria-label="Previous image">
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={galleryItems[lightboxIndex].src} alt={galleryItems[lightboxIndex].title} />
          </div>
          <button className="lightbox-nav lightbox-next" onClick={nextImage} aria-label="Next image">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </>
  );
}
