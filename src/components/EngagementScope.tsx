import { motion } from 'motion/react';
import { useState } from 'react';

export default function EngagementScope() {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      title: 'The Sprint',
      timeframe: '< 2 weeks',
      detail: 'High-impact turnarounds for distinct, immediate needs.',
    },
    {
      title: 'The Standard',
      timeframe: '2–4 weeks',
      detail: 'Our baseline timeline for intensive, focused project execution.',
    },
    {
      title: 'The Deep Dive',
      timeframe: 'Custom length',
      detail: 'Scaled timelines tailored specifically for multi-layered, larger scopes.',
    },
  ];

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
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-[-0.03em] text-[#F9F9F9] leading-[0.98] font-normal"
        >
          <span className="italic font-serif">Not</span> an Agency.
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
          We operate entirely on fixed-fee scopes. No retainers, no hidden hours. You engage us for exactly what you need to achieve, mapped out into clear, fast-paced timelines.
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
            Project Windows
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {pillars.map((item, idx) => (
              <button
                key={item.title}
                onClick={() => setActivePillar(idx)}
                className={`p-6 text-left transition-all border cursor-pointer ${
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
