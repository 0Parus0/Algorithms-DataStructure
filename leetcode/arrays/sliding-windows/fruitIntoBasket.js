/* 
You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
Given the integer array fruits, return the maximum number of fruits you can pick.

 

Example 1:

Input: fruits = [1,2,1]
Output: 3
Explanation: We can pick from all 3 trees.
Example 2:

Input: fruits = [0,1,2,2]
Output: 3
Explanation: We can pick from trees [1,2,2].
If we had started at the first tree, we would only pick from trees [0,1].
Example 3:

Input: fruits = [1,2,3,2,2]
Output: 4
Explanation: We can pick from trees [2,3,2,2].
If we had started at the first tree, we would only pick from trees [1,2].
 

Constraints:

1 <= fruits.length <= 105
0 <= fruits[i] < fruits.length
*/

function totalFruit(fruits) {
  const len = fruits.length;
  const treeMap = {};
  let start = 0,
    max = 0;
  for (let end = 0; end < len; end++) {
    let fruit = fruits[end];
    if (!treeMap[fruit]) treeMap[fruit] = 1;
    else treeMap[fruit]++;
    while (Object.keys(treeMap).length > 2 && start < len) {
      let temp = fruits[start];
      treeMap[temp]--;
      if (treeMap[temp] === 0) delete treeMap[temp];
      start++;
    }
    max = Math.max(max, end - start + 1);
  }
  return max;
}

function fruitsIntoBaskets(fruits, k) {
  let n = fruits.length;
  let start = 0, maxLen = 0, curr = 0;
  let map = new Map();
  
  for(let end = 0; end < n; end++) {
    // Expand the window
    map.set(fruits[end], (map.get(fruits[end]) || 0) + 1);

    // Shrink the window
    while(map.size > k) {
      map.set(fruits[start], map.get(fruits[start]) -1);
      if(map.get(fruits[start]) === 0) map.delete(fruits[start]);

      start++;
    }

    curr = end - start + 1;
    maxLen = Math.max(maxLen, curr);



  }
  return maxLen;
}
// let fruits = [0, 100, 600, 600, 600, 600, 600];
let fruits = [1,2,1,2,3,1,2];

console.log(fruitsIntoBaskets(fruits, 2));
