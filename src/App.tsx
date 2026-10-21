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

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'services'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#services') return 'services';
    }
    return 'home';
  });

  // Listen to hash changes (e.g., browser back/forward or direct URLs)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#services') {
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

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'services') => {
    setCurrentPage(page);
    if (page === 'services') {
      window.history.pushState(null, '', '#services');
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleCollaborate = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.history.pushState(null, '', '#intake');
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
    <LanguageProvider>
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
