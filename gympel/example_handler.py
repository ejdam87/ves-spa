import os
import random


def get_examples():
  dirname = os.path.dirname(__file__)
  filename = os.path.join(dirname + "/public/examples/list.txt")
  with open(filename, "r") as lof:
    return lof.read().split(" ")


def pick_example(examples):
  return random.choice(examples)

def get_content(f):
  dirname = os.path.dirname(__file__)
  file_path = dirname + "/public/examples/" + f + ".txt"
  with open(file_path, "r") as example:
    return example.read()
