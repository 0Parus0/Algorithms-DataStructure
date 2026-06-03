/*
1209. Remove All Adjacent Duplicates in String II
You are given a string s and an integer k, a k duplicate removal consists of choosing k adjacent and equal letters from s and removing them, causing the left and the right side of the deleted substring to concatenate together.

We repeatedly make k duplicate removals on s until we no longer can.

Return the final string after all such duplicate removals have been made. It is guaranteed that the answer is unique.

Example 1:
Input: s = "abcd", k = 2
Output: "abcd"
Explanation: There's nothing to delete.

Example 2:
Input: s = "deeedbbcccbdaa", k = 3
Output: "aa"
Explanation: 
First delete "eee" and "ccc", get "ddbbbdaa"
Then delete "bbb", get "dddaa"
Finally delete "ddd", get "aa"

Example 3:
Input: s = "pbbcggttciiippooaais", k = 2
Output: "ps"

Constraints:
1 <= s.length <= 105
2 <= k <= 104
s only contains lowercase English letters.
*/

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
function removeDuplicates(s, k) {
  let stack = [];

  for (let char of s) {
    if (stack.length && stack[stack.length - 1].char === char) {
      stack[stack.length - 1].count++;

      if (stack[stack.length - 1].count === k) {
        stack.pop();
      }
    } else {
      stack.push({ char, count: 1 });
    }
  }

  // rebuild string
  let result = "";
  for (let { char, count } of stack) {
    result += char.repeat(count);
  }

  return result;
}

// ========================================================================
// 1. Stack with Object fast
// ========================================================================

function removeDuplicates(s, k) {
  let st = [];

  for (let c of s) {
    let last = st[st.length - 1];
    if (last && last.char === c) {
      last.count++;

      if (last.count === k) st.pop();
    } else st.push({ char: c, count: 1 });
  }

  let result = "";
  for (let { char, count } of st) {
    result += char.repeat(count);
  }

  return result;
}

// ========================================================================
//                    2. With Array and upfront variable
// ========================================================================

function removeDuplicates1(s, k) {
  const stack = [];

  for (let c of s) {
    let last = stack[stack.length - 1];

    if (last && last[0] === c) {
      last[1]++;

      if (last[1] === k) stack.pop();
    } else stack.push([c, 1]);
  }

  let result = "";
  for (let [c, ct] of stack) {
    result += c.repeat(ct);
  }
  return result;
}

// ========================================================================
//                    3 without upfront variable
// ========================================================================

function removeDuplicates1(s, k) {
  let stack = [];

  for (let c of s) {
    if (stack.length && stack[stack.length - 1][0] === c) {
      stack[stack.length - 1][1]++;
      if (stack[stack.length - 1][1] === k) stack.pop();
    } else stack.push([c, 1]);
  }

  // console.log({ stack });

  let result = "";
  for (let [c, count] of stack) {
    result += c.repeat(count);
  }

  return result;
}
console.log(removeDuplicates("deeedbbcccbdaa", 3));
