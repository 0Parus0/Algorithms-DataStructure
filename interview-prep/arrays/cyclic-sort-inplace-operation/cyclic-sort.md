# 🌟 What is Cyclic Sort?

Cyclic Sort is an in-place, unstable sorting algorithm ideal for arrays where the numbers fall within a specific range (e.g., 1 to n) . Its core principle is elegantly simple: place each number at its correct index. For an array of numbers from 1 to n, the correct index for a value v is v - 1 .

The algorithm iterates through the array, and for each element, it checks if it is in its correct position. If not, it swaps the element with the one currently at its target index. This continues until the element at the current index is the correct one, at which point the algorithm moves to the next index .

## 🔍 How to Recognize a Cyclic Sort Problem

The most critical skill in an interview is pattern recognition. A problem is a prime candidate for Cyclic Sort if it exhibits these characteristics :

Constrained Number Range: The problem explicitly mentions or implies that the array contains numbers in a fixed range, typically from 1 to n or 0 to n.

In-Place Requirement: The problem asks for a solution with O(1) extra space, meaning you must modify the input array directly.

Missing, Duplicate, or Smallest Numbers: The core of the problem involves finding missing numbers, finding duplicate numbers, or identifying the smallest missing positive number in an unsorted array.

## 📚 Types of Cyclic Sort / In-Place Array Patterns

While the core concept is consistent, problems can be categorized by their specific goals. Here are the common patterns and their associated LeetCode problems.

### 1. Standard Cyclic Sort

This is the foundational pattern where the goal is to sort the array using the Cyclic Sort methodology.

Problem: Cyclic Sort (as an educational example)

Input: [3, 1, 5, 4, 2]

Output: [1, 2, 3, 4, 5]

### 2. Finding the Missing Number

After applying Cyclic Sort, the array will be almost sorted. A second pass can easily identify the index that doesn't hold the correct value.

LeetCode Problem: 268. Missing Number

Input: [3, 0, 1] (Numbers are in the range 0 to n, where n=3)

Output: 2

How to Apply: Place each number at its index (e.g., value 3 should go to index 3). The index that ends up without its correct number is the missing number. Note the slight variation for 0-based ranges.

### 3. Finding All Missing Numbers

This pattern introduces duplicates, which complicates the process but the fundamental approach remains the same. Some numbers will be missing because others are duplicated.

LeetCode Problem: 448. Find All Numbers Disappeared in an Array

Input: [4, 3, 2, 7, 8, 2, 3, 1]

Output: [5, 6]

How to Apply: Perform Cyclic Sort. Duplicates will be forced into positions that don't belong to them. Afterwards, iterate through the array; the positions with the wrong numbers (or numbers that don't match their index) are your missing numbers.

### 4. Finding the Duplicate Number

In this pattern, we use the core swapping logic to detect a duplicate without needing extra space.

LeetCode Problem: 287. Find the Duplicate Number

Input: [1, 3, 4, 2, 2]

Output: 2

How to Apply: Attempt to place each number in its correct position. When you encounter a number whose target position already holds the same value, you've found the duplicate.

### 5. Finding the Smallest Missing Positive Number

This is a classic and more challenging variation where the numbers are not confined to 1..n, but the answer must be the smallest positive integer.

LeetCode Problem: 41. First Missing Positive

Input: [3, 4, -1, 1]

Output: 2

How to Apply: Ignore numbers that are out of range (≤ 0 or > n). Perform Cyclic Sort only for numbers in the valid range 1..n. After sorting, the first index i where nums[i] != i+1 gives the missing number i+1. If all are correct, the answer is n+1.

💡 Other In-Place Array Manipulation Techniques
It's important to distinguish Cyclic Sort from other in-place techniques, as they are often part of the same problem-solving toolkit .

A. In-Place Modification with Two Pointers
This technique is used for problems like moving elements or transforming the array without creating a new one. It often involves reading from one part of the array and writing to another.

LeetCode Problem: 1089. Duplicate Zeros

Approach: Count zeros, then work backwards from the end to shift elements to their final positions without overwriting needed values.

LeetCode Problem: 283. Move Zeroes

Approach: Use a pointer (lastNonZeroFoundAt) to track the position for the next non-zero element. Iterate through the array; whenever you find a non-zero, swap it with the element at the pointer's position and increment the pointer.
