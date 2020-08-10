# Recursion :-
  ### A process(or a function) that calls itself.
---
## Examples of recursive functions
---
  * ### JSON.parse / JSON.stringify are examples of recursion
  * ### document.getElementById and DOM traversal algorithms
  * ### Object traversal

## How recursive functions work
### Invoke the **Same** function with different inputs until reached to the **base case**
---
## Base Case
### The condition when the recursion ends
### **This is the most important concept to understand**
---
## Mutated Input
### The input must change every time the function calls it self and it must be proceeding towards the base case.
---
## Pure Recursion Tips
* ### For arrays, use methods like slice, the spread operator, and concat that makes copies of arrays instead of mutating the original array.
* ### Strings are immutable so methods like slice, substr, or substring should be used to make copies of strings.
* ### To make copies of object Object.assign, or the spread operator should be used.