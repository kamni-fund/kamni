import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders the copyright text and version", () => {
    render(<Footer />);

    // Проверяем наличие текущего года в копирайте
    const currentYear = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} KAMNI`))
    ).toBeInTheDocument();

    // Проверяем наличие версии
    expect(screen.getByText("v0.1.0")).toBeInTheDocument();
  });
});
