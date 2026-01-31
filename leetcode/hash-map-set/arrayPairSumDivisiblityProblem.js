/*
Array Pair Sum Divisibility Problem
Difficulty: MediumAccuracy: 27.85%Submissions: 134K+Points: 4
Given an array of integers nums and a number k, write a function that returns true if given array can be divided into pairs such that sum of every pair is divisible by k.

Examples:

Input: arr[] = [9, 5, 7, 3], k = 6
Output: true
Explanation: {(9, 3), (5, 7)} is a possible solution. 9 + 3 = 12 is divisible by 6 and 7 + 5 = 12 is also divisible by 6.
Input: arr[] = [4, 4, 4], k = 4
Output: false
Explanation: You can make 1 pair at max, leaving a single element unpaired.
Input: arr[] = [4, 4], k = 4
Output: true
Explanation: Here only {(4,4)} is possible whose sum 4 + 4 = 8 is divisible by 4.
Constraints:
1 <= arr.size() <= 105
1 <= arr[i] <= 105
1 <= k <= 105
*/
function canPair(nums, k) {
  if (nums.length % 2 !== 0) return false;

  const st = new Set();

  for (let num of nums) {
    // normalize remainder to always be positive
    let r1 = ((num % k) + k) % k;

    // find complement remainder
    let r2 = (k - r1) % k;

    if (st.has(r2)) {
      st.delete(r2);
    } else {
      st.add(r1);
    }
  }

  return st.size === 0;
}

/*
| Resource  | Complexity                 |
| --------- | -------------------------- |
| **Time**  | **O(n)**                   |
| **Space** | **O(k)** (or O(min(n, k))) |

* Mathematical
(a + b) % k = 0 if and only if
r1 = (a % k) = 0 and r2 = (b % k) = 0
r1 + r2 = k
r1 = r2 = k/2 (k should be even)
*/

/**
#Plan:

1. **Understand the problem:**
   - We need to check if array can be divided into pairs where each pair's sum is divisible by k
   - All elements must be used (array length must be even)
   - Each element can only be used once
   - Need to find matching pairs where (a + b) % k == 0

2. **Break down input data & transformations:**
  - Input: array of integers and integer k
  - Transformation: For each number, calculate remainder = num % k
  - Key observation: (a + b) % k == 0 if (a % k) + (b % k) == 0 or k
  - So we need to pair remainders that sum to k (or 0)
  - Output: true/false

3. **Edge cases:**
  - Array length is odd -> immediately false
  - Negative numbers (not in constraints, but good to consider)
  - Remainder 0 pairs with itself
  - When k is even, remainder k/2 pairs with itself
  - Large array size (10^5)
  - Multiple elements with same remainder

4. **Data structures:**
  - Frequency map/counter for remainders
  - Object/Map to store count of each remainder

5. **Approach:**
  1. If array length is odd, return false
  2. Create frequency map of remainders (num % k)
  3. For each remainder r:
     - If r == 0: count must be even
     - Else if r * 2 == k: count must be even
     - Else: count of r must equal count of (k - r)
  4. Return true if all conditions satisfied

6. **Time & Space Complexity:**
  - Time: O(n) where n = array length
  - Space: O(k) for frequency map (worst case k different remainders)
*/

// Function
function canPair(arr, k) {
  // Step 1: Check array length
  if (arr.length % 2 !== 0) {
    return false;
  }

  // Step 2: Create frequency map of remainders
  const remainderCount = new Array(k).fill(0);

  for (const num of arr) {
    const remainder = ((num % k) + k) % k; // Handle negative numbers
    remainderCount[remainder]++;
  }

  // Step 3: Check pairing conditions
  for (let r = 0; r < k; r++) {
    // Skip if no elements with this remainder
    if (remainderCount[r] === 0) {
      continue;
    }

    // Case 1: remainder 0 (pairs with itself)
    if (r === 0) {
      if (remainderCount[r] % 2 !== 0) {
        return false;
      }
    }
    // Case 2: remainder is half of k (pairs with itself when k is even)
    else if (r * 2 === k) {
      if (remainderCount[r] % 2 !== 0) {
        return false;
      }
    }
    // Case 3: regular case (r pairs with k - r)
    else {
      const complement = k - r;
      if (remainderCount[r] !== remainderCount[complement]) {
        return false;
      }
    }
  }

  return true;
}

/*

# Custom Test Cases

Test 1: arr = [9, 5, 7, 3], k = 6
Remainders: 9%6=3, 5%6=5, 7%6=1, 3%6=3
Frequency: {1:1, 3:2, 5:1}
Check: 1 pairs with 5 (both count 1), 3 pairs with itself (count is even)
Result: true

Test 2: arr = [4, 4, 4], k = 4
Array length odd -> immediately false
Result: false

Test 3: arr = [4, 4], k = 4
Remainders: 4%4=0, 4%4=0
Frequency: {0:2}
Check: remainder 0 count is even
Result: true

Test 4: arr = [2, 4, 1, 3], k = 4
Remainders: 2%4=2, 4%4=0, 1%4=1, 3%4=3
Frequency: {0:1, 1:1, 2:1, 3:1}
Check: 0 needs even count (has 1) -> false
Result: false

Test 5: arr = [1, 2, 3, 4, 5, 6], k = 7
Remainders: 1,2,3,4,5,6
Pairs: (1,6), (2,5), (3,4) all sum to 7
Result: true

Test 6: arr = [-1, 1], k = 2
Remainders: -1%2=1, 1%2=1 (after adjustment)
Frequency: {1:2}
Check: 1 pairs with 1 (when k=2, 2/2=1) -> needs even count (has 2)
Result: true

# Commit Message
"feat: Solve Array Pair Sum Divisibility Problem using remainder frequency analysis

- Check array length parity first (must be even)
- Calculate remainder for each element and count frequencies
- For remainder 0: count must be even (pairs with itself)
- For remainder k/2 when k is even: count must be even (pairs with itself)
- For other remainders: count of r must equal count of k-r
- Handle negative numbers properly with modulo adjustment
- O(n) time complexity, O(k) space complexity"
*/

// Test the function
console.log(canPair([9, 5, 7, 3], 6)); // true
console.log(canPair([4, 4, 4], 4)); // false
console.log(canPair([4, 4], 4)); // true
console.log(canPair([2, 4, 1, 3], 4)); // false
console.log(canPair([1, 2, 3, 4, 5, 6], 7)); // true
console.log(canPair([-1, 1], 2)); // true

// Alternative implementation using Map
function canPairMap(arr, k) {
  // Check array length
  if (arr.length % 2 !== 0) {
    return false;
  }

  // Create frequency map
  const freq = new Map();

  // Count remainders
  for (const num of arr) {
    const remainder = ((num % k) + k) % k; // Handle negatives
    freq.set(remainder, (freq.get(remainder) || 0) + 1);
  }

  // Check each remainder
  for (let [remainder, count] of freq) {
    if (remainder === 0) {
      // Remainder 0 must have even count
      if (count % 2 !== 0) {
        return false;
      }
    } else if (remainder * 2 === k) {
      // When remainder is half of k, must have even count
      if (count % 2 !== 0) {
        return false;
      }
    } else {
      // Check if complement has same count
      const complement = k - remainder;
      if (count !== (freq.get(complement) || 0)) {
        return false;
      }
    }
  }

  return true;
}

// More detailed implementation with comments
function canArrayBeDividedIntoPairs(arr, k) {
  // Edge case: empty array or single element
  if (arr.length === 0) return true;
  if (arr.length === 1) return false;

  // Array must have even number of elements for pairing
  if (arr.length % 2 !== 0) {
    return false;
  }

  // Create an array to store frequency of remainders
  // Using array is more efficient than Map for this problem
  const remainderFreq = new Array(k).fill(0);

  // Calculate remainders and count frequencies
  for (let i = 0; i < arr.length; i++) {
    // Calculate positive remainder (handles negative numbers)
    const remainder = ((arr[i] % k) + k) % k;
    remainderFreq[remainder]++;
  }

  // Check pairing conditions
  for (let r = 0; r <= Math.floor(k / 2); r++) {
    if (r === 0) {
      // Elements with remainder 0 must pair among themselves
      if (remainderFreq[0] % 2 !== 0) {
        return false;
      }
    } else if (r * 2 === k) {
      // When k is even, elements with remainder k/2 must pair among themselves
      if (remainderFreq[r] % 2 !== 0) {
        return false;
      }
    } else {
      // For other remainders, must have same count as their complement
      if (remainderFreq[r] !== remainderFreq[k - r]) {
        return false;
      }
    }
  }

  return true;
}

// Explanation with example walkthrough:
console.log("\nDetailed explanation for [9, 5, 7, 3], k = 6:");
console.log("1. Array length is 4 (even) -> continue");
console.log("2. Calculate remainders:");
console.log("   9 % 6 = 3");
console.log("   5 % 6 = 5");
console.log("   7 % 6 = 1");
console.log("   3 % 6 = 3");
console.log("3. Frequency: remainder 1:1, 3:2, 5:1");
console.log("4. Check conditions:");
console.log("   - remainder 0: count 0 (even) ✓");
console.log("   - remainder 1: complement is 5, both have count 1 ✓");
console.log("   - remainder 2: complement is 4, both have count 0 ✓");
console.log("   - remainder 3: 2*3=6, so needs even count (2 is even) ✓");
console.log("Result: true");

// Additional test cases
console.log("\nAdditional tests:");
console.log("Test [1, 1, 2, 2, 3, 3], k = 4:");
console.log("Remainders: 1,1,2,2,3,3 -> 1:2, 2:2, 3:2");
console.log("1 pairs with 3 (both count 2), 2 pairs with itself (count even)");
console.log("Result:", canPair([1, 1, 2, 2, 3, 3], 4)); // true

console.log("\nTest [1, 1, 1, 1], k = 2:");
console.log("Remainders: 1,1,1,1 -> 1:4");
console.log("When k=2, remainder 1 pairs with itself (k/2 case)");
console.log("Count 4 is even");
console.log("Result:", canPair([1, 1, 1, 1], 2)); // true

console.log("\nTest [1, 2, 3, 4], k = 5:");
console.log("Remainders: 1,2,3,4 -> 1:1, 2:1, 3:1, 4:1");
console.log("Pairs: (1,4) and (2,3) both sum to 5");
console.log("Result:", canPair([1, 2, 3, 4], 5)); // true
