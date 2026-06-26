"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { TRANSLATIONS } from "@/data/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  // Sync state with LocalStorage and document properties on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    setLang(savedLang);
    updateDocumentProperties(savedLang);
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    updateDocumentProperties(newLang);
  };

  const updateDocumentProperties = (l) => {
    document.documentElement.setAttribute("lang", l);
    document.documentElement.setAttribute("dir", l === "ur" ? "rtl" : "ltr");
  };

  // Translation lookup helper
  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
