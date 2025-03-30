"use client";

import { useState } from "react";
import { GlobeIcon } from "@/app/components/Icons";
import { useTranslation } from "@/app/i18n";
import { useLanguage, LANGUAGES } from "@/app/i18n";

export default function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-700/20 transition-colors flex items-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <GlobeIcon className="h-5 w-5 text-kamni-yellow" />
        <span className="sr-only">{t("language.change")}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-kamni-dark border border-gray-700 rounded-md shadow-lg z-10">
          <div className="py-1">
            {LANGUAGES.map((langCode) => (
              <button
                key={langCode}
                type="button"
                className={`block w-full text-left px-4 py-2 text-sm ${
                  language === langCode
                    ? "bg-gray-700/30 text-kamni-yellow"
                    : "hover:bg-gray-700/20"
                }`}
                onClick={() => handleLanguageChange(langCode)}
              >
                {t(`language.${langCode}`)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
