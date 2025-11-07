/*
932. Beautiful Array
Medium
Topics
premium lock iconCompanies

An array nums of length n is beautiful if:

    nums is a permutation of the integers in the range [1, n].
    For every 0 <= i < j < n, there is no index k with i < k < j where 2 * nums[k] == nums[i] + nums[j].

Given the integer n, return any beautiful array nums of length n. There will be at least one valid answer for the given n.

 

Example 1:

Input: n = 4
Output: [2,1,4,3]

Example 2:

Input: n = 5
Output: [3,1,2,5,4]

 

Constraints:

    1 <= n <= 1000
*/

/*
Approach

    Base Case: If n is 1, return [1].

    Recursive Construction:

        Left Half: Recursively construct the beautiful array for the first (n + 1) // 2 elements. This corresponds to the number of odd numbers in the range [1, n]. Each element in this half is transformed to 2 * x - 1 to generate the actual odd numbers.

        Right Half: Recursively construct the beautiful array for the next n // 2 elements. This corresponds to the number of even numbers in the range [1, n]. Each element in this half is transformed to 2 * x to generate the actual even numbers.

    Combination: Concatenate the transformed left half (odds) and the transformed right half (evens). This array is beautiful because:

        The left and right halves themselves are beautiful by recursion.

        Any triplet spanning both halves cannot have the middle element as the average due to the parity difference (odd + even = odd, while twice any integer is even).

*/

function beautifulArray(n) {
  if (n === 1) {
    return [1];
  }
  const left = beautifulArray(Math.floor((n + 1) / 2));
  //   console.log({ left });
  const right = beautifulArray(Math.floor(n / 2));

  //   console.log({ right });
  return [...left.map((x) => 2 * x - 1), ...right.map((x) => 2 * x)];
}

function beautifulArrayM(n, memo = new Map()) {
  if (memo.has(n)) return memo.get(n);

  if (n === 1) {
    memo.set(1, [1]);
    return [1];
  }

  const left = beautifulArray(Math.floor((n + 1) / 2), memo);
  const right = beautifulArray(Math.floor(n / 2), memo);

  const result = [...left.map((x) => 2 * x - 1), ...right.map((x) => 2 * x)];

  memo.set(n, result);
  return result;
}

/*
Explanation

    Base Case Handling: When n is 1, the function returns [1] immediately.

    Recursive Calls:

        left is the beautiful array for the first (n + 1) // 2 elements, which are the odds.

        right is the beautiful array for the next n // 2 elements, which are the evens.

    Transformation and Combination:

        The left array is transformed by mapping each element x to 2 * x - 1 to get the actual odd numbers.

        The right array is transformed by mapping each element x to 2 * x to get the actual even numbers.

        The two transformed arrays are concatenated using the spread operator to form the final beautiful array.

This approach efficiently constructs the beautiful array by leveraging recursion and the properties of odd and even numbers, ensuring the condition is met at every step. The time complexity is O(n log n) due to the recursive splitting, which is efficient for n up to 1000.
*/
// console.log(beautifulArrayM(9));
console.log(beautifulArrayM(15));
