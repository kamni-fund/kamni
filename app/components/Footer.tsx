import React from "react";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import {
  getLocaleFromRequestOrDefault,
  getTranslations,
  getTranslationFunction,
} from "@/app/lib/i18n";

// Ссылки на социальные сети и другие ресурсы
const socialLinks = [
  { name: "Telegram", href: "https://t.me/xdefrag" },
  { name: "GitHub", href: "https://github.com/xdefrag/kamni-test" },
  { name: "Email", href: "mailto:contact@kamni.fund" },
];

// Навигационные ссылки в футере
const footerNav = [
  { id: "about", href: "/" },
  { id: "tokens", href: "/tokens" },
  { id: "verification", href: "/verify" },
  { id: "proposals", href: "/proposals" },
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
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-kamni-yellow transition-colors"
                  >
                    {t(`header.navigation.${link.id}`)}
                  </Link>
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
          <div className="mb-4 sm:mb-0">
            {t("footer.rights", { year: new Date().getFullYear() })}
          </div>
          <div className="text-gray-400 text-sm">
            <span>v0.1.0</span>
            <span className="mx-2">•</span>
            <Link href="/privacy" className="hover:text-kamni-yellow">
              {t("footer.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
