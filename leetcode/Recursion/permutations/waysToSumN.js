/*
Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the 
frequency
 of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

 

Example 1:

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
Example 2:

Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
Example 3:

Input: candidates = [2], target = 1
Output: []
 

Constraints:

1 <= candidates.length <= 30
2 <= candidates[i] <= 40
All elements of candidates are distinct.
1 <= target <= 40
*/

function ways1(nums, sum) {
  function helper(sum) {
    if (sum === 0) return 1; // If sum reaches 0, one valid way is found
    if (sum < 0) return 0; // If sum goes negative, this path is invalid

    let result = 0;
    for (let i = 0; i < nums.length; i++) {
      result += helper(sum - nums[i]); // Accumulate valid ways
    }

    return result;
  }

  return helper(sum);
}

function ways(nums, sum) {
  let result = 0;

  if (sum === 0) return 1;
  if (sum < 0) return 0;

  for (let i = 0; i < nums.length; i++) {
    result += ways(nums, sum - nums[i]);
  }
  return result;
}
function waysWithMemo(nums, sum) {
  let memo = new Map();

  function helper(sum) {
    if (sum === 0) return 1; // If sum reaches 0, one valid way is found
    if (sum < 0) return 0; // If sum goes negative, this path is invalid

    if (memo.has(sum)) return memo.get(sum); // Check memo for cached result

    let result = 0;
    for (let i = 0; i < nums.length; i++) {
      result += helper(sum - nums[i]); // Accumulate valid ways
    }

    memo.set(sum, result); // Store result in memo
    return result;
  }

  return helper(sum);
}

function waysBackTrack(candidates, target) {
  const result = [];
  candidates.sort((a, b) => a - b); // Sort to enable early termination

  function backtrack(start, currentSum, path) {
    if (currentSum === target) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      if (currentSum + candidates[i] > target) {
        break; // Early termination since array is sorted
      }

      path.push(candidates[i]);
      backtrack(i, currentSum + candidates[i], path);
      path.pop();
    }
  }

  backtrack(0, 0, []);
  return result;
}

console.log(ways([1, 5, 6], 7));
