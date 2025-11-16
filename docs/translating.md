# Translation Guide

This project uses GNU gettext for internationalization. This guide explains how to add new translations and work with the translation system.

## Overview

The translation system follows these principles:

- **English is the source language**: All text in the code is in English, using `t("English text")` calls
- **Single source of truth**: Language configuration is centralized in `src/i18n/locales.ts`
- **Standard format**: Uses PO files for translations
- **Build-time conversion**: PO files are converted to JSON during the build process

## How It Works

### 1. Code Usage

In the `.astro` or `.ts` files, use the `t()` function to mark translatable strings:

```typescript
const t = useTranslations(lang);

const title = t("Welcome to PyLadiesCon");
const description = t("Join us for an amazing conference");
```

For English (the default language), `t()` returns the exact string you pass in. For other languages, it looks up the translation in the PO file.

### 2. Translation Workflow

The system automatically:
1. Extracts all `t("...")` calls from the codebase
2. Generates a template file (`messages.pot`) with all strings
3. Merges new/changed strings into existing language files (`messages.po`)
4. Converts PO files to JSON at build time for runtime usage

### 3. PO File Format

PO files are plain text files with this structure:

```po
#: src/components/hero.astro:15
msgid "Welcome to PyLadiesCon"
msgstr "PyLadiesCon'a Hoş Geldiniz"

#: src/pages/[lang]/speakers.astro:42
msgid "Our Speakers"
msgstr "Konuşmacılarımız"
```

- `msgid`: The English source text (what you wrote in the code)
- `msgstr`: The translated text (what users will see)
- `#:` comments show where the string is used in the codebase

## Adding a New Language

### Step 1: Add to Configuration

Edit `src/i18n/locales.ts` and add your language:

```typescript
export const languages = {
  en: "English",
  es: "Español",
  tr: "Türkçe",
  fr: "Français",  // ⬅️ Add your language here
};
```

### Step 2: Create the Translation File

Run the bootstrap script with your language code:

```bash
pnpm run i18n:new fr
```

This creates `locales/fr/messages.po` with all current strings ready to translate.

### Step 3: Translate the Strings

You have two options for translating:

#### Option A: Using Poedit (Recommended)

[Poedit](https://poedit.net/) is a free and open-source editor for PO files:

1. Download and install [Poedit](https://poedit.net/)
2. Open `locales/fr/messages.po` in Poedit
3. Translate each string in the visual interface
4. Save the file (Poedit handles the format automatically)

#### Option B: Manual Editing

Open `locales/fr/messages.po` in any text editor and fill in the `msgstr` fields:

```po
msgid "Welcome"
msgstr "Bienvenue"  # ← Add your translation here
```

### Step 4: Build and Test

Run the development server to see your translations:

```bash
pnpm run dev
```

Visit `http://localhost:4321/fr` or switch the language to see your translations in action.

### Step 5: Submit Your Translations

Once you have completed your translations, submit a pull request to the [main repository](https://github.com/pyladies/global-conference-2025). Aaaand that's it! Your translations will be reviewed and merged for everyone to enjoy. 🎉🎉🎉

## Translation Tips

### Do's

✅ Keep the same formatting (HTML tags, placeholders) as the source text
✅ Make sure to escape special characters (e.g., quotes, newlines, etc.)
✅ Try to use gender-neutral language where possible
✅ Test your translations in the browser to verify context

### Don'ts

❌ Don't change HTML tags or remove them (keep `<strong>`, `<a>`, etc.)
❌ Don't manually edit `messages.pot` (it's auto-generated)

*See [Maintaining Translations](maintaining-translations.md) for keeping translations working.*
