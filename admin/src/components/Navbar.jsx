import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Persist theme and add/remove dark class
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    setToken("");
  };

  return (
    <div className="max-w-full h-40 flex items-center justify-between px-6 py-3 bg-bgLight dark:bg-bgDark transition-colors shadow-md">
      {/* Logo */}
      <img
        className="w-[max(160px)]"
        src={darkMode ? assets.logo_dark : assets.logo}
        alt="Logo"
      />

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-accent dark:bg-primary text-white transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
