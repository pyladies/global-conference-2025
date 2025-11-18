// Script to help shell scripts get a list of translatable langs

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const localesModule = await import(join(__dirname, '../src/i18n/locales.ts'));
  const langs = localesModule.getTranslatableLanguages();
  console.log(langs.join(' '));
} catch (error) {
  console.error('Error loading locales:', error.message);
  process.exit(1);
}
