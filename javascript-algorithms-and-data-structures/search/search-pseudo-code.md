**_Binary Search Pseudocode_**

- This function accepts a sorted array and value.
- Create a left pointer at the start of the array, and a right pointer at the end of the array.
- While left pointer comes before the right pointer:
  - Create a pointer in the middle
  - If you find the value you are searching for, return the index
  - If the value is small, move the left pointer up
  - If the value is large, move the right pointer down
- If you never find the value, return -1

**_String Naive Search Pseudocode_**

- Loop over the longer string
- Loop over the shorter string
- If the characters don't match, break out of the inner loop
- If the characters do match, keep going
- If you complete the inner loop and find a match, increment the count of matches
- Return the count.
