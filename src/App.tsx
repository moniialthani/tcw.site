import Navigation from './components/Navigation';
import FloatingLogo from './components/FloatingLogo';
import Hero from './components/Hero';
import KineticBand from './components/KineticBand';
import Philosophy from './components/Philosophy';
import WaysOfWorking from './components/WaysOfWorking';
import EngagementScope from './components/EngagementScope';
import IntakeForm from './components/IntakeForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#F9F9F9] relative overflow-x-hidden">
      {/* 00. Global Navigation */}
      <Navigation />

      {/* 00. The Floating Sticky Note Logo (Persistent Fixed Top-Right Quadrant) */}
      <FloatingLogo />

      <main id="main-content">
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
      </main>

      {/* 06. Global Footer */}
      <Footer />
    </div>
  );
}
