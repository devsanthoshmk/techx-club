from scrapping.scrape_pandoc import quiz_data
from jinja2 import Environment, FileSystemLoader
import os
import json

# loading the environment
env = Environment(loader = FileSystemLoader('templates'))

# loading the template
template = env.get_template('base.jinja')
stage="stage1"


def make_out(j):
    with open(j,'r', encoding="utf-8") as f:
        data=json.load(f)
    output = template.render(questions = data)

    if not os.path.exists("./dist"):
        os.makedirs("./dist")
    with open(f"./dist/{stage}.html", "w", encoding="utf-8") as f:
        f.write(output)
        
make_out(f"./jsons/{stage}.json")

    # for i in os.listdir("./htmls"):
    #     make_out(f"./htmls/{i}",out=i)


