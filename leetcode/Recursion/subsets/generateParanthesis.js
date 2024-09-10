/* Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 

Constraints:

1 <= n <= 8
*/

function generateParenthesis(num, left = 0, right = 0, result = [], temp = "") {
  if (left + right === 2 * num) {
    result.push(temp);
  } else {
    if (left < num) {
      temp += "(";
      generateParenthesis(num, left + 1, right, result, temp);
    }
    if (right < left) {
      temp += ")";
      generateParenthesis(num, left, right + 1, result, temp);
    }
  }
  return result;
}

function generateParenthesis2(num) {
  const result = [];

  function generate(temp = [], left = 0, right = 0) {
    if (left + right === 2 * num) {
      result.push(temp.join(""));
      return;
    } else {
      if (left < num) {
        temp.push("(");
        generate(temp, left + 1, right);

        temp.pop();
      }
      if (right < left) {
        temp.push(")");
        generate(temp, left, right + 1);
        temp.pop();
      }
    }
  }
  generate();
  return result;
}
console.log(generateParenthesis2(3));
