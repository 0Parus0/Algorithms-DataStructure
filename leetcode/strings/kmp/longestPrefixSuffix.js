/*Longest prefix which is also suffix
Read
Courses
Practice
Given a string s, find the length of the longest prefix, which is also a suffix. The prefix and suffix should not overlap.

Examples: 

Input : S = aabcdaabc
Output : 4
Explanation: The string “aabc” is the longest prefix which is also suffix.

Input : S = abcab
Output : 2


Input : S = aaaa
Output : 2

Recommended Problem
Longest Prefix Suffix
Strings
Data Structures
Accolite
Amazon
+2 more
Solve Problem
Submission count: 100K
Naive approach:

Since overlapping prefixes and suffixes is not allowed, we break the string from the middle and start matching left and right strings. If they are equal return size of one string, else they try for shorter lengths on both sides.

*/
function lps(str) {
  let n = str.length;
  let lpsArr = Array.from({ length: n }, () => 0);
  let pre = 0;
  let suf = 1;
  while (suf < n) {
    if (str[pre] === str[suf]) {
      lpsArr[suf] = pre + 1;
      suf++, pre++;
    } else {
      if (pre === 0) {
        lpsArr[suf] = 0;
        suf++;
      } else {
        pre = lpsArr[pre - 1];
      }
    }
    // console.log(suf, pre);
  }
  return lpsArr[n - 1];
}

function lps1(str) {
  let n = str.length;
  let i = 1,
    len = 0;
  let lpsTab = new Array(n).fill(0);

  while (i < n) {
    if (str[i] === str[len]) {
      len++;
      lpsTab[i] = len;
      i++;
    } else {
      if (len  === 0) {
        lps[i] = 0;
        i++;
      } else {
        len = lpsTab[len - 1];
      }
    }
  }
  return lpsTab;
}

console.log(lps1("abcabdabcabdabdab"));
