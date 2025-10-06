import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { LanguageContext } from '../context/LanguageContext.jsx'; // Use LanguageContext

const OurPolicy = () => {
  const { t } = useContext(LanguageContext); // translation function

  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-textLight dark:text-textDark">
      <div>
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt={t('policy_exchange_alt')} />
        <p className="font-semibold text-heading dark:text-textDark">{t('policy_exchange_title')}</p>
        <p className="text-subtext dark:text-accent">{t('policy_exchange_desc')}</p>
      </div>
      <div>
        <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt={t('policy_return_alt')} />
        <p className="font-semibold text-heading dark:text-textDark">{t('policy_return_title')}</p>
        <p className="text-subtext dark:text-accent">{t('policy_return_desc')}</p>
      </div>
      <div>
        <img src={assets.support_icon} className="w-12 m-auto mb-5" alt={t('policy_support_alt')} />
        <p className="font-semibold text-heading dark:text-textDark">{t('policy_support_title')}</p>
        <p className="text-subtext dark:text-accent">{t('policy_support_desc')}</p>
      </div>
    </div>
  );
};

export default OurPolicy;
