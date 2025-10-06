import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { LanguageContext } from "../context/LanguageContext.jsx";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40">
        {/* Logo & About */}
        <div>
          <img
            src={assets.logo}
            className="mb-5 w-32 block dark:hidden"
            alt={t("logo_light")}
          />
          <img
            src={assets.logo_dark}
            className="mb-5 w-32 hidden dark:block"
            alt={t("logo_dark")}
          />
          <p className="w-full md:w-2/3 text-subtext dark:text-accent">
            {t("footer_about")}
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5 text-heading dark:text-textDark">
            {t("company")}
          </p>
          <ul className="flex flex-col gap-1 text-subtext dark:text-accent">
            <li className="hover:text-accent cursor-pointer">
              <Link to="/">{t("home")}</Link>
            </li>
            <li className="hover:text-accent cursor-pointer">
              <Link to="/about">{t("about_us")}</Link>
            </li>
            <li className="hover:text-accent cursor-pointer">
              <Link to="/delivery">{t("delivery")}</Link>
            </li>
            <li className="hover:text-accent cursor-pointer">
              <Link to="/privacy-policy">{t("privacy_policy")}</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5 text-heading dark:text-textDark">
            {t("get_in_touch")}
          </p>
          <ul className="flex flex-col gap-1 text-subtext dark:text-accent">
            <li className="hover:text-accent cursor-pointer">
              <a href="tel:+1234567890">{t("phone_number")}</a>
            </li>
            <li className="hover:text-accent cursor-pointer">
              <a href="mailto:info@example.com">{t("email")}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div>
        <hr className="border-subtext dark:border-accent" />
        <p className="py-5 text-sm text-center text-subtext dark:text-accent">
          {t("copyright")}
        </p>
      </div>
    </div>
  );
};

export default Footer;
