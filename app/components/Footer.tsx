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
import { Separator } from "@/components/ui/separator";

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
  const cookieStore = await cookies();
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const locale = getLocaleFromRequestOrDefault(cookieStore, acceptLanguage);
  const translations = await getTranslations(locale);
  const t = getTranslationFunction(translations);

  // Получаем текущую тему
  const theme = getThemeFromRequestOrDefault(cookieStore);

  return (
    <footer className="bg-muted/30 pt-8 pb-6 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-kamni-yellow font-bold text-lg mb-4">KAMNI</h3>
            <p className="text-foreground mb-4">{t("footer.description")}</p>
            <p className="text-sm text-muted-foreground">
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
                  {link.children && link.children.length > 0 ? (
                    <>
                      <span className="text-foreground">
                        {t(`header.navigation.${link.id}`)}
                      </span>
                      <ul className="pl-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={child.href}
                              className="text-muted-foreground hover:text-kamni-yellow transition-colors"
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
                      className="text-foreground hover:text-kamni-yellow transition-colors"
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
                    className="text-foreground hover:text-kamni-yellow transition-colors"
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

        <Separator className="mb-6 bg-border/50" />

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-muted-foreground hover:text-kamni-yellow transition-colors"
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
