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
    // Сохраняем тему в cookie для серверного рендеринга
    setCookie("theme", newTheme, { maxAge: 60 * 60 * 24 * 365 }); // 1 год
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
