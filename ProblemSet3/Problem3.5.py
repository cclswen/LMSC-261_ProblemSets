# Problem 3.5: While-loop

bpm = int(input("Enter the tempo in Beats Per Minute (BPM)."))
duration = int(input("Enter the duration of the song in seconds."))

beats_per_second = bpm/60

second = 1

while second <= duration:
    total_beats = beats_per_second * second 
    print (f"At second {second}, total beats {total_beats}")
    second += 1



