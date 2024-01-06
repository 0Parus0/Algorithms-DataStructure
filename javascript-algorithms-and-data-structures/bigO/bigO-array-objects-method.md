# **_ BIG O _**

“Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. It is a member of a family of notations invented by Paul Bachmann, Edmund Landau, and others, collectively called Bachmann–Landau notation or asymptotic notation.”
It allows us to talk formally about how the runtime of an algorithm grows as the inputs grow

## Big O Shorthands

1. Arithmetic operations are constant
2. Variable assignment is constant
3. Accessing elements in an array (by index) or object(by key) is constant
4. In a loop, the complexity is the length of the loop times the complexity of whatever happens inside of the loop.

## Space Complexity:

The term Space Complexity is misused for Auxiliary Space at many places. Following are the correct definitions of Auxiliary Space and Space Complexity.

Auxiliary Space is the extra space or temporary space used by an algorithm.

The space Complexity of an algorithm is the total space taken by the algorithm with respect to the input size. Space complexity includes both Auxiliary space and space used by input.

## Space Complexity in JS

- Most primitives(booleans, numbers, undefined, null) are constant space
- Strings require O(n) space(where n is the length of the string)
- Reference types are generally O(n), where n is the length(for arrays) or the number of keys(for objects)

## **_ Logarithms _**

The logarithm of a number roughly measures the number of times you can divide that number by 2 before you get a value that's less than or equal to one.

log~2(8) = 3 ----> 2^3 = 8
log~2(value) = exponent -----> 2^exponent = value

## **_ Big O of Array operations _**

## Insertion - it depends

## Removal - it depends

## Searching - O(N)

## Access - O(1)

## push - O(1)

## pop - O(1)

## unshift - O(N)

## shift - O(N)

## concat - O(N)

## slice - O(N)

## splice - O(N)

## sort - O(N log N)

## forEach/map/filter/reduce/etc - O(N)

---

---

# Big O of Objects

## Insertion - O(1)

## Removal - O(1)

## Searching - O(N)

## Access - O(1)

## Object.keys - O(N)

## Object.values - O(N)

## Object.entries - O(N)

## hasOwnProperty - O(1)
