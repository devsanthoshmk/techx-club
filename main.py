from scrapping.scrape_pandoc import quiz_data
from jinja2 import Environment, FileSystemLoader
import os

# loading the environment
env = Environment(loader = FileSystemLoader('templates'))

# loading the template
template = env.get_template('base.jinja')

def make_out(html,out=None):
    
    with open(html,'r', encoding="utf-8") as f:
        data=quiz_data(f.read())
    output = template.render(questions = data)

    if not os.path.exists("./dist"):
        os.makedirs("./dist")
    with open(f"./dist/{out}", "w", encoding="utf-8") as f:
        f.write(output)
        
        
if "htmls" in os.listdir("./"):
    print("htmls detected so directly using it...")
    loop=True
else:
    html=input("Create .md file for eatch stage and use pandoc to get html(refer readme) or use make_html.py\nEnter pandoc html path(eg: ./mds/stage1.html or ./stage1): ")
    make_out(html)
if loop:
    for i in os.listdir("./htmls"):
        make_out(f"./htmls/{i}",out=i)


