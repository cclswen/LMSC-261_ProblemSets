# Problem 3.2: Variables and Operators

midi_number = int(input("Enter a MIDI note number (0 to 127): "))

frequency = 440 * (2 ** ((midi_number - 69) / 12))

print(f"The frequency of the MIDI note number {midi_number} is {frequency} Hz.")

