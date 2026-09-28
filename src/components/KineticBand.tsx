import { useLanguage } from '../context/LanguageContext';

export default function KineticBand() {
  const { isArabic } = useLanguage();

  const englishStatement =
    'VISION INTO EXECUTION  •  ORDER OUT OF CHAOS  •  CLARITY IN MOTION  •  OUTPUT OVER HOURS  •  INTENT INTO REALITY  •  ';

  const arabicStatement =
    'من الرؤية إلى التنفيذ  •  نظام من قلب الفوضى  •  وضوح في كل خطوة  •  النتيجة قبل الساعات  •  من النية إلى الواقع  •  ';

  const statement = isArabic ? arabicStatement : englishStatement;

  return (
    <div
      aria-hidden="true"
      className="w-full border-b border-[#0A0A0A] bg-[#F9F9F9] overflow-hidden select-none py-3.5"
    >
      <div className="flex whitespace-nowrap animate-ticker">
        <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#0A0A0A]/70 pr-4">
          {statement.repeat(4)}
        </span>
        <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#0A0A0A]/70 pr-4">
          {statement.repeat(4)}
        </span>
      </div>
    </div>
  );
}
