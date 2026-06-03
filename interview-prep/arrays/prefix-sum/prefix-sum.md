# Prefix Sum

A prefix sum array (also called cumulative sum) is an array where prefix[i] stores the sum of elements from index 0 to i in the original array.

Original array: [1, 2, 3, 4, 5]
Prefix sum: [1, 3, 6, 10, 15]

The formula: prefix[i] = prefix[i-1] + arr[i] for i > 0

## How to Recognize Prefix Sum Problems

Look for these patterns in the problem statement:

- "Sum of subarray/submatrix" - Any problem asking for range sum queries

- "Equilibrium index" - Where left sum equals right sum

- "Subarray with target sum" - Especially with positive/negative numbers

- "Contiguous sequence" with some property involving sums

- "Number of subarrays" meeting a condition

- "Rearrange array" based on cumulative properties

- Questions starting with "Given multiple queries..." about range sums

## Types of Prefix Sum Patterns

### 1. Standard 1D Prefix Sum

Pattern: Precompute cumulative sums to answer range sum queries in O(1)

key formula: sum(i, j) = prefix[j] - prefix[i - 1];

Example Problems: - LeetCode 303: Range Sum Query - Immutable - LeetCode 1480: Running Sum of 1D Array

### 2. Prefix Sum With HashMap (Two Sum Pattern)

Pattern: Store prefix sums in a hash map to find subarrays with target sum

Key Insight: If prefix[j] - prefix[i] = k, then subarray (i + 1, j) has sum k

Example Problems: - LeetCode 560: Subarray Sum Equals K (Classic!) - LeetCode 525: Contiguous Array (binary array, find equal 0s and 1s) - LeetCode 325: Maximum Size Subarray Sum Equals k

### 2D Prefix Sum

Pattern: precompute sums for matrix to answer submatrix sum queries

Formula: prefix[i][j] = prefix[i - 1][j] + prefix[i][j - 1] - prefix[i - 1][j - 1] + matrix[i][j];

Query:
sum(r1, c1, r2, c2) = prefix[r2][c2] - prefix[r1 - 1][c2] - prefix[r2][c1 - 1] + prefix[r1 - 1][c1 - 1]

Example Problems: - LeetCode 304: Range Sum Query 2D - Immutable - LeetCode 1074: Number of Submatrices That Sum to Target

### Product Prefix (Instead of Sum)

Pattern: Similar concept but with multiplication (handle zeros carefully!)

Example Problems: - LeetCode 238: Product of Array Except Self

### Prefix XOR

Pattern: XOR has properties useful for problems about unique elements

Property: XOR of range can be found using prefix XOR

Example Problems: - LeetCode 1310: XOR Queries of a Subarray

### Difference Array (Inverse of Prefix Sum)

Pattern: Efficient for range updates followed by point queries

Idea: For multiple range increment operations, use diff array then reconstruct

Example Problems: - LeetCode 370: Range Addition - LeetCode 1190: Corporate Flights Bookings

### Real Frontend Connections

Data visualization: Precompute sums for quick tooltip values when hovering over charts

Spreadsheet-like apps: Fast recalculation of ranges

Analytics dashboards: Efficiently show running totals/metrics

Gaming leaderboards: Quick score range queries

### Common Pitfalls to Avoid

Off-by-one errors: Always test with first element

Empty array handling: Check boundaries

Integer overflow: In JavaScript, use BigInt for very large numbers

HashMap initialization: Don't forget to add {0:1} for subarray sum problems

---

# 🚀 Top 11 Prefix Sum & Difference Array Problems

## 📌 Overview

Prefix sums are essential for optimizing range-based calculations from $O(N)$ to $O(1)$. For Senior Frontend roles, these problems test your ability to handle data efficiently—crucial for high-performance dashboards, data visualizations, and complex UI state management.

---

## 📋 Problem List & Key Patterns

| #    | Problem                                                                                                  | Pattern                       | Difficulty |
| :--- | :------------------------------------------------------------------------------------------------------- | :---------------------------- | :--------- |
| 1480 | [Running Sum of 1d Array](https://leetcode.com/problems/running-sum-of-1d-array/)                        | Foundational Accumulation     | Easy       |
| 303  | [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/)                  | $O(1)$ Query Optimization     | Easy       |
| 560  | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)                            | Prefix Sum + Hash Map         | Medium     |
| 525  | [Contiguous Array](https://leetcode.com/problems/contiguous-array/)                                      | Transformation (0 $\to$ -1)   | Medium     |
| 930  | [Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/)                    | Prefix Sum vs. Sliding Window | Medium     |
| 974  | [Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/)              | Modulo Arithmetic             | Medium     |
| 523  | [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/)                        | Modulo + Index Tracking       | Medium     |
| 304  | [Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/)            | Inclusion-Exclusion Principle | Medium     |
| 209  | [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)                    | Prefix Sum + Binary Search    | Medium     |
| 1658 | [Min Operations to Reduce X to 0](https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/) | Reframing (Inverted Search)   | Medium     |
| 1109 | [Corporate Flight Bookings](https://leetcode.com/problems/corporate-flight-bookings/)                    | **Difference Array**          | Medium     |

---

## 💡 Deep Dive into Patterns

### 1. The "Hash Map + Target" Template

_Relevant Problems: 560, 525, 930_

- **The Logic:** As you iterate, store the `currentPrefixSum` in a Hash Map. If `(currentPrefixSum - target)` exists in the map, it means the subarray between those two points equals the target.
- **Senior Tip:** This is the gold standard for $O(N)$ solutions. In the frontend, use this when searching through large datasets (like logs or transaction history) to find specific ranges without nested loops.

### 2. The Modulo Trick

_Relevant Problems: 974, 523_

- **The Logic:** Instead of storing the sum, store `sum % k`. If you see the same remainder twice, the elements in between must be a multiple of `k`.
- **Edge Case:** Always handle negative remainders by using `(remainder + k) % k`.

### 3. Reframing the Question

_Relevant Problem: 1658_

- **The Logic:** Sometimes the problem asks for something at the "edges." Reframing it as finding the "longest middle part" often reveals a standard prefix sum or sliding window solution.
- **Senior Tip:** This demonstrates high-level architectural thinking—the ability to simplify complex business requirements into known technical patterns.

### 4. 2D Prefix Sums

_Relevant Problem: 304_

- **The Logic:** Pre-calculating sums in a grid. Useful for image processing or heat-map data visualizations where the user drags a selection box and you need the sum of values instantly.

### 5. Difference Array (The Inverse Prefix Sum)

_Relevant Problem: 1109_

- **The Logic:** When you need to add a value $V$ to a range $[i, j]$ many times, don't update every element (that's $O(N)$). Instead, mark the start `arr[i] += V` and the end `arr[j+1] -= V`. Finally, compute the Prefix Sum of this array to get the result.
- **Why Frontend?** Essential for "Bulk Updates." Imagine a calendar UI where you need to apply a "busy" status across multiple date ranges. The Difference Array allows you to calculate the final state of all days in $O(N)$ time after all ranges are applied.

---

## 🛠️ Performance Checklist

- **Time Complexity:** Most of these should be $O(N)$ or $O(N \log N)$.
- **Space Complexity:** Be prepared to discuss $O(N)$ (Prefix Sum Array) vs. $O(1)$ (In-place mutation).
- **Immutability:** In React/Redux environments, prioritize returning a new array over mutating the input, unless the dataset is so large that memory is the primary bottleneck.
- **BigInt:** If sums exceed $2^{53}-1$, mention the need for `BigInt` in JavaScript.

---
