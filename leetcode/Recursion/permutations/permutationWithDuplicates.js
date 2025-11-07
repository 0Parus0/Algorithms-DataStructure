/*
Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

 

Example 1:

Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
Example 2:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 

Constraints:

1 <= nums.length <= 8
-10 <= nums[i] <= 10
*/

function permuteUnique(nums) {
  let result = [];
  nums.sort((a, b) => a - b); // Sort the array to handle duplicates
  let visited = new Array(nums.length).fill(false);

  function helper(temp) {
    if (temp.length === nums.length) {
      result.push([...temp]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // Skip duplicates: if nums[i] is the same as nums[i-1] and the previous one has not been used in this path
      if (i > 0 && nums[i] === nums[i - 1] && !visited[i - 1]) continue;

      if (!visited[i]) {
        visited[i] = true;
        temp.push(nums[i]);
        helper(temp);
        temp.pop();
        visited[i] = false;
      }
    }
  }

  helper([]);
  return result;
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function permuteUnique1(nums) {
  let result = [];
  // nums.sort((a, b) => a - b); // Sort the array to handle duplicates // not required with the set

  function helper(index) {
    if (index === nums.length) {
      result.push([...nums]);
      return;
    }

    let used = new Set(); // To track duplicates at the current recursion level

    for (let i = index; i < nums.length; i++) {
      // If the element is already used in this recursive level, skip it
      if (used.has(nums[i])) continue;

      used.add(nums[i]); // Mark the element as used
      swap(nums, i, index); // Swap the current element with the index
      helper(index + 1); // Recurse for the next element
      swap(nums, i, index); // Backtrack by swapping back
    }
  }

  helper(0);
  return result;
}

function permuteUnique2(nums) {
  let result = [];

  function helper(index) {
    let used = new Array(21).fill(0);

    if (index === nums.length) {
      result.push([...nums]);
      return;
    }

    for (let i = index; i < nums.length; i++) {
      if (used[nums[i] + 10] === 0) {
        swap(nums, i, index);
        helper(index + 1);
        swap(nums, i, index);
        used[nums[i] + 10] = 1;
      }
    }
  }

  helper(0);
  return result;
}

console.log(permuteUnique2([1, 1, 2]));
