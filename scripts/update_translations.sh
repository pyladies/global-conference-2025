#!/usr/bin/env bash

set -e

node scripts/extract_translations.js
echo ""

if [ ! -f "locales/template/messages.pot" ]; then
    echo "❌ Error: POT file not generated"
    exit 1
fi

LANGS=$(node -e "
const { getTranslatableLanguages } = await import('./src/i18n/locales.ts');
const langs = getTranslatableLanguages();
console.log(langs.join(' '));
")

for lang in $LANGS; do
    PO_FILE="locales/${lang}/messages.po"
    
    if [ ! -f "$PO_FILE" ]; then
        echo "⚠️  ${lang}: No existing PO file, creating new one..."
        msginit --no-translator \
                --locale="${lang}" \
                --input="locales/template/messages.pot" \
                --output="$PO_FILE"
    else
        echo "Merging ${lang}..."
        msgmerge --update \
                 --backup=none \
                 --quiet \
                 "$PO_FILE" \
                 "locales/template/messages.pot"
        
        # some stats
        msgfmt --statistics "$PO_FILE" -o /dev/null 2>&1 | sed 's/^/  /'
    fi
done

echo ""

fuzzy_count=$(find locales/*/messages.po -type f -exec grep -l '#, fuzzy' {} \; 2>/dev/null | wc -l | tr -d ' ')
if [ "$fuzzy_count" -gt 0 ]; then
    echo "⚠️  Found fuzzy translations that need review:"
    grep -Hn '#, fuzzy' locales/*/messages.po
    echo ""
fi

untrans_files=$(find locales/*/messages.po -type f)
has_untranslated=false
for f in $untrans_files; do
    if msgattrib --untranslated "$f" 2>/dev/null | grep -q '^msgid "[^"]'; then
        has_untranslated=true
        break
    fi
done

if [ "$has_untranslated" = true ]; then
    echo "⚠️  Untranslated strings found"
fi

echo "✅ Translations update complete."