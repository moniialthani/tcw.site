import { motion } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function EngagementScope() {
  const [activePillar, setActivePillar] = useState<number>(0);
  const { isArabic } = useLanguage();

  const englishPillars = [
    {
      title: 'The Sprint',
      timeframe: '< 2 weeks',
      detail: 'For when you need one thing done well, and soon.',
    },
    {
      title: 'The Standard',
      timeframe: '2–4 weeks',
      detail: 'Our baseline timeline, built for briefs with multiple aspects that all need to connect.',
    },
    {
      title: 'The Deep Dive',
      timeframe: '4+ weeks',
      detail: 'Our extended timeline, built for larger projects that need more time to take shape.',
    },
  ];

  const arabicPillars = [
    {
      title: 'السريع',
      timeframe: 'أقل من أسبوعين',
      detail: 'حين تحتاج إلى إنجاز شيء واحد بجودة عالية، وبسرعة.',
    },
    {
      title: 'المعتاد',
      timeframe: 'من 2 إلى 4 أسابيع',
      detail: 'الخيار الأساسي لمعظم المشاريع، حين تتعدد الجوانب وتحتاج كلها أن تتصل ببعضها.',
    },
    {
      title: 'المتعمّق',
      timeframe: '4 أسابيع أو أكثر',
      detail: 'الخيار الممتد، للمشاريع الكبيرة التي تحتاج وقتًا أطول لتكتمل.',
    },
  ];

  const pillars = isArabic ? arabicPillars : englishPillars;

  return (
    <section
      id="scope"
      aria-label="Engagement and Scope"
      className="relative w-full bg-[#0A0A0A] text-[#F9F9F9] py-32 sm:py-44 md:py-52 px-6 sm:px-12 lg:px-24 border-b border-[#0A0A0A] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Header: Center aligned, commanding, breathtaking serif */}
        <motion.h2
          id="scope-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[-0.03em] text-[#F9F9F9] leading-[1.08] sm:leading-[0.98] font-normal"
        >
          {isArabic ? (
            <span>لسنا شركة إعلانات.</span>
          ) : (
            <>
              <span className="italic font-serif">Not</span> an Agency.
            </>
          )}
        </motion.h2>

        {/* Body Copy: Constrained max-width for readability */}
        <motion.p
          id="scope-body"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="mt-10 sm:mt-14 font-sans text-lg sm:text-xl md:text-2xl text-[#F9F9F9]/85 font-light leading-relaxed max-w-3xl text-center"
        >
          {isArabic
            ? 'نعمل بأسعار ثابتة لكل مشروع. لا عقود شهرية، ولا ساعات مخفية. يتم تصميم كل مشروع حول ما تريد تحقيقه، ونتفق معًا على مواعيده من اليوم الأول.'
            : 'We operate entirely on fixed-fee scopes. No retainers, no hidden hours. We scope each project around what you need to achieve, and set the timeline together from day one.'}
        </motion.p>

        {/* Project Windows Boxes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mt-16 sm:mt-24 w-full max-w-4xl pt-10 border-t border-white/20 text-center"
        >
          {/* Small title above the boxes */}
          <span className="font-mono text-xs tracking-widest uppercase text-white/50 block mb-8">
            {isArabic ? 'المدة المناسبة لمشروعك' : 'PROJECT WINDOWS'}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-start">
            {pillars.map((item, idx) => (
              <button
                key={item.title}
                onClick={() => setActivePillar(idx)}
                className={`p-6 text-start transition-all border cursor-pointer ${
                  activePillar === idx
                    ? 'border-white bg-white/10'
                    : 'border-white/15 hover:border-white/40 bg-transparent'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/50">
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-[11px] text-white/70 tracking-wider">
                    ({item.timeframe})
                  </span>
                </div>
                <h4 className="font-serif text-lg sm:text-xl text-white font-medium mb-2.5">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-[13px] font-sans text-white/75 leading-relaxed font-light">
                  {item.detail}
                </p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
