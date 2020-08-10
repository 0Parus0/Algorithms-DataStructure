const strings = ['a', 'b', 'c', 'd'];

/**
|--------------------------------------------------
| Array Methods 
|--------------------------------------------------
*/

/* Array.push */

strings.push('e'); // O(1) add item('e') to the end of array

/* Array.pop */

strings.pop(); //  O(1); remove item from the end of array

/* Array.shift and Array.unshift */

strings.unshift('x'); // O(N) add item('x') to the start of array
strings.shift(); // O(N) remove item from the start of array

/* Array.splice */

strings.splice(2, 0, 'alien'); // O(N) add or remove item from an predetermined index
// console.log(strings); // [ "a", "alien", "b", "c", "d"]

// strings.splice(2, 2, 'alien'); // ["a", "b", "alien"]

// console.log(strings);


/**
|--------------------------------------------------
| How to build an array from scratch
|--------------------------------------------------
*/

class MyArray  {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  get(index) {
    return this.data[index];
  }
  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }
  pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }
  delete(index) {
    const item = this.data[index];
    this.shiftItems(index);
    return item;
  }
  shiftItems(index) {
    for (let i = index; i < this.length -1; i++) {
      this.data[i] = this.data[i+1];
    }
    delete this.data[this.length -1];
    this.length--;
  }
}

const newArray = new MyArray();
newArray.push('hi');
newArray.push('You');
newArray.push('!');
// newArray.pop();
newArray.push('are');
newArray.push('nice');

newArray.delete(2);

// console.log(newArray);

/**
|--------------------------------------------------
| Creat a function that reverses a string:
  'Hi my name is Andrei' should be  'ierdnA si eman ym iH'
|--------------------------------------------------
*/

function reverse(str) {
  if (!str.length || str.length < 2 || typeof(str) !== 'string') return;
  const strArray = str.split('');
  const reversed = [];
  for (let i = strArray.length - 1; i >= 0; i--) {
    reversed.push(strArray[i]);
  }
  return reversed.join('');
}


function reverse1(str) {
  if (!str.length || str.length < 2 || typeof(str) !== 'string') return;
  const reversed = [];
  for (let i = str.length - 1; i >= 0; i--) {
    reversed.push(str[i]);
  }
  return reversed.join('');
}

function reverse2(str) {
  if (!str.length || str.length < 2 || typeof(str) !== 'string') return;
  return str.split('').reverse().join('');
}

const reversed = str => str.split('').reverse().join('');
const reversed1 = str => [...str].reverse().join('');

console.log(reversed1('Hi my name is Andrei'));
console.log(reversed1('ierdnA si eman ym iH'));

/**
|--------------------------------------------------
| Merge sorted arrays
|--------------------------------------------------
*/

function mergeSortedArrays(arr1, arr2) {
  if(!arr1.length && !arr2.length ) return 'Please two arrays with items in them';
  if(!arr1.length) return arr2;
  if(!arr2.length) return arr1;
  for (let item of arr2) {
    arr1.push(item);
  }
  arr1.sort((a,b) => {
    if(a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }else {
      return 0
    }
  });
  return arr1;
}

// console.log(mergeSortedArrays([0,1,5,8], [4,6,9]));
// console.log(mergeSortedArrays(['a','l','m','t'], ['g','k','s']));
// console.log(mergeSortedArrays(['123', 'abc', 'lst'], ['012', 'cde','lmn']));
// console.log(mergeSortedArrays([], []));

function mergeSortedArrays2(arr1, arr2) {
  if(!arr1.length && !arr2.length ) return 'Please two arrays with items in them';
  if(!arr1.length) return arr2;
  if(!arr2.length) return arr1;
  const mergedArray = [];
  let array1Item = arr1[0];
  let array2Item = arr2[0];
  let i = 1;
  let j = 1;

  while(array1Item || array2Item) {
    if(!array2Item || array1Item < array2Item) {
      mergedArray.push(array1Item)
      array1Item = arr1[i]
      i++
    } else {
      mergedArray.push(array2Item)
      array2Item = arr2[j]
      j++
    }
  }

  return mergedArray;
}


console.log(mergeSortedArrays2([0,1,5,8], [4,6,9]));
console.log(mergeSortedArrays2(['a','l','m','t'], ['g','k','s']));
console.log(mergeSortedArrays2(['123', 'abc', 'lst'], ['012', 'cde','lmn']));
console.log(mergeSortedArrays2([], []));