/*
Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

Example 1:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
Example 2:

Input: nums = [0,1]
Output: [[0,1],[1,0]]
Example 3:

Input: nums = [1]
Output: [[1]]
 

Constraints:

1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.
*/

function permute(nums) {
  let result = [];
  let visited = new Array(nums.length).fill(0);
  let temp = [];

  function helper(visited, temp) {
    if (visited.length === temp.length) {
      result.push([...temp]);
      return;
    }
    for (let i = 0; i < visited.length; i++) {
      if (visited[i] === 0) {
        visited[i] = 1;
        temp.push(nums[i]);
        helper(visited, temp);
        visited[i] = 0;
        temp.pop();
      }
    }
  }
  helper(visited, temp);
  return result;
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function permute2(nums) {
  let result = [];

  function helper(nums, index) {
    if (index === nums.length) {
      result.push([...nums]);
      return;
    }

    for (let i = index; i < nums.length; i++) {
      swap(nums, i, index);
      helper(nums, index + 1);
      swap(nums, i, index);
    }
  }

  helper(nums, 0);
  return result;
}

console.log(permute2([1, 2, 3]));
