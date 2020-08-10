/**
 * ***************************
 * Reference type
 * ***************************
 */

let object1 = { value: 10};
let object2 = object1;
let object3 = { value: 10};

// console.log(object1 === object2);

/**
 * ***************************
 * context vs scope
 * ***************************
 */

class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  getData(index) {
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
    delete this.data[this.length - 1];
    this.length--;
  }
}


// const newArray = new MyArray();
// newArray.push('parus');
// newArray.push('norus');
// newArray.push('horus');
// newArray.push('chorus');
// newArray.push('khorus');


// console.log(newArray);
// console.log(newArray.data);

// // newArray.pop();
// newArray.delete(3);
// console.log(newArray.data);
// console.log(newArray);


function reverse(str) {
  if(!str || str.length < 2 || typeof str !== 'string') return;
  const backwards = [];
  const totalItems = str.length -1;
  for(let i = totalItems; i >= 0; i--) {
    backwards.push(str[i]);
  }

  return backwards.join('');
}

// const reverse2 = (str) => str.split('').reverse().join('');
const reverse2 = (str) => [...str].reverse().join('');

console.log(reverse2('In my heart'));

function mergeSortArrays(arr1, arr2) {
  const mergedArray = [];
  let arr1Item = arr1[0];
  let arr2Item  = arr2[0];
  let i = 1;
  let j = 1;

  while(arr1Item || arr2Item) {
    console.log(arr1Item, arr2Item);
    if(!arr2Item || arr1Item < arr2Item) {
      mergedArray.push(arr1Item);
      arr1Item = arr1[i];
      i++
    } else {
      mergedArray.push(arr2Item);
      arr2Item = arr2[j];
      j++;
    }
  }

  return mergedArray;
}

const arr1 = [2,3,4,9];
const arr2 = [4,5,7];

console.log(mergeSortArrays(arr1, arr2));