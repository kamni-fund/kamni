import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

// Мокаем модули Next.js
vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    get: vi.fn((name) => {
      if (name === "language") return { value: "ru" };
      if (name === "theme") return { value: "dark" };
      return null;
    }),
  })),
  headers: vi.fn(() => ({
    get: vi.fn(() => "ru"),
  })),
}));

// Мокаем модуль i18n
vi.mock("@/app/lib/i18n", () => ({
  getLocaleFromRequestOrDefault: vi.fn(() => "ru"),
  getTranslations: vi.fn(() =>
    Promise.resolve({
      header: {
        fund: "Семейный фонд",
        slogan: "ДАЙТЕ ДЕНЕГ",
        navigation: {
          about: "О Фонде",
          tokens: "Токены",
          stas: "STAS",
          services: "Услуги",
          verification: "Верификация",
          programs: "Программы",
        },
      },
    })
  ),
  getTranslationFunction: vi.fn(() => {
    return (key: string) => {
      const parts = key.split(".");
      if (parts[0] === "header") {
        if (parts[1] === "fund") return "Семейный фонд";
        if (parts[1] === "slogan") return "ДАЙТЕ ДЕНЕГ";
        if (parts[1] === "navigation") {
          if (parts[2] === "about") return "О Фонде";
          if (parts[2] === "tokens") return "Токены";
          if (parts[2] === "stas") return "STAS";
          if (parts[2] === "services") return "Услуги";
          if (parts[2] === "verification") return "Верификация";
          if (parts[2] === "programs") return "Программы";
        }
      }
      return key;
    };
  }),
  getThemeFromRequestOrDefault: vi.fn(() => "dark"),
}));

// Мокаем клиентские компоненты
vi.mock("./MobileMenu", () => ({
  default: ({ fundTitle, slogan }: { fundTitle: string; slogan: string }) => (
    <div data-testid="mobile-menu">
      <div>{fundTitle}</div>
      <div>{slogan}</div>
    </div>
  ),
}));

vi.mock("./ThemeToggleButton", () => ({
  default: () => (
    <button type="button" data-testid="theme-toggle">
      Theme Toggle
    </button>
  ),
}));

vi.mock("./LanguageToggleButton", () => ({
  default: () => (
    <button type="button" data-testid="language-toggle">
      Language Toggle
    </button>
  ),
}));

describe("Header", () => {
  // Перехватываем и разрешаем все промисы перед тестами
  beforeEach(async () => {
    await vi.dynamicImportSettled();
  });

  it("renders the logo and navigation links", async () => {
    const { container } = render(await Header());

    // Проверяем наличие логотипа
    const logo = screen.getByText("KAMNI");
    expect(logo).toBeInTheDocument();

    // Проверяем наличие текста
    expect(
      screen.getByText("Семейный фонд", { selector: ".text-kamni-yellow" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("ДАЙТЕ ДЕНЕГ", { selector: ".text-sm.opacity-70" })
    ).toBeInTheDocument();

    // Проверяем наличие навигационных ссылок
    expect(screen.getByText("О Фонде")).toBeInTheDocument();
    expect(screen.getByText("Токены")).toBeInTheDocument();
    expect(screen.getByText("Услуги")).toBeInTheDocument();
    expect(screen.getByText("Программы")).toBeInTheDocument();

    // Проверяем наличие компонентов переключения
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
    expect(screen.getByTestId("language-toggle")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });
});
