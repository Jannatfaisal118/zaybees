import React, { useContext } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import { LanguageContext } from "../context/LanguageContext";

const Contact = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="bg-bgLight text-textLight dark:bg-bgDark dark:text-textDark">
      {/* Page Title */}
      <div className="text-center text-2xl pt-10 border-t border-accent dark:border-primary">
        <Title text1={t("contact_title_1")} text2={t("contact_title_2")} />
      </div>

      {/* Contact Info */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_icon}
          alt={t("contact_title_2")}
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-heading dark:text-primary">
            {t("contact_store")}
          </p>
          <p className="text-subtext dark:text-primary">
            {t("contact_address")}
          </p>
          <p className="text-subtext dark:text-primary">
            {t("contact_phone")}
            <br /> {t("contact_email")}
          </p>

          <p className="font-semibold text-xl text-heading dark:text-primary">
            {t("contact_careers")}
          </p>
          <p className="text-subtext dark:text-primary">
            {t("contact_careers_desc")}
          </p>

          <button
            className="border border-heading dark:border-primary px-8 py-4 text-sm 
                       hover:bg-primary hover:text-bgLight 
                       dark:hover:bg-accent dark:hover:text-bgDark 
                       transition-all duration-500"
          >
            {t("contact_jobs_btn")}
          </button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
