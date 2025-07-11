# Problem 3.3: Variables and Operators

bpm = int(input("Enter BPM"))

# Convert BPM to milliseconds per quarter note
milliseconds = 60000 / bpm

print(f"A quarter note delay in milliseconds for {bpm} BPM is {milliseconds} ms.")

