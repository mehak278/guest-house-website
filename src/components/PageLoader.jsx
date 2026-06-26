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
        <div className="loader-logo">
          <svg viewBox="0 0 100 100" width="50" height="50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", margin: "0 auto" }}>
            <path d="M50 8L15 38V88C15 90.2 16.8 92 19 92H81C83.2 92 85 90.2 85 88V38L50 8Z" stroke="var(--accent)" strokeWidth="6" strokeLinejoin="round"/>
            <path d="M35 92V58C35 49.7 41.7 43 50 43C58.3 43 65 49.7 65 58V92" stroke="var(--accent)" strokeWidth="6" strokeLinejoin="round"/>
            <circle cx="50" cy="26" r="7" fill="var(--accent)"/>
          </svg>
        </div>
        <div className="loader-bar">
          <div className="loader-bar-fill"></div>
        </div>
      </div>
    </div>
  );
}
