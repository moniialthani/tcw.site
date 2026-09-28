import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { isArabic } = useLanguage();

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative min-h-screen w-full flex flex-col justify-end px-6 sm:px-12 lg:px-24 pt-32 pb-20 sm:pb-28 overflow-hidden border-b border-[#0A0A0A]"
    >
      {/* 70% Negative space breathing room */}
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start"
        >
          {/* Headline: Massive, heavy serif type with editorial cadence */}
          <h1
            id="hero-headline"
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-[#0A0A0A] font-normal tracking-[-0.03em] leading-[1.08] sm:leading-[0.98] text-balance"
          >
            {isArabic ? (
              <>
                <span>الرؤية موجودة،</span>{' '}
                <span className="font-serif font-light text-[#0A0A0A]/85">
                  وحان وقت التنفيذ.
                </span>
              </>
            ) : (
              <>
                For brands with the vision,{' '}
                <span className="italic font-serif font-normal">
                  ready for the execution.
                </span>
              </>
            )}
          </h1>

          {/* Sub-copy: Crisp sans-serif tucked beneath it */}
          <motion.p
            id="hero-subcopy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="mt-8 sm:mt-10 text-lg sm:text-xl md:text-2xl text-[#0A0A0A]/85 font-sans font-light max-w-2xl leading-relaxed"
          >
            {isArabic
              ? 'استراتيجية وإبداع بنظرة مختلفة. لا تحتاج إلى شركة إعلانات، كل ما تحتاجه هو التوجيه الصحيح.'
              : "Independent strategy and creative intervention. You don't need an agency. You just need the right input."}
          </motion.p>
        </motion.div>
      </div>

      {/* Subtle bottom scroll invitation */}
      <div className="mt-16 sm:mt-24 flex items-center justify-between text-xs font-mono tracking-widest text-[#0A0A0A]/40 uppercase">
        <a
          href="#philosophy"
          className="hover:text-[#0A0A0A] transition-colors inline-flex items-center gap-2"
        >
          <span>{isArabic ? 'تعرّف على طريقتنا' : 'Explore our approach'}</span>
          <span>↓</span>
        </a>
        <span className="hidden sm:inline">
          {isArabic ? 'الدوحة • حول العالم' : 'Doha • Worldwide'}
        </span>
      </div>
    </section>
  );
}
