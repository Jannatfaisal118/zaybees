import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext.jsx'; // Use LanguageContext

const Title = ({ text1, text2 }) => {
  const { t } = useContext(LanguageContext); // translation function

  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-subtext dark:text-accent">
        {t(text1)}{' '}
        <span className="text-heading dark:text-textDark font-medium">
          {t(text2)}
        </span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-heading dark:bg-textDark"></p>
    </div>
  );
};

export default Title;
