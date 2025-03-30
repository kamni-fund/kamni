import Link from "next/link";
import { cookies, headers } from "next/headers";
import {
  getLocaleFromRequestOrDefault,
  getTranslations,
  getTranslationFunction,
  getThemeFromRequestOrDefault,
} from "@/app/lib/i18n";
import MobileMenu from "./MobileMenu";
import ThemeToggleButton from "./ThemeToggleButton";
import LanguageToggleButton from "./LanguageToggleButton";

// Структура ссылок для навигации
const navigationLinks = [
  { id: "about", href: "/" },
  {
    id: "tokens",
    href: "/tokens",
    children: [{ id: "stas", href: "/tokens/stas" }],
  },
  { id: "proposals", href: "/proposals" },
  { id: "verification", href: "/verify" },
];

export default async function Header() {
  // Получаем текущий язык и переводы из кук или заголовков
  const cookieStore = cookies();
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const locale = getLocaleFromRequestOrDefault(cookieStore, acceptLanguage);
  const translations = await getTranslations(locale);
  const t = getTranslationFunction(translations);

  // Получаем текущую тему
  const theme = getThemeFromRequestOrDefault(cookieStore);

  // Преобразуем navigationLinks для MobileMenu, добавляя заголовки
  const mobileMenuLinks = navigationLinks.map((link) => ({
    ...link,
    title: t(`header.navigation.${link.id}`),
    children: link.children?.map((child) => ({
      ...child,
      title: t(`header.navigation.${child.id}`),
    })),
  }));

  return (
    <header className="py-4 border-b border-gray-800 mb-8">
      <div className="container mx-auto">
        {/* Десктопная навигация */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-10">
            <Link
              href="/"
              className="text-kamni-yellow text-xl font-bold no-underline hover:no-underline"
            >
              KAMNI
            </Link>

            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {navigationLinks.map((link) => (
                  <li key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      className="text-white hover:text-kamni-yellow transition-colors"
                    >
                      {t(`header.navigation.${link.id}`)}
                    </Link>

                    {link.children && (
                      <div className="absolute left-0 mt-2 w-48 bg-kamni-dark border border-gray-700 rounded-md shadow-lg hidden group-hover:block z-10">
                        <ul className="py-1">
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block px-4 py-2 text-sm text-white hover:bg-gray-700/30 hover:text-kamni-yellow"
                              >
                                {t(`header.navigation.${child.id}`)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-right hidden sm:block">
              <div className="text-kamni-yellow font-medium">
                {t("header.fund")}
              </div>
              <div className="text-sm opacity-70">{t("header.slogan")}</div>
            </div>

            <div className="flex items-center space-x-1">
              <ThemeToggleButton
                initialTheme={theme}
                lightLabel={t("theme.light")}
                darkLabel={t("theme.dark")}
              />
              <LanguageToggleButton
                initialLanguage={locale}
                buttonLabel={t("language.change")}
                languages={[
                  { code: "ru", name: t("language.ru") },
                  { code: "en", name: t("language.en") },
                  { code: "sr", name: t("language.sr") },
                ]}
              />

              {/* Мобильное меню (клиентский компонент) */}
              <MobileMenu
                links={mobileMenuLinks}
                fundTitle={t("header.fund")}
                slogan={t("header.slogan")}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
