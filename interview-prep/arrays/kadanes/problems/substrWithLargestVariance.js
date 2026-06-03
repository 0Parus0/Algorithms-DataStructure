/*
2272. Substring With Largest Variance
The variance of a string is defined as the largest difference between the number of occurrences of any 2 characters present in the string. Note the two characters may or may not be the same.

Given a string s consisting of lowercase English letters only, return the largest variance possible among all substrings of s.

A substring is a contiguous sequence of characters within a string.

Example 1:
Input: s = "aababbb"
Output: 3
Explanation:
All possible variances along with their respective substrings are listed below:
- Variance 0 for substrings "a", "aa", "ab", "abab", "aababb", "ba", "b", "bb", and "bbb".
- Variance 1 for substrings "aab", "aba", "abb", "aabab", "ababb", "aababbb", and "bab".
- Variance 2 for substrings "aaba", "ababbb", "abbb", and "babb".
- Variance 3 for substring "babbb".
Since the largest possible variance is 3, we return it.

Example 2:
Input: s = "abcde"
Output: 0
Explanation:
No letter occurs more than once in s, so the variance of every substring is 0.

Constraints:
1 <= s.length <= 104
s consists of lowercase English letters.
*/
function largestVariance(s) {
  let maxVariance = 0;
  const chars = Array.from(new Set(s)); // Get unique chars

  // check all pairs of distinct chars
  for (let a of chars) {
    for (let b of chars) {
      if (a === b) continue;

      let aCount = 0;
      let bCount = 0;
      let seenB = false;

      // Modify Kadane's algorithm for this character pair
      for (let k = 0; k < s.length; k++) {
        const char = s[k];

        if (char === a) aCount++;
        else if (char === b) bCount++;

        // Only update variance if we have at least one b
        if (bCount > 0) {
          maxVariance = Math.max(maxVariance, aCount - bCount);
        } else if (bCount === 0 && seenB) {
          maxVariance = Math.max(maxVariance, aCount - 1);
        }

        // Reset if we have more b's than a's (but keep at least one b)
        if (aCount < bCount) {
          aCount = 0;
          bCount = 0;
          seenB = true;
        }
      }
    }
  }
  return maxVariance;
}
