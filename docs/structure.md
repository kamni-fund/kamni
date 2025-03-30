# Структура проекта

## Основные компоненты

### Лэйаут (`app/layout.tsx`)
- Корневой шаблон
- Инициализация темы
- SEO-метаданные

### Хедер (`app/components/Header.tsx`)
- Навигация и переключатели
- Структура в `navigationLinks`
- При изменении обновить `Header.test.tsx`

### Футер (`app/components/Footer.tsx`)
- Навигация и контакты
- Структура в `footerNav`
- При изменении обновить `Footer.test.tsx`

## Адаптивность

### Мобильное меню (`app/components/MobileMenu.tsx`)
- Мобильная навигация
- Синхронизировать с `Header.tsx`

## Темизация

### Переключатель темы
- Клиент: `app/components/ThemeToggleButton.tsx`
- Сервер: `app/components/ThemeToggle.tsx`
- Утилиты: `app/lib/i18n.ts > getThemeFromRequestOrDefault`

## Интернационализация (i18n)

### Файлы
- Настройка: `next-i18next.config.js`
- Утилиты: `app/lib/i18n.ts`
- Локали: `public/locales/{ru,en,sr}/common.json`

### Переключатель языка
- Клиент: `app/components/LanguageToggleButton.tsx`
- Сервер: `app/components/LanguageToggle.tsx`

### Добавление переводов
1. Добавить ключи во все локали
2. Использовать `t("ключ")` в компонентах
3. Синхронизировать все файлы локализации

## Иконки
- SVG в `app/components/Icons.tsx`
- Использовать `title` для доступности

## Ссылки
- Редиректы: `next.config.js`
- Утилиты: `app/components/AppLinks.tsx`

## Статичные файлы и .well-known

### Директория `public`
- Статичные файлы в корне проекта
- Доступны по URL от корня (`/`)

### Директория `.well-known`
- Путь: `public/.well-known`
- Доступ: `/.well-known/*`

#### Stellar TOML
- Файл: `public/.well-known/stellar.toml`
- URL: `/.well-known/stellar.toml`
- Заголовки в `next.config.js`:
  ```javascript
  async headers() {
    return [
      {
        source: '/.well-known/stellar.toml',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Content-Type', value: 'text/plain' }
        ],
      },
    ]
  }
  ```

## При изменениях
1. Навигация: обновить `Header.tsx`, `Footer.tsx`, `MobileMenu.tsx`
2. Переводы: обновить все файлы в `public/locales/{ru,en,sr}/common.json`
3. Страницы: редактировать `app/**/page.tsx`
4. Запустить тесты: `npm test` 

## Деплой на Vercel

### Файлы
- `vercel.json` - основная конфигурация, включая настройки i18n и заголовки
- `.vercelignore` - список исключаемых из деплоя файлов

### Процесс деплоя
1. Подключить репозиторий через интерфейс Vercel
2. Выбрать ветку для деплоя
3. Настроить переменные окружения (при необходимости)

### Домены и URL
- Настройка доменов в интерфейсе Vercel
- Автоматическое создание превью для PR 