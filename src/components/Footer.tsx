export default function Footer() {
  return (
    <footer
      id="global-footer"
      className="w-full border-t border-[#0A0A0A] bg-[#F9F9F9] py-10 px-6 sm:px-12 lg:px-20"
    >
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs sm:text-[13px] text-[#0A0A0A] tracking-wider">
        {/* Left: Copyright */}
        <span id="footer-copyright">
          © 2026 This Could Work W.L.L.
        </span>

        {/* Center: Direct Contact Email */}
        <div className="flex items-center gap-2">
          <span className="text-[#0A0A0A]/50 uppercase text-[11px]">Direct Inquiries:</span>
          <a
            id="footer-email-link"
            href="mailto:hi@thiscouldwork.co"
            className="font-medium text-[#0A0A0A] underline underline-offset-4 decoration-[#0A0A0A]/40 hover:decoration-[#0A0A0A] transition-colors"
          >
            hi@thiscouldwork.co
          </a>
        </div>

        {/* Right: Location & Mandate */}
        <span id="footer-location" className="text-center md:text-right text-[#0A0A0A]/70">
          Based in Doha. Operating wherever clarity is required.
        </span>
      </div>
    </footer>
  );
}
