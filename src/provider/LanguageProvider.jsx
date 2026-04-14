"use client";
import { createContext, useContext, useState, useEffect } from "react";
import translations from "@/lib/translations";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("foodie-lang");
    if (saved && translations[saved]) setLang(saved);
  }, []);

  const changeLang = (l) => {
    setLang(l);
    localStorage.setItem("foodie-lang", l);
    // RTL for Arabic
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = l;
  };

  const t = translations[lang];

  return (
    <LanguageContext value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext>
  );
}
