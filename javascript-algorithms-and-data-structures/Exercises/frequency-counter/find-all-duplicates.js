/**
|--------------------------------------------------
| Frequency Counter - findAllDuplicates
Given an array of positive integers, some elements appear twice and others appear once.
Find all the elements that appear twice in this array.
Note that you can return the elements in any order.

Time Complexity - O(n)
|--------------------------------------------------
*/


function findAllDuplicates(args) {
  if(!args.length) return false;
  const result = {};
  const duplicates = [];
  for(const arg of args) {
    result[arg] = ++result[arg] || 1;
    if(result[arg] > 1) duplicates.push(arg)
  }
  
  return duplicates;
}

console.log(findAllDuplicates([5,9,0,3,45])); // []
console.log(findAllDuplicates([4, 3, 2, 1, 0, 1, 2, 3,1,4])); // array with 3, 2 and 1