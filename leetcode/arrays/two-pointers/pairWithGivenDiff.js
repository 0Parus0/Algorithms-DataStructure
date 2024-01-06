/*
Find a pair with the given difference

Given an unsorted array and a number n, find if there exists a pair of elements in the array whose difference is n. 
Examples: 

Input: arr[] = {5, 20, 3, 2, 50, 80}, n = 78
Output: Pair Found: (2, 80)

Input: arr[] = {90, 70, 20, 80, 50}, n = 45
Output: No Such Pair

Recommended Problem
Find Pair Given Difference
*/
function pairDiff(numsArr, target) {
  let ran = 0;
  numsArr = numsArr.sort((a, b) => a - b);
  let start = 0,
    end = 1;
  // we have to figure out a way so that when one of (end or start) them is increased/decreased the total diff should increase and if the other is increased or decrease the difference should be decrease.
  while (end < numsArr.length) {
    ran++;
    console.log({ start: numsArr[start], end: numsArr[end] });
    if (numsArr[end] - numsArr[start] === target)
      return [numsArr[start], numsArr[end], ran];
    if (numsArr[end] - numsArr[start] > target) {
      start++;
      //   console.log(numsArr[start]);
    } else {
      end++;
    }
    // console.log(numsArr[end]);
  }
  return [false, ran];
}

let numsArr = [2, 20, 3, 9, 50, 80];
let target = 1;
console.log(pairDiff(numsArr, target));
