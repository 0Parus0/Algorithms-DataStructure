/*
421. Maximum XOR of Two Numbers in an Array

Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 <= i <= j < nExample 1:

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

/**
 * @param {number[]} nums
 * @return {number}
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
      const bit = (num >> i) & 1;

      // Prefer opposite bit
      if (bit === 0) {
        if (node.one) {
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

var findMaximumXOR = function (nums) {
  const maxNodes = nums.length * 32 + 1;
  const children = new Int32Array(maxNodes * 2).fill(-1);
  let nodeCount = 1;

  const insert = (num) => {
    let node = 0;
    for (let i = 31; i >= 0; i--) {
      const bit = (num >> i) & 1;
      if (children[node * 2 + bit] === -1) {
        children[node * 2 + bit] = nodeCount++;
      }
      node = children[node * 2 + bit];
    }
  };

  const search = (num) => {
    let node = 0,
      xorVal = 0;
    for (let i = 31; i >= 0; i--) {
      const bit = (num >> i) & 1;
      const opposite = 1 - bit;
      if (children[node * 2 + opposite] !== -1) {
        node = children[node * 2 + opposite];
        xorVal = (xorVal << 1) | 1;
      } else {
        node = children[node * 2 + bit];
        xorVal = (xorVal << 1) | 0;
      }
    }
    return xorVal;
  };

  let maxi = 0;
  for (let num of nums) {
    insert(num);
    maxi = Math.max(search(num), maxi);
  }
  return maxi;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaximumXOR = function (nums) {
  const n = nums.length;
  // Each number has 31 bits. In the worst case, we need n * 31 nodes.
  // Each node needs 2 slots (one for bit 0, one for bit 1).
  const trie = new Int32Array(n * 31 * 2);
  let nextNodePtr = 2; // 0 and 1 are reserved for the root's children
  let maxResult = 0;

  for (const num of nums) {
    let insertNode = 0;
    let searchNode = 0;
    let currentXor = 0;

    // We can insert and search in a single pass to be more efficient
    for (let i = 30; i >= 0; i--) {
      const bit = (num >>> i) & 1;
      const toggledBit = 1 - bit;

      // 1. Logic for Insertion
      if (trie[insertNode + bit] === 0) {
        trie[insertNode + bit] = nextNodePtr;
        nextNodePtr += 2;
      }
      insertNode = trie[insertNode + bit];

      // 2. Logic for Search (Finding max XOR for current num)
      // Note: On the very first number, this won't find anything
      // but maxResult will stay 0, which is correct.
      if (trie[searchNode + toggledBit] !== 0) {
        currentXor |= 1 << i;
        searchNode = trie[searchNode + toggledBit];
      } else {
        searchNode = trie[searchNode + bit];
      }
    }
    maxResult = Math.max(maxResult, currentXor);
  }

  return maxResult;
};

var findMaximumXOR = function (nums) {
  let max = 0;
  let mask = 0;
  let prefix = {};
  for (let i = 30; i >= 0; i--) {
    mask = mask | (1 << i);
    let prefixes = {};
    let currMax = max | (1 << i);
    for (let num of nums) {
      let prefixNum = num & mask;
      if (prefixes[prefixNum ^ currMax]) {
        max = currMax;
        break;
      }
      prefixes[prefixNum] = true;
    }
  }
  return max;
};
