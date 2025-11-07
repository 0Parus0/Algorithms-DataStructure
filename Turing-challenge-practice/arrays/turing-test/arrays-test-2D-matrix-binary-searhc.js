/**
#Plan:

1. **Understand the problem:**
  - Given a m * n matrix where m is matrix's length and n is matrix[i].length.
  - All rows of the matrix are sorted in ascending order.
  - The first integer of each row is greater than the last integer of last row (means the whole matrix is sorted).
  - Find the target element, which also is given.
  - If found then  return true else false. 

2. **Break down input data & transformations:**
  - Input:
    - An n * m matrix (where n is matrix.length and m is matrix[i].length)
    - An integer target.
  - Transformation: 
    - Consider/visualize the matrix as a sorted one-D array 
    - Which start at 0 index which is matrix[i][j] = matrix[0][0], while end at m * n - 1
3. **Edge cases:**
  - If matrix is empty return -> false (can't find anything if nothing is there)
  - If all the integers are less than target -> return false.
  - If all the integers are larger than target -> return false.
  - Either target is negative
  - Or integers in matrix are negative.

4. **Data structures:**
  - Binary Search starting from 0 index and ending at n * m - 1 index

5. **Approach:**
  - Use binary search, where start is 0th index and end = m * n - 1 index,
  - Take mid = Math.floor(start + end) / 2.
  - Check if the index mid  = target, 
  - First  we have extract the row-index, column-index using index.
  - row-index = mid / m (mid / number of columns)
  - column-index = mid % n (mid % number of columns)
  - matrix[mid] = matrix[row-index][column-index]
  - If element at mid is less than target start = mid + 1;
  - If element at mid is greater than target end = mid - 1
  - Looping while the end >= start or vice-versa. 

6. **Time & Space Complexity:**
  - Time: O(log(m * n)) (using binary search on m * n matrix)
  - Space: O(1) (no extra auxilary space is used few pointers are used)

*/

function search(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;
  let n = matrix.length;
  let m = matrix[0].length;
  if (target < matrix[0][0] || target > matrix[n - 1][m - 1]) return false;

  let start = 0; // first index
  let end = m * n - 1; // last index

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    let rowIndex = Math.floor(mid / m); // Convert mid to row index
    let colIndex = mid % m; // Convert mid to column index

    if (matrix[rowIndex][colIndex] === target) return true; // target found
    else if (matrix[rowIndex][colIndex] < target)
      start = mid + 1; // Search right half
    else end = mid - 1; // Search left half.
  }

  return false;
}

/*

# Custom Test Cases

*/
const matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60],
];
const target = 13;

const matrix2 = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ],
  target2 = 3;
// Output: true
console.log(search(matrix, target)); // Expected output false
console.log(search(matrix2, target2)); // Expected output true
console.log(
  search(
    [
      [-5, -3, -2],
      [-1, 2, 4],
      [5, 8, 9],
    ],
    -3
  )
); // Expected output true
console.log(search([], target2)); // Expected output false

/**
Commit message:
Implement binary search on a n * m matrix.
  - Took two pointers and initialized , start = 0 and end = n * m -1  
  - Used a while loop , while start <= end
  - Calculated mid = Math.floor((start + end) / 2)
  - Derived the row-index and column-index from mid
  - Checked if the matrix[row-index][column-index] === target return true,
  - Else if target > matrix[row-index][column-index] , start = mid + 1, discarded first half.
  - Else end = mid - 1, discarded 2nd half.
  - If target not found returned false.
  - Included custom test cases.
  - Checked Edge cases with custom test cases.
*/
