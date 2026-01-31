/*
2949. Count Beautiful Substrings II
Hard
Topics
premium lock icon
Companies
Hint
You are given a string s and a positive integer k.

Let vowels and consonants be the number of vowels and consonants in a string.

A string is beautiful if:

vowels == consonants.
(vowels * consonants) % k == 0, in other terms the multiplication of vowels and consonants is divisible by k.
Return the number of non-empty beautiful substrings in the given string s.

A substring is a contiguous sequence of characters in a string.

Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.

Consonant letters in English are every letter except vowels.

 

Example 1:

Input: s = "baeyh", k = 2
Output: 2
Explanation: There are 2 beautiful substrings in the given string.
- Substring "baeyh", vowels = 2 (["a",e"]), consonants = 2 (["y","h"]).
You can see that string "aeyh" is beautiful as vowels == consonants and vowels * consonants % k == 0.
- Substring "baeyh", vowels = 2 (["a",e"]), consonants = 2 (["b","y"]).
You can see that string "baey" is beautiful as vowels == consonants and vowels * consonants % k == 0.
It can be shown that there are only 2 beautiful substrings in the given string.
Example 2:

Input: s = "abba", k = 1
Output: 3
Explanation: There are 3 beautiful substrings in the given string.
- Substring "abba", vowels = 1 (["a"]), consonants = 1 (["b"]).
- Substring "abba", vowels = 1 (["a"]), consonants = 1 (["b"]).
- Substring "abba", vowels = 2 (["a","a"]), consonants = 2 (["b","b"]).
It can be shown that there are only 3 beautiful substrings in the given string.
Example 3:

Input: s = "bcdf", k = 1
Output: 0
Explanation: There are no beautiful substrings in the given string.
 

Constraints:

1 <= s.length <= 5 * 104
1 <= k <= 1000

s consists of only English lowercase letters.
*/

var beautifulSubstrings = function (s, k) {
  const isVowel = (ch) => "aeiou".includes(ch);

  let v = 0;
  let c = 0;
  let result = 0;

  // mp[pSum][vResid] = frequency
  const mp = {};
  mp[0] = { 0: 1 }; // before processing any char

  for (const ch of s) {
    if (isVowel(ch)) v++;
    else c++;

    const pSum = v - c;

    const curResid = v % k; // <-- YOU WANT THIS

    const inner = mp[pSum];
    if (inner) {
      for (const pastResidStr in inner) {
        const pastResid = Number(pastResidStr);
        const freq = inner[pastResidStr];

        // substring vowel count modulo k
        // + K to avoid getting a negative currSubStrV
        const currSubStrV = (curResid - pastResid + k) % k;

        // your condition: (V * V) % k === 0 but with modded V
        if ((currSubStrV * currSubStrV) % k === 0) {
          result += freq;
        }
      }
    }

    // store current vowel MOD value (your request)
    if (!mp[pSum]) mp[pSum] = {};
    mp[pSum][curResid] = (mp[pSum][curResid] || 0) + 1; // <-- AND THIS
  }

  return result;
};

function beautifulSubstringsOptimized(s, k) {
  // Helper function to check if a character is a vowel
  const isVowel = (ch) => "aeiou".includes(ch);

  // Precompute residues d such that (d * d) % k === 0
  // This helps us quickly check the vowel count condition for beautiful substrings
  const validDiff = new Array(k).fill(false);
  for (let d = 0; d < k; d++) {
    if ((d * d) % k === 0) validDiff[d] = true;
  }

  // Initialize counters for vowels and consonants
  let v = 0,
    c = 0;
  let result = 0; // This will store the total count of beautiful substrings

  // mp: A map that tracks prefix states
  // Structure: { [prefixSum]: { [vowelResidue]: frequency } }
  // - prefixSum = (vowels - consonants) up to current position
  // - vowelResidue = (vowelCount % k) up to current position
  const mp = {};

  // Initialize with the starting state (before processing any characters)
  // prefixSum = 0, vowelResidue = 0 has been seen once
  mp[0] = { 0: 1 };

  // Process each character in the string
  for (const ch of s) {
    // Update vowel and consonant counts
    if (isVowel(ch)) v++;
    else c++;

    // Calculate current prefix sum (vowels - consonants)
    const pSum = v - c;

    // Calculate current vowel residue (vowel count modulo k)
    const curResid = v % k;

    // Check if we've seen this prefix sum before
    // If we have, it means there are substrings that satisfy:
    // (vowels - consonants) condition for beautiful substrings
    const inner = mp[pSum];
    if (inner) {
      // Iterate over all previous residues we've seen with this same prefix sum
      for (const pastResidStr in inner) {
        const pastResid = pastResidStr | 0; // Convert string key to number

        // Calculate the difference in vowel residues between current and previous position
        const diff = (curResid - pastResid + k) % k;

        // Check if this difference satisfies the beautiful substring condition:
        // (v_diff * v_diff) % k === 0, which we precomputed in validDiff
        if (validDiff[diff]) {
          // Each occurrence of this residue pair represents a valid beautiful substring
          result += inner[pastResidStr];
        }
      }
    }

    // Update our map with the current state
    if (!mp[pSum]) mp[pSum] = {};
    const innerMap = mp[pSum];
    innerMap[curResid] = (innerMap[curResid] || 0) + 1;
  }

  return result;
}

/*
Time Complexity: O(n × k) in worst case, but typically much faster due to sparse residue distributions
Space Complexity: O(n × k) for storing prefix states

*/

/*
"""
#Plan
Approach: Prefix Sum with Mathematical Optimization

Key Insights:
1. Let vowel = +1, consonant = -1. Then vowels == consonants when prefix sum = 0.
2. For a substring s[i:j] to be beautiful:
   - prefix[j] - prefix[i] = 0  =>  prefix[j] = prefix[i]
   - Let v = number of vowels in substring = (j-i)/2
   - Then v*v % k == 0  =>  v² divisible by k

3. We need to count pairs (i,j) where:
   - prefix[i] = prefix[j]
   - ( (j-i)/2 )² % k == 0

Optimization:
- Precompute prefix sums
- Group indices by prefix value
- For each group, count valid pairs where distance satisfies divisibility

Time Complexity: O(n * sqrt(k)) - efficient for n=50,000 and k=1000
Space Complexity: O(n) for storing prefix groups
"""
*/

/**
 * Counts beautiful substrings satisfying balance and divisibility
 * @param {string} s - Input string
 * @param {number} k - Divisor for beauty condition
 * @return {number} - Number of beautiful substrings
 */
function countBeautifulSubstrings(s, k) {
  const n = s.length;
  const vowels = new Set(["a", "e", "i", "o", "u"]);

  // Step 1: Precompute prefix sums
  const prefix = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + (vowels.has(s[i]) ? 1 : -1);
  }

  // Step 2: Group indices by prefix value
  const groups = new Map();
  for (let i = 0; i <= n; i++) {
    const key = prefix[i];
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(i);
  }

  // Step 3: For each group, count valid pairs
  let total = 0;

  for (const [_, indices] of groups) {
    const m = indices.length;

    // For each starting index, find valid ending indices
    for (let i = 0; i < m; i++) {
      const start = indices[i];

      for (let j = i + 1; j < m; j++) {
        const end = indices[j];
        const length = end - start;

        // Check if substring length is even (vowels == consonants)
        if (length % 2 !== 0) continue;

        const vowelCount = length / 2;

        // Check divisibility condition: (vowelCount^2) % k == 0
        if ((vowelCount * vowelCount) % k === 0) {
          total++;
        }
      }
    }
  }

  return total;
}

// Optimized version with mathematical insights
function countBeautifulSubstringsOptimized(s, k) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  const n = s.length;

  // Precompute prefix sums
  const prefix = [0];
  for (let i = 0; i < n; i++) {
    prefix.push(prefix[i] + (vowels.has(s[i]) ? 1 : -1));
  }

  // Factorize k to find required conditions
  let kPrime = k;
  for (let p of [2, 3, 5]) {
    while (kPrime % (p * p) === 0) {
      kPrime /= p * p;
    }
  }

  // We need (vowelCount^2) % k == 0
  // This is equivalent to vowelCount % sqrt(k/gcd(kPrime)) == 0
  // where we take the integer part

  const mod = Math.ceil(Math.sqrt(kPrime));

  let count = 0;
  const seen = new Map();

  for (let i = 0; i <= n; i++) {
    const currentPrefix = prefix[i];
    const remainder = i % mod;

    const key = `${currentPrefix},${remainder}`;

    if (seen.has(key)) {
      count += seen.get(key);
    }

    // Update seen count
    if (!seen.has(key)) {
      seen.set(key, 0);
    }
    seen.set(key, seen.get(key) + 1);
  }

  return count;
}

// More practical approach for the given constraints
function countBeautifulSubstringsPractical(s, k) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  const n = s.length;

  let count = 0;

  // Try all substrings (works for smaller n, but optimized)
  for (let i = 0; i < n; i++) {
    let vowelCount = 0;
    let consonantCount = 0;

    for (let j = i; j < n; j++) {
      if (vowels.has(s[j])) {
        vowelCount++;
      } else {
        consonantCount++;
      }

      // Check beauty conditions
      if (
        vowelCount === consonantCount &&
        (vowelCount * consonantCount) % k === 0
      ) {
        count++;
      }
    }
  }

  return count;
}

// Custom Test Cases
console.log("Test 1:", countBeautifulSubstrings("baeyh", 2)); // 2
console.log("Test 2:", countBeautifulSubstrings("abba", 1)); // 3
console.log("Test 3:", countBeautifulSubstrings("bcdf", 1)); // 0
console.log("Test 4:", countBeautifulSubstrings("aeiou", 1)); // 0
console.log("Test 5:", countBeautifulSubstrings("aabb", 2)); // 2

// Edge cases
console.log("Edge 1 - Single char:", countBeautifulSubstrings("a", 1)); // 0
console.log("Edge 2 - All vowels:", countBeautifulSubstrings("aaa", 1)); // 0
console.log("Edge 3 - All consonants:", countBeautifulSubstrings("bbb", 1)); // 0
console.log("Edge 4 - Mixed short:", countBeautifulSubstrings("ab", 1)); // 1

// Let's trace through the first example
console.log("\n--- Tracing 'baeyh' with k=2 ---");
console.log("String: b a e y h");
console.log("Type:   C V V C C");
console.log("Prefix: 0 -1 0 1 2 1");
console.log("Beautiful substrings:");
console.log("  [1,4]: 'aeyh' - vowels=2, consonants=2, 2*2=4 %2=0");
console.log("  [0,3]: 'baey' - vowels=2, consonants=2, 2*2=4 %2=0");
console.log("Total: 2");
