# Little script util to translate the entries for the i18n of the site.
# The script will print the output that needs to be added later to the
# 'ui.ts' file.
import sys

from deep_translator import GoogleTranslator

BASE_LANG = "en"
TARGET_LANG = "es"

filter_cat = None
if len(sys.argv) > 1:
    filter_cat = sys.argv[-1]


base_lines = []
gather_lines = False
with open("ui.ts") as f:
    for line in f:
        if "export const ui" in line:
            # Found the section with language strings
            gather_lines = True

        if gather_lines:
            if f"{BASE_LANG}:" in line.strip():
                # Found language
                _line = f.readline()
                while "}," not in _line.strip():
                    if filter_cat is None:
                        base_lines.append(_line.rstrip())
                    else:
                        if _line.lstrip().startswith(f'"{filter_cat}'):
                            base_lines.append(_line.rstrip())
                    _line = f.readline()
                break

from pprint import pprint

base_string = "".join(base_lines)
string_dict = f"{{ {base_string} }}"
# Unsafe because reasons
entries = eval(string_dict)


translator = GoogleTranslator(source=BASE_LANG, target=TARGET_LANG)
for key, text in entries.items():
    translated_text = translator.translate(text)
    print(f'"{key}": "{translated_text}",')
