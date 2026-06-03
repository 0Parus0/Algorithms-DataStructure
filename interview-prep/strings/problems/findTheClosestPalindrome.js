/*
564. Find the Closest Palindrome
Hard
Given a string n representing an integer, return the closest integer (not including itself), which is a palindrome. If there is a tie, return the smaller one.
The closest is defined as the absolute difference minimized between two integers.

Example 1:
Input: n = "123"
Output: "121"

Example 2:
Input: n = "1"
Output: "0"
Explanation: 0 and 2 are the closest palindromes but we return the smallest which is 0.

Constraints:
1 <= n.length <= 18
n consists of only digits.
n does not have leading zeros.
n is representing an integer in the range [1, 1018 - 1].
*/

function nearestPalindrome(n) {
  const len = n.length;
  const num = BigInt(n);

  if (num === 1n) return "0";
  if (num < 10n) return (num - 1n).toString();

  const candidates = new Set();

  // First case if the n is of type 100...01
  candidates.add(BigInt("9".repeat(len - 1)));
  // Second case if the n si of type 9999..9
  candidates.add(BigInt("1" + "0".repeat(len - 1) + "1"));

  const prefix = n.slice(0, Math.ceil(len / 2));
  const preNum = BigInt(prefix);

  for (let i of [preNum - 1n, preNum, preNum + 1n]) {
    let s = i.toString();
    if (len % 2 === 0) {
      s += s.split("").reverse().join("");
    } else {
      s += s.slice(0, -1).split("").reverse().join("");
    }
    candidates.add(BigInt(s));
  }

  let minDiff = Infinity;
  let result = "";

  for (let candidate of candidates) {
    if (candidate === num) continue;
    const diff = Number(candidate > num ? candidate - num : num - candidate);
    if (diff < minDiff || (diff === minDiff && candidate < BigInt(result))) {
      minDiff = diff;
      result = candidate.toString();
    }
  }

  return result;
}

console.log(nearestPalindrome(8));
