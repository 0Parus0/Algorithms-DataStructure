/*
402. Remove K Digits
Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.

Example 1:
Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.

Example 2:
Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.

Example 3:
Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.

Constraints:
1 <= k <= num.length <= 105
num consists of only digits.
num does not have any leading zeros except for the zero itself.
*/

function removeKDigits(num, k) {
  const result = [];

  if (arr.length === k) {
    return "0";
  }

  for (let ch of num) {
    while (result.length && result[result.length - 1] > ch && k > 0) {
      result.pop();
      k--;
    }

    if (result.length > 0 || ch !== "0") {
      result.push(ch);
    }
  }

  if (k > 0) {
    while (k--) result.pop();
  }

  result = result.join("").replace(/^0+/, "");
  return result === "" ? "0" : result;
}

/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function (num, k) {
  let result = [];

  if (num.length === k) {
    return "0";
  }

  for (let ch of num) {
    while (result.length && result[result.length - 1] > ch && k > 0) {
      result.pop();
      k--;
    }

    result.push(ch);
  }

  if (k > 0) {
    while (k--) result.pop();
  }

  result = result.join("").replace(/^0+/, "");
  return result === "" ? "0" : result;
};
