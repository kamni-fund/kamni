/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  // Список поддерживаемых языков
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "en", "sr"],
    localeDetection: true,
  },
  // Пути к файлам переводов
  localePath: "./public/locales",
  // Настройки для режима серверного рендеринга
  reloadOnPrerender: process.env.NODE_ENV === "development",
  // Автоматическое определение языка и перенаправление
  // на соответствующую локализованную страницу
  detection: {
    order: ["cookie", "localStorage", "navigator", "path", "htmlTag"],
    caches: ["cookie", "localStorage"],
    lookupCookie: "language",
    lookupLocalStorage: "language",
    cookieSecure: process.env.NODE_ENV === "production",
  },
};
