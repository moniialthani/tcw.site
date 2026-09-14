import { motion } from 'motion/react';
import { useState } from 'react';

export default function Philosophy() {
  const [lens, setLens] = useState<'raw' | 'clarity'>('clarity');

  return (
    <section
      id="philosophy"
      aria-label="The Philosophy"
      className="relative w-full border-b border-[#0A0A0A] bg-[#F9F9F9]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh]">
        {/* Left Column: Asymmetrical, spacious, with tiny technical label: "01 — Plate the Fish" */}
        <div className="lg:col-span-4 p-8 sm:p-14 lg:p-20 border-b lg:border-b-0 lg:border-r border-[#0A0A0A] flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* The exact requested technical label */}
            <span
              id="philosophy-label"
              className="font-mono text-xs sm:text-sm tracking-widest uppercase text-[#0A0A0A] font-medium block"
            >
              Plate the Dish
            </span>

            <p className="mt-6 text-sm text-[#0A0A0A]/60 font-sans leading-relaxed max-w-sm">
              You bring the raw ingredients: your ideas, your product, your story. We add the right seasoning and plate a finished strategy your market will eat up.
            </p>
          </motion.div>

          {/* Interactive Editorial Lens Switcher */}
          <div className="pt-12 sm:pt-16">
            <div className="border border-[#0A0A0A] p-4 bg-white/50 backdrop-blur-xs">
              <div className="flex items-center justify-between mb-3 text-[11px] font-mono tracking-wider uppercase text-[#0A0A0A]/60">
                <span>Editorial Lens</span>
                <span className="font-semibold text-[#0A0A0A]">
                  {lens === 'clarity' ? 'Sharp Focus' : 'Raw State'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setLens('raw')}
                  className={`py-2 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                    lens === 'raw'
                      ? 'bg-[#0A0A0A] text-[#F9F9F9]'
                      : 'border border-[#0A0A0A]/20 hover:border-[#0A0A0A] text-[#0A0A0A]'
                  }`}
                >
                  Raw Material
                </button>
                <button
                  onClick={() => setLens('clarity')}
                  className={`py-2 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                    lens === 'clarity'
                      ? 'bg-[#0A0A0A] text-[#F9F9F9]'
                      : 'border border-[#0A0A0A]/20 hover:border-[#0A0A0A] text-[#0A0A0A]'
                  }`}
                >
                  Intervention
                </button>
              </div>
              <p className="mt-3 text-[11px] font-sans text-[#0A0A0A]/70 leading-normal">
                {lens === 'clarity'
                  ? 'We filter out redundant noise and isolate the sharpest positioning.'
                  : 'You have deep craft, functioning systems, and genuine substance.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Tightly kerned editorial text block */}
        <div className="lg:col-span-8 p-8 sm:p-14 lg:p-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <blockquote
              id="philosophy-body"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.2] tracking-[-0.02em] text-[#0A0A0A]"
            >
              You already have the substance. The product exists, the foundation is built. You aren’t looking for someone to invent a new reality from scratch. You need someone to{' '}
              <span className="italic underline decoration-1 underline-offset-8 decoration-[#0A0A0A]/30">
                organize the raw material
              </span>
              , sharpen the thinking, and present it so it actually lands.{' '}
              <span className="font-medium">We step in, structure the mess, and step out.</span>
            </blockquote>

            {/* Editorial Footnote */}
            <div className="mt-12 sm:mt-16 pt-8 border-t border-[#0A0A0A]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono tracking-wider text-[#0A0A0A]/60">
              <span>Substance precedes form.</span>
              <span>No agency retainer traps.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
