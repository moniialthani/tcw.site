import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function FloatingLogo() {
  const { isArabic } = useLanguage();

  return (
    <motion.aside
      id="floating-sticky-logo"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Floating studio mark"
      className={`fixed top-18 z-50 pointer-events-auto select-none touch-none ${
        isArabic
          ? 'left-5 sm:left-10 md:left-16'
          : 'right-5 sm:right-10 md:right-16'
      }`}
    >
      {/* Draggable Sticky Note Container - stays precisely where placed without snapback */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        whileHover={{ scale: 1.03 }}
        whileDrag={{
          scale: 1.06,
          rotate: 2,
          cursor: 'grabbing',
          zIndex: 60,
          boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
        }}
        className="relative w-28 h-28 sm:w-32 sm:h-32 cursor-grab active:cursor-grabbing transform -rotate-[1.8deg]"
      >
        {/* Physical Drop Shadow behind the note */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/20 rounded-[2px] blur-[8px] translate-y-3 translate-x-1 pointer-events-none"
        />

        {/* Paper curl shadow projecting behind the corner */}
        <div
          aria-hidden="true"
          className={`absolute -bottom-1 w-20 h-10 bg-black/25 blur-[7px] pointer-events-none rounded-full ${
            isArabic ? '-left-1 -rotate-[10deg]' : '-right-1 rotate-[10deg]'
          }`}
        />

        {/* The Actual Sticky Note Surface - Balanced clear crystal glass / sheer frosted vellum */}
        <div className="relative z-10 w-full h-full bg-white/35 backdrop-blur-md border border-[#0A0A0A]/20 shadow-[0_4px_20px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.7)] rounded-[1px] flex items-center justify-center overflow-hidden">
          {/* Delicate top adhesive strip */}
          <div
            aria-hidden="true"
            className="absolute top-0 inset-x-0 h-3 bg-white/25 border-b border-black/[0.06] pointer-events-none"
          />

          {/* Permanent Marker typography: Kept strictly in English as instructed */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center pointer-events-none p-2 select-none" dir="ltr">
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
