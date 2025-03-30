"use client";

import i18next from "i18next";
import { useEffect, useState } from "react";
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next";

// Поддерживаемые языки
export const LANGUAGES = ["ru", "en", "sr"];
export const DEFAULT_LANGUAGE = "ru";

// Предзагрузка ресурсов переводов
const resources = {
  ru: {
    common: require("@/public/locales/ru/common.json"),
  },
  en: {
    common: require("@/public/locales/en/common.json"),
  },
  sr: {
    common: require("@/public/locales/sr/common.json"),
  },
};

// Инициализация i18next для клиентской стороны
i18next.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: LANGUAGES,
  defaultNS: "common",
  fallbackNS: "common",
  resources,
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

// Хук для использования переводов в компонентах
export function useTranslation(ns = "common") {
  const [_language, setLanguage] = useState(DEFAULT_LANGUAGE);

  // Определяем текущий язык при монтировании компонента
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language");

      if (savedLang && LANGUAGES.includes(savedLang)) {
        setLanguage(savedLang);
        i18next.changeLanguage(savedLang);
      } else {
        // Определение языка браузера
        const browserLang = navigator.language.split("-")[0];
        const supportedLang = LANGUAGES.includes(browserLang) ? browserLang : DEFAULT_LANGUAGE;

        setLanguage(supportedLang);
        i18next.changeLanguage(supportedLang);
        localStorage.setItem("language", supportedLang);
      }
    }
  }, []);

  return useTranslationOrg(ns);
}

// Хук для изменения языка
export function useLanguage() {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language");
      if (savedLang && LANGUAGES.includes(savedLang)) {
        setLanguage(savedLang);
      } else {
        const browserLang = navigator.language.split("-")[0];
        const supportedLang = LANGUAGES.includes(browserLang) ? browserLang : DEFAULT_LANGUAGE;

        setLanguage(supportedLang);
        localStorage.setItem("language", supportedLang);
      }
    }
  }, []);

  const changeLanguage = (lang: string) => {
    if (LANGUAGES.includes(lang)) {
      i18next.changeLanguage(lang);
      setLanguage(lang);
      if (typeof window !== "undefined") {
        localStorage.setItem("language", lang);
      }
    }
  };

  return { language, changeLanguage };
}
