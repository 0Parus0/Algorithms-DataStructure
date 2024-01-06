/**
|--------------------------------------------------
| Write a function which takes in a string and returns counts of each character in the string.
* charCount("aaaa");
{ a: 4}

* charCount("hello");
{
  h:1,
  e:1,
  l:2,
  o:1
}

|--------------------------------------------------
*/


function charCount(str) {
  /**
  |--------------------------------------------------
  | do something 
  * return an object with keys that are lowercase alphanumeric in the string ; 
  * values should be the number of times the or counts for those characters
  |--------------------------------------------------
  */
}

function charCount(str) {
  /**
  |--------------------------------------------------
  * make an object to return at the end
  * loop over string for each character
    * if the char is a number/letter AND is a key in object, add one to count
    * if the char is a number/letter AND is not in object, add it the object and set value to 1   
    * if char is something else (space, period, etc.) don't do anything
  * return object at the end
  |--------------------------------------------------
  */
}

function charCount1(str) {
  let result = {};
  for (let i = 0; i < str.length; i++) {
    let char = str[i].toLowerCase();
    if(result[char] > 0 ) {
      result[char]++;
    } else {
      result[char] = 1;
    }
  }
  return result;
}

// console.log(charCount1('hello'));
// console.log(charCount1('hi there'));
// console.log(charCount1('Hi there'));

function charCount2(str) {
  let result = {};
  for ( let i = 0; i < str.length; i++) {
    let char = str[i].toLowerCase();
    if(/[a-z0-9]/.test(char)) {
      if(result[char] > 0) {
        result[char]++;
      } else {
        result[char] = 1;
      }
    }
  }
  return result;
}


// console.log(charCount2('hello'));
// console.log(charCount2('hi there'));
// console.log(charCount2('Hi there'));


function charCount3(str) {
  let result = {};
  for(let char of str) {
    char = char.toLowerCase();
    if(/[a-z0-9]/.test(char)) {
      if(result[char] > 0 ) {
        result[char]++;
      } else {
        result[char] = 1;
      }
    }
  }
  return result;
}


// console.log(charCount3('hello'));
// console.log(charCount3('hi there'));
// console.log(charCount3('Hi there!!!#$%'));



function isAlphaNumeric(char) {
  let code = char.charCodeAt(0);
  if ( !(code > 47 && code < 58) && // numeric(1-9)
       !(code > 64 && code < 91) && // uppercase alphabets(A-Z)
       !(code > 96 && code < 123)) { // lowercase alphabets(a-z)
         return false;
       }
       return true;
}



function charCount4(str) {
  let result = {};
  for(let char of str) {
    if(isAlphaNumeric(char)) {
      char = char.toLowerCase();
      result[char] = ++result[char] || 1;
    }
  }
  return result;
};


// console.log(charCount4('hello'));
// console.log(charCount4('hi there'));
console.log(charCount4('Hi there!!!#$%'));
