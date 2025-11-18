#!/usr/bin/env bash

set -e

LANGS=$(tsx scripts/get_languages.js)

echo "Formatting PO files to 79 character width..."
echo ""

for lang in $LANGS; do
    PO_FILE="locales/${lang}/messages.po"
    
    if [ -f "$PO_FILE" ]; then
        echo "Formatting ${lang}..."
        msgcat --width=79 "$PO_FILE" -o "$PO_FILE"
    else
        echo "⚠️  Skipping ${lang}: No messages.po found"
    fi
done

echo ""
echo "✅ All PO files formatted"
