import {
  getLocaleFromRequestOrDefault,
  getThemeFromRequestOrDefault,
  getTranslationFunction,
  getTranslations,
} from "@/app/lib/i18n";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { LanguageSelector } from "./LanguageSelector";
import { MobileSheet } from "./MobileSheet";
import { MainNavigation } from "./NavigationMenu";
import { ThemeSelector } from "./ThemeSelector";

// Структура ссылок для навигации
const navigationLinks = [
  { id: "about", href: "/" },
  {
    id: "tokens",
    href: "#",
    isParent: true,
    children: [{ id: "stas", href: "/stas" }],
  },
  {
    id: "services",
    href: "#",
    isParent: true,
    children: [{ id: "verification", href: "/verify" }],
  },
  { id: "programs", href: "#", isParent: true },
];

export default async function Header() {
  // Получаем текущий язык и переводы из кук или заголовков
  const cookieStore = await cookies();
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const locale = getLocaleFromRequestOrDefault(cookieStore, acceptLanguage);
  const translations = await getTranslations(locale);
  const t = getTranslationFunction(translations);

  // Получаем текущую тему
  const theme = getThemeFromRequestOrDefault(cookieStore);

  // Преобразуем navigationLinks для компонентов навигации, добавляя заголовки
  const navigationItemsWithTitles = navigationLinks.map((link) => ({
    ...link,
    title: t(`header.navigation.${link.id}`),
    children: link.children?.map((child) => ({
      ...child,
      title: t(`header.navigation.${child.id}`),
    })),
  }));

  return (
    <header className="py-4 border-b border-border mb-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-10">
            <Link
              href="/"
              className="text-kamni-yellow text-xl font-bold no-underline hover:no-underline"
            >
              KAMNI
            </Link>

            <div className="hidden md:block">
              <MainNavigation links={navigationItemsWithTitles} />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-right hidden sm:block">
              <div className="text-kamni-yellow font-medium">{t("header.fund")}</div>
              <div className="text-sm text-muted-foreground opacity-70">{t("header.slogan")}</div>
            </div>

            <div className="flex items-center space-x-1">
              <ThemeSelector
                initialTheme={theme}
                lightLabel={t("theme.light")}
                darkLabel={t("theme.dark")}
              />
              <LanguageSelector
                initialLanguage={locale}
                languages={[
                  { code: "ru", name: t("language.ru") },
                  { code: "en", name: t("language.en") },
                  { code: "sr", name: t("language.sr") },
                ]}
              />

              <MobileSheet
                links={navigationItemsWithTitles}
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
