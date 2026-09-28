import { motion } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface MethodColumn {
  phase: string;
  duration: string;
  headline: string;
  body: string;
  takeaway: string;
}

const englishMethods: MethodColumn[] = [
  {
    phase: 'Phase I',
    duration: 'Collaborative',
    headline: 'Groundwork',
    body: 'We align on the vision by talking through ideas and goals, working together to shape the exact direction of the project.',
    takeaway: 'A solid foundation for project execution',
  },
  {
    phase: 'Phase II',
    duration: 'Autonomous',
    headline: 'Taking shape',
    body: 'We step away to experiment and build. This is our dedicated time to turn abstract strategy into focused direction, translating ideas into tangible drafts and visuals before we bring them back to the table.',
    takeaway: 'Initial designs and structured logic',
  },
  {
    phase: 'Phase III',
    duration: 'Connected',
    headline: 'Bringing it together',
    body: "We bring the drafts back and go through them with you. Anything that doesn't hold up gets reworked. When it's done, you get the finished strategy and a plan for putting it to use. Between the main meetings, we're always open to a quick call if there's something on your mind.",
    takeaway: 'Finished work, ready to put into action.',
  },
];

const arabicMethods: MethodColumn[] = [
  {
    phase: 'المرحلة الأولى',
    duration: 'معًا',
    headline: 'نقطة البداية',
    body: 'نبدأ بحوار حول أفكارك وأهدافك، لنتفق معًا على اتجاه واضح للمشروع.',
    takeaway: 'رؤية مشتركة وخطة واضحة.',
  },
  {
    phase: 'المرحلة الثانية',
    duration: 'بتركيز',
    headline: 'بناء الفكرة',
    body: 'هنا نبتعد قليلًا لنعمل بتركيز، ونحوّل ما اتفقنا عليه إلى مسودات وتصاميم واضحة، قبل أن نعود ونراجعها معك.',
    takeaway: 'بنية أساسية وتصاميم أولية.',
  },
  {
    phase: 'المرحلة الثالثة',
    duration: 'على تواصل',
    headline: 'اكتمال الصورة',
    body: 'نجلس معك لنراجع المسودات، ونركّز على ما يحتاج إلى مزيد من العمل. وفي النهاية، تصبح الصورة كاملة، وبين يديك خطة واضحة لتطبيقها. وبين الاجتماعات الأساسية، نرحّب دائمًا بمكالمة سريعة إذا كان عندك ما تودّ مناقشته.',
    takeaway: 'صورة كاملة وخطة عملية.',
  },
];

export default function WaysOfWorking() {
  const [activeCol, setActiveCol] = useState<number | null>(null);
  const { isArabic } = useLanguage();

  const methods = isArabic ? arabicMethods : englishMethods;

  return (
    <section
      id="process"
      aria-label="The Process"
      className="relative w-full border-b border-[#0A0A0A] bg-[#F9F9F9]"
    >
      {/* Section Header */}
      <div className="px-6 sm:px-12 lg:px-24 py-10 border-b border-[#0A0A0A] flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0A0A0A] font-normal tracking-tight">
            {isArabic ? 'رحلتنا معًا' : 'The Process'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-sans text-[#0A0A0A]/60 max-w-sm">
          {isArabic
            ? 'نعطي كل مرحلة حقها: تركيز حين نحتاجه، وتعاون حين يهم.'
            : 'A structured rhythm that balances deep focus with open, honest collaboration.'}
        </p>
      </div>

      {/* 3-Column Grid separated by vertical 1px hairline rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:rtl:divide-x-reverse divide-[#0A0A0A]">
        {methods.map((method, idx) => (
          <motion.div
            key={method.phase}
            id={`way-column-${idx + 1}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: idx * 0.12,
            }}
            onMouseEnter={() => setActiveCol(idx)}
            onMouseLeave={() => setActiveCol(null)}
            className={`p-8 sm:p-12 lg:p-16 flex flex-col justify-between min-h-[440px] transition-colors duration-300 ${
              activeCol === idx ? 'bg-white/80' : 'bg-transparent'
            }`}
          >
            <div>
              {/* Phase / Pace label: no italic in Arabic */}
              <div className="flex items-center justify-between text-xs font-mono text-[#0A0A0A]/60 tracking-wider mb-8">
                <span className="font-semibold text-[#0A0A0A]">{method.phase}</span>
                <span className={isArabic ? 'text-[#0A0A0A]/70 font-normal' : 'italic'}>
                  {method.duration}
                </span>
              </div>

              {/* Headline */}
              <h3 className="font-serif text-3xl sm:text-4xl text-[#0A0A0A] tracking-tight leading-snug mb-6">
                {method.headline}
              </h3>

              {/* Body */}
              <p className="font-sans text-base text-[#0A0A0A]/85 leading-relaxed font-light">
                {method.body}
              </p>
            </div>

            {/* Bottom takeaway with subtle interactive accent */}
            <div className="pt-8 mt-8 border-t border-[#0A0A0A]/15">
              <span className="text-[11px] font-mono tracking-wide text-[#0A0A0A]/50 block mb-1">
                {isArabic ? 'ما نحققه' : 'what we achieve'}
              </span>
              <span className="text-xs font-sans text-[#0A0A0A] font-medium">
                {method.takeaway}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
