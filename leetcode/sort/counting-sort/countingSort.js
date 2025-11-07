/**
 * Counting Sort Implementation
 * Works best when the range of numbers (max - min) is not too large
 * relative to the number of elements in the array.
 *
 * @param {number[]} arr - The input array of integers
 * @returns {number[]} - Sorted array
 */
function countingSort(arr) {
  if (arr.length === 0) return [];

  // Step 1: Find min and max values in the array
  let min = Math.min(...arr);
  let max = Math.max(...arr);

  // Step 2: Initialize the count array
  // Its size will be (max - min + 1) so it can hold all possible values in range
  let count = new Array(max - min + 1).fill(0);

  // Step 3: Store frequency of each element
  for (let num of arr) {
    count[num - min]++; // offset by 'min' to handle negative numbers as well
  }

  // Step 4: Convert count array into prefix sum (cumulative count)
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  // Step 5: Build the output array (same size as input)
  let output = new Array(arr.length);

  // Important: Traverse input array in reverse to keep the sort stable
  for (let i = arr.length - 1; i >= 0; i--) {
    let num = arr[i];
    count[num - min]--; // reduce count to get correct index
    let position = count[num - min];
    output[position] = num;
  }

  return output;
}

// Example usage
console.log(countingSort([4, 2, 2, 8, 3, 3, 1])); // [1, 2, 2, 3, 3, 4, 8]
console.log(countingSort([-5, -10, 0, -3, 8, 5, -1, 10])); // [-10, -5, -3, -1, 0, 5, 8, 10]
