# ves-spa
This is a single-page full stack web application

What does it do:
- Interactive drawing with vector graphic
- Manual drawing by writing a VES SCRIPT

what do you need to run it:
- web host (this app is providing a python webserver) or some way to run a server (main.py)
- Python server and ves script are using non-pre-installed libraries (Flask, Pillow)
- Pillow : https://pillow.readthedocs.io/en/stable/
- Flask : https://flask.palletsprojects.com/en/1.1.x/
- web browser

How to use the app:
There are two ways how to use this app:
- Typing mode: By typing valid VES into a textarea and then clicking "draw" button
- Interactive mode: By selecting shapes (selected shapes is displayed under the canvas)
  color and width + clicking on canvas (using a tooltip help under the button might be also useful for gaining more information)
-Both modes run synchronously (For example if you use interactive mode, you are also able to see VES script you are producing)

What is VES script:
- Vector graphic language created by us

What shapes are available:
- Circle
- Filled circle
- Triangle
- Filled triangle
- Line
- Rectangle
- Filled rectangle

How can you edit shapes:
- Changing color
- Changing width

Other abilites:
- to fill image with selected color
- to download created image
- to apply selected filters to image
- to choose portrait/landscape aspect ratio
- to undo latest actions
- to generate some example picture (also with VES code)

![Example_2](https://github.com/adamosoft/ves-spa/blob/master/example1.png)

![Example_1](https://github.com/adamosoft/ves-spa/blob/master/example2.png)
