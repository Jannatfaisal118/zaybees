import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const LanguageOverlay = ({ isLoggedIn }) => {
  const { setLanguage } = useContext(LanguageContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const selectedLang = localStorage.getItem("selectedLang");

    if (!isLoggedIn) {
      // if not logged in → always show
      setVisible(true);
    } else if (!selectedLang) {
      // logged in but never chose before → show once
      setVisible(true);
    }
  }, [isLoggedIn]);

  const changeLanguage = (lang) => {
    setLanguage(lang); // ✅ update via LanguageContext
    localStorage.setItem("selectedLang", lang);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg text-center">
        <h2 className="mb-4 text-xl font-semibold">Select Your Language</h2>
        <div className="flex justify-center gap-4">
          <button onClick={() => changeLanguage("en")} className="px-4 py-2 border rounded">
            English
          </button>
          <button onClick={() => changeLanguage("es")} className="px-4 py-2 border rounded">
            Español
          </button>
          <button onClick={() => changeLanguage("ja")} className="px-4 py-2 border rounded">
            日本語
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageOverlay;
