import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const LANGUAGES = ["ru", "en", "sr"];
export const DEFAULT_LANGUAGE = "ru";

// Определяем типы для объекта переводов без циклических ссылок
export interface TranslationObject {
  [key: string]: string | TranslationObject;
}

// Загрузка переводов для указанного языка
export async function getTranslations(
  locale: string,
  namespace = "common"
): Promise<TranslationObject> {
  try {
    const translations = await import(`@/public/locales/${locale}/${namespace}.json`);
    return translations.default || translations;
  } catch (error) {
    console.error(`Failed to load translations for ${locale}/${namespace}`, error);

    // Возврат пустого объекта, если не удалось загрузить переводы
    return {};
  }
}

// Получение языка из кук, заголовка Accept-Language или возврат языка по умолчанию
export function getLocaleFromRequestOrDefault(
  cookies?: ReadonlyRequestCookies,
  acceptLanguage?: string
): string {
  // Проверка куки language
  const localeCookie = cookies?.get("language")?.value;
  if (localeCookie && LANGUAGES.includes(localeCookie)) {
    return localeCookie;
  }

  // Проверка заголовка Accept-Language
  if (acceptLanguage) {
    // Этот код упрощен для демонстрации. В реальных проектах следует использовать
    // надёжную библиотеку для разбора Accept-Language
    const browserLocales = acceptLanguage
      .split(",")
      .map((item) => item.split(";")[0].trim().substring(0, 2));

    // Находим первый поддерживаемый язык из предпочтений браузера
    for (const loc of browserLocales) {
      if (LANGUAGES.includes(loc)) {
        return loc;
      }
    }
  }

  // Возвращаем язык по умолчанию, если ничего не подошло
  return DEFAULT_LANGUAGE;
}

// Функция-хелпер для перевода строк
export function getTranslationFunction(translations: TranslationObject) {
  return function t(key: string, params?: Record<string, string | number>): string {
    const keys = key.split(".");
    let result: unknown = translations;

    for (const k of keys) {
      if (typeof result === "object" && result !== null) {
        result = (result as Record<string, unknown>)[k];
      } else {
        return key; // Возвращаем ключ, если путь к переводу некорректен
      }

      if (result === undefined) {
        return key; // Возвращаем ключ, если перевод не найден
      }
    }

    if (typeof result !== "string") {
      return key; // Возвращаем ключ, если результат не строка
    }

    // Замена параметров в формате {{param}}
    if (params) {
      return result.replace(/\{\{(\w+)\}\}/g, (_: string, paramName: string) => {
        return params[paramName] !== undefined ? String(params[paramName]) : `{{${paramName}}}`;
      });
    }

    return result;
  };
}

// Функция для получения темы из кук или возврат темы по умолчанию
export function getThemeFromRequestOrDefault(cookies?: ReadonlyRequestCookies): "light" | "dark" {
  const themeCookie = cookies?.get("theme")?.value as "light" | "dark" | undefined;
  return themeCookie === "light" ? "light" : "dark"; // По умолчанию 'dark'
}
