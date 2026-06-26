"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function RoomModal({ room, onClose }) {
  const { lang, t } = useLanguage();
  const [activeImg, setActiveImg] = useState(null);

  // Sync activeImg when room changes
  useEffect(() => {
    if (room) {
      setActiveImg(room.image);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [room]);

  if (!room) return null;

  const gallery = room.gallery || [room.image];

  // Local translations for room details since descriptions are in rooms.js
  // We can show English or translate names dynamically if needed, but standard features and buttons are translated.
  return (
    <div className="modal active" id="roomModal" onClick={(e) => e.target.id === "roomModal" && onClose()}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <i className="fas fa-times"></i>
        </button>
        <div className="modal-gallery-container">
          <div className="modal-main-img">
            <img src={activeImg || room.image} alt={room.name} />
          </div>
          {gallery.length > 1 && (
            <div className="modal-thumbnails">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  className={`modal-thumbnail-btn ${activeImg === img ? "active" : ""}`}
                  onClick={() => setActiveImg(img)}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img} alt={`${room.name} view ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="modal-body">
          <h2 className="modal-title">
            {lang === "ur" && room.id === "standard" ? "اسٹینڈرڈ کمرہ" :
             lang === "ur" && room.id === "deluxe" ? "ڈیلکس سوئٹ" :
             lang === "ur" && room.id === "family" ? "فیملی سوئٹ" :
             lang === "ur" && room.id === "executive" ? "ایگزیکٹو بزنس روم" : room.name}
          </h2>
          <div className="modal-meta">
            <span>
              <i className="fas fa-bed"></i> Comfort Accommodations
            </span>
            <span>
              <i className="fas fa-dollar-sign"></i> Best Price Guarantee
            </span>
          </div>
          <p className="modal-desc">
            {lang === "ur" && room.id === "standard" ? "ایک صاف ستھرا اور آرام دہ کمرہ جس میں تمام بنیادی سہولیات موجود ہیں — اکیلے مسافروں یا مختصر قیام کے لیے بہترین۔" :
             lang === "ur" && room.id === "deluxe" ? "کشادہ اور بہترین فرنشڈ کمرہ جس میں عمدہ بستر اور گرم پانی کے ساتھ اٹیچڈ باتھ روم موجود ہے۔" :
             lang === "ur" && room.id === "family" ? "خاندانوں کے لیے بہترین — دو بیڈ رومز، ایک مشترکہ لاؤنج ایریا، اور اٹیچڈ باتھ روم۔" :
             lang === "ur" && room.id === "executive" ? "کاروباری مسافروں کے لیے تیار کردہ کمرہ جس میں کام کی میز اور تیز ترین وائی فائی کی سہولت موجود ہے۔" : room.description}
          </p>
          <div className="modal-features-list">
            {room.features.map((f, i) => (
              <div key={i} className="modal-feature-item">
                <i className="fas fa-check-circle"></i> <span>
                  {lang === "ur" ? (
                    f.includes("Single") || f.includes("Bed") ? "بستر کی سہولت" :
                    f.includes("Air Conditioning") || f.includes("AC") ? "اے سی / ایئر کنڈیشنگ" :
                    f.includes("Bathroom") || f.includes("Bath") ? "اٹیچڈ باتھ روم" :
                    f.includes("Wi-Fi") ? "مفت وائی فائی" :
                    f.includes("TV") ? "سمارٹ ٹی وی" :
                    f.includes("Fridge") ? "منی فریج" :
                    f.includes("Desk") ? "کام کی میز" : f
                  ) : f}
                </span>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <div className="room-price">
              <span className="price-amount" style={{ fontFamily: "inherit" }}>
                {room.currency} {room.price.toLocaleString()}
              </span>
              <span className="price-per">/ {room.per === "night" ? (lang === "ur" ? "رات" : "night") : room.per}</span>
            </div>
            <a href={`/booking?room=${room.id}`} className="btn btn-primary" onClick={onClose}>
              {t("navBookNow")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
