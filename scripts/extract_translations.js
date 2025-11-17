// Script to extract all translatable strings from t() calls, outputs a POT file

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gettextParser from 'gettext-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Extracting translatable strings from the codebase...\n');

function findTCalls(content, filePath) {
  const calls = [];
  let i = 0;
  let lineNumber = 1;
  
  while (i < content.length) {
    // track line num
    if (content[i] === '\n') {
      lineNumber++;
    }

    // look for 't('
    if (content[i] === 't' && content[i + 1] === '(') {
      // check before 't' to make sure it's not part of something else
      const prevChar = i > 0 ? content[i - 1] : ' ';
      const isValidPreceding = /[\s\(\)\{\}\[\];,=!+\-*\/%<>&|^~?:]/.test(prevChar) || i === 0;
      
      if (!isValidPreceding) {
        i++;
        continue;
      }
      
      const startLine = lineNumber;
      i += 2;

      while (i < content.length && /\s/.test(content[i])) {
        if (content[i] === '\n') lineNumber++;
        i++;
      }
      
      const quoteChar = content[i];
      if (quoteChar === '"' || quoteChar === "'" || quoteChar === '`') {
        i++; // skip first quote
        let msgid = '';
        let escaped = false;
        
        while (i < content.length) {
          const char = content[i];
          
          if (escaped) {
            if (char === 'n') msgid += '\n';
            else if (char === 't') msgid += '\t';
            else if (char === 'r') msgid += '\r';
            else if (char === '\\') msgid += '\\';
            else if (char === quoteChar) msgid += char;
            else msgid += '\\' + char;
            
            escaped = false;
            i++;
            continue;
          }
          
          if (char === '\\') {
            escaped = true;
            i++;
            continue;
          }
          
          if (char === quoteChar) {
            i++; // skip last quote
            break;
          }
          
          if (char === '\n') lineNumber++;
          msgid += char;
          i++;
        }

        while (i < content.length && /\s/.test(content[i])) {
          if (content[i] === '\n') lineNumber++;
          i++;
        }
        
        if (content[i] === ')') {
          calls.push({
            msgid: msgid,
            location: {
              file: filePath,
              line: startLine
            }
          });
          i++;
          continue;
        }
      }
    }
    i++;
  }
  
  return calls;
}

function findTranslatableFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        findTranslatableFiles(filePath, fileList);
      }
    } else if (file.endsWith('.astro') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

const srcDir = path.join(__dirname, '..', 'src');
const translatableFiles = findTranslatableFiles(srcDir);

let allCalls = [];

for (const file of translatableFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const calls = findTCalls(content, file);
  
  if (calls.length > 0) {
    allCalls = allCalls.concat(calls);
  }
}

const localesDir = path.join(__dirname, '..', 'locales');
const templateDir = path.join(localesDir, 'template');

if (!fs.existsSync(localesDir)) {
  fs.mkdirSync(localesDir, { recursive: true });
}

if (!fs.existsSync(templateDir)) {
  fs.mkdirSync(templateDir, { recursive: true });
}

const translations = {};
const msgidMap = new Map();

for (const call of allCalls) {
  if (!msgidMap.has(call.msgid)) {
    msgidMap.set(call.msgid, []);
  }
  const relativePath = path.relative(process.cwd(), call.location.file);
  msgidMap.get(call.msgid).push(`${relativePath}:${call.location.line}`);
}

for (const [msgid, references] of msgidMap.entries()) {
  translations[msgid] = {
    msgid: msgid,
    msgstr: [''],
    comments: {
      reference: references.join('\n')
    }
  };
}

console.log(`Extracted ${msgidMap.size} unique strings\n`);

const poData = {
  charset: 'UTF-8',
  headers: {
    'Project-Id-Version': 'PyLadiesCon 2025',
    'Report-Msgid-Bugs-To': 'Open a PR 🤗',
    'POT-Creation-Date': new Date().toISOString(),
    'PO-Revision-Date': 'YEAR-MO-DA HO:MI+ZONE',
    'Last-Translator': 'FULL NAME <EMAIL@ADDRESS>',
    'Language-Team': 'LANGUAGE <LL@li.org>',
    'Language': '',
    'MIME-Version': '1.0',
    'Content-Type': 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding': '8bit'
  },
  translations: {
    '': translations
  }
};

const potBuffer = gettextParser.po.compile(poData);
const potPath = path.join(templateDir, 'messages.pot');
fs.writeFileSync(potPath, potBuffer);
console.log(`✅ Generated ${path.relative(process.cwd(), potPath)}\n`);
