"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Replace WHATSAPP_NUMBER with the real WhatsApp number (country code + number, no + or spaces)
const WHATSAPP_NUMBER = "923000000000";

export default function WhatsAppButton() {
  const { lang } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(false);

  // Show button after a small delay so it doesn't compete with page load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const message = lang === "ur"
    ? "السلام علیکم! میں دی کمفرٹ اِن میں کمرہ بک کرنا چاہتا ہوں۔"
    : "Hello! I'd like to inquire about booking a room at The Comfort Inn.";

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  if (!visible) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <span className="whatsapp-tooltip">
          {lang === "ur" ? "واٹس ایپ پر چیٹ کریں" : "Chat on WhatsApp"}
        </span>
      )}
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}
