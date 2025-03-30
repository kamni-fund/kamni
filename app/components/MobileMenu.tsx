"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon, CloseIcon } from "@/app/components/Icons";
import ThemeToggleButton from "@/app/components/ThemeToggleButton";
import LanguageToggleButton from "@/app/components/LanguageToggleButton";

// Типы для пропсов
interface NavigationLink {
  id: string;
  href: string;
  title: string;
  children?: NavigationLink[];
}

interface MobileMenuProps {
  links: NavigationLink[];
  fundTitle: string;
  slogan: string;
}

export default function MobileMenu({
  links,
  fundTitle,
  slogan,
}: MobileMenuProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Кнопка для мобильного меню */}
      <button
        type="button"
        className="p-2 rounded-full md:hidden hover:bg-gray-700/20 transition-colors"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open main menu"
      >
        <MenuIcon className="h-6 w-6 text-kamni-yellow" />
      </button>

      {/* Мобильная навигация */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-kamni-dark z-50 overflow-y-auto">
          <div className="container mx-auto py-4">
            <div className="flex justify-between items-center mb-8">
              <Link
                href="/"
                className="text-kamni-yellow text-xl font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                KAMNI
              </Link>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-700/20 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon className="h-6 w-6 text-kamni-yellow" />
              </button>
            </div>

            <nav className="py-4">
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg font-medium text-white hover:text-kamni-yellow block py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.title}
                    </Link>

                    {link.children && (
                      <ul className="pl-6 mt-2 space-y-2 border-l border-gray-700">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="text-gray-300 hover:text-kamni-yellow block py-1"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="pt-6 mt-6 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-kamni-yellow font-medium">
                    {fundTitle}
                  </div>
                  <div className="text-sm opacity-70">{slogan}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <ThemeToggleButton />
                  <LanguageToggleButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
