import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { IntakeBrief } from '../types';

export default function IntakeForm() {
  const [formData, setFormData] = useState<IntakeBrief>({
    brandName: '',
    substance: '',
    friction: '',
    contactEmail: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brandName.trim() || !formData.substance.trim() || !formData.friction.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const handleReset = () => {
    setFormData({
      brandName: '',
      substance: '',
      friction: '',
      contactEmail: '',
    });
    setSubmitted(false);
  };

  return (
    <section
      id="intake"
      aria-label="Intake Form"
      className="relative w-full py-28 sm:py-36 lg:py-44 px-6 sm:px-12 lg:px-24 bg-[#F9F9F9] flex flex-col items-center justify-center border-b border-[#0A0A0A]"
    >
      <div className="w-full max-w-3xl mx-auto">
        {/* Print-Aesthetic Stationery Sheet */}
        <div className="border border-[#0A0A0A] p-8 sm:p-14 lg:p-18 bg-white/70 shadow-[0_2px_30px_rgba(0,0,0,0.03)] backdrop-blur-xs">
          {/* Header */}
          <div className="border-b border-[#0A0A0A] pb-8 mb-10">
            <span className="font-mono text-xs tracking-widest uppercase text-[#0A0A0A]/50 block mb-2">
              Work With Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0A] font-normal tracking-tight">
              Shape your next chapter.
            </h2>
            <p className="mt-3 text-sm sm:text-base font-sans text-[#0A0A0A]/70 font-light max-w-xl">
              We partner with ambitious founders and teams to clarify their brand and build decisive work.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="intake-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-12"
              >
                {/* Field 1: Brand or Venture */}
                <div className="flex flex-col">
                  <label
                    htmlFor="brandName"
                    className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#0A0A0A] mb-2 font-medium"
                  >
                    Brand or Venture
                  </label>
                  <input
                    id="brandName"
                    type="text"
                    required
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    placeholder="Name of the company or venture"
                    className="w-full bg-transparent border-0 border-b border-[#0A0A0A] rounded-none py-3 text-base sm:text-lg font-sans text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 focus:outline-none focus:border-b-2 focus:border-[#0A0A0A] transition-all"
                  />
                </div>

                {/* Field 2: What is the concept? */}
                <div className="flex flex-col">
                  <label
                    htmlFor="substance"
                    className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#0A0A0A] mb-2 font-medium"
                  >
                    What is the concept?
                  </label>
                  <textarea
                    id="substance"
                    rows={3}
                    required
                    value={formData.substance}
                    onChange={(e) => setFormData({ ...formData, substance: e.target.value })}
                    placeholder="A brief overview of your business, idea, or offering..."
                    className="w-full bg-transparent border-0 border-b border-[#0A0A0A] rounded-none py-3 text-base sm:text-lg font-sans text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 focus:outline-none focus:border-b-2 focus:border-[#0A0A0A] resize-none transition-all"
                  />
                </div>

                {/* Field 3: What are we creating together? */}
                <div className="flex flex-col">
                  <label
                    htmlFor="friction"
                    className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#0A0A0A] mb-2 font-medium"
                  >
                    What are we creating together?
                  </label>
                  <textarea
                    id="friction"
                    rows={3}
                    required
                    value={formData.friction}
                    onChange={(e) => setFormData({ ...formData, friction: e.target.value })}
                    placeholder="What you need designed, written, or structured..."
                    className="w-full bg-transparent border-0 border-b border-[#0A0A0A] rounded-none py-3 text-base sm:text-lg font-sans text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 focus:outline-none focus:border-b-2 focus:border-[#0A0A0A] resize-none transition-all"
                  />
                </div>

                {/* Where can we reply? */}
                <div className="flex flex-col">
                  <label
                    htmlFor="contactEmail"
                    className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#0A0A0A] mb-2 font-medium"
                  >
                    Where can we reply?
                  </label>
                  <input
                    id="contactEmail"
                    type="text"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="Your name and direct email address"
                    className="w-full bg-transparent border-0 border-b border-[#0A0A0A] rounded-none py-3 text-base sm:text-lg font-sans text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 focus:outline-none focus:border-b-2 focus:border-[#0A0A0A] transition-all"
                  />
                </div>

                {/* Submit Button: Stark, sharp-cornered black geometric block with crisp white text */}
                <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <span className="text-xs font-mono text-[#0A0A0A]/50 tracking-wider">
                    Direct principal review within 48 hours.
                  </span>

                  <button
                    type="submit"
                    id="submit-brief-btn"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center bg-[#0A0A0A] text-[#F9F9F9] font-mono text-xs sm:text-sm tracking-widest uppercase px-10 py-5 rounded-none border border-[#0A0A0A] cursor-pointer hover:bg-black/90 active:scale-[0.98] transition-all duration-150 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Project Brief →'}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="intake-confirmation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="py-8 text-left space-y-6"
              >
                <div className="border border-[#0A0A0A] p-8 bg-white/90 space-y-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0A0A0A]/60 block">
                    Project Brief Received
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#0A0A0A]">
                    Thank you, {formData.brandName}.
                  </h3>

                  <p className="font-sans text-base text-[#0A0A0A]/80 leading-relaxed font-light">
                    Your brief has been received. We review every project directly and will be in touch within 48 hours to discuss how we can shape the work together.
                  </p>
                </div>

                <button
                  type="button"
                  id="reset-form-btn"
                  onClick={handleReset}
                  className="font-mono text-xs tracking-widest uppercase text-[#0A0A0A] underline underline-offset-4 hover:opacity-60 transition-opacity cursor-pointer"
                >
                  ← Submit another brief
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
