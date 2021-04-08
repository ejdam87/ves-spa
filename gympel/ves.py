from PIL import Image
from random import randint


def random_color():
  r = randint(0, 255)
  g = randint(0, 255)
  b = randint(0, 255)
  return (r, g, b)

def render_ves():
  width = 640
  height = 400
  img = Image.new('RGB', (width, height), (255,255,255))
  farba = random_color()
  for x in range(200, 401):
    for y in range(100, 201):
      img.putpixel((x, y), farba)
  return img
