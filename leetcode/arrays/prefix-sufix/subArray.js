/*
What is a Subarray?
A subarray is a contiguous part of array, i.e., Subarray is an array that is inside another array.

In general, for an array of size n, there are n*(n+1)/2 non-empty subarrays.

For example, Consider the array [1, 2, 3, 4], There are 10 non-empty sub-arrays. The subarrays are:

(1), (2), (3), (4), 
(1,2), (2,3), (3,4), 
(1,2,3), (2,3,4), and 
(1,2,3,4)

What is a Subsequence?
A subsequence is a sequence that can be derived from another sequence by removing zero or more elements, without changing the order of the remaining elements.

More generally, we can say that for a sequence of size n, we can have (2^n – 1) non-empty sub-sequences in total.

For the same above example, there are 15 sub-sequences. They are:

(1), (2), (3), (4), 
(1,2), (1,3),(1,4), (2,3), (2,4), (3,4), 
(1,2,3), (1,2,4), (1,3,4), (2,3,4), 
(1,2,3,4). 



*/
function printSubarray(arr) {
  let ans = [];
  let n = arr.length;
  for (let startPoint = 0; startPoint < n; startPoint++) {
    for (let endPoint = startPoint; endPoint < n; endPoint++) {
      //   ans.push([startPoint, endPoint]);
      let arrToPush = [];
      for (let i = startPoint; i <= endPoint; i++) {
        arrToPush.push(arr[i]);
      }
      ans.push(arrToPush);
    }
  }
  return ans;
}

console.log(printSubarray([1, 2, 3, 4]));
