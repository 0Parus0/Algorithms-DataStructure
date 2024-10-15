/*
Given an array arr[] of N strings, the task is to sort these strings according to the numbers of vowels in them.

Examples: 

Input: arr[] = { “geeks”, “for”, “coding” } 
Output: for, coding, geeks 
for -> o = 1 vowel 
coding -> o, i = 2 vowels 
geeks -> e, e = 2 vowels

Input: arr[] = { “lmno”, “pqrst”, “aeiou”, “xyz” } 
Output: pqrst, xyz, lmno, aeiou  


Approach: The idea is to store each element with its number of vowels in a vector pair and then sort all the elements of the vector according to the number of vowels stored. Finally, print the strings in order.

Below is the implementation of the above approach:  
*/

// Function to count the number of vowels in a word
function count_vowels(word) {
  // A string of all vowels
  const vowels = "aeiouAEIOU";
  //   let arr = Array.from(word);
  //   let filteredArr = arr.filter((char) => vowels.includes(char));
  //   console.log(filteredArr);

  //   Return the count of vowels in the word
  return Array.from(word).filter((c) => vowels.includes(c)).length;
}

// console.log(count_vowels("cbcefgh"));

// Function to sort a list of strings based on the number of vowels in each string
function sort_strings(strings) {
  // Sort the list of strings based on the number of vowels in each string
  return strings.sort((a, b) => count_vowels(a) - count_vowels(b));
}

// Main function
const strings = ["lmno", "pqrst", "aeiou", "xyz"]; // Input list of strings
const sorted_strings = sort_strings(strings); // Sort the list of strings
// console.log(sorted_strings); // Print the sorted list of strings

// This code is contributed by princekumaras

/*
2785. Sort Vowels in a String
Medium
Topics
Companies
Hint
Given a 0-indexed string str, permute str to get a new string t such that:

All consonants remain in their original places. More formally, if there is an index i with 0 <= i < str.length such that str[i] is a consonant, then t[i] = str[i].
The vowels must be sorted in the nondecreasing order of their ASCII values. More formally, for pairs of indices i, j with 0 <= i < j < str.length such that str[i] and str[j] are vowels, then t[i] must not have a higher ASCII value than t[j].
Return the resulting string.

The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in lowercase or uppercase. Consonants comprise all letters that are not vowels.

 

Example 1:

Input: str = "lEetcOde"
Output: "lEOtcede"
Explanation: 'E', 'O', and 'e' are the vowels in str; 'l', 't', 'c', and 'd' are all consonants. The vowels are sorted according to their ASCII values, and the consonants remain in the same places.
Example 2:

Input: str = "lYmpH"
Output: "lYmpH"
Explanation: There are no vowels in str (all characters in str are consonants), so we return "lYmpH".
 

Constraints:

1 <= str.length <= 105
str consists only of letters of the English alphabet in uppercase and lowercase.
*/
// console.log(sortVowels("lyMPH"));
// console.log(sortVowels("aeipouABC"));

function sortVowelsOld(str) {
  /* To store lowercase letters count */
  let lowAlpha = Array.from({ length: 26 }, () => 0);
  /* To store uppercase letters count */
  let upAlpha = Array.from({ length: 26 }, () => 0);
  let result = "";

  for (let i = 0; i < str.length; i++) {
    // lower a e i o u
    let lowerVowels = "aeiou";
    let upperVowels = "AEIOU";
    if (lowerVowels.includes(str[i])) {
      let charCode = str[i].charCodeAt() - "a".charCodeAt();
      lowAlpha[charCode]++;
      result = result + "#";
    } else if (upperVowels.includes(str[i])) {
      let charCode = str[i].charCodeAt() - "A".charCodeAt();
      upAlpha[charCode]++;
      result = result + "#";
    } else result = result + str[i];
  }

  //   console.log(result);

  let vowels = "";
  // uppercase vowels first
  for (let i = 0; i < 26; i++) {
    let char = "A".charCodeAt() + i;
    while (upAlpha[i]) {
      vowels += String.fromCharCode(char);
      upAlpha[i]--;
    }
  }

  // lowercase vowels
  for (let i = 0; i < 26; i++) {
    let char = "a".charCodeAt() + i;
    while (lowAlpha[i]) {
      vowels += String.fromCharCode(char);
      lowAlpha[i]--;
    }
  }

  let newResult = "";

  let first = 0,
    second = 0;
  while (second < vowels.length || first < result.length) {
    if (result[first] === "#") {
      newResult += vowels[second];
      second++;
    } else {
      newResult += result[first];
    }

    console.log(newResult);
    first++;
  }
  //   console.log(result, newResult);
  return vowels.length ? newResult : result;
}


function sortVowels1(str){
  let n = str.length;
  let upperCount = new Array(26).fill(0);
  let lowerCount = new Array(26).fill(0);

  let lowerVowels = 'aeiou';
  let upperVowels = 'AEIOU';

  let result = [];
  for(let i = 0; i < n; i++){
    if(lowerVowels.includes(str[i] )){
      let index = str[i].charCodeAt() - 97;
      lowerCount[index] += 1;
      result.push('#');
    }
    else if(upperVowels.includes(str[i])){
      let index = str[i].charCodeAt() - 65;
      upperCount[index] += 1;

      result.push('#');
    } else result.push(str[i]);
  }

  let vowels = [];

  for(let i = 0; i < 26; i++){
    let charCode = 'A'.charCodeAt() + i;
    let  char = String.fromCharCode(charCode);
    while(upperCount[i] > 0){
      vowels.push(char);
      upperCount[i] --;
    }
  }

  for(let i = 0; i < 26; i++){
    let charCode = 'a'.charCodeAt() + i;
    let char = String.fromCharCode(charCode);
    while(lowerCount[i] > 0) {
      vowels.push(char);
      lowerCount[i]--;
    }
  }

  let first = 0, second = 0;
  while(first < result.length || second < vowels.length){
    if(result[first] === '#'){
      result[first] = vowels[second];
      second++;
    } 
    first++;
  }

  return result.join('');

}

function sortVowels(str) {
  let vowels = [];
  let vowelSet = new Set('aeiouAEIOU');

  // Collect vowels from the string
  for (let char of str) {
    if (vowelSet.has(char)) {
      vowels.push(char);
    }
  }

  // Sort vowels while maintaining the original case
  vowels.sort();

  // Rebuild the string, replacing vowels in their original positions
  let result = [];
  let vowelIndex = 0;
  
  for (let char of str) {
    if (vowelSet.has(char)) {
      result.push(vowels[vowelIndex]);
      vowelIndex++;
    } else {
      result.push(char);
    }
  }

  return result.join('');
}

console.log(sortVowels("LQRamBOHfq")); // Expected output: "LQROmBaHfq"
console.log(sortVowels("lEetcOde"));    // Expected output: "lEOtcede"



// console.log(sortVowels1("LQRamBOHfq")); // Expected output: "LQROmBaHfq"


// console.log(sortVowelsOld("LQRamBOHfq")); // Expected output: "LQRamBOHfq"


// console.log(sortVowels1("LQRamBOHfq"));
