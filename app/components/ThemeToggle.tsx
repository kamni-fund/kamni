"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/app/components/Icons";
import { useTranslation } from "@/app/i18n";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const { t } = useTranslation();

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
      document.body.style.backgroundColor = "rgb(42, 45, 52)";
      document.body.classList.add("text-white");
      document.body.classList.remove("text-gray-900");
    } else {
      root.classList.remove("dark");
      document.body.style.backgroundColor = "rgb(255, 255, 255)";
      document.body.classList.remove("text-white");
      document.body.classList.add("text-gray-900");
    }
    localStorage.setItem("theme", newTheme);
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
      aria-label={t(`theme.${theme === "dark" ? "light" : "dark"}`)}
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 text-kamni-yellow" />
      ) : (
        <MoonIcon className="h-5 w-5 text-kamni-yellow" />
      )}
    </button>
  );
}
