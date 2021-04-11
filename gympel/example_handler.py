import os
import random
import json

def get_content():
  dirname = os.path.dirname(__file__)
  print(dirname)
  with open(dirname + "\public\examples.json") as f:
    dzejson = json.load(f)
  example_names = []
  for keys in dzejson:
    example_names.append(keys)
  print(example_names)
  example_name = random.choice(example_names)
  example = dzejson[example_name]
  print(example)
  return example

def print_example_by_name(nazov):
  dirname = os.path.dirname(__file__)
  print(dirname)
  with open(dirname + "\public\examples.json") as f:
    dzejson = json.load(f)
  print(dzejson[nazov])
