/*
Smallest window that contains all characters of string itself

Given a string, find the smallest window length with all distinct characters of the given string. For eg. str = “aabcbcdbca”, then the result would be 4 as of the smallest window will be “dbca” .
Examples: 

Input: aabcbcdbca
Output: dbca
Explanation: 
Possible substrings= {aabcbcd, abcbcd, 
bcdbca, dbca....}
Of the set of possible substrings 'dbca' 
is the shortest substring having all the 
distinct characters of given string. 

Input: aaab
Output: ab
Explanation: 
Possible substrings={aaab, aab, ab}
Of the set of possible substrings 'ab' 
is the shortest substring having all 
the distinct characters of given string.    
*/

/**
 * @param {string} str
 * @return {string}
 */

/*
#Plan:
1. Problem Understanding:
   - Find the smallest substring that contains all distinct characters of the original string
   - The substring must contain every distinct character at least once
   - We need to minimize the window length

2. Key Insights:
   - First, we need to know how many distinct characters exist in the string
   - Then use sliding window technique to find the smallest window containing all distinct chars
   - The window should expand to include all required characters, then contract to find minimum

3. Approach:
   a. Count distinct characters in the entire string
   b. Use sliding window with two pointers (left and right)
   c. Expand right pointer to include characters until we have all distinct chars
   d. Then contract left pointer to find the smallest valid window
   e. Track the minimum window found

4. Algorithm Steps:
   - Calculate total distinct characters using Set
   - Use frequency map to track characters in current window
   - Expand right pointer: add characters to window
   - When window has all distinct chars, try to shrink from left
   - Keep track of the smallest valid window

5. Complexity:
   - Time: O(n) - each character visited at most twice (by left and right pointers)
   - Space: O(k) where k is number of distinct characters

6. Edge Cases:
   - String with all same characters
   - String where smallest window is the entire string
   - Empty string
   - Single character string
*/

function findSmallestWindow(str) {
  if (str.length === 0) return "";

  // Count distinct characters in the entire string
  const distinctChars = new Set(str);
  const requiredCount = distinctChars.size;

  // Frequency map for current window
  const windowCount = {};
  let haveCount = 0;

  let left = 0;
  let minLength = Infinity;
  let minLeft = 0;

  for (let right = 0; right < str.length; right++) {
    const rightChar = str[right];

    // Add right character to window
    windowCount[rightChar] = (windowCount[rightChar] || 0) + 1;

    // If this character completes the required count for this character type
    if (windowCount[rightChar] === 1) {
      haveCount++;
    }

    // Try to shrink window from left while still having all distinct characters
    while (haveCount === requiredCount && left <= right) {
      // Update minimum window
      const currentLength = right - left + 1;
      if (currentLength < minLength) {
        minLength = currentLength;
        minLeft = left;
      }

      // Remove left character from window
      const leftChar = str[left];
      windowCount[leftChar]--;

      // If we lost a required character
      if (windowCount[leftChar] === 0) {
        haveCount--;
      }

      left++;
    }
  }

  return minLength === Infinity
    ? ""
    : str.substring(minLeft, minLeft + minLength);
}

// Alternative implementation with detailed comments
function findSmallestWindowDetailed(str) {
  const n = str.length;
  if (n === 0) return "";

  // Step 1: Find all distinct characters
  const distinctSet = new Set(str);
  const distinctCount = distinctSet.size;

  // If string has only one distinct character
  if (distinctCount === 1) {
    return str[0];
  }

  // Frequency maps
  const required = {};
  const window = {};

  // Initialize required map with all distinct characters
  for (let char of distinctSet) {
    required[char] = 1; // We need at least one of each
  }

  let left = 0,
    right = 0;
  let formed = 0; // Count of distinct characters with required frequency in current window
  let minLength = Infinity;
  let resultLeft = 0,
    resultRight = 0;

  while (right < n) {
    // Add character at right pointer to window
    const char = str[right];
    window[char] = (window[char] || 0) + 1;

    // Check if this character satisfies the requirement
    if (required[char] && window[char] === required[char]) {
      formed++;
    }

    // Try to contract the window until it no longer satisfies requirement
    while (left <= right && formed === distinctCount) {
      const currentLength = right - left + 1;

      // Update result if this window is smaller
      if (currentLength < minLength) {
        minLength = currentLength;
        resultLeft = left;
        resultRight = right;
      }

      // Remove left character from window
      const leftChar = str[left];
      window[leftChar]--;

      // Check if removing this character broke the requirement
      if (required[leftChar] && window[leftChar] < required[leftChar]) {
        formed--;
      }

      left++;
    }

    right++;
  }

  return minLength === Infinity
    ? ""
    : str.substring(resultLeft, resultRight + 1);
}

// Optimized version for the specific problem
function smallestWindowContainingAllDistinct(str) {
  if (!str) return "";

  const distinctChars = new Set(str);
  const k = distinctChars.size;

  let left = 0;
  let minLen = Infinity;
  let minStart = 0;
  const freq = {};
  let count = 0;

  for (let right = 0; right < str.length; right++) {
    const rightChar = str[right];
    freq[rightChar] = (freq[rightChar] || 0) + 1;

    if (freq[rightChar] === 1) {
      count++;
    }

    // When we have all distinct characters, try to minimize window
    while (count === k) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }

      const leftChar = str[left];
      freq[leftChar]--;
      if (freq[leftChar] === 0) {
        count--;
      }
      left++;
    }
  }

  return minLen === Infinity ? "" : str.substr(minStart, minLen);
}

// Custom Test Cases
console.log(smallestWindowContainingAllDistinct("aabcbcdbca"));
// Expected: "dbca" (length 4)

console.log(smallestWindowContainingAllDistinct("aaab"));
// Expected: "ab" (length 2)

console.log(smallestWindowContainingAllDistinct("aaaa"));
// Expected: "a" (length 1)

console.log(smallestWindowContainingAllDistinct("abc"));
// Expected: "abc" (length 3)

console.log(smallestWindowContainingAllDistinct("aabbcc"));
// Expected: "ab" or "bc" (length 2)

console.log(smallestWindowContainingAllDistinct("abcaacb"));
// Expected: "bca" or "acb" (length 3)

console.log(smallestWindowContainingAllDistinct(""));
// Expected: ""

console.log(smallestWindowContainingAllDistinct("a"));
// Expected: "a"

/*
Commit Message:
Implement smallest window containing all distinct characters using sliding window
  - Used sliding window technique with two pointers to find minimum window
  - First calculated total distinct characters in the string
  - Expanded window to include all required characters, then contracted to find minimum
  - Maintained frequency map to track characters in current window
  - Handled edge cases including single character strings and empty strings
  - All solutions run in O(n) time with O(k) space where k is distinct character count
*/

function smallest(str) {
  let n = str.length,
    first = 0,
    last = 0,
    diff = 0,
    window = n,
    count = Array.from({ length: 256 }, () => 0);

  while (first < n) {
    let char = str[first].charCodeAt();
    if (count[char] === 0) {
      diff++;
    }
    count[char]++;
    first++;
  }

  for (let i = 0; i < 256; i++) {
    count[i] = 0;
  }
  first = 0;

  while (last < n) {
    // as long as diff exists
    while (diff && last < n) {
      let char = str[last].charCodeAt();
      if (count[char] === 0) diff--;

      count[char]++;
      last++;
    }

    window = Math.min(window, last - first);
    // until diff becomes 1 again

    while (diff !== 1) {
      window = Math.min(window, last - first);
      //   console.log({ first }, { last }, window);
      let char = str[first].charCodeAt();
      count[char]--;

      if (count[char] === 0) diff++;
      first++;
    }
  }
  return window;
}

console.log(smallest("aabbbcbbac"));
