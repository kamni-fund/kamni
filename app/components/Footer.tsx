import React from "react";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import {
  getLocaleFromRequestOrDefault,
  getTranslations,
  getTranslationFunction,
  getThemeFromRequestOrDefault,
} from "@/app/lib/i18n";
import { CreativeCommonsIcon } from "./Icons";

// Ссылки на социальные сети и другие ресурсы
const socialLinks = [
  { name: "Telegram", href: "https://t.me/xdefrag" },
  { name: "GitHub", href: "https://github.com/kamni-fund" },
  { name: "Email", href: "mailto:me@xdefrag.com" },
];

// Навигационные ссылки в футере
const footerNav = [
  { id: "about", href: "/" },
  { id: "tokens", href: "#", children: [{ id: "stas", href: "/stas" }] },
  {
    id: "services",
    href: "#",
    children: [{ id: "verification", href: "/verify" }],
  },
  { id: "programs", href: "#", children: [] },
  { id: "publicKey", href: "/public.gpg" },
];

export default async function Footer() {
  // Получаем текущий язык и переводы из кук или заголовков
  const cookieStore = cookies();
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const locale = getLocaleFromRequestOrDefault(cookieStore, acceptLanguage);
  const translations = await getTranslations(locale);
  const t = getTranslationFunction(translations);

  // Получаем текущую тему
  const theme = getThemeFromRequestOrDefault(cookieStore);
  const isDark = theme === "dark";

  return (
    <footer
      data-theme-bg
      className={
        isDark
          ? "bg-gray-800/30 pt-8 pb-6 mt-auto"
          : "bg-gray-200/50 pt-8 pb-6 mt-auto"
      }
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-kamni-yellow font-bold text-lg mb-4">KAMNI</h3>
            <p
              data-theme-secondary
              className={isDark ? "text-gray-300 mb-4" : "text-gray-700 mb-4"}
            >
              {t("footer.description")}
            </p>
            <p
              data-theme-secondary
              className={
                isDark ? "text-sm text-gray-400" : "text-sm text-gray-500"
              }
            >
              {t("header.slogan")}
            </p>
          </div>

          <div>
            <h3 className="text-kamni-yellow font-bold text-lg mb-4">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-2">
              {footerNav.map((link) => (
                <li key={link.id}>
                  {link.children ? (
                    <>
                      <span
                        data-theme-secondary
                        className={isDark ? "text-gray-300" : "text-gray-700"}
                      >
                        {t(`header.navigation.${link.id}`)}
                      </span>
                      <ul className="pl-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={child.href}
                              data-theme-secondary
                              className={
                                isDark
                                  ? "text-gray-400 hover:text-kamni-yellow transition-colors"
                                  : "text-gray-500 hover:text-kamni-yellow transition-colors"
                              }
                            >
                              {t(`header.navigation.${child.id}`)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      data-theme-secondary
                      className={
                        isDark
                          ? "text-gray-300 hover:text-kamni-yellow transition-colors"
                          : "text-gray-700 hover:text-kamni-yellow transition-colors"
                      }
                    >
                      {t(`header.navigation.${link.id}`)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-kamni-yellow font-bold text-lg mb-4">
              {t("footer.contacts")}
            </h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-theme-secondary
                    className={
                      isDark
                        ? "text-gray-300 hover:text-kamni-yellow transition-colors"
                        : "text-gray-700 hover:text-kamni-yellow transition-colors"
                    }
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          data-theme-bg
          className={
            isDark
              ? "border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center"
              : "border-t border-gray-300 pt-6 flex flex-col sm:flex-row justify-between items-center"
          }
        >
          <div>
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              data-theme-secondary
              className={
                isDark
                  ? "flex items-center text-gray-300 hover:text-kamni-yellow transition-colors"
                  : "flex items-center text-gray-700 hover:text-kamni-yellow transition-colors"
              }
            >
              <CreativeCommonsIcon className="w-4 h-4 mr-1" />
              <span className="mr-1">{t("footer.license")}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
