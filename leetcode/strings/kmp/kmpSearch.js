/*
KMP Algorithm for Pattern Searching
Read
Courses
Practice
Video
Given a text txt[0 . . . N-1] and a pattern pat[0 . . . M-1], write a function search(char pat[], char txt[]) that prints all occurrences of pat[] in txt[]. You may assume that N > M. 
*/

function findLps(str) {
  let n = str.length;
  // lps array that will be returned
  let lps = Array.from({ length: n }, () => 0);
  // prefix starts at 0, and suffix starts at 1
  let pre = 0,
    suf = 1;
  while (suf < n) {
    if (str[pre] === str[suf]) {
      lps[suf] = pre + 1;
      pre++, suf++;
    } else {
      if (pre === 0) {
        lps[suf] = 0;
        suf++;
      } else {
        pre = lps[pre - 1];
      }
    }
  }
  return lps;
}

function findNeedle(haystack, needle) {
  let n = haystack.length,
    m = needle.length;
  let lps = findLps(needle);
  let first = 0,
    second = 0;
  while (second < m && first < n) {
    if (needle[second] === haystack[first]) {
      first++, second++;
    } else {
      if (second === 0) {
        first++;
      } else {
        second = lps[second - 1];
      }
    }
  }
  return second === m ? first - second : -1;
}

console.log(findNeedle("abcbacdba", "acd"));

// function buildPrefixTable(pattern) {
//   let prefixTable = [0];
//   let i = 1;
//   let j = 0;
//   while (i < pattern.length) {
//     if (pattern[i] === pattern[j]) {
//       j++;
//       prefixTable[i] = j;
//       i++;
//     } else if (j > 0) {
//       j = prefixTable[j - 1];
//     } else {
//       prefixTable[i] = 0;
//       i++;
//     }
//   }
//   return prefixTable;
// }
// // console.log(buildPrefixTable("ddddabcddddbc"));

// function kmpSearch(string, pattern) {
//   // edge case: pattern='' return 0;
//   if (pattern === "") return 0;
//   const prefixTable = buildPrefixTable(string);

//   let i = 0;
//   let j = 0;
//   while (i < string.length && j < pattern.length) {
//     if (string[i] === pattern[j]) {
//       i++;
//       j++;
//     } else if (j > 0) {
//       j = prefixTable[j - 1];
//     } else {
//       i++;
//     }
//   }
//   return j === pattern.length ? i - j : -1;
// }

// console.log(kmpSearch("abcabcbcab", "abc"));
// function buildPatternTable(word) {
//   const patternTable = [0];
//   let prefixIndex = 0;
//   let suffixIndex = 1;

//   while (suffixIndex < word.length) {
//     if (word[prefixIndex] === word[suffixIndex]) {
//       patternTable[suffixIndex] = prefixIndex + 1;
//       suffixIndex++;
//       prefixIndex++;
//     } else if (prefixIndex === 0) {
//       patternTable[suffixIndex] = 0;
//       suffixIndex++;
//     } else {
//       prefixIndex = patternTable[prefixIndex - 1];
//     }
//   }
//   return patternTable;
// }

// // console.log(buildPatternTable('abcdabca'))

// function knuthMorrisPratt(text, word) {
//   if (!word.length) return 0;
//   let count = 0;
//   let textIndex = 0;
//   let wordIndex = 0;
//   const patternTable = buildPatternTable(word);

//   while (textIndex < text.length) {
//     if (text[textIndex] === word[wordIndex]) {
//       // we have found a match.
//       if (wordIndex === word.length - 1) {
//         count++;
//       }
//       wordIndex++;
//       textIndex++;
//     } else if (wordIndex > 0) {
//       wordIndex = patternTable[wordIndex - 1];
//     } else {
//       // wordIndex = 0;
//       console.log({ wordIndex });
//       textIndex++;
//     }
//   }
//   return count;
// }

// console.log(knuthMorrisPratt("abcabcbcab", "abc"));
/**
 * String Naive Search Pseudo Code
 *
 * Loop over the longer string
 * Loop over the shorter string
 * If the characters don't match, break out of the inner loop
 * If the characters do match, keep going
 * If you complete the inner loop and find a match,
 * Increment the count of matches
 * Return the count
 */

// function stringNaiveSearch(long, short) {
//   let count = 0;
//   for(let i = 0; i < long.length - short.length + 1; i++) {
//     for(let j = 0; j < short.length; j++) {
//       if (short[j] !== long[i + j]) break;
//       if( j === short.length -1) count++;
//     }
//   }
//   return count;
// }

// function stringNaiveSearch(str, pattern) {
//   for (let i = 0; i < str.length - pattern.length + 1; i++) {
//     for (let j = 0; j < pattern.length; j++) {
//       if (pattern[j] !== str[i + j]) break;
//       // if j pointer has reached to end of the pattern that means we have found a match which is starting on the ith index of str so we have to return i;
//       if (j === pattern.length - 1) return i;
//     }
//   }
// }

// console.log(stringNaiveSearch("lorie loled", "lol"));
