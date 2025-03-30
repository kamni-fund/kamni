import React from "react";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import {
  getLocaleFromRequestOrDefault,
  getTranslations,
  getTranslationFunction,
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

  return (
    <footer className="bg-gray-800/30 pt-8 pb-6 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-kamni-yellow font-bold text-lg mb-4">KAMNI</h3>
            <p className="text-gray-300 mb-4">{t("footer.description")}</p>
            <p className="text-sm text-gray-400">{t("header.slogan")}</p>
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
                      <span className="text-gray-300">
                        {t(`header.navigation.${link.id}`)}
                      </span>
                      <ul className="pl-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={child.href}
                              className="text-gray-400 hover:text-kamni-yellow transition-colors"
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
                      className="text-gray-300 hover:text-kamni-yellow transition-colors"
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
                    className="text-gray-300 hover:text-kamni-yellow transition-colors"
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

        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <div>
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-kamni-yellow transition-colors"
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
