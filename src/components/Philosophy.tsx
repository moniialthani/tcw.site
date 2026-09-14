import { motion } from 'motion/react';

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-label="The Philosophy"
      className="relative w-full border-b border-[#0A0A0A] bg-[#F9F9F9]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh]">
        {/* Left Column: Asymmetrical, spacious, with technical label: "Plate the Dish" */}
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

          <div className="hidden lg:block pt-12 text-[11px] font-mono tracking-widest uppercase text-[#0A0A0A]/40">
            [ 01 — Strategic Intervention ]
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
            <div
              id="philosophy-body"
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.3] tracking-[-0.015em] text-[#0A0A0A] space-y-8"
            >
              <p>
                Not every project starts with a problem. Sometimes it’s a launch, sometimes it’s a new location, sometimes it’s a pivot into a different market. What ties them together is the same goal: making an impact, not just going through the motions. That’s where we come in, working alongside you with what’s already there and shaping it together to make the impact you’re after.
              </p>

              <div className="pt-2">
                <p className="italic text-xl sm:text-2xl md:text-3xl text-[#0A0A0A]/85 font-normal">
                  Got the idea? Need help shaping the rest?
                </p>
                <p className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#0A0A0A] mt-2">
                  This could work.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
