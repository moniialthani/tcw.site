import React, { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

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
        {/* Anchored Top-Left: Tiny crisp monospace link */}
        <a
          id="nav-intake-link"
          href="#intake"
          onClick={handleScrollToIntake}
          className="group relative inline-flex items-center text-xs sm:text-[13px] font-mono tracking-wider uppercase text-[#0A0A0A] py-1 cursor-pointer"
        >
          <span>Collaborate →</span>
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#0A0A0A] transition-all duration-300 ease-out group-hover:w-full" />
        </a>

        {/* Clean, quiet editorial statement instead of technical codes */}
        <div className="flex items-center space-x-6 text-xs font-mono tracking-widest text-[#0A0A0A]/60 uppercase">
          <span className="hidden sm:inline">This Could Work</span>
          <span className="hidden md:inline text-[#0A0A0A]/30">•</span>
          <span className="text-[11px]">Strategic Intervention</span>
        </div>
      </div>
    </header>
  );
}
