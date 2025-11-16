// Script to convert PO files to JSON for build

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gettextParser from 'gettext-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, '../locales');
const outputDir = path.join(__dirname, '../src/i18n');
const outputFile = path.join(outputDir, 'translations.json');

console.log('Converting PO files to JSON...\n');

const allTranslations = {};

const localesModule = await import('../src/i18n/locales.ts');
const { getTranslatableLanguages } = localesModule;

// Get all languages except default (default uses source strings)
const langDirs = getTranslatableLanguages();

for (const lang of langDirs) {
  const poPath = path.join(localesDir, lang, 'messages.po');
  
  if (!fs.existsSync(poPath)) {
    console.log(`⚠️  Skipping ${lang}: No messages.po found`);
    continue;
  }

  try {
    const poBuffer = fs.readFileSync(poPath);
    const po = gettextParser.po.parse(poBuffer);
    const entries = po.translations[''] || {};
    
    const translations = {};
    for (const [msgid, entry] of Object.entries(entries)) {
      if (msgid && entry.msgstr && entry.msgstr[0]) {
        translations[msgid] = entry.msgstr[0];
      }
    }
    
    allTranslations[lang] = translations;
    console.log(`✅ Converted ${lang}: ${Object.keys(translations).length} strings`);
  } catch (error) {
    console.error(`❌ Error processing ${lang}:`, error.message);
  }
}

fs.writeFileSync(outputFile, JSON.stringify(allTranslations, null, 2), 'utf8');
console.log(`\n✅ Generated ${path.relative(process.cwd(), outputFile)}\n`);
