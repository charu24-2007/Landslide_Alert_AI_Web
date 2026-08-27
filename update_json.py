import json
import os
import glob

i18n_dir = r"c:\Users\charu\Desktop\LandSlide_Alert_AI\src\i18n"
en_file = os.path.join(i18n_dir, "en.json")

# 1. Update existing JSONs with new keys
new_keys = {
    "infrastructureImpact": "Infrastructure Impact",
    "lifelineHighways": "Lifeline Highway Corridors & Real-Time Infrastructure Impact",
    "monitoredHighways": "Monitored Highway Corridors",
    "activeRoadBlockages": "Active Road Blockages",
    "slopeBridgeVuln": "Slope & Bridge Vulnerability",
    "isolatedHabitations": "Isolated Habitations",
    "liveStatusBlockages": "Live status of road blockages, landslide debris volume, clearing machinery, and detour routes.",
    "fullInfraPage": "Full Infrastructure Page →"
}

with open(en_file, "r", encoding="utf-8") as f:
    en_data = json.load(f)

for k, v in new_keys.items():
    if k not in en_data:
        en_data[k] = v

with open(en_file, "w", encoding="utf-8") as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)

# Copy to all other existing json files
for file in glob.glob(os.path.join(i18n_dir, "*.json")):
    with open(file, "r", encoding="utf-8") as f:
        data = json.load(f)
    for k, v in new_keys.items():
        if k not in data:
            data[k] = v # fallback to English
    with open(file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# 2. Create missing languages: mni, brx, kha, grt, lus, trp
new_langs = ['mni', 'brx', 'kha', 'grt', 'lus', 'trp']
for lang in new_langs:
    dest = os.path.join(i18n_dir, f"{lang}.json")
    with open(dest, "w", encoding="utf-8") as f:
        json.dump(en_data, f, ensure_ascii=False, indent=2)

print("JSON files updated and created.")
