/*
679. 24 Game
Hard
Topics
premium lock icon
Companies
You are given an integer array cards of length 4. You have four cards, each containing a number in the range [1, 9]. You should arrange the numbers on these cards in a mathematical expression using the operators ['+', '-', '*', '/'] and the parentheses '(' and ')' to get the value 24.

You are restricted with the following rules:

The division operator '/' represents real division, not integer division.
For example, 4 / (1 - 2 / 3) = 4 / (1 / 3) = 12.
Every operation done is between two numbers. In particular, we cannot use '-' as a unary operator.
For example, if cards = [1, 1, 1, 1], the expression "-1 - 1 - 1 - 1" is not allowed.
You cannot concatenate numbers together
For example, if cards = [1, 2, 1, 2], the expression "12 + 12" is not valid.
Return true if you can get such expression that evaluates to 24, and false otherwise.

 

Example 1:

Input: cards = [4,1,8,7]
Output: true
Explanation: (8-4) * (7-1) = 24
Example 2:

Input: cards = [1,2,1,2]
Output: false
 

Constraints:

cards.length == 4
1 <= cards[i] <= 9
*/

function judgePoint24(cards) {
  const ops = [
    (a, b) => a + b,
    (a, b) => a - b,
    (a, b) => a * b,
    (a, b) => a / b,
  ];

  function dfs(nums) {
    if (nums.length === 1) return Math.abs(nums[0] - 24) < 0.001;

    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums.length; j++) {
        if (i !== j) {
          let next = [];
          for (let k = 0; k < nums.length; k++) {
            if (k !== i && k !== j) {
              next.push(nums[k]);
            }
          }

          for (const op of ops) {
            const result = op(nums[i], nums[j]);
            next.push(result);
            if (dfs(next)) return true;
            next.pop();
          }
        }
      }
    }

    return false;
  }

  return dfs(cards);
}

// Example usage:
console.log(judgePoint24([4, 1, 8, 7])); // Output: true
console.log(judgePoint24([1, 2, 1, 2])); // Output: false

var judgePoint24 = function (cards) {
  const eps = 1e-6;
  const ops = ["+", "-", "*", "/"];

  function dfs(nums) {
    if (nums.length === 1) {
      return Math.abs(nums[0] - 24) < eps;
    }

    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums.length; j++) {
        if (i !== j) {
          const next = [];
          for (let k = 0; k < nums.length; k++) {
            if (k !== i && k !== j) {
              next.push(nums[k]);
            }
          }

          for (const op of ops) {
            if (op === "+") {
              next.push(nums[i] + nums[j]);
            } else if (op === "-") {
              next.push(nums[i] - nums[j]);
            } else if (op === "*") {
              next.push(nums[i] * nums[j]);
            } else if (op === "/") {
              if (Math.abs(nums[j]) < eps) continue;
              next.push(nums[i] / nums[j]);
            }

            if (dfs(next)) {
              return true;
            }

            next.pop();
          }
        }
      }
    }

    return false;
  }

  return dfs(cards);
};

function judgePoint24(cards) {
  const epsilon = 0.1;

  function solve(cards) {
    if (cards.length === 1) return Math.abs(cards[0] - 24) <= epsilon;

    // Pick two possible numbers
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < cards.length; j++) {
        if (i === j) continue;

        const temp = [];
        for (let k = 0; k < cards.length; k++) {
          if (k !== i && k !== j) {
            temp.push(cards[k]);
          }
        }

        const a = cards[i];
        const b = cards[j];
        const operations = [a + b, a - b, b - a, a * b];
        if (Math.abs(b) > 0) operations.push(a / b);
        if (Math.abs(a) > 0) operations.push(b / a);

        for (let op of operations) {
          temp.push(op);
          if (solve(temp) === true) return true;
          temp.pop();
        }
      }
    }
    return false;
  }
  return solve(cards);
}

/*
Plan
Rephrase the Problem
Given 4 numbers (1-9), determine if we can combine them with +, -, *, / and parentheses to get exactly 24. Division is real division, not integer.

Inputs and Outputs

Input: cards array of 4 integers (1-9).

Output: Boolean indicating if 24 is reachable.

Data Structures

Array/list to hold current numbers.

Recursion to try all combinations.

Approach
Intuition:
This is a classic backtracking problem. With 4 numbers, we can:

Pick any two numbers.

Apply each operation (+, -, *, /) to get a new number.

Replace the two numbers with the result (now have 3 numbers).

Recurse until 1 number remains.

Check if final number ≈ 24 (with floating point tolerance).

Key points:

Must handle division by zero.

For subtraction and division, order matters: a - b vs b - a, a / b vs b / a.

Use epsilon for floating comparison (1e-9).

Steps:

Convert cards to array of floats.

Recursive function solve(nums):

If nums.length == 1: return abs(nums[0] - 24) < 1e-9.

For all pairs (i, j) where i < j:

Generate all possible results from nums[i] and nums[j]:

a + b

a - b

b - a

a * b

a / b (if b ≠ 0)

b / a (if a ≠ 0)

For each result:

Create new list without nums[i] and nums[j], add result.

Recurse.

If true, return true.

Return false if no combination works.

Edge Cases

Division by zero.

Floating point precision.

All numbers same.

Numbers that require non-intuitive grouping.

Time and Space Complexity

Time: At each step, choose 2 from m numbers → O(m²) choices, 6 operations. Total roughly O(4! * 6³) ≈ manageable.

Space: O(4) recursion depth.

Commit Message
"Solve 24 Game using backtracking with all operation permutations"
*/
/**
 * @param {number[]} cards
 * @return {boolean}
 */
var judgePoint24 = function (cards) {
  const EPSILON = 1e-9;

  // Convert to array of numbers
  let nums = cards.map(Number);

  const solve = (arr) => {
    const n = arr.length;
    if (n === 1) {
      return Math.abs(arr[0] - 24) < EPSILON;
    }

    // Try all pairs
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) continue;

        const a = arr[i];
        const b = arr[j];

        // Generate all possible results from a and b
        const possible = [];

        // Addition
        possible.push(a + b);
        // Subtraction (both orders)
        possible.push(a - b);
        possible.push(b - a);
        // Multiplication
        possible.push(a * b);
        // Division (if divisor not zero)
        if (Math.abs(b) > EPSILON) {
          possible.push(a / b);
        }
        if (Math.abs(a) > EPSILON) {
          possible.push(b / a);
        }

        // For each possible result, create new array and recurse
        for (const val of possible) {
          // Build new array without a and b, add val
          const next = [];
          for (let k = 0; k < n; k++) {
            if (k !== i && k !== j) {
              next.push(arr[k]);
            }
          }
          next.push(val);

          if (solve(next)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  return solve(nums);
};

/*
🔁 Rephrasing the problem (important)

You are given exactly 4 numbers.
You must:

Use all 4 numbers exactly once

Combine them using only: + - * /

Operations are binary only (no unary -)

Division is real division

You can use parentheses in any way

Goal: can you make the value exactly 24?

Return true if possible, otherwise false.

🧠 Key observations (before coding)
1️⃣ Order matters

Example:

(8 - 4) * (7 - 1) works

(4 - 8) * (7 - 1) does not

So permutations matter.

2️⃣ Parentheses = operation order

Parentheses mean:

Pick any two numbers

Apply an operation

Replace them with the result

Repeat until one number remains

👉 This screams DFS / backtracking

3️⃣ Floating point comparison

Due to division:

(4 / (1 - 2 / 3)) === 12


Floating errors exist → compare using epsilon, not ===.

🧩 Core strategy (classic DFS)

At each step:

Pick any two numbers a, b

Try all possible results:

a + b

a - b

b - a

a * b

a / b (if b !== 0)

b / a (if a !== 0)

Replace a and b with the result

Recurse

If at the end one number ≈ 24 → success
*/

function judgePoint24(cards) {
  const EPS = 1e-6;

  function dfs(nums) {
    // Base case: only one number left
    if (nums.length === 1) {
      return Math.abs(nums[0] - 24) < EPS;
    }

    // Pick any two numbers
    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums.length; j++) {
        if (i === j) continue;

        let next = [];

        // Keep the remaining numbers
        for (let k = 0; k < nums.length; k++) {
          if (k !== i && k !== j) next.push(nums[k]);
        }

        const a = nums[i];
        const b = nums[j];

        // Try all operations
        const candidates = [a + b, a - b, a * b];

        if (Math.abs(b) > EPS) candidates.push(a / b);

        for (let val of candidates) {
          next.push(val);
          if (dfs(next)) return true;
          next.pop();
        }
      }
    }

    return false;
  }

  return dfs(cards);
}
