import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface NavigationProps {
  currentPage: 'home' | 'services' | 'work';
  onNavigate: (page: 'home' | 'services' | 'work') => void;
  onCollaborate: () => void;
}

export default function Navigation({
  currentPage,
  onNavigate,
  onCollaborate,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const { setLang, isArabic } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('work');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCollaborateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCollaborate();
  };

  return (
    <header
      id="global-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-[#F9F9F9]/95 backdrop-blur-sm' : 'bg-[#F9F9F9]'
      } border-b border-[#0A0A0A]`}
    >
      <div className="w-full px-6 sm:px-12 lg:px-20 h-14 flex items-center justify-between">
        {/* Side 1: Action Nav Links (Home, Services, Work, Collaborate) */}
        <div className="flex items-center gap-6 sm:gap-8">
          {/* Home Page Link */}
          <button
            type="button"
            id="nav-home-link"
            onClick={handleLogoClick}
            className={`group relative inline-flex items-center text-xs sm:text-[13px] font-mono tracking-wider uppercase py-1 cursor-pointer transition-colors ${
              currentPage === 'home'
                ? 'text-[#0A0A0A] font-bold'
                : 'text-[#0A0A0A]/70 hover:text-[#0A0A0A]'
            }`}
          >
            <span>{isArabic ? 'الرئيسية' : 'HOME'}</span>
            <span
              className={`absolute bottom-0 left-0 right-0 h-[1px] bg-[#0A0A0A] transition-all duration-300 ease-out ${
                currentPage === 'home' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </button>

          {/* Services Page Link */}
          <button
            type="button"
            id="nav-services-link"
            onClick={handleServicesClick}
            className={`group relative inline-flex items-center text-xs sm:text-[13px] font-mono tracking-wider uppercase py-1 cursor-pointer transition-colors ${
              currentPage === 'services'
                ? 'text-[#0A0A0A] font-bold'
                : 'text-[#0A0A0A]/70 hover:text-[#0A0A0A]'
            }`}
          >
            <span>{isArabic ? 'الخدمات' : 'SERVICES'}</span>
            <span
              className={`absolute bottom-0 left-0 right-0 h-[1px] bg-[#0A0A0A] transition-all duration-300 ease-out ${
                currentPage === 'services' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </button>

          {/* Work Page Link */}
          <button
            type="button"
            id="nav-work-link"
            onClick={handleWorkClick}
            className={`group relative inline-flex items-center text-xs sm:text-[13px] font-mono tracking-wider uppercase py-1 cursor-pointer transition-colors ${
              currentPage === 'work'
                ? 'text-[#0A0A0A] font-bold'
                : 'text-[#0A0A0A]/70 hover:text-[#0A0A0A]'
            }`}
          >
            <span>{isArabic ? 'الأعمال' : 'WORK'}</span>
            <span
              className={`absolute bottom-0 left-0 right-0 h-[1px] bg-[#0A0A0A] transition-all duration-300 ease-out ${
                currentPage === 'work' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </button>

          {/* Collaborate Link */}
          <button
            type="button"
            id="nav-intake-link"
            onClick={handleCollaborateClick}
            className="group relative inline-flex items-center text-xs sm:text-[13px] font-mono tracking-wider uppercase text-[#0A0A0A] py-1 cursor-pointer"
          >
            <span>{isArabic ? 'تواصل معنا ←' : 'COLLABORATE →'}</span>
            <span className="absolute bottom-0 left-0 right-0 w-0 h-[1px] bg-[#0A0A0A] transition-all duration-300 ease-out group-hover:w-full" />
          </button>
        </div>

        {/* Side 2: Studio name, Strategic intervention label, and Language Toggle anchored to the corner */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono tracking-widest text-[#0A0A0A]/60 uppercase">
          {/* Studio branding kept in English - clicking returns to home */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="hidden sm:inline hover:text-[#0A0A0A] transition-colors cursor-pointer"
          >
            <bdi dir="ltr">This Could Work</bdi>
          </button>
          <span className="hidden md:inline text-[#0A0A0A]/30">•</span>
          <span className="text-[11px] sm:text-xs">
            {isArabic ? 'استراتيجية وإبداع' : 'STRATEGIC INTERVENTION'}
          </span>

          <span className="text-[#0A0A0A]/30">•</span>

          {/* Minimalist Language Toggle: EN | ع anchored at the corner */}
          <div
            id="language-toggle"
            className="inline-flex items-center text-[11px] sm:text-xs font-mono text-[#0A0A0A] select-none"
            aria-label="Language selection"
          >
            <button
              type="button"
              onClick={() => {
                setLang('en');
                if (typeof window !== 'undefined') {
                  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
                  if (pathname.includes('/work')) {
                    window.history.pushState(null, '', '/work/');
                  } else if (pathname.includes('/services')) {
                    window.history.pushState(null, '', '/services/');
                  } else {
                    window.history.pushState(null, '', '/');
                  }
                }
              }}
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
              onClick={() => {
                setLang('ar');
                if (typeof window !== 'undefined') {
                  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
                  if (pathname.includes('/work')) {
                    window.history.pushState(null, '', '/ar/work/');
                  } else if (pathname.includes('/services')) {
                    window.history.pushState(null, '', '/ar/services/');
                  } else {
                    window.history.pushState(null, '', '/ar/');
                  }
                }
              }}
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
