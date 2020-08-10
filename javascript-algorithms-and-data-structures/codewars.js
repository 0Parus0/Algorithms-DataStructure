
// function toCamelCase(str){
//   if(!str)return'';
//   const strArray = str.split('-');
//   if(strArray.length === 1) {
//     strArray = str.split('_');
//   }
//   let result = [];
//   result.push(strArray[0]);
//   for(let i = 1; i < strArray.length; i++) {
//     let str = strArray[i].slice(1);
//     let capital = strArray[i][0].toUpperCase()
//     result.push(capital.concat(str))
//   }
//   return result.join('');
 
// }

function toCamelCase(str){
  return str.replace(/[_-]\w/gi, ch => {
    console.log(ch[1].toUpperCase());
    return ch[1].toUpperCase();
  });
}

// console.log(toCamelCase("the-stealth-warrior"));
// console.log(toCamelCase(""));

let anyStr = 'Mozilla';
let subAny = anyStr.substring(0);
// let subAny = anyStr.substr(0); // above both are same
// but substr takes (initialIndex, numberOfCharacters)
// while substring takes (initialIndex, upToIndex'that is not included')
// console.log(subAny === anyStr); // true


let anyArr = [1, 3, 4];
let conArr = anyArr.concat();
// conArr.push('Some thing new');

// console.log(conArr);
// console.log(conArr === anyArr); // false


var moveZeros = function (arr) {
  
  let temp;
  for(let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
    if(arr[i] === 0) {
      temp = arr.splice(i,1);
      arr.push(temp[0]);
    }
  }
  return arr;
}



// console.log(moveZeros([false,1,0,1,2,0,1,3,"a"]));
// console.log(moveZeros([9,0,9,1,2,1,1,3,1,9,0,0,9,0,0,0,0,0,0,0]));
// console.log(moveZeros(["a",0,"b","c","d",1,1,3,1,9,0,0,9,0,0,0,0,0,0,0]));
// console.log(moveZeros(["a",0,"b",null,"c","d",1,false,1,3,[],1,9,0,{},0,9,0,0,0,0,0,0,0]));
// console.log(moveZeros([0,1,null,2,false,1,0]))

/* ******************************************************** */



// function list(names){
//   if(!names.length) return '';
//   if(names.length === 1) return names[0].name;
//   if(names.length === 2) return names[0].name + ' & ' + names[1].name;
//   let lastName = ' & '+names[names.length -1].name 
//   let newNames = []
//   for(let i = 0; i < names.length -1; i++) {
//     newNames.push( names[i].name);
//   }
//   newNames = newNames.join(',');
//   newNames = newNames.concat(lastName);
//   return newNames;
// }

// console.log(list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ]));
// returns 'Bart, Lisa & Maggie'

// console.log(list([ {name: 'Bart'}, {name: 'Lisa'} ]))
// returns 'Bart & Lisa'

// console.log(list([ {name: 'Bart'} ]));
// returns 'Bart'

// console.log(list([]))
// returns ''

function list(names){
  return names.reduce(function(prev, current, index, array){
    // console.log(prev);
    if (index === 0){
      return current.name;
    }
    else if (index === array.length - 1){
      return prev + ' & ' + current.name;
    } 
    else {
      return prev + ', ' + current.name;
    }
  }, '');
 }

// console.log(list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'}, {name: 'Maggie'} ]));

/* ******************************************************** */


/**
 * Write a function that takes in a string of one or more words, and returns the same string, but with all five or more letter words reversed (Just like the name of this Kata). Strings passed in will consist of only letters and spaces. Spaces will be included only when more than one word is present.

Examples: spinWords( "Hey fellow warriors" ) => returns "Hey wollef sroirraw" spinWords( "This is a test") => returns "This is a test" spinWords( "This is another test" )=> returns "This is rehtona test"
*/




function spinWords(str) {

  function reverse(str) {
    let result = [];
    let strArr = str.split('');
    let i = 0;
    let j = strArr.length -1;
    let temp;
    while(i <= j) {
      temp = strArr[i];
      strArr[i] = strArr[j];
      strArr[j] = temp;
      i++;
      j--;
    }
    return strArr.join('');
  }

  let wordArr = str.split(' ');

  for(let i = 0; i < wordArr.length; i++ ) {
    if(wordArr[i].length >= 5) {
      wordArr[i] = reverse(wordArr[i]);
    }
  }
  return wordArr.join(' ');
}

// console.log(spinWords("Welcome"));
// console.log(spinWords('Hey fellow warriors'));
// console.log(spinWords('This is a test'));
// console.log(spinWords('This is another test'));
// console.log(spinWords('You are almost to the last test'));
// console.log(spinWords('Just kidding there is still one more'));
// console.log(spinWords('Seriously this is the last one'));

/* ******************************************************** */

/**
 * Write a function toWeirdCase (weirdcase in Ruby) that accepts a string, and returns the same string with all even indexed characters in each word upper cased, and all odd indexed characters in each word lower cased. The indexing just explained is zero based, so the zero-ith index is even, therefore that character should be upper cased.

The passed in string will only consist of alphabetical characters and spaces(' '). Spaces will only be present if there are multiple words. Words will be separated by a single space(' ').

Examples:
toWeirdCase( "String" );//=> returns "StRiNg"
toWeirdCase( "Weird string case" );//=> returns "WeIrD StRiNg CaSe"
 */

 function toWeirdCase(str) {
   function changeCase(str) {
     const arr = str.split('');
     for(let i = 0; i < arr.length; i++) {
       if( i % 2 === 0) {
         arr[i] = arr[i].toUpperCase();
       } else {
         arr[i] = arr[i].toLowerCase();
       }
     }
     return arr.join('');
   }
   let strArr = str.split(' ');
   for(let i = 0; i < strArr.length; i++) {
    strArr[i] = changeCase(strArr[i]);
   }
   return strArr.join(' ');
 }

 console.log(toWeirdCase('String'));
 console.log(toWeirdCase('This is a test'));
//  console.log(toWeirdCase('String New'));
//  console.log(toWeirdCase('String New'));
//  console.log(toWeirdCase('String New'));
//  console.log(toWeirdCase('String New'));
//  console.log(toWeirdCase('String New'));

// function solution(input, markers) {
//   const lines = input.split('\n');
//   console.log(lines)
//   return lines.map(line => {
//     return markers.reduce((line, marker) => {
//       // console.log(marker, line);
//       return line.split(marker, 1)[0].trimRight()
//     }, line)
//   }).join('\n') ;
// }

// const solution = (input, markers) => {
//   const lines = input.split("\n");
//   // console.log(lines);
//   const newLines =  lines.map(line => {
//     // console.log(line);
//     return  markers.reduce((line, marker) => {
//       // console.log(line, marker)
      
//       return line.split(marker, 1)[0].trimRight()
//     }, line)  
//   })   
//   console.log(newLines);
//   return newLines.join("\n");  
// }


function solution(input, markers)
{
  var lines = input.split("\n");
  for (var i = 0; i < lines.length; ++i)
    for (var j = 0; j < markers.length; ++j)
      lines[i] = lines[i].split(markers[j])[0].trim();
  return lines.join("\n");
}

// console.log(solution("apples, plums % and bananas\npears\noranges !applesauce", ["%", "!"]));

function permutations(string) {
  if (string.length < 2) return string; // This is our break condition

  var anagrams = []; // This array will hold our anagrams
  for (var i = 0; i < string.length; i++) {
    var char = string[i];

    // Cause we don't want any duplicates:
    if (string.indexOf(char) != i) // if char was used already
      continue; // skip it this time

    var remainingString = string.slice(0, i) + string.slice(i + 1, string.length); //Note: you can concat Strings via '+' in JS

    for (var subPermutation of permutations(remainingString))
      anagrams.push(char + subPermutation)
  }
  return anagrams;
}

// console.log(permutations('abcd'))

// function *permute(a, n = a.length) {
//   if (n <= 1) yield a.slice();
//   else for (let i = 0; i < n; i++) {
//     yield *permute(a, n - 1);
//     const j = n % 2 ? 0 : i;
//     [a[n-1], a[j]] = [a[j], a[n-1]];
//   }
// }

// console.log(Array.from(permute("abc".split(''))))
// // .map(perm => perm.join(''))
// // .filter((el, idx, self) => (self.indexOf(el) === idx)));


/**
 * Write a function that when given a URL as a string, parses out just the domain name and returns it as a string. For example:
*/

function domainName(url){
  url = url.replace("https://", '');
  url = url.replace("http://", '');
  url = url.replace("www.", '');
  return url.split('.')[0];
};




console.log(domainName("http://github.com/carbonfive/raygun")) // == "github" 
console.log(domainName("http://www.zombie-bites.com")) // == "zombie-bites"
console.log(domainName("https://www.cnet.com")) // == "cnet"

console.log(domainName("www.xakep.ru"))


