"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface Language {
  code: string;
  name: string;
}

interface LanguageSelectorProps {
  initialLanguage?: string;
  buttonLabel?: string;
  languages?: Language[];
}

export function LanguageSelector({
  initialLanguage = "ru",
  buttonLabel = "Язык",
  languages = [
    { code: "ru", name: "Русский" },
    { code: "en", name: "English" },
    { code: "sr", name: "Српски" },
  ],
}: LanguageSelectorProps) {
  const router = useRouter();
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    // Синхронизация со значением из кук при загрузке
    setLanguage(initialLanguage);
  }, [initialLanguage]);

  const changeLanguage = (langCode: string) => {
    // Устанавливаем выбранный язык
    setLanguage(langCode);

    // Сохраняем выбранный язык в куки
    document.cookie = `NEXT_LOCALE=${langCode}; path=/; max-age=31536000; SameSite=Lax`;

    // Перезагружаем страницу, чтобы применить новый язык
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="p-2 rounded-full hover:bg-muted/30 transition-colors hover:text-kamni-yellow"
          aria-label="Переключить язык"
        >
          <Globe className="h-5 w-5 text-kamni-yellow" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-muted/30 border border-border"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`text-foreground hover:text-kamni-yellow hover:bg-muted/50 ${language === lang.code ? "bg-muted/50" : ""}`}
          >
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
