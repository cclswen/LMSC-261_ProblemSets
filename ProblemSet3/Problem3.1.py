# Problem 3.1: Variables and Operators

song_duration_in_seconds = int(input("Enter the song duration in seconds: "))

# calculate minutes 
minutes = song_duration_in_seconds // 60

# calculate seconds 
seconds = song_duration_in_seconds % 60

print(f"The song duration is {minutes} minutes and {seconds} seconds.")


