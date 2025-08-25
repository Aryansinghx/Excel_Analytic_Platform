import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const languages = [
  { code: "en", label: "English", icon: "🇬🇧" },
  { code: "hi", label: "हिंदी", icon: "🇮🇳" },
  { code: "mr", label: "मराठी", icon: "🇮🇳" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Ensure language change triggers rerender
  useEffect(() => {
    // This effect will run on language change
  }, [i18n.language]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm font-semibold shadow-sm hover:bg-gray-200 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-lg">{current.icon}</span> {current.label} <FaChevronDown className="text-xs" />
      </button>
      {open && (
        <ul className="absolute left-0 mt-2 w-36 bg-white border rounded shadow-lg z-10" role="listbox">
          {languages.map((lang) => (
            <li
              key={lang.code}
              className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-emerald-50 text-sm ${i18n.language === lang.code ? 'bg-emerald-700 text-white' : ''}`}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
              role="option"
              aria-selected={i18n.language === lang.code}
            >
              <span className="text-lg">{lang.icon}</span> {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;