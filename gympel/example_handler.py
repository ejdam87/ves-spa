import os
import json
from random import choice


def get_content() -> str:
  """
  Returns random VES script from given scripts in
  file examples.json located in public folder
  """

  dirname = os.path.dirname(__file__)
  with open(dirname + "\public\examples.json") as f:
    json_content = json.load(f)
  example_names = []
  for keys in json_content:
    example_names.append(keys)
  example_name = choice(example_names)
  example = json_content[example_name]
  return example


def add_example(example: str, nazov: str) -> None:
  """
  Adds a ves script "example" with name "nazov"
  to examples.json file
  """

  dirname = os.path.dirname(__file__)
    
  with open(dirname + "\public\examples.json") as f:
    examples = json.load(f)
    examples[nazov] = example[nazov]
    
  with open(dirname + "\public\examples.json", 'w') as f:
    json.dump(examples, f)


if __name__ == "__main__":
  nazov = ""
  example = {nazov:'''VES v1.0 600 400
  CLEAR #0000
  '''}

  add_example(example, nazov)
  
