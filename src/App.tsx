import { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navigation from './components/Navigation';
import FloatingLogo from './components/FloatingLogo';
import Hero from './components/Hero';
import KineticBand from './components/KineticBand';
import Philosophy from './components/Philosophy';
import WaysOfWorking from './components/WaysOfWorking';
import EngagementScope from './components/EngagementScope';
import IntakeForm from './components/IntakeForm';
import ServicesPage from './components/ServicesPage';
import WorkPage from './components/WorkPage';
import Footer from './components/Footer';
import type { Language } from './context/LanguageContext';

type PageRoute = 'home' | 'services' | 'work';

interface AppProps {
  initialPage?: PageRoute;
  initialLang?: Language;
}

export default function App({ initialPage, initialLang }: AppProps) {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    if (initialPage) return initialPage;
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
      if (pathname.endsWith('/work')) return 'work';
      if (pathname.endsWith('/services')) return 'services';
      const hash = window.location.hash;
      if (hash === '#work') return 'work';
      if (hash === '#services') return 'services';
    }
    return 'home';
  });

  // Listen to hash and popstate changes
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
      const hash = window.location.hash;

      if (pathname.endsWith('/work') || hash === '#work') {
        setCurrentPage('work');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (pathname.endsWith('/services') || hash === '#services') {
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

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
      const isArabicPath = pathname.startsWith('/ar');

      if (page === 'work') {
        const targetUrl = isArabicPath ? '/ar/work/' : '/work/';
        window.history.pushState(null, '', targetUrl);
      } else if (page === 'services') {
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
      <TitleManager currentPage={currentPage} />
      <div className="min-h-screen bg-[#F9F9F9] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#F9F9F9] relative overflow-x-hidden flex flex-col justify-between">
        {/* 00. Global Navigation with Work and Services link */}
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onCollaborate={handleCollaborate}
        />

        {/* 00. The Floating Sticky Note Logo (Persistent Fixed Quadrant) */}
        <FloatingLogo />

        <main id="main-content" className="flex-1">
          {currentPage === 'home' && (
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
          )}

          {currentPage === 'services' && (
            <ServicesPage onCollaborateClick={handleCollaborate} />
          )}

          {currentPage === 'work' && <WorkPage />}
        </main>

        {/* 06. Global Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}

function TitleManager({ currentPage }: { currentPage: PageRoute }) {
  const { isArabic } = useLanguage();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (currentPage === 'work') {
      document.title = isArabic
        ? 'الأعمال | This Could Work للاستشارات الاستراتيجية'
        : 'Work | This Could Work, Brand Strategy Consultancy';
    } else if (currentPage === 'services') {
      document.title = isArabic
        ? 'الخدمات | This Could Work للاستشارات الاستراتيجية'
        : 'Services | This Could Work, Brand Strategy Consultancy';
    } else {
      document.title = isArabic
        ? 'This Could Work | استشارات استراتيجية وتسويقية'
        : 'This Could Work | Brand Strategy Consultancy';
    }
  }, [currentPage, isArabic]);

  return null;
}
