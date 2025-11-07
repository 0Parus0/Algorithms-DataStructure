/*
Print N-bit binary numbers having more 1s than 0s
Difficulty: MediumAccuracy: 56.08%Submissions: 49K+Points: 4
Given a positive integer n. Your task is to generate a string list of all n-bit binary numbers where, for any prefix of the number, there are more or an equal number of 1's than 0's. The numbers should be sorted in decreasing order of magnitude.

Example 1:

Input:  
n = 2
Output: 
{"11", "10"}
Explanation: Valid numbers are those where each prefix has more 1s than 0s:
11: all its prefixes (1 and 11) have more 1s than 0s.
10: all its prefixes (1 and 10) have more 1s than 0s.
So, the output is "11, 10".
Example 2:

Input:  
n = 3
Output: 
{"111", "110", "101"}
Explanation: Valid numbers are those where each prefix has more 1s than 0s.
111: all its prefixes (1, 11, and 111) have more 1s than 0s.
110: all its prefixes (1, 11, and 110) have more 1s than 0s.
101: all its prefixes (1, 10, and 101) have more 1s than 0s.
So, the output is "111, 110, 101".
User Task:
Your task is to complete the function NBitBinary() which takes a single integer n as input and returns the list of strings in decreasing order. You need not take any input or print anything.

Expected Time Complexity: O(|2n|)
Expected Auxiliary Space: O(2n)

Constraints:
1 <= n <= 15
*/

function nBitBinaryNoOrder(n) {
  let result = [];

  function find(zeros, ones, temp = []) {
    if (temp.length === n) {
      result.push(temp.join(""));
      return;
    }

    if (zeros < ones) {
      temp.push("0");
      find(zeros + 1, ones, temp);
      temp.pop("0");
    }

    temp.push("1");
    find(zeros, ones + 1, temp);
    temp.pop("1");
  }
  find(0, 0, []);
  return result;
}

function NBitBinaryWithArrayAndDescending(n) {
  const result = [];

  function generate(zeros, ones, path) {
    // Base case: reached n bits
    if (path.length === n) {
      result.push(path.join(""));
      return;
    }

    // Always try adding '1' first (for decreasing order)
    if (ones < n) {
      path.push("1");
      generate(zeros, ones + 1, path);
      path.pop();
    }

    // Try adding '0' only if we have more 1's than 0's so far
    if (zeros < ones) {
      path.push("0");
      generate(zeros + 1, ones, path);
      path.pop();
    }
  }

  generate(0, 0, []);
  return result;
}

function NBitBinaryWithStringAndDescending(n) {
  const result = [];

  function generate(zeros, ones, path) {
    if (path.length === n) {
      result.push(path);
      return;
    }

    // Try '1' first - this ensures decreasing order
    if (ones < n) {
      generate(zeros, ones + 1, path + "1");
    }

    // Try '0' only if valid
    if (zeros < ones) {
      generate(zeros + 1, ones, path + "0");
    }
  }

  generate(0, 0, "");
  return result;
}
console.log(NBitBinaryWithStringAndDescending(4));
