import json
import time
from googletrans import Translator
from copy import deepcopy


with open("categories2.json", "r", encoding="utf-8") as read_file:
    data = json.load(read_file)
    categories = data.keys()
    data_ru = {}
    translator = Translator()
    for category in categories:
        data[category] = set(data[category])
        data[category] = list(data[category])
        data[category].sort()
        data_ru[category] = deepcopy(data[category])
        for i in range(len(data[category])):
            try:
                lowered = data[category][i].lower()
                data[category][i] = lowered
                translated = translator.translate(lowered, dest="ru").text.lower()
                data_ru[category][i] = translated
                print(f"{lowered:^30} {translated:^30}")
            except RuntimeError:
                print(lowered, "RuntimeError")
        data[category].sort()
        data_ru[category].sort()
        time.sleep(2)
        print("Sleeping 5 sec before saving it into the file")
        time.sleep(5)

    with open("categories.json", "w", encoding="utf-8") as write_file:
        json.dump(data, write_file)

    with open("categories_ru.json", "w", encoding="utf-16") as write_file:
        json.dump(data_ru, write_file)


