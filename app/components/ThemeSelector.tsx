"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface ThemeSelectorProps {
  initialTheme?: string;
  lightLabel?: string;
  darkLabel?: string;
}

export function ThemeSelector({
  initialTheme = "dark",
  lightLabel = "Светлая",
  darkLabel = "Темная",
}: ThemeSelectorProps) {
  const [theme, setTheme] = useState(initialTheme);

  // Синхронизируем тему с HTML и localStorage при монтировании
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || initialTheme;
    setTheme(storedTheme);
  }, [initialTheme]);

  const toggleTheme = (newTheme: string) => {
    const html = document.documentElement;
    const body = document.body;

    if (newTheme === "dark") {
      html.classList.add("dark");
      body.classList.add("text-white", "bg-kamni-dark");
      body.classList.remove("text-gray-900", "bg-kamni-light");
    } else {
      html.classList.remove("dark");
      body.classList.remove("text-white", "bg-kamni-dark");
      body.classList.add("text-gray-900", "bg-kamni-light");
    }

    // Сохраняем тему в localStorage
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);

    // Отправляем событие изменения темы
    window.dispatchEvent(
      new CustomEvent("themeChanged", {
        detail: { isDark: newTheme === "dark" },
      })
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="p-2 rounded-full hover:bg-muted/30 transition-colors hover:text-kamni-yellow"
          aria-label="Переключить тему"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-kamni-yellow" />
          ) : (
            <Moon className="h-5 w-5 text-kamni-yellow" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-muted/30 border border-border"
      >
        <DropdownMenuItem
          onClick={() => toggleTheme("light")}
          className={`text-foreground hover:text-kamni-yellow hover:bg-muted/50 ${theme === "light" ? "bg-muted/50" : ""}`}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>{lightLabel}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleTheme("dark")}
          className={`text-foreground hover:text-kamni-yellow hover:bg-muted/50 ${theme === "dark" ? "bg-muted/50" : ""}`}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>{darkLabel}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
