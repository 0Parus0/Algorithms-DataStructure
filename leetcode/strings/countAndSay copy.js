/*
38. Count and Say
The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

countAndSay(1) = "1"
countAndSay(n) is the run-length encoding of countAndSay(n - 1).
Run-length encoding (RLE) is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string "3322251" we replace "33" with "23", replace "222" with "32", replace "5" with "15" and replace "1" with "11". Thus the compressed string becomes "23321511".

Given a positive integer n, return the nth element of the count-and-say sequence.

Example 1:
Input: n = 4
Output: "1211"
Explanation:
countAndSay(1) = "1"
countAndSay(2) = RLE of "1" = "11"
countAndSay(3) = RLE of "11" = "21"
countAndSay(4) = RLE of "21" = "1211"

Example 2:
Input: n = 1
Output: "1"
Explanation:
This is the base case.

Constraints:
1 <= n <= 30

Follow up: Could you solve it iteratively?
*/

function countAndSay(n) {
  if (n === 1) return "1";

  const say = countAndSay(n - 1);

  let result = "";
  for (let i = 0; i < say.length; i++) {
    let currentChar = say[i];
    let count = 1;
    while (i < say.length - 1 && say[i] === say[i + 1]) {
      count++;
      i++;
    }
    // console.log(say);
    result += count.toString();
    result += currentChar;
  }
  return result;
}

function countAndSay(n) {
  if (n === 1) return "1";

  const say = countAndSay(n - 1);

  let result = "";
  for (let i = 0; i < say.length; i++) {
    let currentChar = say[i];
    let count = 0;
    while (i < say.length && say[i] === currentChar) {
      count++;
      i++;
    }
    i--; // Decrement to compensate for the extra increment
    result += count.toString();
    result += currentChar;
  }
  return result;
}

function countAndSay(n) {
  let res = "1";
  for (let i = 2; i <= n; i++) {
    let temp = "",
      count = 1;
    for (let j = 1; j < res.length; j++) {
      if (res[j] === res[j - 1]) {
        count++;
      } else {
        temp += count + res[j - 1];
        count = 1;
      }
    }
    temp += count + res[res.length - 1];
    res = temp;
  }

  return res;
}

var countAndSay1 = function (n) {
  let result = "1";

  for (let i = 2; i <= n; i++) {
    let nextResult = "";
    let count = 1;

    for (let j = 0; j < result.length; j++) {
      // If the next character is the same, increment count
      if (result[j] === result[j + 1]) {
        count++;
      } else {
        // Otherwise, "say" the count and the digit
        nextResult += count + result[j];
        count = 1; // Reset count for the new digit
      }
    }
    result = nextResult;
  }

  return result;
};

console.log(countAndSay(5));
