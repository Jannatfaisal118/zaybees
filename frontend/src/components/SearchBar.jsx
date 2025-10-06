import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext.jsx'; // Use LanguageContext

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const { t } = useContext(LanguageContext); // translation function
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  return showSearch && visible ? (
    <div className="border-t border-b border-accent bg-bgLight dark:bg-bgDark text-center">
      <div className="inline-flex items-center justify-center border border-accent dark:border-primary 
                      px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-bgLight dark:bg-bgDark">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm text-textLight dark:text-textDark"
          type="text"
          placeholder={t("SEARCH_PLACEHOLDER")} // JSON key
        />
        <img className="w-4" src={assets.search_icon} alt={t("SEARCH")} />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt={t("CLOSE")}
      />
    </div>
  ) : null;
};

export default SearchBar;
