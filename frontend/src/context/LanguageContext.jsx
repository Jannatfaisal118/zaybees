import React, { createContext, useState, useEffect } from "react";
import en from "../locales/en.json";
import es from "../locales/es.json";
import ja from "../locales/ja.json";

const LanguageContext = createContext();
export { LanguageContext };

const translations = { en, es, ja };

const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("selectedLang") || "en");

  // Translation function
  const t = (key) => translations[language][key] || key;

  useEffect(() => {
    localStorage.setItem("selectedLang", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
