/*
A sentence is a list of words that are separated by a single space with no leading or trailing spaces. Each word consists of lowercase and uppercase English letters.

A sentence can be shuffled by appending the 1-indexed word position to each word then rearranging the words in the sentence.

For example, the sentence "This is a sentence" can be shuffled as "sentence4 a3 is2 This1" or "is2 sentence4 This1 a3".
Given a shuffled sentence s containing no more than 9 words, reconstruct and return the original sentence.

 

Example 1:

Input: s = "is2 sentence4 This1 a3"
Output: "This is a sentence"
Explanation: Sort the words in s to their original positions "This1 is2 a3 sentence4", then remove the numbers.
Example 2:

Input: s = "Myself2 Me1 I4 and3"
Output: "Me Myself and I"
Explanation: Sort the words in s to their original positions "Me1 Myself2 and3 I4", then remove the numbers.
 

Constraints:

2 <= s.length <= 200
s consists of lowercase and uppercase English letters, spaces, and digits from 1 to 9.
The number of words in s is between 1 and 9.
The words in s are separated by a single space.
s contains no leading or trailing spaces.
*/

function sortSentence(str) {
  let n = str.length;
  let arr = Array.from({ length: 10 }, () => 0);
  let word = "";
  let sentence = "";
  for (let i = 0; i < n; i++) {
    if (str[i] === " ") {
      let index = word[word.length - 1];
      word = word.slice(0, word.length - 1);
      arr[index] = word;
      word = "";
    } else {
      word += str[i];
    }
  }
  let index = word[word.length - 1];
  arr[index] = word.slice(0, word.length - 1);
  for (let i = 0; i < 10; i++) {
    if (arr[i]) sentence = sentence + " " + arr[i];
  }
  return sentence;
}
// let ans = "123";
// ans = 1 + ans;

function sortSentence1(str) {
  let result = new Array(10).fill(false);
  let words = str.split(" ");
  let resultStr = "";

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let index = parseInt(word[word.length - 1]);

    result[index] = word.slice(0, word.length - 1);

  }

  for (let i = 0; i < result.length; i++) {
    if (result[i]) {
      resultStr += result[i] + " ";
    }
  }

  resultStr = resultStr.slice(0, resultStr.length - 1);;
  

  return resultStr;
}

let str = "Myself2 Me1 I4 and3";
console.log(sortSentence1( "is2 sentence4 This1 a3"));

