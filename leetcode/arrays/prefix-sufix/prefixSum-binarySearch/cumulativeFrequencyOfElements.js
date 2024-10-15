/*
Cumulative Frequency of Elements in an Array
Problem: Given an array of integers and multiple queries, where each query contains an integer x, find the number of elements in the array that are less than or equal to x.
Input: arr = [1, 3, 4, 5], queries = [3, 5]
Output: [2, 4]
Solution: Sort the array and use prefix sum to quickly compute the count for each query."
*/

function lessThanEqualTo(arr, queries) {
  let n = arr.length;
  let q = queries.length;
  let result = [];

  for (let i = 0; i < q; i++) {
    let count = 0;
    for (let j = 0; j < n; j++) {
      if (arr[j] <= queries[i]) count++;
    }
    result.push(count);
  }
  return result;
}

/* Optimize approach */
function lessThanEqualToOptimized(arr, queries) {
  arr.sort((a, b) => a - b);
  let result = [];
  for (let query of queries) {
    let low = 0;
    let high = arr.length -1;
    while (low <= high) {
      let mid = Math.floor(low + (high - low) / 2);
    //   console.log(mid, low, high, query);
      if(arr[mid] <= query){
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    result.push(low)
  }
  return result;
}

console.log(lessThanEqualToOptimized([1, 3, 4, 5], [3, 5]));
