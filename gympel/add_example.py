import os
import json

def add_example(example, nazov):
    dirname = os.path.dirname(__file__)
    print(type(example))
    
    with open(dirname + "\public\examples.json") as f:
        examples = json.load(f)
    examples[nazov] = example[nazov]
    print(examples)
    
    with open(dirname + "\public\examples.json", 'w') as f:
        json.dump(examples, f)
    
nazov = ""
example = {nazov:'''VES v1.0 600 400
CLEAR #0000
'''}

add_example(example, nazov)
