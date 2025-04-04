import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
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
  getThemeFromRequestOrDefault: vi.fn(() => "dark"),
  getTranslations: vi.fn(() =>
    Promise.resolve({
      header: {
        slogan: "ДАЙТЕ ДЕНЕГ",
        navigation: {
          about: "О Фонде",
          tokens: "Токены",
          stas: "STAS",
          services: "Услуги",
          verification: "Верификация",
          programs: "Программы",
          publicKey: "Публичный ключ",
        },
      },
      footer: {
        description: "Семейный фонд KAMNI занимается накоплением средств для членов семьи.",
        navigation: "Навигация",
        contacts: "Контакты",
        license: "footer.license",
      },
    })
  ),
  getTranslationFunction: vi.fn(() => {
    return (key: string, _params?: Record<string, string | number>) => {
      const parts = key.split(".");
      if (parts[0] === "footer") {
        if (parts[1] === "description")
          return "Семейный фонд KAMNI занимается накоплением средств для членов семьи.";
        if (parts[1] === "navigation") return "Навигация";
        if (parts[1] === "contacts") return "Контакты";
        if (parts[1] === "license") return "footer.license";
      }
      if (parts[0] === "header") {
        if (parts[1] === "slogan") return "ДАЙТЕ ДЕНЕГ";
        if (parts[1] === "navigation") {
          if (parts[2] === "about") return "О Фонде";
          if (parts[2] === "tokens") return "Токены";
          if (parts[2] === "stas") return "STAS";
          if (parts[2] === "services") return "Услуги";
          if (parts[2] === "verification") return "Верификация";
          if (parts[2] === "programs") return "Программы";
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
      screen.getByText("Семейный фонд KAMNI занимается накоплением средств для членов семьи.")
    ).toBeInTheDocument();

    // Проверяем заголовки секций
    expect(screen.getByText("Навигация")).toBeInTheDocument();
    expect(screen.getByText("Контакты")).toBeInTheDocument();

    // Проверяем навигационные ссылки
    expect(screen.getByText("О Фонде")).toBeInTheDocument();
    expect(screen.getByText("Токены")).toBeInTheDocument();
    expect(screen.getByText("Услуги")).toBeInTheDocument();
    expect(screen.getByText("Программы")).toBeInTheDocument();
    expect(screen.getByText("Публичный ключ")).toBeInTheDocument();

    // Проверяем наличие копилефта
    expect(screen.getByText("footer.license")).toBeInTheDocument();
  });
});
