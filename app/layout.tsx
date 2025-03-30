import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getThemeFromRequestOrDefault } from "@/app/lib/i18n";
import Script from "next/script";

// Расширенные метаданные для SEO
export const metadata: Metadata = {
  title: "KAMNI - Семейный фонд",
  description:
    "Семейный фонд KAMNI занимается накоплением средств для членов семьи",
  keywords: [
    "семейный фонд",
    "накопления",
    "инвестиции",
    "STAS",
    "верификация",
    "Монтелиберо",
  ],
  metadataBase: new URL("https://kamni.io"),
  // TODO: Добавить актуальную информацию
  authors: [{ name: "KAMNI Family Fund" }],
  creator: "KAMNI Family Fund",
  publisher: "KAMNI Family Fund",
  openGraph: {
    title: "KAMNI - Семейный фонд",
    description:
      "Семейный фонд KAMNI занимается накоплением средств для членов семьи",
    url: "https://kamni.io",
    siteName: "KAMNI Family Fund",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KAMNI - Семейный фонд",
    description:
      "Семейный фонд KAMNI занимается накоплением средств для членов семьи",
    creator: "@xdefrag", // TODO: Заменить актуальным Twitter аккаунтом
  },
  // TODO: Добавить актуальные ссылки на социальные сети
  verification: {
    other: {},
  },
};

// Настройки области просмотра для мобильных устройств
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2A2D34",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Получаем тему из кук
  const cookieStore = await cookies();
  const theme = getThemeFromRequestOrDefault(cookieStore);

  return (
    <html
      lang="ru"
      className={`h-full scroll-smooth ${theme === "dark" ? "dark" : ""}`}
    >
      <body
        className={`
        ${
          theme === "dark"
            ? "text-white bg-kamni-dark"
            : "text-gray-900 bg-kamni-light"
        } 
        flex flex-col min-h-screen
      `}
      >
        <div className="container mx-auto px-4">
          <Header />
          <main className="flex-grow py-8">{children}</main>
        </div>
        <Footer />

        {/* Используем Script компонент вместо dangerouslySetInnerHTML */}
        <Script id="theme-init">{`
          (function() {
            try {
              var theme = localStorage.getItem('theme') || '${theme}';
              var html = document.documentElement;
              
              if (theme === 'dark') {
                html.classList.add('dark');
                document.body.classList.add('text-white');
                document.body.classList.add('bg-kamni-dark');
                document.body.classList.remove('text-gray-900');
                document.body.classList.remove('bg-kamni-light');
              } else {
                html.classList.remove('dark');
                document.body.classList.remove('text-white');
                document.body.classList.remove('bg-kamni-dark');
                document.body.classList.add('text-gray-900');
                document.body.classList.add('bg-kamni-light');
              }
            } catch (e) {
              console.error('Error setting initial theme', e);
            }
          })();
        `}</Script>
      </body>
    </html>
  );
}
