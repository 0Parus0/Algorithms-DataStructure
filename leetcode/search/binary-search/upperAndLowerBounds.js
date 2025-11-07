/* 🔹 Lower Bound (first index where element ≥ target) 
* 🔹 Lower Bound

  The lower bound gives the first index at which a given target can be inserted without violating the sorted order — i.e.,
  the index of the first element ≥ target.

  Example:

  arr = [1, 2, 4, 4, 5];
  target = 4;
  lowerBound = 2; // first index where 4 could appear (arr[2] = 4)
*/
function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length; // right is exclusive (search range: [left, right))

  // Continue until search space collapses to a single point
  while (left < right) {
    const mid = Math.floor((left + right) / 2); // midpoint of current range

    // If middle element is smaller than target,
    // target must be on the right side of mid
    if (arr[mid] < target) {
      left = mid + 1;
    }
    // Otherwise, mid could be the first >= target,
    // so we keep mid in the search space by moving 'right' to 'mid'
    else {
      right = mid;
    }
  }

  // When loop ends, 'left' is the first index where arr[left] >= target
  return left;
}

// Examples
const arr = [1, 2, 3, 3, 3, 5, 7];
console.log(lowerBound(arr, 3)); // 2 (first occurrence of 3)
console.log(lowerBound(arr, 4)); // 5 (where 4 would be inserted)
console.log(lowerBound(arr, 0)); // 0
console.log(lowerBound(arr, 8)); // 7

/* Upper Bound (first index where element > target) */
/* 
* 🔹 Upper Bound

  The upper bound gives the first index at which a value greater than the target appears —
  i.e., the index of the first element > target.

  Example:

  arr = [1, 2, 4, 4, 5];
  target = 4;
  upperBound = 4; // first element > 4 is at index 4 (arr[4] = 5)

*/

function upperBound(arr, target) {
  let left = 0;
  let right = arr.length; // exclusive
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

// Examples
const arr1 = [1, 2, 3, 3, 3, 5, 7];
console.log(upperBound(arr1, 3)); // 5 (first element > 3)
console.log(upperBound(arr1, 4)); // 5
console.log(upperBound(arr1, 0)); // 0
console.log(upperBound(arr1, 8)); // 7

/*
Key Differences
Function	Returns	Use Case
lowerBound	First index where element ≥ target	Find first occurrence or insertion point
upperBound	First index where element > target	Find position after last occurrence
Time Complexity
Time: O(log n)

Space: O(1)

*/

function findRange(arr, target) {
  const lower = lowerBound(arr, target);
  const upper = upperBound(arr, target);

  return {
    lowerBound: lower,
    upperBound: upper,
    found: lower < upper, // true if target exists
    count: upper - lower, // number of occurrences
    range: [lower, upper - 1], // inclusive range of indices
  };
}

// Example usage
const arr2 = [1, 2, 3, 3, 3, 5, 7];
console.log(findRange(arr, 3));
// Output: { lowerBound: 2, upperBound: 5, found: true, count: 3, range: [2, 4] }

console.log(findRange(arr, 4));
// Output: { lowerBound: 5, upperBound: 5, found: false, count: 0, range: [5, 4] }

function lowerBoundWithComparator(arr, target, comparator = (a, b) => a - b) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (comparator(arr[mid], target) < 0) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

function upperBoundWithComparator(arr, target, comparator = (a, b) => a - b) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (comparator(arr[mid], target) <= 0) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

// Example with objects
const objects = [
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 },
  { id: 4, value: 30 },
  { id: 5, value: 40 },
];

const target = { value: 30 };
const comparator = (a, b) => a.value - b.value;

console.log(lowerBoundWithComparator(objects, target, comparator)); // 2
console.log(upperBoundWithComparator(objects, target, comparator)); // 4
