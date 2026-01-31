/*
899. Orderly Queue
Solved
Hard
Topics
premium lock icon
Companies
You are given a string s and an integer k. You can choose one of the first k letters of s and append it at the end of the string.

Return the lexicographically smallest string you could have after applying the mentioned step any number of moves.

 

Example 1:

Input: s = "cba", k = 1
Output: "acb"
Explanation: 
In the first move, we move the 1st character 'c' to the end, obtaining the string "bac".
In the second move, we move the 1st character 'b' to the end, obtaining the final result "acb".
Example 2:

Input: s = "baaca", k = 3
Output: "aaabc"
Explanation: 
In the first move, we move the 1st character 'b' to the end, obtaining the string "aacab".
In the second move, we move the 3rd character 'c' to the end, obtaining the final result "aaabc".
 

Constraints:

1 <= k <= s.length <= 1000
s consist of lowercase English letters.
 
*/

/*
#Plan
Key Insight: The solution depends on the value of k!

Case 1: k == 1
- We can only rotate the string one character at a time
- We need to check all rotations and find the lexicographically smallest

Case 2: k >= 2
- We can effectively rearrange the string into any permutation!
- Why? With k >= 2, we can bubble-sort adjacent characters
- Therefore, the answer is simply the sorted version of the string

Time Complexity: 
- k == 1: O(n²) to check all rotations
- k >= 2: O(n log n) for sorting

Space Complexity: O(n) for storing rotations or sorted string
*/

function orderlyQueue(s, k) {
  // Case 1: If k === 1, only rotations possible
  if (k === 1) {
    let smallest = s;
    for (let i = 1; i < s.length; i++) {
      // Create rotated version
      const rotated = s.slice(i) + s.slice(0, i);
      // Keep track of lexicographically smallest
      if (rotated < smallest) smallest = rotated;
    }
    return smallest;
  }

  // Case 2: If k >= 2, we can rearrange freely
  // Just sort characters
  return s.split("").sort().join("");
}

/*
| Case  | Time Complexity                    | Space Complexity |
| ----- | ---------------------------------- | ---------------- |
| k = 1 | O(N²) (N rotations × O(N) compare) | O(N)             |
| k ≥ 2 | O(N log N) (sort)                  | O(N)             |
*/

/*
Understanding the Magic:
Why k = 1 is different from k ≥ 2:

k = 1 (Constrained):

You can only take the first gem and move it to the end

This creates rotations of the original string

You need to find the best rotation

k ≥ 2 (Powerful):

You can take any of the first k gems

This allows you to effectively rearrange the entire string

The answer is simply the sorted string
Mathematical Insight:
With k ≥ 2, we can implement a bubble sort-like process by strategically moving elements to rearrange any adjacent pair.

Commit Message:
"Implemented optimal string rearrangement strategy based on k value. For k=1, finds lexicographically smallest rotation. For k≥2, returns sorted string since full rearrangement is possible. Solution leverages key mathematical insight about permutation reachability."

This solution demonstrates deep algorithmic thinking by recognizing the fundamental difference in problem behavior based on the k parameter
*/
