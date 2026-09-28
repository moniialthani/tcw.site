import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { isArabic } = useLanguage();

  return (
    <footer
      id="global-footer"
      className="w-full border-t border-[#0A0A0A] bg-[#F9F9F9] py-10 px-6 sm:px-12 lg:px-20"
    >
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs sm:text-[13px] text-[#0A0A0A] tracking-wider">
        {/* Left: Copyright - Kept in English in both versions as instructed */}
        <span id="footer-copyright">
          <bdi dir="ltr">© 2026 This Could Work W.L.L.</bdi>
        </span>

        {/* Center: Direct Contact Email & Instagram */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[#0A0A0A]/50 uppercase text-[11px]">
              {isArabic ? 'البريد الإلكتروني:' : 'EMAIL:'}
            </span>
            <a
              id="footer-email-link"
              href="mailto:hi@thiscouldwork.co"
              className="font-medium text-[#0A0A0A] underline underline-offset-4 decoration-[#0A0A0A]/40 hover:decoration-[#0A0A0A] transition-colors"
            >
              <bdi dir="ltr">hi@thiscouldwork.co</bdi>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#0A0A0A]/50 uppercase text-[11px]">
              {isArabic ? 'إنستغرام:' : 'INSTAGRAM:'}
            </span>
            <a
              id="footer-instagram-link"
              href="https://instagram.com/thiscouldwork.co"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#0A0A0A] underline underline-offset-4 decoration-[#0A0A0A]/40 hover:decoration-[#0A0A0A] transition-colors"
            >
              <bdi dir="ltr">@thiscouldwork.co</bdi>
            </a>
          </div>
        </div>

        {/* Right: Location & Mandate */}
        <span
          id="footer-location"
          className="text-center md:text-end text-[#0A0A0A]/70 font-sans sm:font-mono text-xs"
        >
          {isArabic
            ? 'من الدوحة، إلى حيث يلزم الوضوح.'
            : 'Based in Doha. Operating wherever clarity is required.'}
        </span>
      </div>
    </footer>
  );
}
