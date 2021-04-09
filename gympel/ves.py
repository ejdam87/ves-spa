from PIL import Image
from typing import Tuple, List
import colorsys

class VESreader:


  def __init__(self, width, content):
    self.width = width
    self.line_count = 0
    self.render(content)


  def render(self, content):

    data = content.split("\n")
    self.width = self.coord_convertion(self.width)
    self.height = int(3/4 * self.width)
    self.default_width = self.width
    self.default_height = self.height
    
    self.create_image()
    for c in data[1:]:
      self.line_count += 1
      line = c.split(" ")
      self.command_handler(line)


  def grayscale(self):

    for x in range(self.width):

      for y in range(self.height):

        rgb = self.picture.getpixel((x,y))
        hls = colorsys.rgb_to_hls(rgb[0]/255, rgb[1]/255, rgb[2]/255)
        bw = colorsys.hls_to_rgb(hls[0], hls[1], 0)
        
        self.picture.putpixel((x,y), (int(bw[0]*255), int(bw[1]*255), int(bw[2]*255)))


  def convert_x(self, x: int) -> int:
    """
    Method responsible for converting x-coordinate of point

    x - x-coordinate of point
    """
    return int(x/self.default_width * self.width)


  def convert_y(self, y: int) -> int:
    """
    Method responsible for converting y-coordinate of point

    y - y-coordinate of point
    """
    return int(y/self.default_height * self.height)


  def convert_point(self, X: Tuple) -> Tuple:
    """
    Method responsible for converting both coordinates of point

    X - point (pixel)
    """
    return (self.convert_x(X[0]), self.convert_y(X[1]))


  def coord_convertion(self, coord: str) -> int:
    """
    Method responsible for handling convertion from string to integer

    coord - a string we want to convert
    """
    if "." in coord:
      return int(float(coord))
    else:
      return int(coord)


  def command_handler(self, line: List):
    """
    Method resposible for command handling and raising exceptions

    line - list of vector file line splitted by a space
    """
    command = line[0]

    if True:
      if len(line) == 0 or len(line) == 1 and len(command) < 1:
        pass
        #print(f"Syntax error on line {self.line_count}: Empty line")

      elif command == "CLEAR":
        self.clear_im(self.hexColor(line[1]))
      
      elif command == "GRAYSCALE":
        self.grayscale()

      elif command == "LINE":
        Ax = self.coord_convertion(line[1])
        Ay = self.coord_convertion(line[2])
        Bx = self.coord_convertion(line[3])
        By = self.coord_convertion(line[4])
        thickness = self.coord_convertion(line[5])
        color = self.hexColor(line[6])
        self.thick_line(self.convert_point((Ax, Ay)), self.convert_point((Bx, By)), thickness, color)

      elif command == "CIRCLE":
        Sx = self.coord_convertion(line[1])
        Sy = self.coord_convertion(line[2])
        r = int(self.coord_convertion(line[3])  * (self.width / self.default_width))
        thickness = self.coord_convertion(line[4])
        color = self.hexColor(line[5])
        self.circle(self.convert_point((Sx, Sy)), r, thickness, color)


      elif command == "TRIANGLE":
        Ax = self.coord_convertion(line[1])
        Ay = self.coord_convertion(line[2])
        Bx = self.coord_convertion(line[3])
        By = self.coord_convertion(line[4])
        Cx = self.coord_convertion(line[5])
        Cy = self.coord_convertion(line[6])
        thickness = self.coord_convertion(line[7])
        color = self.hexColor(line[8])
        self.triangle(self.convert_point((Ax,Ay)), self.convert_point((Bx, By)),self.convert_point((Cx, Cy)), thickness, color)

      elif command == "RECT":
        Ax = self.coord_convertion(line[1])
        Ay = self.coord_convertion(line[2])
        Bx = self.coord_convertion(line[3])
        By = self.coord_convertion(line[4])
        width = abs(Ax - Bx)
        height = abs(Ay - By)

        Ax = min(Ax, Bx)
        Ay = min(Ay, By)

        thickness = self.coord_convertion(line[5])
        color = self.hexColor(line[6])

        self.rectangle(self.convert_point((Ax, Ay)), width, height, thickness, color)

      elif command == "FILL_CIRCLE":
        Sx = self.coord_convertion(line[1])
        Sy = self.coord_convertion(line[2])
        r = int(self.coord_convertion(line[3])  * (self.width / self.default_width))
        color = self.hexColor(line[4])

        self.filled_circle(self.convert_point((Sx, Sy)), r, color)

      elif command == "FILL_TRIANGLE":
        Ax = self.coord_convertion(line[1])
        Ay = self.coord_convertion(line[2])
        Bx = self.coord_convertion(line[3])
        By = self.coord_convertion(line[4])
        Cx = self.coord_convertion(line[5])
        Cy = self.coord_convertion(line[6])
        color = self.hexColor(line[7])

        self.filled_triangle(self.convert_point((Ax, Ay)), self.convert_point((Bx, By)), self.convert_point((Cx, Cy)), color)

      elif command == "FILL_RECT":
        Ax = self.coord_convertion(line[1])
        Ay = self.coord_convertion(line[2])
        Bx = self.coord_convertion(line[3])
        By = self.coord_convertion(line[4])
        width = abs(Ax - Bx)
        height = abs(Ay - By)

        Ax = min(Ax, Bx)
        Ay = min(Ay, By)

        color = self.hexColor(line[5])

        self.filled_rectangle(self.convert_point((Ax, Ay)), width, height, color)

      elif command == "GRADIENT":

        Ax = self.coord_convertion(line[1])
        Ay = self.coord_convertion(line[2])
        width = int(self.coord_convertion(line[3]) * (self.width / self.default_width))
        height = int(self.coord_convertion(line[4]) * (self.height / self.default_height))
        color = line[5]

        self.gradient_rectangle(self.convert_point((Ax, Ay)), width, height, color)

      else:
        print(f"Syntax error on line {self.line_count}: Unknown command {command}")
    
    else:
      print(f"Syntax error on line {self.line_count}: Skipped line due to invalid syntax")


  def file_exists(self, f) -> bool:
    """
    Method resposible for checking file existence

    f - path to file
    """
    try:
      with open(f, "r") as fi:
        return True

    except:
      return False


  def create_image(self):
    """
    Method responsible for creating new image
    """
    self.picture = Image.new('RGB', (self.width, self.height), (255, 255, 255))


  def hex2dec(self, hex_num: str) -> int:
    """
    Method resposible for converting hexadecimal number to decimal number

    hex_num - string with hexadecimal number
    """

    hex_num = hex_num.replace("\n","")
    convertion = {
        "A": 10, "B": 11, "C": 12, 
        "D": 13, "E": 14, "F": 15,
        "a": 10, "b": 11, "c": 12, 
        "d": 13, "e": 14, "f": 15
        }
    decimal = 0

    for index in range(len(hex_num)):

      if hex_num[index] in convertion:
        decimal += (16**(len(hex_num) - index - 1)) * convertion[hex_num[index]]
      else:
        decimal += (16**(len(hex_num) - index - 1)) * int(hex_num[index])
    
    return decimal


  def hexColor(self, color: str) -> Tuple:
    """
    Method responsible for converting color hexcode to rgb tuple

    color - string with color hexcode
    """
    color = color.replace("\n", "")
    r = self.hex2dec(color[1:3])
    g = self.hex2dec(color[3:5])
    b = self.hex2dec(color[5:])

    return (r, g, b)


  # Rasterization methods

  def clear_im(self, color: Tuple):
    """
    Method responsible for filling whole image with certain  color

    color - RGB tuple
    """
    for i in range(self.width):
      for j in range(self.height):
        self.picture.putpixel((i, j), color)


  def linePixels(self, A: Tuple, B: Tuple) -> List:
    """
    Method which returns list of pixels which line covers

    A - tuple of coords of pixel A
    B - tuple of coords of pixel B
    """

    pixels = []
    if A[0] == B[0]:
      if A[1] > B[1]:
          A,B=B,A
      for y in range(A[1], B[1] + 1):

        if y >= 0 and y < self.height:
          if A[0] >= 0 and A[0] < self.width:
            pixels.append((A[0], y))

    elif A[1] == B[1]:
      if A[0] > B[0]:
          A,B=B,A
      for x in range(A[0], B[0] + 1):

        if x >= 0 and x < self.width:
          if A[1] >= 0 and A[1] < self.height:
            pixels.append((x, A[1]))

    else:
      if A[0] > B[0]:
          A,B=B,A
      dx = B[0] - A[0]
      dy = B[1] - A[1]
      if abs(dy/dx) > 1:
        for y in range(min(A[1], B[1]), max(A[1], B[1]) + 1):

          if y >= 0 and y < self.height:
            x = int((y - A[1] + (dy/dx) * A[0]) * (dx/dy))

            if x >= 0 and x < self.width:
              pixels.append((x, y))
      else:
        for x in range(min(A[0], B[0]), max(A[0], B[0]) + 1):

          if x >= 0 and x < self.width:
            y = int((B[1] - A[1])/(B[0] - A[0]) * (x - A[0]) + A[1])

            if y >= 0 and y < self.height:
              pixels.append((x, y))
    return pixels


  def line(self, A: Tuple, B: Tuple, color: Tuple):
    """
    Method responsible for drawing line AB with color color

    A - tuple of coords of pixel A
    B - tuple of coords of pixel B
    color - RGB tuple
    """

    if A[0] == B[0]:
      if A[1] > B[1]:
          A,B=B,A
      for y in range(A[1], B[1] + 1):

        if y >= 0 and y < self.height:
          if A[0] >= 0 and A[0] < self.width: 
            self.picture.putpixel((A[0], y), color)

    elif A[1] == B[1]:
      if A[0] >= B[0]:
          A,B=B,A
      for x in range(A[0], B[0] + 1):

        if x >= 0 and x < self.width:
          if A[1] >= 0 and A[1] < self.height:
            self.picture.putpixel((x, A[1]), color)

    else:
      if A[0] > B[0]:
          A,B=B,A
      dx = B[0] - A[0]
      dy = B[1] - A[1]

      if abs(dy/dx) > 1:

        for y in range(min(A[1], B[1]), max(A[1], B[1]) + 1):

          if y >= 0 and y < self.height:
            x = int((y - A[1] + (dy/dx) * A[0]) * (dx/dy))

            if x >= 0 and x < self.width:
              self.picture.putpixel((x, y), color)

      else:

        for x in range(min(A[0], B[0]), max(A[0], B[0]) + 1):

          if x >= 0 and x < self.width:
            y = int((B[1] - A[1])/(B[0] - A[0]) * (x - A[0]) + A[1])

            if y >= 0 and y < self.height:
              self.picture.putpixel((x, y), color)


  def thick_line(self, A: Tuple, B: Tuple, thickness: int, color: Tuple):
    """
    Method responsible for drawing line from A to B with thickness thickness
    and color color

    A - tuple of coords of pixel A
    B - tuple of coords of pixel B
    thickness - integer representing thickness
    color - RGB tuple
    """
    pixels = self.linePixels(A, B)
    for X in pixels:
      self.filled_circle(X, thickness/2, color)


  def triangle(self, A: Tuple, B: Tuple, C: Tuple, thickness: int, color: Tuple):
    """
    Method responsible for drawing triangle ABC with thickness thickness
    and color color

    A - tuple of coords of pixel A
    B - tuple of coords of pixel B
    C - tuple of coords of pixel C
    thickness - integer representing thickness
    color - RGB tuple
    """
    self.thick_line(A, B, thickness, color)
    self.thick_line(B, C, thickness, color)
    self.thick_line(A, C, thickness, color)


  def rectangle(self, A: Tuple, width: int, height: int, thickness: int, color: Tuple):
    """
    Method responsible for drawing rectangle with upper left corner A and width
    width height height with thickness thickness and color color

    A - tuple of coords of pixel A
    width - integer representing width of rectangle
    height - integer representing height of rectangle
    thickness - integer representing thickness
    color - RGB tuple
    """
    B = (A[0] + width, A[1])
    C = (A[0] + width, A[1] + height)
    D = (A[0], A[1] + height)

    self.thick_line(A, B, thickness, color)
    self.thick_line(B, C, thickness, color)
    self.thick_line(C, D, thickness, color)
    self.thick_line(D, A, thickness, color)


  def filled_triangle(self, A: Tuple, B: Tuple, C: Tuple, color: Tuple):
    """
    Method resposible for drawing filled_triangle ABC with color color

    A - tuple of coords of pixel A
    B - tuple of coords of pixel B
    C - tuple of coords of pixel C
    color - RGB tuple
    """

    def getY(point: Tuple) -> int:
      return point[1]

    V = sorted([A, B, C], key=getY)
    left = self.linePixels(V[0], V[1]) + self.linePixels(V[1], V[2])
    right = self.linePixels(V[0], V[2])

    Xmax = max(A[0], B[0], C[0])
    Xmin = min(A[0], B[0], C[0])

    if V[1][0] == Xmax:
      left, right = right, left

    for y in range(getY(V[0]), getY(V[2]) + 1):
      x1 = Xmax
      for X in left:
        if X[1] == y and X[0] < x1:
          x1 = X[0]

      x2 = Xmin
      for X in right:
        if X[1] == y and X[0] > x2:
          x2 = X[0]

      if x2 < 0:
        continue  
      if x2 > self.picture.width:
        x2 = self.picture.width - 1
      if x1 < 0:
        x1 = 0  

      self.line((x1, y), (x2, y), color)


  def circle(self, S: Tuple, r: int, thickness: int, color: Tuple):
    """
    Method responsible for drawing a circle with center S, radius r, thickness
    thickness and color color

    S - tuple of coordinates of center
    r - integer representing radius
    thickness - integer representing thickness
    color - RGB tuple
    """
    for x in range(0, int(r/2**(1/2)) + 1):
      y = int((r**2 - x**2)**(1/2))

      self.filled_circle((x + S[0], y + S[1]),thickness/2, color)
      self.filled_circle((y + S[0], x + S[1]),thickness/2, color)
      self.filled_circle((y + S[0], -x + S[1]),thickness/2, color)
      self.filled_circle((x + S[0], -y + S[1]),thickness/2, color)
      self.filled_circle((-x + S[0], -y + S[1]),thickness/2, color)
      self.filled_circle((-y + S[0], -x + S[1]),thickness/2, color)
      self.filled_circle((-y + S[0], x + S[1]),thickness/2, color)
      self.filled_circle((-x + S[0], y + S[1]),thickness/2, color)


  def filled_circle(self, S: Tuple, r: int, color: Tuple):
    """
    Method responsible for drawing filled circle with center S, radius r and
    color color

    S - tuple of coords of center
    r - integer representing radius
    color - RGB tuple
    """
    for x in range(0, int(r/2**(1/2)) + 1):
      y = int((r**2 - x**2)**(1/2))

      self.line((x + S[0], y + S[1]), (x + S[0], -y + S[1]), color)
      self.line((y + S[0], x + S[1]), (y + S[0], -x + S[1]), color)
      self.line((-x + S[0], -y + S[1]), (-x + S[0], y + S[1]), color)
      self.line( (-y + S[0], -x + S[1]), (-y + S[0], x + S[1]), color)


  def filled_rectangle(self, A: Tuple, width: int, height: int, color: Tuple):
    """
    Method responsible for drawing filled rectangle with upper left corner A
    width width, height height with color color

    A - tuple of coords of pixel A
    width - integer representing width of rectangle
    height - integer representing height of rectangle
    color - RGB tuple
    """
    stop_x = A[0] + width
    if stop_x > self.width:
      stop_x = self.width
    
    start_x = A[0]
    if start_x < 0:
      start_x = 0

    stop_y = A[1] + height
    if stop_y > self.height:
      stop_y = self.height

    start_y = A[1]
    if start_y < 0:
      start_y = 0

    for x in range(start_x, stop_x):

      for y in range(start_y, stop_y):

        self.picture.putpixel((x,y), color)

  def gradient_rectangle(self, A: Tuple, width: int, height: int, color: str):
    """
    Method responsible for drawing filled rectangle with gradient
    with upper left corner A
    width width, height height with color color

    A - tuple of coords of pixel A
    width - integer representing width of rectangle
    height - integer representing height of rectangle
    color - RGB tuple
    """
    stop_x = A[0] + width
    if stop_x > self.width:
      stop_x = self.width
    
    start_x = A[0]
    if start_x < 0:
      start_x = 0

    stop_y = A[1] + height
    if stop_y > self.height:
      stop_y = self.height

    start_y = A[1]
    if start_y < 0:
      start_y = 0

    c = (0,0,0)

    if width < 255:
      divider = 1
    else:
      divider = (width // 255)

    for x in range(start_x, stop_x):
      if color == "R":
        c = ((x - start_x)//divider, 0, 0)

      if color == "G":
        c = (0, (x - start_x)// divider, 0)

      if color == "B":
        c = (0, 0, (x - start_x)// divider)

      for y in range(start_y, stop_y):

        self.picture.putpixel((x,y), c)

