# TWO POINTERS

## When to think "two pointers"

Should immediately come to mind when

- Array is sorted
- Looking for pairs
- Removing duplicates
- Reversing in place
- Comparing symmetric values
- Fas/slow traversal

## Types of Two Pointers

### Converging Pointers (left <--> right)

    When to use
      - Sorted array
      - Pair-based logic
      - Compare ends
      - Max/min optimization

    Problems on LeetCode
      1. "Two Sum II - Input Array is Sorted(LeetCode 167) - Easy/Medium"
      2. "Container with most water"
      3. 3Sum
      4. Valid Palindrome

### Parallel Pointers (same direction)

    When to use:
      - In-place modification
      - Partitioning
      - Deduplication
      - Compaction

    Problems on LeetCode
      - Remove duplicates from sorted array
      - Move zeros
      - ***Sort colors (Dutch national flag (3 pointers))***
      - Remove element

### Fast-Slow (different speeds)

    When to use:
      - Cycle detection
      - Finding middle
      - Duplicate detection via cycle trick

    Problems on LeetCode
      1. Linked List Cycle
      2. Find the duplicate number
      3. Middle of the linked list

### Partition / Multi-Pointer Variants

    1. Trapping Rain Water
    2. Square of a sorted array -> LeetCode problem 977
      - Converging fill-from-end trick
