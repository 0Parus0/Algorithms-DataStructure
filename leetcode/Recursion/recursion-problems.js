function reverse (str) {
  if(str.length <= 1) return str;
  return reverse(str.slice(1)) + str[0];


}

// console.log(reverse('somestring'));

function isPalindrome(str) {
  if(str.length === 1) return true;
  if(str.length === 2) return str[0] === str[1];
  if(str[0] === str.slice(-1)) return isPalindrome(str.slice(1, -1));
  return false;
}

// console.log(isPalindrome('sas'));
// console.log(isPalindrome('someemos'));


function someRecursive(array, callback) {
  if(array.length === 0) return false;
  if(callback(array[0])) return true;
  return someRecursive(array.slice(1), callback);
}

function print(val) {
  console.log('Called with', val);
  val + 2;
}


// console.log(someRecursive([3,2,1], print))


function flatten(oldArray) {
  let newArray = [];
  for(let i = 0; i < oldArray.length; i++) {
    if(Array.isArray(oldArray[i])) {
      newArray = newArray.concat(flatten(oldArray[i]))
    } else {
      newArray.push(oldArray[i]);
    }
    
  }
  return newArray;
}

const arr = [[1,2], [3,4],5 ];

// console.log(flatten(arr));

function capitalizeWords (arr) {
  if(arr.length === 1) return [arr[0].toUpperCase()];
  let res = capitalizeWords(arr.slice(0, -1));
  console.log('slice:',arr.slice(arr.length - 1), 'res:' ,res);
  // res.push(arr.slice(arr.length -1)[0].toUpperCase());
  // return res;
}

// console.log(capitalizeWords(['someword', 'someotherword', 'somenewword']))


function countDown(n) {
  if(n <= 0) {
    console.log('Hooray');
    return
  }
  console.log(n)
  countDown(n - 1);
}

console.log(countDown(4));

