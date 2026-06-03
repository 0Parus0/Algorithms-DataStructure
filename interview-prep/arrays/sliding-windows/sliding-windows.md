# The Sliding Window Pattern

At its core, the sliding window pattern is used to perform a required operation on a specific window size of a given array or string. The window can be a sub-array or a substring.

## The Analogy:

Imagine a window over an array. The window starts at the beginning and you can only see the elements inside it. As you "slide" the window to the right, the leftmost element leaves the window, and a new element enters from the right.

## The Goal:

The primary goal is to reduce the time complexity from O(n²) or O(n³) (common in brute-force approaches using nested loops) to O(n) . You do this by avoiding redundant calculations. When you slide the window, you don't recalculate the entire window's data; you only adjust for the element being removed and the element being added.

## 2. How to Recognize a Sliding Window Problem

Identifying the pattern is half the battle. Look for these keywords and characteristics in the problem statement:

- Input Structure: The problem involves a linear data structure like an array or a string.

- Problem Type: You are asked to find something like:
  1. The minimum, maximum, longest, or shortest of something.

  2. The number of sub-arrays/substrings that satisfy a condition.

  3. If a certain target or condition can be met.

- The Constraint: The core requirement involves a contiguous sequence of elements. The answer will always be a contiguous block of the original data.

- The "Window" Keywords: Look for phrases like "sub-array," "sub-string," or "contiguous sequence."

## Example Question Clues:

"Find the maximum sum of any subarray of size k." (Fixed window)

"Find the longest substring without repeating characters." (Dynamic window)

"Given an array of positive integers, find the minimum length of a contiguous subarray whose sum is greater than or equal to a target value." (Dynamic window)

## The Two Main Types of Sliding Windows

There are two primary patterns, and the key difference is whether the window size is fixed or variable.

### Pattern 1: Fixed-Size Window

    Description: The window size (k) is given in the problem or is constant. You slide this window from the start to the end of the array/string.

### Mechanism:

    - Build the first window (elements from index 0 to k-1).
    - Process the result for this window.
    - Slide the window by one: remove the leftmost element, add the next element on the right.
    - Update your result based on the new window.
    - Repeat until the window reaches the end.

### Example Problems (LeetCode):

    - 643. Maximum Average Subarray I - The Classic. Find a contiguous subarray of length k that has the maximum average value.

    - 1343. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold - A direct variation on the classic.

    - 1456. Maximum Number of Vowels in a Substring of Given Length - Apply the fixed window to a string, counting a specific  characteristic (vowels).

## Pattern 2: Dynamic-Size Window (aka Variable-Size Window / Two Pointers)

Description: The window size is not fixed. It expands and contracts based on a condition. You usually have a left and right pointer. The right pointer expands the window, and when the window's inner condition becomes invalid, you move the left pointer to shrink it until it's valid again.

### Mechanism:

    - Initialize left = 0 and right = 0. The "window" is between these pointers.
    - Move right to expand the window and include a new element.
    - Check if the current window satisfies the problem's constraint (e.g., sum <= target, all unique chars).
    - If the constraint is broken, move the left pointer to the right, shrinking the window until the constraint is satisfied again.
    - While the window is valid, you can potentially update your answer (e.g., record the maximum window length).
    - Repeat until right reaches the end of the array/string.

### Example Problems (LeetCode):

    - 3. Longest Substring Without Repeating Characters - The Absolute Classic. Use a Set/HashMap to track characters in the current window. When you see a duplicate, move left until the duplicate is removed.

    - 209. Minimum Size Subarray Sum - Find the minimal length of a contiguous subarray with a sum >= target. Expand right to add numbers, and when the sum is >= target, try shrinking from the left (left++) to find a smaller valid window.

    - 424. Longest Repeating Character Replacement - A more challenging variant. The condition for a valid window is (window length) - (max frequency of a char in the window) <= k. If this is false, you need to shrink the window.

### Interview Strategy: A Step-by-Step Approach

When you see a problem that smells like a sliding window, follow this mental checklist:

Confirm it's a Sliding Window: Does the problem ask for something about a contiguous sub-sequence? Is a brute-force nested loop solution obvious but too slow? If yes, proceed.

### Identify the Type:

    - Is k explicitly given? $\rightarrow$ Fixed-Size Window.

    - Is it asking for the "longest" or "shortest" something based on a dynamic condition? $\rightarrow$ Dynamic-Size Window.

    - Define the Data Structure to Track the Window:

    - For simple sums/counts: A simple integer variable.

    - For unique characters (like in LeetCode 3): A Set or a Map (to store character frequencies).

    - For tracking frequencies of multiple items: A Map (or a fixed-size array if the character set is limited, like lowercase English letters).

### Outline the Algorithm:

    Fixed: "First, I'll calculate the result for the first k elements. Then, I'll iterate i from k to n-1. At each step, I'll remove nums[i-k] and add nums[i], updating my result."

    Dynamic: "I'll use two pointers, left and right. I'll move right to add elements. If the condition becomes invalid, I'll move left until it's valid again. I'll update my answer whenever the window is valid."

### Code and Discuss Edge Cases:

    - Empty array/string.

    - k is 0 or larger than the array length (for fixed).

    - All elements are the same / all unique.

# LeetCode Sliding Window Problems

| LeetCode Num | Problem Title                                  | Problem Statement                                                                                                                                                                                                                                                                                                                                                                |
| :----------- | :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3            | Longest Substring Without Repeating Characters | Given a string s, find the length of the longest substring without repeating characters.                                                                                                                                                                                                                                                                                         |
| 76           | Minimum Window Substring                       | Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".                                                                                                                                  |
| 239          | Sliding Window Maximum                         | You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.                                                                                           |
| 424          | Longest Repeating Character Replacement        | You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.                                                           |
| 438          | Find All Anagrams in a String                  | Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.                                                                                         |
| 567          | Permutation in String                          | Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1's permutations is the substring of s2.                                                                                                                                                                                                 |
| 643          | Maximum Average Subarray I                     | You are given an integer array nums consisting of n elements, and an integer k. Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value.                                                                                                                                                                                  |
| 1004         | Max Consecutive Ones III                       | Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.                                                                                                                                                                                                                                             |
| 1423         | Maximum Points You Can Obtain from Cards       | There are several cards arranged in a row, and each card has an associated number of points. The points are given in the integer array cardPoints. In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards. Your score is the sum of the points of the cards you have taken. Return the maximum score you can obtain. |
| 209          | Minimum Size Subarray Sum                      | Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.                                                                                                                                                                    |
