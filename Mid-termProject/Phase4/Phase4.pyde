def setup():
    size(400, 400)
    noStroke()
    rectMode(CORNER)

def draw():
    background(237, 50, 55)

    grid_size = 10  
    cell_w = width / float(grid_size)
    cell_h = height / float(grid_size)

    object_base_size = 280  
    scale_factor = cell_w / object_base_size

    for i in range(grid_size):
        for j in range(grid_size):
            x = i * cell_w
            y = j * cell_h
            drawObject(x, y, scale_factor)

def drawObject(x, y, s):
    push()
    translate(x, y)
    scale(s)
    fill(255)

    # 4 RECTANGLES
    rect(123, 82, 30, 200)

    pushMatrix()
    translate(200, 160)
    rotate(radians(-15))
    rect(-75, 10, 100, 30)
    popMatrix()

    pushMatrix()
    translate(200, 220)
    rotate(radians(-15))
    rect(-75, 25, 100, 30)
    popMatrix()

    rect(219, 170, 30, 200)

    # 2 ELLIPSES 
    ellipse(234.5, 176, 29.5, 29)
    ellipse(137.5, 279, 29, 28)

    pop()
