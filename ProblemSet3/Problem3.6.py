# Problem 3.6: For-loop and If-elif-else

# starting from 1 and up to 16
for beat in range (1,17):
    group = (beat - 1) // 4 

    if beat % 4 == 1:
        if group == 0:
            print("B", end="\t")
        else:
            print("t", end="\t")
    elif beat % 4 == 2:
        if group == 0:
            print("t", end="\t")
        else:
            print("b", end="\t")
    elif beat % 4 == 3:
        print("K", end="\t")
    else:  # beat % 4 == 0
        print("t", end="\t")
