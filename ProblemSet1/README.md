# LMSC-261_Problem sets
# Algorithm Overview
*This algorithm quickly finds a name in a phone book by repeatedly splitting it in half and checking only the relevant section, similar to how you'd quickly find a word in a dictionary.*

The Method Used: The algorithm checks the middle entry of the current search range so if the target name is alphabetically greater than the middle entry, it discards the left half; otherwise, it discards the right half. This process repeats until the name is found.

*If Solution Not Found*: The algorithm terminates and returns a message indicating the name is not in the phone book.
**If Solution Found**: The algorithm returns the page number where the name is located. 
