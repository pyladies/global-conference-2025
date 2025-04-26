import requests
import yaml
from pathlib import Path

URL = "https://raw.githubusercontent.com/pyladies/pyladies/481b164ab8ec474bc95cefadf66896399e422813/www/config.yml"
FILENAME = "chapters.yml"

if not Path(FILENAME).exists():
    r = requests.get(URL)
    with open(FILENAME, "wb") as f:
        f.write(r.content)

with open(FILENAME) as f:
    content = yaml.safe_load(f)

for i in content["chapters"]:
    if "location" not in i:
        continue
    name = i["name"]
    loc = i["location"]
    s = f"{{ location: [{loc['latitude']}, {loc['longitude']}], size: 0.05 }}, // {name}"
    print(s)
