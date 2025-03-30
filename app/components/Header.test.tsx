import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders the logo and navigation links", () => {
    render(<Header />);

    // Проверяем наличие логотипа
    const logo = screen.getByText("KAMNI");
    expect(logo).toBeInTheDocument();

    // Проверяем наличие текста
    expect(screen.getByText("Семейный фонд")).toBeInTheDocument();

    // Проверяем наличие навигационных ссылок
    expect(screen.getByText("О Фонде")).toBeInTheDocument();
    expect(screen.getByText("STAS")).toBeInTheDocument();
    expect(screen.getByText("Верификация")).toBeInTheDocument();
  });
});
