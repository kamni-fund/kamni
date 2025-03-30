"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavigationLink {
  id: string;
  href: string;
  title: string;
  isParent?: boolean;
  children?: NavigationLink[];
}

interface MainNavigationProps {
  links: NavigationLink[];
  className?: string;
}

export function MainNavigation({ links, className }: MainNavigationProps) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="flex space-x-6">
        {links.map((link) => (
          <NavigationMenuItem key={link.id}>
            {link.isParent ? (
              <>
                <NavigationMenuTrigger className="text-foreground hover:text-kamni-yellow transition-colors bg-transparent px-0 py-1 font-normal">
                  {link.title}
                </NavigationMenuTrigger>
                {link.children && (
                  <NavigationMenuContent className="bg-muted/30 border border-border rounded-md shadow-lg">
                    <ul className="p-2 w-48">
                      {link.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-muted/50 hover:text-kamni-yellow transition-colors rounded"
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                )}
              </>
            ) : (
              <Link
                href={link.href}
                className="text-foreground hover:text-kamni-yellow transition-colors py-1 px-0"
              >
                {link.title}
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
