import { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { LanguageContext } from "../context/LanguageContext.jsx";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setShowSearch, getCartCount, token, country, handleCountryChange } =
    useContext(ShopContext);
  const { t } = useContext(LanguageContext);

  const [visible, setVisible] = useState(false); // mobile menu
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [ setGtReady] = useState(false); // Google Translate iframe ready

  const translateRef = useRef(null);

  const showSearchIcon = location.pathname === "/collection";
  const menuLinks = ["/", "/collection", "/about", "/contact"];
  const menuKeys = ["home", "collection", "about_us", "contact"];

  /// Load Google Translate
  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
  console.log("Google Translate initialized");
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,ja",
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
};


      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
  }, []);

  // Detect when Google Translate iframe is ready
  useEffect(() => {
    const interval = setInterval(() => {
      const iframe = document.querySelector('iframe.goog-te-menu-frame');
      if (iframe) {
        setGtReady(true);
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Function to switch language programmatically
const switchLanguage = (lang) => {
  // lang: 'en' or 'ja'
  // Set cookie for Google Translate
  document.cookie = `googtrans=/en/${lang}; path=/; domain=${window.location.hostname}`;
  // Reload page to apply translation
  window.location.reload();
};


  // Style Google Translate dropdown after iframe is loaded
  useEffect(() => {
    const interval = setInterval(() => {
      const iframe = document.querySelector('iframe.goog-te-menu-frame');
      if (iframe) {
        try {
          const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
          const select = innerDoc.querySelector('select');
          if (select) {
            select.style.backgroundColor = darkMode ? "#333" : "#C5A572";
            select.style.color = "#fff";
            select.style.borderRadius = "8px";
            select.style.padding = "8px 12px";
            clearInterval(interval);
          }
        } catch (err) {
          console.error("Error accessing iframe contents:", err);
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [darkMode]);

  // Theme toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="relative bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark h-40">
      {/* Top Right Controls */}
      <div className="absolute top-3 right-4 flex gap-3 items-center z-50">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-accent dark:bg-heading text-bgLight dark:text-textDark"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>

        {/* Language Buttons */}
        <div className="flex gap-2">
          <button
  onClick={() => switchLanguage("en")}
  className="px-3 py-1 rounded bg-accent dark:bg-gray-700 text-white dark:text-white"
>
  English
</button>
<button
  onClick={() => switchLanguage("ja")}
  className="px-3 py-1 rounded bg-accent dark:bg-gray-700 text-white dark:text-white"
>
  Japanese
</button>
        </div>

        {/* Hidden Google Translate container */}
        <div
          id="google_translate_element"
          className="hidden"
          ref={translateRef}
        />

        {/* Country Selector */}
        <select
          value={country}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          aria-label="Select country"
        >
          <option value="PK">Pakistan</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="JP">Japan</option>
        </select>
      </div>

      {/* Main Navbar */}
      <div className="mt-10 flex items-center justify-between py-3 font-medium tracking-wide px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Link to="/" className="flex-shrink-0">
          <img
            src={darkMode ? assets.logo_dark : assets.logo}
            className="w-32 md:w-28 object-contain"
            alt={t("logo_light")}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6 text-sm font-light tracking-[0.05em] flex-1 justify-center">
          {menuLinks.map((path, idx) => (
            <NavLink
              key={idx}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 transition-colors duration-300 ${
                  isActive ? "text-accent" : "text-heading dark:text-textDark"
                }`
              }
            >
              <p>{t(menuKeys[idx])}</p>
              <hr
                className={`w-full border-none h-[1.5px] bg-accent ${
                  location.pathname === path ? "block" : "hidden"
                }`}
              />
            </NavLink>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-5 flex-shrink-0">
          {showSearchIcon && (
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              className="w-5 cursor-pointer"
              alt={t("search")}
            />
          )}

          {/* Profile */}
          <div className="relative z-[9999]">
            <img
              onClick={() => {
                if (!token) navigate("/login");
                else navigate("/profile");
              }}
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt={t("my_profile")}
            />
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              className="w-5 min-w-5"
              alt={t("cart")}
            />
            {typeof getCartCount() === "number" && (
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-accent text-bgLight aspect-square rounded-full text-[8px]">
                {getCartCount()}
              </p>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt={t("menu")}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 transition-all duration-300 ${
          visible ? "w-full" : "w-0"
        }`}
        style={{ backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF" }}
      >
        <div
          className={`flex flex-col text-textLight dark:text-textDark h-full p-4 overflow-auto ${
            visible ? "block" : "hidden"
          }`}
        >
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt={t("back")}
            />
            <p>{t("back")}</p>
          </div>

          {menuLinks.map((path, idx) => (
            <NavLink
              key={idx}
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border-b border-accent dark:border-[#C5A572]"
              to={path}
            >
              {t(menuKeys[idx])}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;