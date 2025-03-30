"use client";

import { MenuIcon } from "@/app/components/Icons";
import { LanguageSelector } from "@/app/components/LanguageSelector";
import { ThemeSelector } from "@/app/components/ThemeSelector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";

interface NavigationLink {
  id: string;
  href: string;
  title: string;
  isParent?: boolean;
  children?: NavigationLink[];
}

interface MobileSheetProps {
  links: NavigationLink[];
  fundTitle: string;
  slogan: string;
}

export function MobileSheet({ links, fundTitle, slogan }: MobileSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden p-2 rounded-full hover:bg-muted/30 transition-colors hover:text-kamni-yellow"
          aria-label="Открыть меню"
        >
          <MenuIcon className="h-6 w-6 text-kamni-yellow" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] bg-background border-r border-border"
      >
        <SheetHeader>
          <SheetTitle className="text-kamni-yellow">KAMNI</SheetTitle>
        </SheetHeader>

        <nav className="mt-8">
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.id}>
                {link.isParent ? (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-foreground">{link.title}</h3>
                    {link.children && (
                      <ul className="pl-4 space-y-2 border-l-2 border-muted">
                        {link.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={child.href}
                              className="text-muted-foreground hover:text-kamni-yellow transition-colors"
                              onClick={() => setOpen(false)}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="text-lg font-medium text-foreground hover:text-kamni-yellow transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Separator className="mb-4 bg-border" />
          <div className="mb-4">
            <div className="text-kamni-yellow font-medium">{fundTitle}</div>
            <div className="text-sm text-muted-foreground">{slogan}</div>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeSelector />
            <LanguageSelector />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
