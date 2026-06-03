/*
2434. Using a Robot to Print the Lexicographically Smallest String
Medium
Topics
premium lock icon
Companies
Hint
You are given a string s and a robot that currently holds an empty string t. Apply one of the following operations until s and t are both empty:

Remove the first character of a string s and give it to the robot. The robot will append this character to the string t.
Remove the last character of a string t and give it to the robot. The robot will write this character on paper.
Return the lexicographically smallest string that can be written on the paper.

 

Example 1:

Input: s = "zza"
Output: "azz"
Explanation: Let p denote the written string.
Initially p="", s="zza", t="".
Perform first operation three times p="", s="", t="zza".
Perform second operation three times p="azz", s="", t="".
Example 2:

Input: s = "bac"
Output: "abc"
Explanation: Let p denote the written string.
Perform first operation twice p="", s="c", t="ba". 
Perform second operation twice p="ab", s="c", t="". 
Perform first operation p="ab", s="", t="c". 
Perform second operation p="abc", s="", t="".
Example 3:

Input: s = "bdda"
Output: "addb"
Explanation: Let p denote the written string.
Initially p="", s="bdda", t="".
Perform first operation four times p="", s="", t="bdda".
Perform second operation four times p="addb", s="", t="".
 

Constraints:

1 <= s.length <= 105
s consists of only English lowercase letters.
*/

function robotWithString(s) {
  const freq = new Array(26).fill(0);

  for (let c of s) {
    freq[c.charCodeAt(0) - 97]++;
  }

  let minChar = 0;
  const stack = [];
  let result = "";

  for (let c of s) {
    stack.push(c);
    freq[c.charCodeAt(0) - 97]--;

    while (minChar < 26 && freq[minChar] === 0) {
      minChar++;
    }

    while (
      stack.length &&
      stack[stack.length - 1].charCodeAt(0) - 97 <= minChar
    ) {
      result += stack.pop();
    }
  }

  return result;
}

function robotWithString1(s) {
  const n = s.length;

  const t = [];
  const paper = [];

  const minCharOnRight = new Array(n).fill("");
  minCharOnRight[n - 1] = s[n - 1];

  for (let i = n - 2; i >= 0; i--) {
    minCharOnRight[i] =
      s[i] < minCharOnRight[i + 1] ? s[i] : minCharOnRight[i + 1];
  }

  let i = 0;
  while (i < n) {
    t.push(s[i]);

    let minChar = i < n ? minCharOnRight[i + 1] : s[i];

    while (t.length && t[t.length - 1] <= minChar) {
      paper.push(t.pop());
    }
    i++;
  }

  while (t.length) {
    paper.push(t.pop());
  }

  return paper.join("");
}

console.log(robotWithString("zza"));
