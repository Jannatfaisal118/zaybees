import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext.jsx';

const Hero = () => {
  const { t } = useContext(LanguageContext); 
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const float1Y = useTransform(scrollY, [0, 500], [0, 40]);
  const float2Y = useTransform(scrollY, [0, 500], [0, -40]);

  return (
    <div className="relative w-full min-h-screen flex flex-col-reverse sm:flex-row items-center 
      bg-gradient-to-b from-[#FFF1E6] via-[#FFFAF0] to-[#FFF8F2] 
      dark:from-[#0b0b0b] dark:via-[#0b0b0b] dark:to-[#0b0b0b] overflow-hidden">

      {/* Left Content */}
      <Motion.div style={{ y: textY }} 
        className="w-full sm:w-1/2 flex flex-col justify-center items-start py-16 sm:py-24 px-6 sm:px-12 lg:px-20 space-y-6 z-30">

        {/* Tagline */}
        <Motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}
          className="flex items-center gap-3">
          <span className="w-12 h-[2px] bg-[#FF6B6B] dark:bg-[#FFD700]"></span>
          <p className="font-medium text-sm md:text-base uppercase tracking-wider text-[#A38F7B] dark:text-[#E4C988]">
            {t('hero_tagline')}
          </p>
        </Motion.div>

        {/* Heading */}
        <Motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
          className="prata-regular text-4xl sm:text-5xl lg:text-6xl leading-snug text-[#2E2E2E] dark:text-[#FFD700] tracking-wide drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
          {t('hero_heading_part1')} <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 text-transparent bg-clip-text animate-gradient">
            {t('hero_heading_part2')}
          </span>
        </Motion.h1>

        {/* Description */}
        <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
          className="text-[#6B6B6B] dark:text-[#D4B483] text-sm sm:text-base max-w-md leading-relaxed">
          {t('hero_description')}
        </Motion.p>

        {/* Buttons */}
        <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
          className="flex gap-4">
          <Link to="/collection">
            <button className="relative overflow-hidden group flex items-center gap-3 font-semibold text-sm md:text-base px-6 py-3 rounded-lg 
              bg-gradient-to-r from-[#FF6B6B] to-[#FFA66B] text-white shadow-lg transition-all duration-300 hover:scale-105">
              <span className="relative z-10">{t('shop_now')}</span>
              <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        </Motion.div>
      </Motion.div>

      {/* Right Image */}
      <Motion.div className="w-full sm:w-1/2 relative flex justify-center items-center"
        initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }}>
        <Motion.div className="relative rounded-l-[50px] overflow-hidden border-[1.5px] border-white/40 
          backdrop-blur-2xl shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
          <img className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 ease-out" 
            src={assets.hero} alt={t('hero_banner_alt')} />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#FFF8F2] dark:to-[#0b0b0b] opacity-70"></div>
        </Motion.div>
      </Motion.div>

      {/* Floating elements */}
      <Motion.div style={{ y: float1Y }}
        className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FFA66B] opacity-25 blur-3xl"
        animate={{ x: [-30, 30, -30] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }} />
      <Motion.div style={{ y: float2Y }}
        className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-gradient-to-tr from-[#FFA66B] to-[#FF6B6B] opacity-20 blur-3xl"
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }} />
      <Motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-gradient-to-tl from-[#FF6B6B] to-[#FFA66B] opacity-15 blur-2xl"
        animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }} />
    </div>
  );
};

export default Hero;
