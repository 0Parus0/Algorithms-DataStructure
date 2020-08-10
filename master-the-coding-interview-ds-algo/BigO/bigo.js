/**
|--------------------------------------------------
******** Rule Book *********
*** Big O Time Complexity ***

* Worst Case
* Remove constants
* Different terms for input
* Drop Non Dominants
* Different inputs should have different variables =>> O(a + b)
* for steps in order add =>> O(a + b)
* for nested steps multiply =>> O(a * b)

*** Big O Space complexity ***
* What causes space complexity
* Variables 
* Data Structures
* Function Calls
* Allocations

|--------------------------------------------------
*/

const nemo = ['nemo'];

const everyOne = ['dory', 'bruce', 'marlin', 'nemo', 'gill', 'bloat', 'nigel','squirt', 'darla', 'hank'];

const large = new Array(100000).fill('nemo')

function findNemo(arr) {
  let t0 = performance.now();
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === 'nemo') {
      console.log(i, 'Found nemo');
    }
  }
  let t1 = performance.now()
  console.log(`Call to find Nemo took ${(t1 - t0) / 1000} seconds`);
}

// findNemo(large);

function funChallenge(input) {
  let a = 10; // O(1)
  a = 50 + 3; // O(1)
  for (let i = 0; i < input.length; i++) { // O(n)
    // anotherFunction(); // O(n)
    let stranger = true;// O(n)
    a++ // O(n)
  }
  return a; // O(1)
}

// BigO - (3 + 4n) =>> (n)

function anotherFunChallenge(input) {
  let a = 5; // O(1)
  let b = 10; // O(1)
  let c = 50; // O(1)
  for (let i = 0; i < input; i++) { // O(n)
    let x = i + 2; // O(n)
    let y = i + 3; // O(n)
    let z = i + 1; // O(n)
  }

  for (let j = 0; j < input; j++) { // O(n)
    let p = j * 2; // O(n)
    let q = j * 3; // O(n)
  }

  let whoAmI = 'I do not know'; // O(1)
}

// BigO(n)

function printFirstItemThenFirstHalfThenSayHi100times(items){
  console.log(items[0]); // O(1)

  let middleIndex = Math.floor((items.length + 1) / 2); // O(1)
  let index = 0 ; // O(1)

  while( index < middleIndex) { // O(n/2)
    console.log(items[index]); // O(n/2)
    index++; // O(n/2)
  };

  for( let i = 0; i < 100; i++) { // O(100)
    console.log('Hi');// O(100)
  };

};

// BigO ==>=>> 0(n)

// printFirstItemThenFirstHalfThenSayHi100times('12345');

// console.log(funChallenge('1234567809'));


/* Log all pairs of array */

const arr = [1,2,3,4,5,6];

function allPairs(arr) {
  
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr.length; j++){
      console.log(arr[i], arr[j]);
    }
  }
}

// BigO O(n^2)

// allPairs(arr);

function printAllNumbersThenAllPairSums(numbers) {
  console.log('These are the numbers');
  numbers.forEach(number => console.log(number));

  console.log('These are their sums');
  numbers.forEach(firstNumber => {
    numbers.forEach(secondNumber => {
      console.log(firstNumber + secondNumber);
    });
  });
};

// printAllNumbersThenAllPairSums([1,2,3,4]); // O(n^2) =>> O(n^2+3n+100+n/2) =>> O(n^2)

/* Space Complexity */

function boo(arr) {
  for (let i = 0; i < arr.length; i++) { // only creating a single variable "i" 
    console.log('booo');
  }
}

boo([1,2,3,4]); // space complexity would be O(1);

function arrayOfHiNTimes(arr) {
  let hiArray = [];
  for (let i = 0; i < arr.length; i++) { 
    hiArray[i] = 'hi'; // adding hi to hiArray for each iteration so O(n) space complexity
  }
  return hiArray;
}

console.log(arrayOfHiNTimes([1,2,3,4,5]));