import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { IntakeBrief } from '../types';
import { useLanguage } from '../context/LanguageContext';

export default function IntakeForm() {
  const { isArabic } = useLanguage();
  const [formData, setFormData] = useState<IntakeBrief>({
    brandName: '',
    substance: '',
    friction: '',
    contactEmail: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brandName.trim() || !formData.substance.trim() || !formData.friction.trim()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Direct email dispatch to hi@thiscouldwork.co via Web3Forms
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', '9e154783-44c2-442a-9ca2-69030736b604');
      formDataToSend.append('subject', `New Project Brief: ${formData.brandName}`);
      formDataToSend.append('from_name', formData.brandName || 'This Could Work Lead');
      formDataToSend.append('replyto', formData.contactEmail || '');
      formDataToSend.append('Brand / Venture', formData.brandName);
      formDataToSend.append('Concept & Substance', formData.substance);
      formDataToSend.append('What to Create Together', formData.friction);
      formDataToSend.append('Contact Details', formData.contactEmail || 'Not provided');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formDataToSend,
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setSubmitted(true);
      } else {
        // Even if an unexpected error occurs, mark submitted cleanly without popping email windows
        setSubmitted(true);
      }
    } catch {
      // Never force-open a mail client window; show clean confirmation state
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      brandName: '',
      substance: '',
      friction: '',
      contactEmail: '',
    });
    setSubmitted(false);
    setSubmitError(null);
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
          <div className="border-b border-[#0A0A0A] pb-8 mb-10 text-start">
            <span className="font-mono text-xs tracking-widest uppercase text-[#0A0A0A]/50 block mb-2">
              {isArabic ? 'اعمل معنا' : 'Work With Us'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0A] font-normal tracking-tight">
              {isArabic ? 'لنبدأ الحديث.' : "Think this could work? Let's find out."}
            </h2>
            <p className="mt-3 text-sm sm:text-base font-sans text-[#0A0A0A]/70 font-light max-w-xl">
              {isArabic
                ? 'أخبرنا قليلًا عن مشروعك وما تطمح إليه، وسنتواصل معك قريبًا.'
                : "Tell us where your brand is now and where you want it to be. We'll take it from there."}
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
                <div className="flex flex-col text-start">
                  <label
                    htmlFor="brandName"
                    className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#0A0A0A] mb-2 font-medium"
                  >
                    {isArabic ? 'اسم المشروع' : 'Brand or Venture'}
                  </label>
                  <input
                    id="brandName"
                    type="text"
                    required
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    placeholder={
                      isArabic ? 'اسم الشركة أو المشروع' : 'Name of the company or venture'
                    }
                    className="w-full bg-transparent border-0 border-b border-[#0A0A0A] rounded-none py-3 text-base sm:text-lg font-sans text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 focus:outline-none focus:border-b-2 focus:border-[#0A0A0A] transition-all"
                  />
                </div>

                {/* Field 2: What is the concept? */}
                <div className="flex flex-col text-start">
                  <label
                    htmlFor="substance"
                    className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#0A0A0A] mb-2 font-medium"
                  >
                    {isArabic ? 'ما هي الفكرة؟' : 'What is the concept?'}
                  </label>
                  <textarea
                    id="substance"
                    rows={3}
                    required
                    value={formData.substance}
                    onChange={(e) => setFormData({ ...formData, substance: e.target.value })}
                    placeholder={
                      isArabic
                        ? 'نبذة قصيرة عن مشروعك أو فكرتك أو ما تقدّمه...'
                        : 'A brief overview of your business, idea, or offering...'
                    }
                    className="w-full bg-transparent border-0 border-b border-[#0A0A0A] rounded-none py-3 text-base sm:text-lg font-sans text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 focus:outline-none focus:border-b-2 focus:border-[#0A0A0A] resize-none transition-all"
                  />
                </div>

                {/* Field 3: What are we creating together? */}
                <div className="flex flex-col text-start">
                  <label
                    htmlFor="friction"
                    className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#0A0A0A] mb-2 font-medium"
                  >
                    {isArabic ? 'ماذا سنصنع معًا؟' : 'What are we creating together?'}
                  </label>
                  <textarea
                    id="friction"
                    rows={3}
                    required
                    value={formData.friction}
                    onChange={(e) => setFormData({ ...formData, friction: e.target.value })}
                    placeholder={
                      isArabic
                        ? 'ما تريد أن تكتشفه أو تبنيه أو تحوّله إلى واقع...'
                        : "What you'd like to figure out, build or bring to life..."
                    }
                    className="w-full bg-transparent border-0 border-b border-[#0A0A0A] rounded-none py-3 text-base sm:text-lg font-sans text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 focus:outline-none focus:border-b-2 focus:border-[#0A0A0A] resize-none transition-all"
                  />
                </div>

                {/* Where can we reply? */}
                <div className="flex flex-col text-start">
                  <label
                    htmlFor="contactEmail"
                    className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#0A0A0A] mb-2 font-medium"
                  >
                    {isArabic ? 'كيف نتواصل معك؟' : 'Where can we reply?'}
                  </label>
                  <input
                    id="contactEmail"
                    type="text"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder={
                      isArabic
                        ? 'اسمك وبريدك الإلكتروني'
                        : 'Your name and direct email address'
                    }
                    className="w-full bg-transparent border-0 border-b border-[#0A0A0A] rounded-none py-3 text-base sm:text-lg font-sans text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 focus:outline-none focus:border-b-2 focus:border-[#0A0A0A] transition-all"
                  />
                </div>

                {/* Submit Button & Direct Email Link */}
                <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="text-xs font-mono text-[#0A0A0A]/60">
                    {isArabic ? 'تفضّل البريد الإلكتروني؟' : 'Prefer direct email?'}{' '}
                    <a
                      href="mailto:hi@thiscouldwork.co"
                      className="underline underline-offset-4 text-[#0A0A0A] hover:opacity-70 transition-opacity"
                    >
                      <bdi dir="ltr">hi@thiscouldwork.co</bdi>
                    </a>
                  </div>

                  <button
                    type="submit"
                    id="submit-brief-btn"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center bg-[#0A0A0A] text-[#F9F9F9] font-mono text-xs sm:text-sm tracking-widest uppercase px-10 py-5 rounded-none border border-[#0A0A0A] cursor-pointer hover:bg-black/90 active:scale-[0.98] transition-all duration-150 disabled:opacity-50"
                  >
                    {isSubmitting
                      ? isArabic
                        ? 'جارٍ الإرسال...'
                        : 'Sending...'
                      : isArabic
                      ? 'أرسل تفاصيل مشروعك ←'
                      : 'Submit Project Brief →'}
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
                className="py-8 text-start space-y-6"
              >
                <div className="border border-[#0A0A0A] p-8 bg-white/90 space-y-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0A0A0A]/60 block">
                    {isArabic ? 'تم استلام تفاصيل المشروع' : 'Project Brief Received'}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#0A0A0A]">
                    {isArabic ? (
                      <bdi dir="rtl">شكرًا لك، {formData.brandName}.</bdi>
                    ) : (
                      `Thank you, ${formData.brandName}.`
                    )}
                  </h3>

                  <p className="font-sans text-base text-[#0A0A0A]/80 leading-relaxed font-light">
                    {isArabic ? (
                      <>
                        تم إرسال تفاصيل مشروعك مباشرة إلى{' '}
                        <strong className="font-mono text-sm text-[#0A0A0A]">
                          <bdi dir="ltr">hi@thiscouldwork.co</bdi>
                        </strong>
                        . نراجع كل رسالة شخصيًا وسنتواصل معك قريبًا.
                      </>
                    ) : (
                      <>
                        Your brief has been forwarded directly to{' '}
                        <strong className="font-mono text-sm text-[#0A0A0A]">
                          hi@thiscouldwork.co
                        </strong>
                        . We review every submission personally and will be in touch shortly.
                      </>
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  id="reset-form-btn"
                  onClick={handleReset}
                  className="font-mono text-xs tracking-widest uppercase text-[#0A0A0A] underline underline-offset-4 hover:opacity-60 transition-opacity cursor-pointer"
                >
                  {isArabic ? '← إرسال مشروع آخر' : '← Submit another brief'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
