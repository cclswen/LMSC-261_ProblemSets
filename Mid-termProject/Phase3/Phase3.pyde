def setup():
    size(400, 400)
    noStroke()

def draw():
    background(237, 50, 55) 

    # original size at top-left
    drawObject(0, 0, 1)

    # scaled and moved version in bottom-right
    drawObject(200, 125, 0.5)

def drawObject(x, y, s):
    push()  
    translate(x, y)
    scale(s)

    fill(255)  # White 

    # 4 RECTANGLES 

    # Rectangle 1: Main 
    rect(123, 82, 30, 200)

    # Rectangle 2: Upper slanted horizontal bar
    pushMatrix()
    translate(200, 160)
    rotate(radians(-15))
    rect(-75, 10, 100, 30)
    popMatrix()

    # Rectangle 3: Lower slanted 
    pushMatrix()
    translate(200, 220)
    rotate(radians(-15))
    rect(-75, 25, 100, 30)
    popMatrix()

    # Rectangle 4: Accent vertical bar
    rect(219, 170, 30, 200)

    # 2 ELLIPSES

    ellipse(234.5, 176, 29.5, 29)
    ellipse(137.5, 279, 29, 28)

    pop() 
