"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/app/components/Icons";
import { setCookie } from "cookies-next";

type Theme = "light" | "dark";

interface ThemeToggleButtonProps {
  initialTheme?: Theme;
  lightLabel?: string;
  darkLabel?: string;
}

export default function ThemeToggleButton({
  initialTheme = "dark",
  lightLabel = "Switch to light mode",
  darkLabel = "Switch to dark mode",
}: ThemeToggleButtonProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    // Применяем начальную тему при монтировании компонента
    applyTheme(initialTheme);
  }, [initialTheme]);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    // Обновляем атрибуты документа для темы
    if (newTheme === "dark") {
      root.classList.add("dark");
      document.body.style.backgroundColor = "rgb(42, 45, 52)";
      document.body.classList.add("text-white");
      document.body.classList.remove("text-gray-900");

      // Обновляем все текстовые элементы с условной логикой темы
      updateElementsForTheme(true);
    } else {
      root.classList.remove("dark");
      document.body.style.backgroundColor = "rgb(245, 245, 245)";
      document.body.classList.remove("text-white");
      document.body.classList.add("text-gray-900");

      // Обновляем все текстовые элементы с условной логикой темы
      updateElementsForTheme(false);
    }

    // Сохраняем тему в cookie для серверного рендеринга
    setCookie("theme", newTheme, { maxAge: 60 * 60 * 24 * 365 }); // 1 год
  };

  // Полная очистка и новое применение темы для всего сайта
  const updateElementsForTheme = (isDark: boolean) => {
    // Используем явные селекторы для всех элементов

    // Очищаем все элементы от обеих тем
    const purgeElements = (elements: Element[]) => {
      for (const el of elements) {
        el.classList.remove(
          "text-white",
          "text-gray-800",
          "text-gray-700",
          "text-gray-600",
          "text-gray-500",
          "text-gray-400",
          "text-gray-300"
        );
      }
    };

    // ШАПКА САЙТА
    // 1. Основные пункты навигации
    const headerLinks = Array.from(
      document.querySelectorAll(
        "header a:not(.text-kamni-yellow), header span:not(.text-kamni-yellow)"
      )
    );
    purgeElements(headerLinks);
    for (const link of headerLinks) {
      link.classList.add(isDark ? "text-white" : "text-gray-800");
    }

    // 2. Лозунг в шапке
    const headerSlogan = document.querySelector("header .opacity-70");
    if (headerSlogan) {
      headerSlogan.classList.remove("text-white", "text-gray-700");
      headerSlogan.classList.add(isDark ? "text-white" : "text-gray-700");
    }

    // ФУТЕР САЙТА
    // 1. Основной текст в футере
    const footerDescriptions = Array.from(
      document.querySelectorAll("footer p")
    );
    purgeElements(footerDescriptions);
    for (const desc of footerDescriptions) {
      if (desc.classList.contains("text-sm")) {
        desc.classList.add(isDark ? "text-gray-400" : "text-gray-500");
      } else {
        desc.classList.add(isDark ? "text-gray-300" : "text-gray-700");
      }
    }

    // 2. Заголовки категорий
    const footerTitles = Array.from(document.querySelectorAll("footer span"));
    purgeElements(footerTitles);
    for (const title of footerTitles) {
      title.classList.add(isDark ? "text-gray-300" : "text-gray-700");
    }

    // 3. Ссылки в футере
    const footerLinks = Array.from(
      document.querySelectorAll("footer a:not(.text-kamni-yellow)")
    );
    purgeElements(footerLinks);
    for (const link of footerLinks) {
      link.classList.add(isDark ? "text-gray-300" : "text-gray-700");
    }

    // 4. Вложенные ссылки в футере
    const nestedLinks = Array.from(document.querySelectorAll("footer li li a"));
    purgeElements(nestedLinks);
    for (const link of nestedLinks) {
      link.classList.add(isDark ? "text-gray-400" : "text-gray-500");
    }

    // Анимированное обновление фонов
    setTimeout(() => {
      // Обновляем фоны
      const bgElements = Array.from(
        document.querySelectorAll("[data-theme-bg]")
      );
      for (const element of bgElements) {
        if (isDark) {
          element.classList.remove(
            "bg-kamni-light",
            "border-gray-300",
            "bg-gray-200/50"
          );
          element.classList.add("bg-kamni-dark", "border-gray-700");
        } else {
          element.classList.remove(
            "bg-kamni-dark",
            "border-gray-700",
            "bg-gray-800/30"
          );
          element.classList.add("bg-kamni-light", "border-gray-300");
        }
      }

      // Специальная обработка для футера
      const footerElement = document.querySelector("footer");
      if (footerElement) {
        if (isDark) {
          footerElement.style.backgroundColor = "rgba(31, 41, 55, 0.3)";
          footerElement.classList.remove("bg-gray-200/50");
          footerElement.classList.add("bg-gray-800/30");
        } else {
          footerElement.style.backgroundColor = "rgba(229, 231, 235, 0.5)";
          footerElement.classList.remove("bg-gray-800/30");
          footerElement.classList.add("bg-gray-200/50");
        }
      }
    }, 0);

    // Обновляем события trigger для MobileMenu
    window.dispatchEvent(
      new CustomEvent("themeChanged", { detail: { isDark } })
    );
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-700/20 transition-colors"
      aria-label={theme === "dark" ? lightLabel : darkLabel}
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 text-kamni-yellow" />
      ) : (
        <MoonIcon className="h-5 w-5 text-kamni-yellow" />
      )}
    </button>
  );
}
