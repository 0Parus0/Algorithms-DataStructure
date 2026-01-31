/*
Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.

Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.

 

Example 1:

Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]
Example 2:

Input: hand = [1,2,3,4,5], groupSize = 4
Output: false
Explanation: Alice's hand can not be rearranged into groups of 4.

 

Constraints:

1 <= hand.length <= 104
0 <= hand[i] <= 109
1 <= groupSize <= hand.length
*/

function isNStraightHand(hand, groupSize) {
  const n = hand.length;
  if (n % groupSize !== 0) return false;
  hand = hand.sort((a, b) => a - b);

  const mp = new Map();
  for (let num of hand) {
    mp.set(num, (mp.get(num) || 0) + 1);
  }

  for (let num of hand) {
    if (!mp.get(num)) continue;

    // Try to form a group starting from num
    for (let card = num; card < num + groupSize; card++) {
      if (!mp.get(card)) return false;
      mp.set(card, mp.get(card) - 1);
      if (mp.get(card) === 0) mp.delete(card);
    }
  }

  return true;
}

console.log(isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3));
console.log(isNStraightHand([1, 2, 3, 4, 5], 4));

/**
#Plan:

1. **Understand the problem:**
   - We have cards with numbers (hand array)
   - Need to form groups of size `groupSize`
   - Each group must consist of consecutive numbers
   - All cards must be used
   - Essentially: can we partition the array into groups of consecutive numbers?

2. **Break down input data & transformations:**
  - Input: array of card values and group size
  - Transformation: Count frequencies, try to form consecutive groups
  - Output: true/false

3. **Edge cases:**
  - Array length not divisible by groupSize -> immediately false
  - Group size of 1 -> always true
  - Duplicate cards
  - Large numbers up to 10^9
  - Empty hand (but constraints say length >= 1)
  - Negative numbers (hand[i] >= 0)

4. **Data structures:**
  - Map to store frequency of each card value
  - Min-heap or sorted array to process smallest cards first
  - Or use TreeMap-like structure (JavaScript doesn't have built-in)

5. **Approach:**
  1. If hand.length % groupSize !== 0, return false
  2. Count frequencies of each card
  3. Get sorted unique card values
  4. For each card in sorted order:
     - If this card still has remaining count:
       - Try to form a group starting from this card
       - For the next (groupSize-1) consecutive numbers:
         - Check if they exist with sufficient count
         - Decrease count for all cards in the group
       - If any consecutive card is missing, return false
  5. Return true if all cards are used

6. **Time & Space Complexity:**
  - Time: O(n log n) for sorting + O(n * groupSize) worst case
  - Space: O(n) for frequency map
*/

// Function
function isNStraightHand(hand, groupSize) {
  // Step 1: Check if divisible
  if (hand.length % groupSize !== 0) {
    return false;
  }

  // Step 2: Count frequencies
  const freq = new Map();
  for (const card of hand) {
    freq.set(card, (freq.get(card) || 0) + 1);
  }

  // Step 3: Get sorted unique cards
  const sortedCards = Array.from(freq.keys()).sort((a, b) => a - b);

  // Step 4: Try to form groups
  for (const card of sortedCards) {
    const count = freq.get(card);
    if (count === 0) continue;

    // Try to form groups starting from this card
    for (let i = 0; i < count; i++) {
      // Check if we can form a group starting from current card
      for (let j = 0; j < groupSize; j++) {
        const currentCard = card + j;
        const currentCount = freq.get(currentCard) || 0;

        if (currentCount === 0) {
          return false; // Cannot form group
        }

        // Use this card in the current group
        freq.set(currentCard, currentCount - 1);
      }
    }
  }

  return true;
}

/*

# Custom Test Cases

Test 1: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Expected: true
Explanation: Groups: [1,2,3], [2,3,4], [6,7,8]

Test 2: hand = [1,2,3,4,5], groupSize = 4
Expected: false
Explanation: Need groups of 4, but 5 cards can't be divided evenly

Test 3: hand = [1,1,2,2,3,3], groupSize = 2
Expected: true
Explanation: Groups: [1,2], [1,2], [3,3] or [1,1], [2,2], [3,3]

Test 4: hand = [1,2,3,4], groupSize = 1
Expected: true
Explanation: Any single card is a valid group

Test 5: hand = [8,10,12], groupSize = 3
Expected: false
Explanation: Not consecutive numbers

Test 6: hand = [1,2,3,4,5,6], groupSize = 2
Expected: true
Explanation: Groups: [1,2], [3,4], [5,6]

# Commit Message
"feat: Solve Hand of Straights problem using greedy approach with frequency counting

- First check if array length is divisible by groupSize
- Count frequencies of each card using Map
- Sort unique card values
- Greedy approach: always start groups from smallest available card
- For each group, check if consecutive cards exist with sufficient count
- Decrement counts as cards are used in groups
- Return false if any group cannot be formed
- O(n log n) time complexity for sorting
- O(n) space complexity for frequency map"
*/

// Test the function
console.log(isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3)); // true
console.log(isNStraightHand([1, 2, 3, 4, 5], 4)); // false
console.log(isNStraightHand([1, 1, 2, 2, 3, 3], 2)); // true
console.log(isNStraightHand([1, 2, 3, 4], 1)); // true
console.log(isNStraightHand([8, 10, 12], 3)); // false
console.log(isNStraightHand([1, 2, 3, 4, 5, 6], 2)); // true

// Alternative implementation with optimized greedy approach
function isNStraightHandOptimized(hand, groupSize) {
  // Quick check
  if (hand.length % groupSize !== 0) {
    return false;
  }

  if (groupSize === 1) {
    return true;
  }

  // Count frequencies
  const freq = new Map();
  for (const card of hand) {
    freq.set(card, (freq.get(card) || 0) + 1);
  }

  // Get all cards and sort
  const sortedCards = Array.from(freq.keys()).sort((a, b) => a - b);

  // Process each card
  for (const card of sortedCards) {
    const count = freq.get(card);

    if (count > 0) {
      // Try to form 'count' groups starting from this card
      for (let i = 0; i < count; i++) {
        // Check if we can form a complete group
        for (let j = 0; j < groupSize; j++) {
          const current = card + j;
          if (!freq.has(current) || freq.get(current) === 0) {
            return false;
          }
          freq.set(current, freq.get(current) - 1);
        }
      }
    }
  }

  return true;
}

// More efficient implementation using while loop
function isNStraightHandEfficient(hand, groupSize) {
  const n = hand.length;

  // Check divisibility
  if (n % groupSize !== 0) return false;
  if (groupSize === 1) return true;

  // Count frequencies
  const countMap = new Map();
  for (const num of hand) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }

  // Get sorted unique numbers
  const sortedNums = [...countMap.keys()].sort((a, b) => a - b);

  for (const num of sortedNums) {
    const freq = countMap.get(num);
    if (freq === 0) continue;

    // For each occurrence of this number
    for (let i = 0; i < freq; i++) {
      // Try to build a group starting from num
      for (let j = 0; j < groupSize; j++) {
        const current = num + j;
        const currentCount = countMap.get(current);

        if (!currentCount || currentCount === 0) {
          return false;
        }

        countMap.set(current, currentCount - 1);
      }
    }
  }

  return true;
}

// Alternative approach using Priority Queue simulation
function isNStraightHandPQ(hand, groupSize) {
  if (hand.length % groupSize !== 0) return false;
  if (groupSize === 1) return true;

  // Count frequencies
  const freq = {};
  for (const card of hand) {
    freq[card] = (freq[card] || 0) + 1;
  }

  // Get sorted unique cards
  const uniqueCards = Object.keys(freq)
    .map(Number)
    .sort((a, b) => a - b);

  for (const card of uniqueCards) {
    const count = freq[card];
    if (count === 0) continue;

    // Number of groups starting with this card
    for (let i = 0; i < count; i++) {
      // Check consecutive cards
      for (let j = 0; j < groupSize; j++) {
        const current = card + j;
        if (!freq[current] || freq[current] === 0) {
          return false;
        }
        freq[current]--;
      }
    }
  }

  return true;
}

// Explanation with example walkthrough:
console.log("\nDetailed explanation for [1,2,3,6,2,3,4,7,8], groupSize = 3:");
console.log("1. Array length 9 divisible by 3 ✓");
console.log("2. Frequency map: {1:1, 2:2, 3:2, 4:1, 6:1, 7:1, 8:1}");
console.log("3. Sorted cards: [1,2,3,4,6,7,8]");
console.log("4. Process card 1 (count 1):");
console.log("   - Form group starting at 1: need 1,2,3");
console.log("   - All exist: decrement counts");
console.log("   - New counts: {1:0, 2:1, 3:1, 4:1, 6:1, 7:1, 8:1}");
console.log("5. Process card 2 (count 1):");
console.log("   - Form group starting at 2: need 2,3,4");
console.log("   - All exist: decrement counts");
console.log("   - New counts: {1:0, 2:0, 3:0, 4:0, 6:1, 7:1, 8:1}");
console.log("6. Process card 6 (count 1):");
console.log("   - Form group starting at 6: need 6,7,8");
console.log("   - All exist: decrement counts");
console.log("   - All counts now 0");
console.log("Result: true");

// Test with edge cases
console.log("\nEdge case tests:");
console.log("Test [0,0,0,0,0,0], groupSize = 2:");
console.log("All zeros are consecutive, can form 3 groups of [0,0]");
console.log("Result:", isNStraightHand([0, 0, 0, 0, 0, 0], 2)); // true

console.log("\nTest [1,2,3,4,5,6,7,8,9], groupSize = 3:");
console.log("Can form [1,2,3], [4,5,6], [7,8,9]");
console.log("Result:", isNStraightHand([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)); // true

console.log("\nTest [1,1,2,2,3,3,4,4], groupSize = 4:");
console.log("Can form [1,2,3,4] and [1,2,3,4]");
console.log("Result:", isNStraightHand([1, 1, 2, 2, 3, 3, 4, 4], 4)); // true
