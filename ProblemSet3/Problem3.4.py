# Problem 3.4: If Condition

duration = int(input("Enter the song duration in minutes: "))

if duration < 2:
    print("Short Song")
elif 2 <= duration <= 4:
    print("Medium Song")
else:
    print("Long Song")


