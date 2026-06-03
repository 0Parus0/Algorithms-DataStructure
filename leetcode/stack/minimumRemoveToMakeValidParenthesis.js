/*
1249. Minimum Remove to Make Valid Parentheses
Medium
Topics
premium lock icon
Companies
Hint
Given a string s of '(' , ')' and lowercase English characters.

Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

Formally, a parentheses string is valid if and only if:

It is the empty string, contains only lowercase characters, or
It can be written as AB (A concatenated with B), where A and B are valid strings, or
It can be written as (A), where A is a valid string.
 

Example 1:

Input: s = "lee(t(c)o)de)"
Output: "lee(t(c)o)de"
Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.
Example 2:

Input: s = "a)b(c)d"
Output: "ab(c)d"
Example 3:

Input: s = "))(("
Output: ""
Explanation: An empty string is also valid.
 

Constraints:

1 <= s.length <= 105
s[i] is either '(' , ')', or lowercase English letter.
*/

function minRemoveToMakeValid(s) {
  const result = s.split("");
  const stack = [];

  for (let i = 0; i < result.length; i++) {
    if (result[i] === "(") {
      stack.push(i);
    } else if (result[i] === ")") {
      if (stack.length) {
        stack.pop();
      } else {
        result[i] = ""; // Mark removal
      }
    }
  }

  for (let i of stack) {
    result[i] = "";
  }

  return result.join("");
}

function minRemoveToMakeValid(s) {
  const n = s.length;
  const stack = []; // Store indices of unmatched '('
  const toRemove = new Set(); // Store indices of parentheses to remove

  // First pass: identify unmatched parentheses
  for (let i = 0; i < n; i++) {
    const c = s[i];
    if (c === "(") {
      stack.push(i);
    } else if (c === ")") {
      if (stack.length) {
        stack.pop(); // matched with a previous '('
      } else {
        toRemove.add(i); // unmatched closing parenthesis
      }
    }
  }

  // Add any remaining unmatched '(' indices to remove
  while (stack.length) {
    toRemove.add(stack.pop());
  }

  // Build result string without the removed characters
  let result = [];
  for (let i = 0; i < n; i++) {
    if (!toRemove.has(i)) {
      result.push(s[i]);
    }
  }

  return result.join("");
}

console.log(minRemoveToMakeValid("lee(t(c(o)de)"));
console.log(minRemoveToMakeValid("a)b(c)d"));
