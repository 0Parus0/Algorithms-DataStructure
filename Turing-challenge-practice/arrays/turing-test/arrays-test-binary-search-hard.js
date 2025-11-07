/**
#Plan:

1. **Understand the problem:**
  - Give an array position of integers, representing the locations of houses along a street.
  - And an integer m which is number of routers to be place.
  - The routers must be placed in such a way that the minimum distance between any two routers is maximum.
  - Return the maximized minimum distance between distance.


2. **Break down input data & transformations:**
  - Input: 
    - An array called positions, not explicitly mentioned if it's sorted or not.
    - An integer m which is the number of the routers to be placed
  - Transformation: 
    - Sort the position array, to apply binary search on a search space.

3. **Edge cases:**
  - The position array is empty -> return 0
  - The m (number of router) is greater than position's length -> return 0
  - The m = 0 -> return 0

4. **Data structures:**
  - A sorted array (after sorting) positions
  - A start, end and mid pointers.
  - A function which will check if a solution is possible for a given distance.

5. **Approach:**
  - Sort the position array.
  - Take three pointers start = position[0] after sorting, end = position[n -1], and mid  = Math.floor((start + end) / 2)
  - Use a while loop , while start <= end
  - Check if the solution is possible, using a function possible which checks for any given mid if all the routers can be placed.
  - If true then store the result in a variable result and move the start to mid + 1
  - If false then move the end mid - 1

6. **Time & Space Complexity:**
  - Time:  
    - Sorting: O(n log n)
    - Binary search: O(log(max_distance))
    - Possible function: O(n) per binary search iteration
    - Total: O(n log n + n log(max_distance)) ~~ O(n log n);
  - Space: O(1)  Just using few pointers.

*/

// Function
function binarySearch(positions, m) {
  // Edge Case:
  if (!positions.length || m > positions.length || m === 0) return 0;
  // Step 1:  Sort the positions array
  positions = positions.sort((a, b) => a - b);
  if (m === 2) return positions[positions.length - 1] - positions[0];
  // Step 2:
  let start = 1;
  let end = positions[positions.length - 1] - positions[0];
  let result = 0;

  // Step 3: loop while start <= end
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (possible(positions, mid, m)) {
      result = Math.max(mid, result);
      // console.log(result);
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  function possible(arr, minDistance, m) {
    let lastPosition = arr[0];
    let count = 1;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] - lastPosition >= minDistance) {
        count++;
        lastPosition = arr[i];
        if (count >= m) return true;
      }
    }
    return false;
  }
  // Step 4: Return result
  return result;
}

/*

# Custom Test Cases

*/
console.log(binarySearch([1, 2, 8, 4, 9], 3)); // Expected output 3;
console.log(binarySearch([5, 4, 3, 2, 1, 100000000], 2)); // Expected output 99999999;
console.log(binarySearch([], 3)); // Expected output 0
console.log(binarySearch([2, 6, 12, 8], 0)); // Expected output 0
console.log(binarySearch([3, 8, 5], 5)); // Expected output 0

/**
Commit message:
Implement binary search to maximize minimum router distance.
- Initial Step:
  - Sorted the positions array to enable binary search on distances.
  - Initialized start = 1 (minimum possible distance) and end = max_position - min_position
- Binary search loop:
  - Used while (start <= end) to iterate over possible distances.
  - Calculated mid = Math.floor((start + end) / 2) as the candidate distance.
- Feasibility check(possible function):
  - Placed the first router at position[0].
  - Iterated through the array, counting routers placed at leas mid distance apart.
  - If count >= m, stored mid as valid result and searched for larger distances (start = mid + 1).
  - Else, discarded larger distances (end = mid - 1)
- Termination:
  - Returned the maximum valid mid found (result);
- Key Optimizations:
  - Time Complexity: O(n log n) for sorting + O(n log max_distance) for binary search
  - Space Complexity: O(1) (no extra space beyond pointers).
- Edge cases handled:
  - Early return 0 if m = 0, m > positions.length, or positions = [] 
 */
