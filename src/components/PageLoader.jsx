"use client";

import { useState, useEffect } from "react";

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    // Fade out loader
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 600);

    // Completely remove from DOM
    const removeTimer = setTimeout(() => {
      setIsRendered(false);
    }, 1200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isRendered) return null;

  return (
    <div className={`page-loader ${!isVisible ? "hidden" : ""}`} id="pageLoader">
      <div className="loader-content">
        <div className="loader-logo">🏡</div>
        <div className="loader-bar">
          <div className="loader-bar-fill"></div>
        </div>
      </div>
    </div>
  );
}
