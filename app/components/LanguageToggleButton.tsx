"use client";

import { useState } from "react";
import { GlobeIcon } from "@/app/components/Icons";
import { setCookie } from "cookies-next";

export const LANGUAGES = ["ru", "en", "sr"];

interface Language {
  code: string;
  name: string;
}

const LANGUAGE_NAMES: Record<string, string> = {
  ru: "Русский",
  en: "English",
  sr: "Српски",
};

interface LanguageToggleButtonProps {
  initialLanguage?: string;
  buttonLabel?: string;
  languages?: Language[];
}

export default function LanguageToggleButton({
  initialLanguage = "ru",
  buttonLabel = "Change language",
  languages = LANGUAGES.map((code) => ({ code, name: LANGUAGE_NAMES[code] })),
}: LanguageToggleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(initialLanguage);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    // Сохраняем язык в cookie для серверного рендеринга
    setCookie("language", langCode, { maxAge: 60 * 60 * 24 * 365 }); // 1 год

    // Перезагружаем страницу для применения языка
    window.location.reload();
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
        <span className="sr-only">{buttonLabel}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-kamni-dark border border-gray-700 rounded-md shadow-lg z-10">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentLang === lang.code
                    ? "bg-gray-700/30 text-kamni-yellow"
                    : "hover:bg-gray-700/20"
                }`}
                onClick={() => changeLanguage(lang.code)}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
