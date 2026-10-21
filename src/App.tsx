import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';
import FloatingLogo from './components/FloatingLogo';
import Hero from './components/Hero';
import KineticBand from './components/KineticBand';
import Philosophy from './components/Philosophy';
import WaysOfWorking from './components/WaysOfWorking';
import EngagementScope from './components/EngagementScope';
import IntakeForm from './components/IntakeForm';
import ServicesPage from './components/ServicesPage';
import Footer from './components/Footer';

import type { Language } from './context/LanguageContext';

interface AppProps {
  initialPage?: 'home' | 'services';
  initialLang?: Language;
}

export default function App({ initialPage, initialLang }: AppProps) {
  const [currentPage, setCurrentPage] = useState<'home' | 'services'>(() => {
    if (initialPage) return initialPage;
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
      if (pathname.endsWith('/services')) return 'services';
      const hash = window.location.hash;
      if (hash === '#services') return 'services';
    }
    return 'home';
  });

  // Listen to hash and popstate changes
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
      const hash = window.location.hash;

      if (pathname.endsWith('/services') || hash === '#services') {
        setCurrentPage('services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#intake' || hash === '#collaborate') {
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById('intake');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleNavigate = (page: 'home' | 'services') => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
      const isArabicPath = pathname.startsWith('/ar');

      if (page === 'services') {
        const targetUrl = isArabicPath ? '/ar/services/' : '/services/';
        window.history.pushState(null, '', targetUrl);
      } else {
        const targetUrl = isArabicPath ? '/ar/' : '/';
        window.history.pushState(null, '', targetUrl);
      }
    }
  };

  const handleCollaborate = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      if (typeof window !== 'undefined') {
        const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
        const isArabicPath = pathname.startsWith('/ar');
        const targetUrl = (isArabicPath ? '/ar/' : '/') + '#intake';
        window.history.pushState(null, '', targetUrl);
      }
      setTimeout(() => {
        const intakeEl = document.getElementById('intake');
        if (intakeEl) {
          intakeEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
    } else {
      const intakeEl = document.getElementById('intake');
      if (intakeEl) {
        intakeEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <LanguageProvider initialLang={initialLang}>
      <div className="min-h-screen bg-[#F9F9F9] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#F9F9F9] relative overflow-x-hidden flex flex-col justify-between">
        {/* 00. Global Navigation with Services link */}
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onCollaborate={handleCollaborate}
        />

        {/* 00. The Floating Sticky Note Logo (Persistent Fixed Quadrant) */}
        <FloatingLogo />

        <main id="main-content" className="flex-1">
          {currentPage === 'home' ? (
            <>
              {/* 01. The Hero */}
              <Hero />

              {/* Dynamic Kinetic Editorial Band */}
              <KineticBand />

              {/* 02. The Philosophy */}
              <Philosophy />

              {/* 03. Ways of Working (The Architecture) */}
              <WaysOfWorking />

              {/* 04. Engagement & Scope (Dark Mode Inversion) */}
              <EngagementScope />

              {/* 05. The Intake Form (Print Aesthetic) */}
              <IntakeForm />
            </>
          ) : (
            <ServicesPage onCollaborateClick={handleCollaborate} />
          )}
        </main>

        {/* 06. Global Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
