import os
import subprocess
if not os.path.exists("./htmls"):
    os.makedirs("./htmls")

for i in os.listdir("./mds"):
    subprocess.run(["pandoc",f"./mds/{i}","-o",f"./htmls/{i[:-3]}.html","-s","-f","markdown-raw_html"])