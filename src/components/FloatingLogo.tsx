import { motion } from 'motion/react';
import { useState } from 'react';

export default function FloatingLogo() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.aside
      id="floating-sticky-logo"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Floating studio mark"
      className="fixed top-18 right-5 sm:top-20 sm:right-10 md:right-16 z-50 pointer-events-auto select-none"
    >
      {/* Sticky Note Container with genuine background paper peel shadow */}
      <motion.div
        whileHover={{ rotate: 0, scale: 1.04, y: -3 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative w-28 h-28 sm:w-32 sm:h-32 cursor-grab active:cursor-grabbing transform -rotate-[1.8deg] transition-all duration-300"
      >
        {/* Physical Drop Shadow behind the note */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/20 rounded-[2px] blur-[8px] translate-y-3 translate-x-1 pointer-events-none"
        />

        {/* Paper curl shadow projecting behind the bottom-right corner */}
        <div
          aria-hidden="true"
          className="absolute -bottom-1 -right-1 w-20 h-10 bg-black/25 blur-[7px] rotate-[10deg] pointer-events-none rounded-full"
        />

        {/* The Actual Sticky Note Surface */}
        <div className="relative z-10 w-full h-full bg-gradient-to-br from-[#FFFEFA] via-[#FAF7EE] to-[#EFECE0] border border-[#0A0A0A]/15 rounded-[1px] flex items-center justify-center overflow-hidden">
          {/* Subtle adhesive band sheen at top */}
          <div
            aria-hidden="true"
            className="absolute top-0 inset-x-0 h-3.5 bg-black/[0.03] pointer-events-none"
          />

          <img
            id="sticky-logo-image"
            src="/images/logo-sticky.png"
            alt="this could work?"
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none mix-blend-multiply ${
              imageLoaded ? 'opacity-90' : 'opacity-70'
            }`}
          />

          {/* Permanent Marker typography */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center pointer-events-none p-2 select-none">
            <span
              style={{ fontFamily: "'Permanent Marker', cursive" }}
              className="text-[19px] sm:text-[22px] font-normal text-[#0A0A0A] tracking-tight leading-[1.05] -rotate-[2deg]"
            >
              this could
            </span>
            <span
              style={{ fontFamily: "'Permanent Marker', cursive" }}
              className="text-[20px] sm:text-[23px] font-normal text-[#0A0A0A] tracking-tight leading-[1.05] -rotate-[1deg] mt-1.5 sm:mt-2"
            >
              work?
            </span>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}
