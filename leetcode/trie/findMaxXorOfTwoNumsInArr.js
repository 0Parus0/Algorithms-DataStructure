/*
421. Maximum XOR of Two Numbers in an Array
Medium
Topics
premium lock icon
Companies
Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 <= i <= j < n.

 

Example 1:

Input: nums = [3,10,5,25,2,8]
Output: 28
Explanation: The maximum result is 5 XOR 25 = 28.
Example 2:

Input: nums = [14,70,53,83,49,91,36,80,92,51,66,70]
Output: 127
 

Constraints:

1 <= nums.length <= 2 * 105
0 <= nums[i] <= 231 - 1
*/

class TrieNode {
  constructor() {
    this.zero = null; // child for bit 0
    this.one = null; // child for bit 1
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(num) {
    let node = this.root;
    for (let i = 30; i >= 0; i--) {
      const bit = (num >> i) & 1;
      if (bit === 0) {
        if (!node.zero) node.zero = new TrieNode();
        node = node.zero;
      } else {
        if (!node.one) node.one = new TrieNode();
        node = node.one;
      }
    }
  }

  maxXor(num) {
    let node = this.root;
    let xorVal = 0;

    for (let i = 30; i >= 0; i--) {
      // To find the bit(if it's 0 or 1) right shift i times and then &(and) with one
      const bit = (num >> i) & 1;

      // Prefer opposite bit
      if (bit === 0) {
        if (node.one) {
          // |= here | is bitwise or and |= sets the ith bit
          xorVal |= 1 << i;
          node = node.one;
        } else {
          node = node.zero;
        }
      } else {
        if (node.zero) {
          xorVal |= 1 << i;
          node = node.zero;
        } else {
          node = node.one;
        }
      }
    }

    return xorVal;
  }
}

var findMaximumXOR = function (nums) {
  const trie = new Trie();

  // Insert all numbers
  for (let num of nums) {
    trie.insert(num);
  }

  // Compute max XOR
  let max = 0;
  for (let num of nums) {
    max = Math.max(max, trie.maxXor(num));
  }

  return max;
};

/*
Insert all numbers: O(N × 31)
Query XOR for all: O(N × 31)
Total: O(N)
Trie size: O(N × 31)
≈ O(N)
*/

class TrieNode {
  constructor() {
    this.zero = null;
    this.one = null;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(num) {
    let node = this.root;
    for (let i = 30; i >= 0; i--) {
      const bit = (num >> i) & 1;
      if (bit === 0) {
        if (!node.zero) {
          node.zero = new TrieNode();
        }

        node = node.zero;
      } else {
        if (!node.one) node.one = new TrieNode();
        node = node.one;
      }
    }
  }

  maxXor(num) {
    let node = this.root;
    let xorVal = 0;

    for (let i = 30; i >= 0; i--) {
      const bit = (num >> i) & 1;

      // Prefer opposite bit
      if (bit === 0) {
        if (node.one) {
          xorVal += Math.pow(2, i);
          node = node.one;
        } else {
          node = node.zero;
        }
      } else {
        if (node.zero) {
          xorVal += Math.pow(2, i);
          node = node.zero;
        } else {
          node = node.one;
        }
      }
    }
    return xorVal;
  }
}

function findMaximumXOR(nums) {
  const trie = new Trie();

  // Insert all numbers
  for (let num of nums) {
    trie.insert(num);
  }

  // Compute max XOR

  let max = 0;
  for (let num of nums) {
    max = Math.max(max, trie.maxXor(num));
  }

  return max;
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaximumXOR = function (nums) {
  // Create a Trie node
  class TrieNode {
    constructor() {
      this.children = new Array(2); // [0, 1]
    }
  }

  class Trie {
    constructor() {
      this.root = new TrieNode();
    }

    // Insert number in binary form (32-bit)
    insert(num) {
      let node = this.root;
      for (let i = 31; i >= 0; i--) {
        const bit = (num >> i) & 1; // Get the i-th bit
        if (!node.children[bit]) {
          node.children[bit] = new TrieNode();
        }
        node = node.children[bit];
      }
    }

    // Find maximum XOR for a given number
    findMaxXOR(num) {
      let node = this.root;
      let maxXOR = 0;

      for (let i = 31; i >= 0; i--) {
        const bit = (num >> i) & 1;
        const oppositeBit = 1 - bit; // We want opposite bit to maximize XOR

        if (node.children[oppositeBit]) {
          // Found opposite bit, XOR result at this position will be 1
          maxXOR |= 1 << i; // Set the i-th bit to 1
          node = node.children[oppositeBit];
        } else {
          // Opposite bit not found, have to take same bit
          node = node.children[bit];
        }
      }

      return maxXOR;
    }
  }

  // Build Trie with all numbers
  const trie = new Trie();
  for (const num of nums) {
    trie.insert(num);
  }

  // Find maximum XOR
  let maxXOR = 0;
  for (const num of nums) {
    maxXOR = Math.max(maxXOR, trie.findMaxXOR(num));
  }

  return maxXOR;
};

// Solution 2: Optimized Trie with early exit
var findMaximumXOROptimized = function (nums) {
  class TrieNode {
    constructor() {
      this.children = [null, null];
    }
  }

  class Trie {
    constructor() {
      this.root = new TrieNode();
    }

    insert(num) {
      let node = this.root;
      for (let i = 31; i >= 0; i--) {
        const bit = (num >> i) & 1;
        if (!node.children[bit]) {
          node.children[bit] = new TrieNode();
        }
        node = node.children[bit];
      }
    }

    getMaxXOR(num) {
      let node = this.root;
      let maxNum = 0;

      for (let i = 31; i >= 0; i--) {
        const bit = (num >> i) & 1;
        const toggledBit = 1 - bit;

        if (node.children[toggledBit]) {
          maxNum = (maxNum << 1) | 1;
          node = node.children[toggledBit];
        } else {
          maxNum = (maxNum << 1) | 0;
          node = node.children[bit];
        }
      }

      return maxNum;
    }
  }

  if (nums.length === 1) return 0;

  const trie = new Trie();
  let maxXOR = 0;

  // Insert first number
  trie.insert(nums[0]);

  // For each subsequent number, find max XOR with previous numbers
  for (let i = 1; i < nums.length; i++) {
    maxXOR = Math.max(maxXOR, trie.getMaxXOR(nums[i]));
    trie.insert(nums[i]);
  }

  return maxXOR;
};

// Solution 3: Bit Manipulation Approach (Most Efficient)
var findMaximumXORBitManipulation = function (nums) {
  let maxXOR = 0;
  let mask = 0;

  // Try to set each bit from MSB to LSB
  for (let i = 31; i >= 0; i--) {
    // Set the i-th bit in mask
    mask = mask | (1 << i);

    // Store all prefixes with current mask
    const prefixSet = new Set();
    for (const num of nums) {
      prefixSet.add(num & mask);
    }

    // Try to set the i-th bit in maxXOR
    const temp = maxXOR | (1 << i);

    // Check if there exist two prefixes whose XOR equals temp
    for (const prefix of prefixSet) {
      if (prefixSet.has(prefix ^ temp)) {
        maxXOR = temp;
        break;
      }
    }
  }

  return maxXOR;
};

// Solution 4: Detailed explanation with comments
var findMaximumXORDetailed = function (nums) {
  /*
   * Intuition: For each bit position from most significant to least,
   * we try to see if we can set that bit to 1 in our answer.
   *
   * Example: nums = [3,10,5,25,2,8]
   * Binary: 3=00011, 10=01010, 5=00101, 25=11001, 2=00010, 8=01000
   *
   * Step-by-step:
   * 1. Start with answer = 0
   * 2. For each bit from MSB to LSB:
   *    - Create mask to isolate higher bits
   *    - Check if we can set current bit to 1
   */

  let answer = 0;
  let mask = 0;

  // Process bits from most significant to least
  for (let bit = 31; bit >= 0; bit--) {
    // Update mask to include current bit
    mask = mask | (1 << bit);

    // Get all prefixes for current mask
    const prefixes = new Set();
    for (const num of nums) {
      prefixes.add(num & mask);
    }

    // Try to set current bit in answer
    const candidate = answer | (1 << bit);

    // Check if candidate is achievable
    for (const prefix of prefixes) {
      // If (prefix1 XOR prefix2 = candidate), then candidate is achievable
      // This means prefix2 = candidate XOR prefix1
      if (prefixes.has(candidate ^ prefix)) {
        answer = candidate;
        break;
      }
    }
  }

  return answer;
};

// Test cases
console.log("Test Case 1:");
const nums1 = [3, 10, 5, 25, 2, 8];
console.log("Input:", nums1);
console.log("Trie Solution:", findMaximumXOR(nums1));
console.log("Optimized Trie:", findMaximumXOROptimized(nums1));
console.log("Bit Manipulation:", findMaximumXORBitManipulation(nums1));
console.log("Expected: 28 (5 XOR 25 = 28)");

console.log("\nTest Case 2:");
const nums2 = [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70];
console.log("Input:", nums2);
console.log("Maximum XOR:", findMaximumXOR(nums2));
console.log("Expected: 127");

console.log("\nTest Case 3:");
const nums3 = [1, 2, 3, 4];
console.log("Input:", nums3);
console.log("Maximum XOR:", findMaximumXOR(nums3));
console.log("Expected: 7 (3 XOR 4 = 7)");

console.log("\nTest Case 4:");
const nums4 = [8, 10, 2];
console.log("Input:", nums4);
console.log("Maximum XOR:", findMaximumXOR(nums4));
console.log("Expected: 10 (8 XOR 2 = 10)");

// Performance comparison
console.log("\nPerformance Comparison:");
const largeArray = Array.from({ length: 200000 }, () =>
  Math.floor(Math.random() * Math.pow(2, 31))
);

console.time("Trie Solution");
const result1 = findMaximumXOR(largeArray.slice(0, 10000));
console.timeEnd("Trie Solution");

console.time("Bit Manipulation");
const result2 = findMaximumXORBitManipulation(largeArray.slice(0, 10000));
console.timeEnd("Bit Manipulation");

console.log("Results match:", result1 === result2);
