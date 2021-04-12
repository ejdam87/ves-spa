import os
import random
import json

def get_content():
  dirname = os.path.dirname(__file__)
  with open(dirname + "\public\examples.json") as f:
    dzejson = json.load(f)
  example_names = []
  for keys in dzejson:
    example_names.append(keys)
  example_name = random.choice(example_names)
  example = dzejson[example_name]
  return example

def print_example_by_name(nazov):
  dirname = os.path.dirname(__file__)
  with open(dirname + "\public\examples.json") as f:
    dzejson = json.load(f)
  print(dzejson[nazov])

def add_example(example, nazov):
    dirname = os.path.dirname(__file__)    
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

def remove_example_by_name(nazov):
  dirname = os.path.dirname(__file__)
  with open(dirname + "\public\examples.json") as f:
    dzejson = json.load(f)
  dzejson.pop(nazov)
  with open(dirname + "\public\examples.json", 'w') as f:
    json.dump(dzejson, f)
