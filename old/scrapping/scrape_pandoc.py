from lxml import etree
import json

def quiz_data(html_content):
    """
    Parses the provided HTML content and returns a list of quiz questions.
    Each question is a dict with the following fields:
      - category: the quiz category (from the preceding <h3>)
      - q: question text
      - code: any code snippet present in the question text (if any)
      - options: a dict of options, e.g. { "a": "Option 1", "b": "Option 2", ... }
      - ans: the answer letter (as provided inside the option's <div>)
    """
    parser = etree.HTMLParser()
    tree = etree.HTML(html_content, parser)
    quiz = []
    current_category = ""

    body = tree.find('body')
    if body is None:
        return quiz
    
    question_text=None
    code=None
    option_lis=None
    answer=None

    # Iterate over the direct children of <body> in order.
    for elem in body:
        tag = elem.tag.lower()
        if tag == 'h3':
            # Update the current category (the category title may be wrapped in <em> or other tags)
            current_category = " ".join(elem.itertext()).strip()
        elif tag == 'h4':
            question_text=elem.xpath(".//text()")
            
        elif tag == 'div' and elem.get('class')=='sourceCode':
            code=etree.tostring(elem, encoding="unicode", method="html")
        elif tag == 'ol' and elem.get('type') == 'a':
            # Each <ol type="1"> contains one or more questions.
            # Each question is an <li> that contains the question text and a nested <ol type="a"> for options.
            
            lis=[li.text for li in elem.findall('li')]
            option_lis=dict(zip("abcd",lis[:-1])) 
            print(lis[:-1])            
            answer=elem.text
            question_obj = {
                    "category": current_category,
                    "q": question_text,
                    "code": code,
                    "options": option_lis,
                    "ans": lis[-1]
                }
            quiz.append(question_obj)
            question_text=None
            code=None
            option_lis=None
            answer=None
            
                
                
        
                
                # Build the question object.
    return quiz

if __name__ == "__main__":
    # Read the HTML quiz file
    with open("../htmls/stage3.html", "r", encoding="utf-8") as f:
        html_content = f.read()
    
    # Parse the quiz HTML into a list of question objects.
    quiz_data = quiz_data(html_content)
    
    # Write the JSON array to a file
    with open("../quiz.json", "w", encoding="utf-8") as f:
        json.dump(quiz_data, f, indent=2, ensure_ascii=False)
    
    # Optionally, print the JSON to stdout.
    print(json.dumps(quiz_data, indent=2, ensure_ascii=False))
