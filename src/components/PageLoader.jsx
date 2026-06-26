"use client";

import { useState, useEffect } from "react";

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    // Check if already loaded in this session to prevent repeated loader screens on navigations
    if (typeof window !== "undefined" && sessionStorage.getItem("hasLoaded")) {
      setIsVisible(false);
      setIsRendered(false);
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasLoaded", "true");
    }

    // Start fade-out very quickly — 250ms
    const fadeTimer = setTimeout(() => setIsVisible(false), 250);
    // Remove from DOM after fade completes — 600ms total
    const removeTimer = setTimeout(() => setIsRendered(false), 600);
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
