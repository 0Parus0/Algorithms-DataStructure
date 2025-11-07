/*
20. Valid Parentheses
Easy
Topics
premium lock iconCompanies
Hint

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

    Open brackets must be closed by the same type of brackets.
    Open brackets must be closed in the correct order.
    Every close bracket has a corresponding open bracket of the same type.

 

Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false

Example 4:

Input: s = "([])"

Output: true

Example 5:

Input: s = "([)]"
*/

function valid(str) {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "[" || str[i] === "{" || str[i] === "(") {
      stack.push(str[i]);
    } else {
      if (stack.length === 0) return false;

      if (str[i] === "]" && stack[stack.length - 1] !== "[") return false;
      if (str[i] === "}" && stack[stack.length - 1] !== "{") return false;
      if (str[i] === ")" && stack[stack.length - 1] !== "(") return false;
      stack.pop();
    }
  }
  return stack.length === 0;
}

console.log(valid("()")); // true
console.log(valid("()[]{}")); // true
console.log(valid("(]")); // false
console.log(valid("([])")); // true
console.log(valid("([)]")); // false
