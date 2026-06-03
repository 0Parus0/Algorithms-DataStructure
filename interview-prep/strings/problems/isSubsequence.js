/*
392. Is Subsequence
Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).
Example 1:
Input: s = "abc", t = "ahbgdc"
Output: true
Example 2:
Input: s = "axc", t = "ahbgdc"
Output: false

Constraints:
0 <= s.length <= 100
0 <= t.length <= 104
s and t consist only of lowercase English letters.

Follow up: Suppose there are lots of incoming s, say s1, s2, ..., sk where k >= 109, and you want to check one by one to see if t has its subsequence. In this scenario, how would you change your code?
*/
function isSubsequence(s, t) {
  let i = 0;
  let j = 0;

  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      i++;
    }
    j++;
  }

  return i === s.length;
}

function lowerBound(nums, k) {
  let result = nums.length;
  let i = 0;
  let j = nums.length - 1;
  while (i <= j) {
    let mid = Math.floor((i + j) / 2);
    if (nums[mid] >= k) {
      result = mid;
      j = mid - 1;
    } else {
      i = mid + 1;
    }
  }
  return result;
}

function upperBound(nums, k) {
  let result = nums.length;
  let i = 0;
  let j = nums.length - 1;
  while (i <= j) {
    let mid = Math.floor((i + j) / 2);
    if (nums[mid] > k) {
      result = mid;
      j = mid - 1;
    } else {
      i = mid + 1;
    }
  }
  return result;
}

function isSubsequence(s, t) {
  const m = s.length;
  const n = t.length;

  const mp = new Map();
  for (let i = 0; i < n; i++) {
    if (!mp.has(t[i])) {
      mp.set(t[i], []);
    }
    mp.get(t[i]).push(i);
  }

  let prev = -1;
  for (let i = 0; i < m; i++) {
    let ch = s[i];
    if (!mp.has(ch)) return false;

    const indices = mp.get(ch);
    let next = upperBound(indices, prev);
    if (next === indices.length) return false;
    prev = indices[next];
  }

  return true;
}

console.log(isSubsequence("abc", "abcedge"));
