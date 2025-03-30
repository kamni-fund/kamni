import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

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
        slogan: "ДАЙТЕ ДЕНЕГ",
        navigation: {
          about: "О Фонде",
          tokens: "Токены",
          verification: "Верификация",
          proposals: "Предложения",
          publicKey: "Публичный ключ",
        },
      },
      footer: {
        description:
          "Семейный фонд KAMNI занимается накоплением средств для членов семьи.",
        navigation: "Навигация",
        contacts: "Контакты",
        rights: "© {{year}} KAMNI Family Fund",
        privacy: "Политика конфиденциальности",
      },
    })
  ),
  getTranslationFunction: vi.fn(() => {
    return (key: string, params?: Record<string, string | number>) => {
      const parts = key.split(".");
      if (parts[0] === "footer") {
        if (parts[1] === "description")
          return "Семейный фонд KAMNI занимается накоплением средств для членов семьи.";
        if (parts[1] === "navigation") return "Навигация";
        if (parts[1] === "contacts") return "Контакты";
        if (parts[1] === "rights") {
          const year = params?.year || new Date().getFullYear();
          return `© ${year} KAMNI Family Fund`;
        }
        if (parts[1] === "privacy") return "Политика конфиденциальности";
      }
      if (parts[0] === "header") {
        if (parts[1] === "slogan") return "ДАЙТЕ ДЕНЕГ";
        if (parts[1] === "navigation") {
          if (parts[2] === "about") return "О Фонде";
          if (parts[2] === "tokens") return "Токены";
          if (parts[2] === "verification") return "Верификация";
          if (parts[2] === "proposals") return "Предложения";
          if (parts[2] === "publicKey") return "Публичный ключ";
        }
      }
      return key;
    };
  }),
}));

describe("Footer", () => {
  // Перехватываем и разрешаем все промисы перед тестами
  beforeEach(async () => {
    await vi.dynamicImportSettled();
  });

  it("renders the footer content correctly", async () => {
    render(await Footer());

    // Проверяем наличие логотипа и описания
    expect(screen.getByText("KAMNI")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Семейный фонд KAMNI занимается накоплением средств для членов семьи."
      )
    ).toBeInTheDocument();

    // Проверяем заголовки секций
    expect(screen.getByText("Навигация")).toBeInTheDocument();
    expect(screen.getByText("Контакты")).toBeInTheDocument();

    // Проверяем навигационные ссылки
    expect(screen.getByText("О Фонде")).toBeInTheDocument();
    expect(screen.getByText("Токены")).toBeInTheDocument();
    expect(screen.getByText("Верификация")).toBeInTheDocument();
    expect(screen.getByText("Предложения")).toBeInTheDocument();
    expect(screen.getByText("Публичный ключ")).toBeInTheDocument();

    // Проверяем наличие копирайта
    const currentYear = new Date().getFullYear().toString();
    expect(
      screen.getByText(`© ${currentYear} KAMNI Family Fund`)
    ).toBeInTheDocument();

    // Проверяем наличие версии
    expect(screen.getByText("v0.1.0")).toBeInTheDocument();

    // Проверяем наличие политики конфиденциальности
    expect(screen.getByText("Политика конфиденциальности")).toBeInTheDocument();
  });
});
