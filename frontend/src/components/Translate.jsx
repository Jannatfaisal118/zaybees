import { useState, useEffect } from "react";
import axios from "axios";

function Translate({ text, targetLang }) {
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    if (targetLang === "en") {
      setTranslated(text);
      return;
    }

    const fetchTranslation = async () => {
      try {
        const res = await axios.post("/api/translate", { text, targetLang });
        setTranslated(res.data.translatedText);
      } catch (err) {
        console.error("Translation error:", err);
        setTranslated(text); // fallback
      }
    };

    fetchTranslation();
  }, [text, targetLang]);

  return <>{translated}</>;
}

export default Translate;
