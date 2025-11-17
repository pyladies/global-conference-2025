# Maintaining Translations

Feel free to skip the Updating Translations section, but fuzzy translations are important, so take a look 🤗

## Updating Translations

When English text changes in the code, run the update script to synchronize all languages:

```bash
pnpm run i18n
```

This script:
1. Extracts all current `t()` calls from the codebase
2. Updates the template file (`locales/template/messages.pot`)
3. Merges changes into all language PO files
4. Shows statistics about translated, fuzzy, and untranslated strings

**What happens during merge:**
- **New strings**: Added with empty `msgstr ""` (need translation)
- **Modified strings**: Marked as "fuzzy" (need review)
- **Unchanged strings**: Kept as-is
- **Deleted strings**: Moved to obsolete section at end of file

## Understanding Fuzzy Translations

When the English source text changes slightly, gettext marks translations as "fuzzy":

```po
#, fuzzy
msgid "Welcome to our conference"
msgstr "Konferansımıza Hoş Geldiniz"
```

The `#, fuzzy` flag means:
- The English text changed slightly since this was translated
- The existing translation might still be correct, but needs review
- Review the translation and remove the `#, fuzzy` line once verified

## Checking Translation Status

The update script shows you:
- **Translated**: Strings with translations
- **Fuzzy**: Translations that need review (source text changed)
- **Untranslated**: Strings without translations (will fall back to English)

Example output:

```
Merging es...
  147 translated messages, 8 fuzzy translations, 55 untranslated messages.
```
