import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
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

// Мокаем модуль next/navigation для решения ошибки useRouter
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
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
      theme: {
        light: "Светлая",
        dark: "Темная",
      },
      language: {
        ru: "Русский",
        en: "English",
        sr: "Српски",
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
      if (parts[0] === "theme") {
        if (parts[1] === "light") return "Светлая";
        if (parts[1] === "dark") return "Темная";
      }
      if (parts[0] === "language") {
        if (parts[1] === "ru") return "Русский";
        if (parts[1] === "en") return "English";
        if (parts[1] === "sr") return "Српски";
      }
      return key;
    };
  }),
  getThemeFromRequestOrDefault: vi.fn(() => "dark"),
}));

// Определяем тип для навигационных ссылок
interface NavLink {
  id: string;
  href: string;
  title: string;
  isParent?: boolean;
  children?: NavLink[];
}

// Мокаем компоненты, использующие Client Components
vi.mock("./MobileSheet", () => ({
  MobileSheet: ({ fundTitle, slogan }: { fundTitle: string; slogan: string }) => (
    <div data-testid="mobile-sheet">
      <div>{fundTitle}</div>
      <div>{slogan}</div>
    </div>
  ),
}));

vi.mock("./ThemeSelector", () => ({
  ThemeSelector: () => (
    <button type="button" data-testid="theme-selector">
      Theme Selector
    </button>
  ),
}));

vi.mock("./LanguageSelector", () => ({
  LanguageSelector: () => (
    <button type="button" data-testid="language-selector">
      Language Selector
    </button>
  ),
}));

vi.mock("./NavigationMenu", () => ({
  MainNavigation: ({ links }: { links: NavLink[] }) => (
    <nav data-testid="main-navigation">
      {links.map((link) => (
        <div key={link.id}>{link.title}</div>
      ))}
    </nav>
  ),
}));

describe("Header", () => {
  // Перехватываем и разрешаем все промисы перед тестами
  beforeEach(async () => {
    await vi.dynamicImportSettled();
  });

  it("renders the logo and navigation links", async () => {
    render(await Header());

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
    expect(screen.getByTestId("main-navigation")).toBeInTheDocument();

    // Проверяем наличие компонентов переключения
    expect(screen.getByTestId("theme-selector")).toBeInTheDocument();
    expect(screen.getByTestId("language-selector")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-sheet")).toBeInTheDocument();
  });
});
