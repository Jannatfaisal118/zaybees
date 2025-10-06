import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext.jsx'; // Use LanguageContext

const NewsletterBox = () => {
  const { t } = useContext(LanguageContext); // translation function

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Newsletter subscription logic here
  };

  return (
    <div className="text-center bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark py-8">
      <p className="text-2xl font-medium text-heading dark:text-textDark">
        {t('newsletter_heading')}
      </p>
      <p className="text-subtext dark:text-accent mt-3">
        {t('newsletter_description')}
      </p>
      <form 
        onSubmit={onSubmitHandler} 
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-accent dark:border-primary pl-3"
      >
        <input 
          className="w-full sm:flex-1 outline-none bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark px-2 py-2" 
          type="email" 
          placeholder={t('newsletter_email_placeholder')}
        />
        <button 
          type="submit" 
          className="bg-primary dark:bg-accent text-bgLight dark:text-bgDark text-xs px-10 py-4 hover:bg-accent dark:hover:bg-primary transition-colors"
        >
          {t('newsletter_subscribe')}
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
