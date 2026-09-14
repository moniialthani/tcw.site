export default function Footer() {
  return (
    <footer
      id="global-footer"
      className="w-full border-t border-[#0A0A0A] bg-[#F9F9F9] py-8 px-6 sm:px-12 lg:px-20"
    >
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs sm:text-[13px] text-[#0A0A0A] tracking-wider">
        {/* Left: "© 2026 This Could Work W.L.L." */}
        <span id="footer-copyright">
          © 2026 This Could Work W.L.L.
        </span>

        {/* Right: "Based in Doha. Operating wherever clarity is required." */}
        <span id="footer-location" className="text-center sm:text-right text-[#0A0A0A]/80">
          Based in Doha. Operating wherever clarity is required.
        </span>
      </div>
    </footer>
  );
}
