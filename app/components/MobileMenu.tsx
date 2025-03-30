"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MenuIcon, CloseIcon } from "@/app/components/Icons";
import ThemeToggleButton from "@/app/components/ThemeToggleButton";
import LanguageToggleButton from "@/app/components/LanguageToggleButton";

// Типы для пропсов
interface NavigationLink {
  id: string;
  href: string;
  title: string;
  isParent?: boolean;
  children?: NavigationLink[];
}

interface MobileMenuProps {
  links: NavigationLink[];
  fundTitle: string;
  slogan: string;
}

export default function MobileMenu({
  links,
  fundTitle,
  slogan,
}: MobileMenuProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Проверяем текущую тему при монтировании компонента и при её изменении
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    // Проверяем при монтировании
    checkTheme();

    // Добавляем обработчик для отслеживания изменений темы
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Слушаем событие изменения темы от ThemeToggleButton
    const handleThemeChange = (event: CustomEvent) => {
      setIsDark(event.detail.isDark);
    };

    window.addEventListener("themeChanged", handleThemeChange as EventListener);

    return () => {
      observer.disconnect();
      window.removeEventListener(
        "themeChanged",
        handleThemeChange as EventListener
      );
    };
  }, []);

  return (
    <>
      {/* Кнопка для мобильного меню */}
      <button
        type="button"
        className="p-2 rounded-full md:hidden hover:bg-gray-700/20 transition-colors"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open main menu"
      >
        <MenuIcon className="h-6 w-6 text-kamni-yellow" />
      </button>

      {/* Мобильная навигация */}
      {mobileMenuOpen && (
        <div
          data-theme-bg
          className={
            isDark
              ? "fixed inset-0 bg-kamni-dark z-50 overflow-y-auto"
              : "fixed inset-0 bg-kamni-light z-50 overflow-y-auto"
          }
        >
          <div className="container mx-auto py-4">
            <div className="flex justify-between items-center mb-8">
              <Link
                href="/"
                className="text-kamni-yellow text-xl font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                KAMNI
              </Link>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-700/20 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon className="h-6 w-6 text-kamni-yellow" />
              </button>
            </div>

            <nav className="py-4">
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.id}>
                    {link.isParent ? (
                      <span
                        data-theme-text
                        className={
                          isDark
                            ? "text-lg font-medium text-white block py-2"
                            : "text-lg font-medium text-gray-800 block py-2"
                        }
                      >
                        {link.title}
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        data-theme-text
                        className={
                          isDark
                            ? "text-lg font-medium text-white hover:text-kamni-yellow block py-2"
                            : "text-lg font-medium text-gray-800 hover:text-kamni-yellow block py-2"
                        }
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.title}
                      </Link>
                    )}

                    {link.children && (
                      <ul
                        data-theme-bg
                        className={
                          isDark
                            ? "pl-6 mt-2 space-y-2 border-l border-gray-700"
                            : "pl-6 mt-2 space-y-2 border-l border-gray-300"
                        }
                      >
                        {link.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={child.href}
                              data-theme-secondary
                              className={
                                isDark
                                  ? "text-gray-300 hover:text-kamni-yellow block py-1"
                                  : "text-gray-600 hover:text-kamni-yellow block py-1"
                              }
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div
              data-theme-bg
              className={
                isDark
                  ? "pt-6 mt-6 border-t border-gray-700"
                  : "pt-6 mt-6 border-t border-gray-300"
              }
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-kamni-yellow font-medium">
                    {fundTitle}
                  </div>
                  <div
                    data-theme-secondary
                    className={
                      isDark
                        ? "text-sm opacity-70 text-white"
                        : "text-sm opacity-70 text-gray-700"
                    }
                  >
                    {slogan}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <ThemeToggleButton />
                  <LanguageToggleButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
