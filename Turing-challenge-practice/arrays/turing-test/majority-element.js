/**
#Plan:

1. **Understand the problem:**
  - Given an integer array nums, we have to find an element which has appeared more than n/2 times where n is the length of the array.
  - Explicitly mentioned that we can assume array nums must going to have an element who's going to be there more than n/2 times.
  - Return the most appearing element. 

2. **Break down input data & transformations:**
  - Input: An integers array nums
  - Transformation: Just use two pointers one candidate, and the other count
3. **Edge cases:**
  - If array is empty return 0
  - If array has only one element return that element.
  - If the elements are negative. still return the element which is appearing more than n/2 times

4. **Data structures:**
  - An array of integers nums.
  - Two pointers count and candidate.

5. **Approach:**
  - Iterate over the array, starting from nums[0].
  - initialize a pointer count (to keep the count of the current candidates votes/appearance) to 0.
  - Initialize a pointer candidate (to null/undefined, if count is 0 and the candidate is undefined/null the current element nums[i] is going to be the candidate and count = 1)
  - If a count is 0 or more and the nums[i] is candidate then count ++ 
  -  else if the count is more than 0 but nums[i] != candidate count --
  - else count = 0 and nums[i] != candidate, candidate = nums[i] and count = 1
  - Return the candidate at the end who survives.

6. **Time & Space Complexity:**
  - Time: O(n) (we are iterating over the whole array once)
  - Space: O(1) (as we are just using two pointers)

*/

// Function
function majorityElement(nums) {
  let count = 0;
  let candidate;
  if (!nums.length) return 0;
  if (nums.length === 1) return nums[0];

  for (let num of nums) {
    if (count === 0) {
      candidate = num;
    }

    count += candidate === num ? +1 : -1;
  }

  return candidate;
}

/*

# Custom Test Cases

*/
console.log(majorityElement([3, 2, 3])); // Expected output 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Expected output 2
console.log(majorityElement([5])); // Expected output 5
console.log(majorityElement([])); // Expected output 0

/**
Commit Message:
Implement moore's voting algorithm(majority element)
 - Took two pointers count and candidate.
 - Initialize count to 0 and candidate to null/undefined. 
 - Loop over the nums array and count the appearance of the each element.
 - Returned the element with the most appearance (more than n / 2)
 
 */
