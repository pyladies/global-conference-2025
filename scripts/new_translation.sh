#!/usr/bin/env bash

set -e

if [ -z "$1" ]; then
    echo "Error: Language code required"
    echo ""
    echo "Usage: $0 <language_code>"
    echo ""
    echo "Examples:"
    echo "  $0 fr     # French"
    echo "  $0 de     # German"
    echo "  $0 pt     # Portuguese"
    echo "  $0 ja     # Japanese"
    echo ""
    exit 1
fi

LANG_CODE="$1"
POT_FILE="locales/template/messages.pot"
LANG_DIR="locales/${LANG_CODE}"
PO_FILE="${LANG_DIR}/messages.po"

VALID_LANGS=$(tsx scripts/get_languages.js)

if ! echo "$VALID_LANGS" | grep -wq "$LANG_CODE"; then
    echo "Error: Language '${LANG_CODE}' not found in src/i18n/locales.ts"
    echo "Available languages: $VALID_LANGS"
    echo ""
    echo "Please add the language to src/i18n/locales.ts first:"
    echo "  export const languages = {"
    echo "    ...,"
    echo "    ${LANG_CODE}: \"Language Name\","
    echo "  };"
    echo ""
    exit 1
fi

if [ ! -f "$POT_FILE" ]; then
    echo "Error: POT template not found at $POT_FILE"
    echo "Run: ./scripts/update_translations.sh first"
    exit 1
fi

if [ -f "$PO_FILE" ]; then
    echo "Warning: Translation for ${LANG_CODE} already exists at ${PO_FILE}"
    read -p "Overwrite? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 0
    fi
    echo ""
fi

mkdir -p "$LANG_DIR"

msginit --no-translator \
        --locale="${LANG_CODE}" \
        --input="$POT_FILE" \
        --output="$PO_FILE"

echo "✅ Created $PO_FILE"
