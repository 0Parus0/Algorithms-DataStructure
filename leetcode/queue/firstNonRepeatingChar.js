/*
First non-repeating character in a stream of characters
Programming
Stacks And Queues
medium
35.1% Success
457
35
Bookmark
Asked In:
Problem Description

Given a string A denoting a stream of lowercase alphabets. You have to make new string B.

B is formed such that we have to find first non-repeating character each time a character is inserted to the stream and append it at the end to B. If no non-repeating character is found then append '#' at the end of B.



Problem Constraints
1 <= length of the string <= 100000



Input Format
The only argument given is string A.



Output Format
Return a string B after processing the stream of lowercase alphabets A.



Example Input
Input 1:

 A = "abadbc"
Input 2:

 A = "abcabc"


Example Output
Output 1:

 "aabbdd"
Output 2:

 "aaabc#"


Example Explanation
Explanation 1:

    "a"      -   first non repeating character 'a'
    "ab"     -   first non repeating character 'a'
    "aba"    -   first non repeating character 'b'
    "abad"   -   first non repeating character 'b'
    "abadb"  -   first non repeating character 'd'
    "abadbc" -   first non repeating character 'd'
Explanation 2:

    "a"      -   first non repeating character 'a'
    "ab"     -   first non repeating character 'a'
    "abc"    -   first non repeating character 'a'
    "abca"   -   first non repeating character 'b'
    "abcab"  -   first non repeating character 'c'
    "abcabc" -   no non repeating character so '#'

*/

function firstNonRepeating(A) {
  const freq = {};
  const queue = [];
  let result = "";

  for (let ch of A) {
    // Step 1: update frequency
    freq[ch] = (freq[ch] || 0) + 1;

    // Step 2: push current char to queue
    queue.push(ch);

    // Step 3: remove all repeating chars from front
    while (queue.length && freq[queue[0]] > 1) {
      queue.shift();
    }

    // Step 4: append to result
    if (queue.length === 0) {
      result += "#";
    } else {
      result += queue[0];
    }
  }

  return result;
}

// Example tests
console.log(firstNonRepeating("abadbc")); // "aabbdd"
console.log(firstNonRepeating("abcabc")); // "aaabc#"

/**
 * @param {string} A
 * @return {string}
 */

/*
#Plan:
1. Problem Understanding:
   - Process a stream of characters one by one
   - After each character, find the first non-repeating character seen so far
   - If no non-repeating character exists, use '#'
   - Need efficient O(1) per character processing

2. Approach:
   - Use frequency array to count occurrences of each character
   - Use queue to maintain order of characters as they appear
   - For each new character:
        a. Update frequency count
        b. Add to queue
        c. Remove from front of queue if characters are repeated
        d. Front of queue has first non-repeating character

3. Algorithm Steps:
   a. Initialize frequency array (size 26 for lowercase letters)
   b. Initialize queue
   c. For each character in stream:
        - Increment frequency count
        - Add character to queue
        - While queue not empty and front character is repeated, dequeue
        - If queue empty, append '#' to result, else append front character

4. Complexity:
   - Time: O(n) - each character processed once
   - Space: O(1) - fixed size arrays for frequency and queue
*/

function firstNonRepeatingCharacterStream(A) {
  const n = A.length;
  const result = [];
  const freq = new Array(26).fill(0); // Frequency count for 'a' to 'z'
  const queue = []; // Queue to maintain order of characters

  for (let i = 0; i < n; i++) {
    const char = A[i];
    const index = char.charCodeAt(0) - "a".charCodeAt(0);

    // Update frequency
    freq[index]++;

    // Add current character to queue
    queue.push(char);

    // Remove from front until we find a non-repeating character
    while (queue.length > 0) {
      const frontChar = queue[0];
      const frontIndex = frontChar.charCodeAt(0) - "a".charCodeAt(0);

      if (freq[frontIndex] > 1) {
        queue.shift(); // Remove repeated character from front
      } else {
        break; // Found first non-repeating character
      }
    }

    // Append result
    if (queue.length > 0) {
      result.push(queue[0]);
    } else {
      result.push("#");
    }
  }

  return result.join("");
}

// Alternative implementation using linked list for efficient deque operations
function firstNonRepeatingCharacterStreamOptimized(A) {
  const result = [];
  const freq = new Array(26).fill(0);
  const queue = new LinkedList();

  for (let i = 0; i < A.length; i++) {
    const char = A[i];
    const index = char.charCodeAt(0) - 97; // 'a' = 97

    // Update frequency
    freq[index]++;

    // Add to queue if it's the first or second occurrence
    if (freq[index] === 1) {
      queue.enqueue(char);
    }

    // Remove repeated characters from front
    while (!queue.isEmpty() && freq[queue.front().charCodeAt(0) - 97] > 1) {
      queue.dequeue();
    }

    // Append to result
    if (!queue.isEmpty()) {
      result.push(queue.front());
    } else {
      result.push("#");
    }
  }

  return result.join("");
}

// Simple linked list implementation for queue
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    if (!this.head) {
      this.head = newNode;
    }
    this.size++;
  }

  dequeue() {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this.size--;
    return value;
  }

  front() {
    return this.head ? this.head.value : null;
  }

  isEmpty() {
    return this.size === 0;
  }
}

// Implementation with detailed logging
function firstNonRepeatingCharacterStreamDetailed(A) {
  const result = [];
  const freq = new Array(26).fill(0);
  const queue = [];

  console.log(`Processing stream: "${A}"`);
  console.log("Step-by-step processing:\n");

  for (let i = 0; i < A.length; i++) {
    const char = A[i];
    const index = char.charCodeAt(0) - "a".charCodeAt(0);

    console.log(`\nStep ${i + 1}: Processing '${char}'`);

    // Update frequency
    freq[index]++;
    console.log(`Frequency of '${char}' updated to: ${freq[index]}`);

    // Add to queue
    queue.push(char);
    console.log(`Queue after adding '${char}': [${queue}]`);

    // Remove repeated characters from front
    let removed = false;
    while (queue.length > 0) {
      const frontChar = queue[0];
      const frontIndex = frontChar.charCodeAt(0) - "a".charCodeAt(0);

      if (freq[frontIndex] > 1) {
        const removedChar = queue.shift();
        console.log(`Removed '${removedChar}' from front (repeated)`);
        removed = true;
      } else {
        break;
      }
    }

    if (!removed && queue.length > 0) {
      console.log(`Front character '${queue[0]}' is non-repeating`);
    }

    // Determine result
    if (queue.length > 0) {
      result.push(queue[0]);
      console.log(`First non-repeating character: '${queue[0]}'`);
    } else {
      result.push("#");
      console.log(`No non-repeating character found, using '#'`);
    }

    console.log(`Current result: "${result.join("")}"`);
  }

  console.log(`\nFinal result: "${result.join("")}"`);
  return result.join("");
}

// Space optimized version using character codes directly
function firstNonRepeatingCharacterStreamSpaceOptimized(A) {
  const result = [];
  const freq = new Array(26).fill(0);
  const queue = [];

  for (let i = 0; i < A.length; i++) {
    const charCode = A.charCodeAt(i) - 97; // Convert to 0-25

    freq[charCode]++;
    queue.push(A[i]);

    while (queue.length > 0 && freq[queue[0].charCodeAt(0) - 97] > 1) {
      queue.shift();
    }

    result.push(queue.length > 0 ? queue[0] : "#");
  }

  return result.join("");
}

// Custom Test Cases
console.log("=== Test Case 1 ===");
console.log("Input: A = 'abadbc'");
console.log("Output:", firstNonRepeatingCharacterStream("abadbc"));
console.log("Expected: 'aabbdd'");
console.log("---");

console.log("=== Test Case 2 ===");
console.log("Input: A = 'abcabc'");
console.log("Output:", firstNonRepeatingCharacterStream("abcabc"));
console.log("Expected: 'aaabc#'");
console.log("---");

console.log("=== Test Case 3 ===");
console.log("Input: A = 'aabbcc'");
console.log("Output:", firstNonRepeatingCharacterStream("aabbcc"));
console.log("Expected: 'a###'");
console.log("---");

console.log("=== Test Case 4 ===");
console.log("Input: A = 'a'");
console.log("Output:", firstNonRepeatingCharacterStream("a"));
console.log("Expected: 'a'");
console.log("---");

console.log("=== Test Case 5 ===");
console.log("Input: A = 'aa'");
console.log("Output:", firstNonRepeatingCharacterStream("aa"));
console.log("Expected: 'a#'");
console.log("---");

console.log("=== Test Case 6 ===");
console.log("Input: A = 'abcd'");
console.log("Output:", firstNonRepeatingCharacterStream("abcd"));
console.log("Expected: 'aaaa'");
console.log("---");

// Compare all implementations
function compareImplementations(A) {
  console.log(`\n=== Comparing Implementations for A="${A}" ===`);

  const result1 = firstNonRepeatingCharacterStream(A);
  const result2 = firstNonRepeatingCharacterStreamOptimized(A);
  const result3 = firstNonRepeatingCharacterStreamSpaceOptimized(A);

  console.log("Array Queue:    ", result1);
  console.log("Linked List:    ", result2);
  console.log("Space Optimized:", result3);
  console.log("All match:", result1 === result2 && result2 === result3);
}

// Run comparisons
compareImplementations("abadbc");
compareImplementations("abcabc");

// Run detailed example
console.log("\n=== Detailed Step-by-Step Execution ===");
firstNonRepeatingCharacterStreamDetailed("abadbc");

// Performance test
console.log("\n=== Performance Test ===");
const longStream = "abcdefghijklmnopqrstuvwxyz".repeat(1000);
console.time("Array Queue");
const result1 = firstNonRepeatingCharacterStream(longStream);
console.timeEnd("Array Queue");

console.time("Linked List");
const result2 = firstNonRepeatingCharacterStreamOptimized(longStream);
console.timeEnd("Linked List");

console.log(`Results match: ${result1 === result2}`);

/*
Commit Message:
Implement first non-repeating character in stream using queue and frequency map
  - Used queue to maintain order of characters and frequency array to track counts
  - For each new character, update frequency and add to queue
  - Remove repeated characters from front of queue until finding non-repeating one
  - If queue empty, append '#' indicating no non-repeating character
  - Added linked list implementation for efficient deque operations
  - All solutions handle edge cases including single character and all repeats
  - Time complexity: O(n) with O(1) operations per character
  - Space complexity: O(1) using fixed size arrays
*/
