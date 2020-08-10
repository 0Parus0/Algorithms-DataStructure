/**
|--------------------------------------------------
* Coding Exercise 4: Frequency Counter / Multiple Pointers - areThereDuplicates
*Implement a function called, areThereDuplicates which accepts a variable number 
of arguments, and checks whether there are any duplicates among the arguments passed in.
* Solve it using frequency counter pattern OR the multiple pointers pattern
* areThereDuplicates(1,2,3) // false
* areThereDuplicates(1,2,2) // true
* areThereDuplicates('a', 'b', 'c', 'a') // true

* Restrictions:
* Time - O(N)
* Space - O(N)
* Bonus:
* Time - O(N)
* Space - O(1)
|--------------------------------------------------
*/

/* Using Frequency Counter Pattern */

function areThereDuplicatesFC(...args) {
  let obj = {};
  
  for (let val of args) {
    obj[val] = (obj[val] || 0) + 1;
  }
  for (let key in obj) {
    if(obj[key] !== 1) return true;
  }
  return false;
};

console.log(areThereDuplicatesFC(1,2,3));
console.log(areThereDuplicatesFC(1,2,2));
console.log(areThereDuplicatesFC('a', 'b', 'c','a'));

/* Using Multiple Pointers pattern */

function areThereDuplicatesMP(...args) {
  console.log(args);

  /* Two Pointers */
  args.sort((a,b) => {
    if(a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
  console.log(args);
  let start = 0;
  let next = 1;

  while(next < args.length) {
    if(args[start] === args[next]) return true;
    start++;
    next++;
  }
  return false;
}

/**
|--------------------------------------------------
| Best Solution
|--------------------------------------------------
*/

function areThereDuplicatesNew(...args) {
  if(!args.length) return false;
  const result = {};

  for( const arg of args) {
    if(result[arg]) return true;
    result[arg] = 1;
  }
  return false
}


console.log('New',areThereDuplicatesNew(1,2,3));
console.log('New',areThereDuplicatesNew(2,2,1,4,5));
console.log('New',areThereDuplicatesNew('a', 'b', 'c','a'));