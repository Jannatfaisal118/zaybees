import React, { useContext } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import { LanguageContext } from "../context/LanguageContext";

const About = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="bg-bgLight text-textLight dark:bg-bgDark dark:text-textDark transition-colors duration-500">
      {/* Section Title */}
      <div className="text-3xl sm:text-4xl text-center pt-12 border-t border-accent">
        <Title text1={t("about_title_1")} text2={t("about_title_2")} />
      </div>

      {/* About Content */}
      <div className="my-12 flex flex-col md:flex-row gap-12 md:gap-20 items-center">
        <img
          className="w-full md:max-w-[500px] rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
          src={assets.about_img}
          alt={t("about_title_2")}
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4">
          <p className="text-lg leading-relaxed text-textLight dark:text-textDark">
            {t("about_para_1")}
          </p>
          <p className="text-lg leading-relaxed text-textLight dark:text-textDark">
            {t("about_para_2")}
          </p>
          <b className="text-heading dark:text-textDark text-xl">
            {t("about_mission")}
          </b>
          <p className="text-textLight dark:text-textDark text-lg leading-relaxed">
            {t("about_para_3")}
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-3xl sm:text-4xl py-6 text-center text-heading dark:text-textDark">
        <Title text1={t("why_title_1")} text2={t("why_title_2")} />
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-20">
        {[
          {
            title: t("why_quality_title"),
            text: t("why_quality_text"),
          },
          {
            title: t("why_convenience_title"),
            text: t("why_convenience_text"),
          },
          {
            title: t("why_service_title"),
            text: t("why_service_text"),
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex-1 border border-accent rounded-xl p-8 sm:p-12 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-500 bg-bgLight dark:bg-bgDark"
          >
            <b className="text-heading dark:text-textDark text-lg sm:text-xl">
              {item.title}:
            </b>
            <p className="text-subtext dark:text-accent text-sm sm:text-base leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
