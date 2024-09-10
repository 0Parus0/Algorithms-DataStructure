/*
You are given a string s consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them.

We repeatedly make duplicate removals on s until we no longer can.

Return the final string after all such duplicate removals have been made. It can be proven that the answer is unique.

 

Example 1:

Input: s = "abbaca"
Output: "ca"
Explanation: 
For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".
Example 2:

Input: s = "azxxzy"
Output: "ay"
 

Constraints:

1 <= s.length <= 105
s consists of lowercase English letters.
*/
// Solution 1
// Since we need to check and remove the previous char by the current char, so it let us think about the stack:

// traverse the string s
// for every char, we compare it with the top value in stack
// if they are same, pop the top value
// otherwise, push the current char into stack
// finally, return the stack as a string
// Here's a sample code from me:

const removeDuplicates1 = (s) => {
  const stack = [];
  for (const char of s) {
    stack[stack.length - 1] === char ? stack.pop() : stack.push(char);
  }
  return stack.join("");
};
// Solution 2
// For this solution, we use 2 pointers. One for traversal and one for store result:

// the traversal pointer just traverse the string s
// the store pointer try to save char into the arr itself just as the stack in solution 1
// we compare every new char with the store pointer value and maintain the value of store pointer
// In fact, this is just a variant of solution 1.
// Here's a sample code from me:

const removeDuplicates2 = (s) => {
  const arr = s.split("");
  let ans = 0;
  for (let i = 0; i < arr.length; ++i) {
    ans === 0 || arr[i] !== arr[ans - 1] ? (arr[ans++] = arr[i]) : --ans;
  }
  return arr.slice(0, ans).join("");
};
// Solution 3
// For this solution, we try to deal with all the adjacent duplicates right now, and loop again until there are no more adjacent duplicates.
// We also use the RegExp to make the code easy.

// Here's a sample code from me:

const removeDuplicates3 = (s) => {
  const s2 = s.replace(/(.)\1/g, "");
  console.log(s2);
  return s2.length === s.length ? s : removeDuplicates(s2);
};

var removeDuplicates = function (s) {
  for (var i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      s = s.slice(0, i - 1) + s.slice(i + 1);
      i -= 2;
    }
  }
  return s;
};

console.log(removeDuplicates("azxbxzxxy"));
// let input = "";
// let string = " ".repeat(20000000);
// for (let i = 0; i < 50; i++) {
//   input += string;
//   console.time(i);
//   const y = input.slice(i / 2);
//   console.timeEnd(i);
// }
// let input = "";
// let string = " ".repeat(20000000);
// for (let i = 0; i < 50; i++) {
//   input += string;
//   console.time(i);
//   for (let j = 0; j < i; j++) {
//     const y = input.slice(j);
//   }
//   console.timeEnd(i);
// }
