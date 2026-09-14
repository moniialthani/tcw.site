import { motion } from 'motion/react';
import { useState } from 'react';

interface MethodColumn {
  phase: string;
  duration: string;
  headline: string;
  body: string;
  takeaway: string;
}

const methods: MethodColumn[] = [
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
    duration: 'Dynamic',
    headline: 'Keeping momentum',
    body: "While our planned meetings give us the space to review everything properly, the work shouldn't stall if a quick thought comes up. You can always ask for a brief check-in between our main milestones to ensure we stay on the exact same page and keep the project moving forward.",
    takeaway: 'A fluid, uninterrupted workflow.',
  },
];

export default function WaysOfWorking() {
  const [activeCol, setActiveCol] = useState<number | null>(null);

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
            The Process
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-sans text-[#0A0A0A]/60 max-w-sm">
          A structured rhythm that balances deep focus with open, honest collaboration.
        </p>
      </div>

      {/* 3-Column Grid separated by vertical 1px hairline rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0A0A0A]">
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
              {/* Refined Roman Phase / Pace */}
              <div className="flex items-center justify-between text-xs font-mono text-[#0A0A0A]/60 tracking-wider mb-8">
                <span className="font-semibold text-[#0A0A0A]">{method.phase}</span>
                <span className="italic">{method.duration}</span>
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
                what we achieve
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
