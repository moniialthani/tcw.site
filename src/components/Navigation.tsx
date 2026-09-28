import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, isArabic } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToIntake = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('intake');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="global-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-[#F9F9F9]/95 backdrop-blur-sm' : 'bg-[#F9F9F9]'
      } border-b border-[#0A0A0A]`}
    >
      <div className="w-full px-6 sm:px-12 lg:px-20 h-14 flex items-center justify-between">
        {/* Anchored Start: Crisp monospace CTA link */}
        <a
          id="nav-intake-link"
          href="#intake"
          onClick={handleScrollToIntake}
          className="group relative inline-flex items-center text-xs sm:text-[13px] font-mono tracking-wider uppercase text-[#0A0A0A] py-1 cursor-pointer"
        >
          <span>{isArabic ? 'تواصل معنا ←' : 'COLLABORATE →'}</span>
          <span className="absolute bottom-0 left-0 right-0 w-0 h-[1px] bg-[#0A0A0A] transition-all duration-300 ease-out group-hover:w-full" />
        </a>

        {/* Right side items: Studio name, Strategic intervention label, and Language Toggle */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono tracking-widest text-[#0A0A0A]/60 uppercase">
          {/* Studio branding kept in English */}
          <span className="hidden sm:inline">
            <bdi dir="ltr">This Could Work</bdi>
          </span>
          <span className="hidden md:inline text-[#0A0A0A]/30">•</span>
          <span className="text-[11px] sm:text-xs">
            {isArabic ? 'استراتيجية وإبداع' : 'STRATEGIC INTERVENTION'}
          </span>

          <span className="text-[#0A0A0A]/30">•</span>

          {/* Minimalist Language Toggle: EN | ع */}
          <div
            id="language-toggle"
            className="inline-flex items-center text-[11px] sm:text-xs font-mono text-[#0A0A0A] select-none"
            aria-label="Language selection"
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`py-0.5 px-1 cursor-pointer transition-opacity ${
                !isArabic ? 'font-bold text-[#0A0A0A]' : 'text-[#0A0A0A]/50 hover:text-[#0A0A0A]'
              }`}
              aria-pressed={!isArabic}
            >
              EN
            </button>
            <span className="text-[#0A0A0A]/40 mx-0.5">|</span>
            <button
              type="button"
              onClick={() => setLang('ar')}
              className={`py-0.5 px-1 cursor-pointer transition-opacity font-sans text-xs sm:text-[13px] ${
                isArabic ? 'font-bold text-[#0A0A0A]' : 'text-[#0A0A0A]/50 hover:text-[#0A0A0A]'
              }`}
              aria-pressed={isArabic}
            >
              ع
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
