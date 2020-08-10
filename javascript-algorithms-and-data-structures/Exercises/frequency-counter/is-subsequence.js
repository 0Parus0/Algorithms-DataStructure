/*** Frequency Counter - isSubsequence ***/ 

// Write a function called isSubsequence which takes in two strings and checks whether 
// the characters in the first string form a subsequence of the characters in the second 
// string. In other words, the function should check whether the characters in the first 
// string appear somewhere in the second string, without their order changing.

// Examples:
// 1     isSubsequence('hello', 'by hecatl in lo world')
// 2     isSubsequence('sing', 'sting')
// 3     isSubsequence('abc', 'abracadabra')
// 4     isSubsequence('abc', 'acb')

// Your solution MUST have AT LEAST the following complexities:
// Time Complexity - O(N + M)
// Space Complexity - O(1)

function isSubsequence(str1,str2) {
  if(str1.length > str2.length) return false;

  const obj = {};
  for (const char of str2) {
    obj[char] = (obj[char] || 0) + 1
  }
  for ( const char of str1) {
    if(obj[char]) obj[char]--;
    else return false;
  }
  return true;

}

console.log(isSubsequence('singg', 'sting '))
console.log(isSubsequence('hello', 'by hecatl in lo world'))
console.log(isSubsequence('abc', 'abracadabra'))
console.log(isSubsequence('abc', 'adb'))