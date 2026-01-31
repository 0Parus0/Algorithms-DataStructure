/*
In English, we have a concept called root, which can be followed by some other word to form another longer word - let's call this word derivative. For example, when the root "help" is followed by the word "ful", we can form a derivative "helpful".

Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the derivatives in the sentence with the root forming it. If a derivative can be replaced by more than one root, replace it with the root that has the shortest length.

Return the sentence after the replacement.

 

Example 1:

Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"
Example 2:

Input: dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
Output: "a a b c"
 

Constraints:

1 <= dictionary.length <= 1000
1 <= dictionary[i].length <= 100
dictionary[i] consists of only lower-case letters.
1 <= sentence.length <= 106
sentence consists of only lower-case letters and spaces.
The number of words in sentence is in the range [1, 1000]
The length of each word in sentence is in the range [1, 1000]
Every two consecutive words in sentence will be separated by exactly one space.
sentence does not have leading or trailing spaces.
*/

function replaceWords(dict, sent) {
  const st = new Set([...dict]);
  const sentArr = sent.split(" ");
  let result = [];
  for (let word of sentArr) {
    console.log(word);
    let rootFound = false;
    for (let i = 1; i < word.length; i++) {
      let root = word.slice(0, i);
      if (st.has(root)) {
        result.push(root);
        rootFound = true;
        break;
      }
    }
    if (!rootFound) result.push(word);
  }
  return result.join(" ");
}

console.log(
  replaceWords(["cat", "bat", "rat"], "the cattle was rattled by the battery")
);
/**
#Plan:

1. **Understand the problem:**
   - We have a dictionary of root words
   - We have a sentence to process
   - For each word in sentence, replace it with:
     - The shortest root word that is a prefix of the word
     - If no root is a prefix, keep the original word
   - Return the modified sentence

2. **Break down input data & transformations:**
  - Input: dictionary array of root words, sentence string
  - Transformation: 
    1. Store dictionary in efficient data structure for prefix lookups
    2. Split sentence into words
    3. For each word, find shortest matching root prefix
    4. Join words back into sentence
  - Output: Modified sentence string

3. **Edge cases:**
  - Multiple roots that are prefixes of a word (need shortest)
  - Root equals the word exactly
  - Case sensitivity (all lowercase per constraints)
  - Empty dictionary or sentence
  - Very long words/sentence (up to 10^6 characters)
  - Roots with same prefix relationships

4. **Data structures:**
  - Trie (prefix tree) for efficient prefix lookups
  - Or Set for simple lookup (but doesn't help with prefixes)
  - Or sort dictionary and use binary search

5. **Approach:**
  1. Build a Trie from dictionary words
  2. For each word in sentence:
     - Search in Trie for shortest prefix match
     - If found, replace with that root
     - Else keep original word
  3. Join words back into sentence

6. **Time & Space Complexity:**
  - Time: O(N * L) where N = total chars in dictionary, L = avg word length for trie build
           O(M * K) where M = number of words in sentence, K = avg word length for search
  - Space: O(N) for Trie storage
*/

// Trie Node class
class TrieNode {
  constructor() {
    this.children = new Array(26).fill(null);
    this.isEnd = false;
  }
}

// Trie class
class MyTrie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      const index = char.charCodeAt(0) - 97; // 'a' = 97
      if (!node.children[index]) {
        node.children[index] = new TrieNode();
      }
      node = node.children[index];
    }
    node.isEnd = true;
  }

  // Find shortest prefix that exists in trie
  findShortestPrefix(word) {
    let node = this.root;
    let prefix = "";

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const index = char.charCodeAt(0) - 97;

      if (!node.children[index]) {
        return null; // No matching prefix
      }

      node = node.children[index];
      prefix += char;

      if (node.isEnd) {
        return prefix; // Found shortest matching root
      }
    }

    return null; // Word is longer than any root prefix
  }
}

// Main function
function replaceWords(dictionary, sentence) {
  // Step 1: Build Trie from dictionary
  const trie = new MyTrie();
  for (const root of dictionary) {
    trie.insert(root);
  }

  // Step 2: Split sentence into words
  const words = sentence.split(" ");

  // Step 3: Process each word
  const resultWords = [];
  for (const word of words) {
    const replacement = trie.findShortestPrefix(word);
    resultWords.push(replacement || word);
  }

  // Step 4: Join back into sentence
  return resultWords.join(" ");
}

/*

# Custom Test Cases

Test 1: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Expected: "the cat was rat by the bat"

Test 2: dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
Expected: "a a b c"

Test 3: dictionary = ["abc","ab"], sentence = "abcd abcd abcd"
Expected: "ab ab ab" (shortest prefix "ab" should be used, not "abc")

Test 4: dictionary = ["ac","ab"], sentence = "it is an absolute accident"
Expected: "it is an ab ac" (absolute->ab, accident->ac)

Test 5: dictionary = [], sentence = "hello world"
Expected: "hello world" (no replacements)

Test 6: dictionary = ["hello"], sentence = "hello world"
Expected: "hello world" (exact match)

# Commit Message
"feat: Solve Replace Words problem using Trie data structure

- Implement Trie class for efficient prefix storage and lookup
- Insert all dictionary roots into Trie
- For each word in sentence, find shortest matching prefix in Trie
- Replace word with found prefix or keep original if no match
- Handle edge cases: empty dictionary, exact matches, shortest prefix preference
- O(N*L) time for building trie, O(M*K) time for replacements
- O(N*L) space for trie storage where N=total chars in dictionary"
*/

// Test the function
console.log(
  replaceWords(["cat", "bat", "rat"], "the cattle was rattled by the battery")
);
// Expected: "the cat was rat by the bat"

console.log(replaceWords(["a", "b", "c"], "aadsfasf absbs bbab cadsfafs"));
// Expected: "a a b c"

console.log(replaceWords(["abc", "ab"], "abcd abcd abcd"));
// Expected: "ab ab ab"

console.log(replaceWords(["ac", "ab"], "it is an absolute accident"));
// Expected: "it is an ab ac"

// Alternative implementation using Set (simpler but less efficient)
function replaceWordsSet(dictionary, sentence) {
  // Convert dictionary to Set for O(1) lookup
  const dictSet = new Set(dictionary);

  // Sort dictionary by length to find shortest prefix first
  const sortedDict = [...dictionary].sort((a, b) => a.length - b.length);

  const words = sentence.split(" ");
  const result = [];

  for (const word of words) {
    let replacement = word; // Default to original word

    // Check all possible prefixes starting from shortest
    for (let i = 1; i <= word.length; i++) {
      const prefix = word.substring(0, i);
      if (dictSet.has(prefix)) {
        replacement = prefix;
        break;
      }
    }

    result.push(replacement);
  }

  return result.join(" ");
}

// More efficient version with prefix hashing
function replaceWordsOptimized(dictionary, sentence) {
  // Build a set of all possible prefixes from dictionary
  const prefixSet = new Set();

  // Sort dictionary by length to ensure shortest prefixes are added first
  dictionary.sort((a, b) => a.length - b.length);

  for (const word of dictionary) {
    // Check if any prefix of this word is already in set
    let hasPrefix = false;
    for (let i = 1; i < word.length; i++) {
      if (prefixSet.has(word.substring(0, i))) {
        hasPrefix = true;
        break;
      }
    }
    // Only add if no shorter prefix exists
    if (!hasPrefix) {
      prefixSet.add(word);
    }
  }

  // Convert to array and sort for binary search (optional)
  const prefixes = Array.from(prefixSet).sort();

  const words = sentence.split(" ");
  const result = [];

  for (const word of words) {
    let replacement = word;

    // Check each prefix
    for (const prefix of prefixes) {
      if (word.startsWith(prefix)) {
        replacement = prefix;
        break;
      }
    }

    result.push(replacement);
  }

  return result.join(" ");
}

// Implementation with Trie using Map (more memory efficient for sparse trees)
class TrieNodeMap {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class TrieMap {
  constructor() {
    this.root = new TrieNodeMap();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNodeMap());
      }
      node = node.children.get(char);
    }
    node.isEnd = true;
  }

  getShortestPrefix(word) {
    let node = this.root;
    let prefix = "";

    for (const char of word) {
      if (!node.children.has(char)) {
        return null;
      }

      node = node.children.get(char);
      prefix += char;

      if (node.isEnd) {
        return prefix;
      }
    }

    return null;
  }
}

function replaceWordsTrieMap(dictionary, sentence) {
  const trie = new TrieMap();

  // Insert dictionary words into trie
  for (const word of dictionary) {
    trie.insert(word);
  }

  // Process each word in sentence
  return sentence
    .split(" ")
    .map((word) => {
      const prefix = trie.getShortestPrefix(word);
      return prefix || word;
    })
    .join(" ");
}

// Explanation with example walkthrough:
console.log(
  "\nDetailed explanation for dictionary = ['cat','bat','rat'], sentence = 'the cattle was rattled by the battery':"
);
console.log("1. Build Trie:");
console.log("   - Insert 'cat': c->a->t (mark end at t)");
console.log("   - Insert 'bat': b->a->t (mark end at t)");
console.log("   - Insert 'rat': r->a->t (mark end at t)");
console.log("2. Process sentence words:");
console.log("   - 'the': No prefix match -> keep 'the'");
console.log("   - 'cattle': Check prefixes:");
console.log("     'c' -> exists but not end");
console.log("     'ca' -> exists but not end");
console.log("     'cat' -> exists AND is end -> replace with 'cat'");
console.log("   - 'was': No match -> keep 'was'");
console.log("   - 'rattled': Check prefixes:");
console.log("     'r' -> exists but not end");
console.log("     'ra' -> exists but not end");
console.log("     'rat' -> exists AND is end -> replace with 'rat'");
console.log("   - 'by': No match -> keep 'by'");
console.log("   - 'the': No match -> keep 'the'");
console.log("   - 'battery': Check prefixes:");
console.log("     'b' -> exists but not end");
console.log("     'ba' -> exists but not end");
console.log("     'bat' -> exists AND is end -> replace with 'bat'");
console.log("Result: 'the cat was rat by the bat'");

// Performance considerations:
console.log("\nPerformance Analysis:");
console.log("Trie Approach:");
console.log("- Build time: O(T) where T = total characters in dictionary");
console.log("- Search time: O(L) per word where L = word length");
console.log("- Total: O(T + S) where S = total characters in sentence");
console.log("- Space: O(T) for trie nodes");

console.log("\nSet Approach (checking all prefixes):");
console.log("- For each word of length L, check L prefixes");
console.log("- Total: O(N * L²) worst case where N = number of words");
console.log("- Less efficient but simpler code");

// Test with large input simulation
const largeDict = [];
for (let i = 0; i < 1000; i++) {
  largeDict.push("pre" + i.toString().padStart(3, "0"));
}
const largeSentence = "prefix001 prefix002 prefix003 " + "word ".repeat(100);

console.log("\nLarge input test (simulated):");
console.log("Dictionary size: 1000 roots");
console.log("Sentence: 103 words");
console.log("Trie approach should handle this efficiently");
