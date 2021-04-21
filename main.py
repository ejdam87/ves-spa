from io import BytesIO
from flask import Flask, send_file, request, send_from_directory
from ves import VESreader
from example_handler import get_content
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


def serve_pil_image(img):
  """
  Allows to save PIL image object to a
  virtual file in memory and then return
  it as a HTTP response
  """

  img_io = BytesIO()
  img.save(img_io, 'PNG', quality=70)
  img_io.seek(0)
  return send_file(img_io, mimetype='image/png')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
  """
  HTTP response for other actions
  """
  
  if (len(path) == 0):
    # ak nezadany ziaden subor, teda cesta / chceme index.html
    return send_from_directory('public', 'index.html')

  return send_from_directory('public', path)


@app.route('/example')
def example():
  """
  Returns HTTP response for example action
  """

  return get_content()


@app.route('/render', methods=['post'])
def render():
  """
  Returns HTTP response for render action
  """

  ves = request.form.get('ves') # load ves content
  width = request.form.get('width') # load wanted width of picture
  render = VESreader(width, ves)  # Create render object
  bugs = render.get_bug_report()
  if len(bugs) != 0:  # If there are some bugs
    for bug in bugs:
      print(bug)

  return serve_pil_image(render.picture) # return converted PIL image object to .png file

app.run()
