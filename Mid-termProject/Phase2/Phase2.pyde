def setup():
    size(400, 400)  
    background(237, 50, 55) 
    noStroke() 
    
def draw():
    fill(255, 255, 255)
    
    # 4 RECTANGLES
    
    # Rectangle 1 - Main vertical line 
    rect(123, 82, 30, 200)  # Central vertical line
    
    # Rectangle 2 - Upper horizontal bar
    pushMatrix()  
    translate(200, 160) 
    rotate(radians(-15)) 
    rect(-75, 10, 100, 30)  
    popMatrix()
    
    # Rectangle 3: Lower horizontal bar 
    pushMatrix()  
    translate(200, 220)  
    rotate(radians(-15)) 
    rect(-75, 25, 100, 30) 
    popMatrix() 
    
    # Rectangle 4
    rect(219, 170, 30, 200) 

    # 2 ELLIPSES 
    
    # Ellipse 1: Left rounded end
    ellipse(234.5, 176, 29.5, 29) 
    
    # Ellipse 2: Right rounded end
    ellipse(137.5, 279, 29, 28) 
