/*Minimum characters to be added at front to make string palindrome
Read
Courses
Practice
Given string str we need to tell minimum characters to be added in front of the string to make string palindrome.

Examples: 

Input  : str = "ABC"
Output : 2
We can make above string palindrome as "CBABC"
by adding 'B' and 'C' at front.
Input  : str = "AACECAAAA";
Output : 2
We can make above string palindrome as AAAACECAAAA
by adding two A's at front of string.
 
Recommended Problem
Minimum characters to be added at front to make string palindrome
Strings
Data Structures
Solve Problem
Submission count: 35.6K
Naive approach: Start checking the string each time if it is a palindrome and if not, then delete the last character and check again. When the string gets reduced to either a palindrome or an empty string then the number of characters deleted from the end till now will be the answer as those characters could have been inserted at the beginning of the original string in the order which will make the string a palindrome.

*/
/* Naive Approach */
// function for checking string is palindrome or not
function ispalindrome(s) {
  let l = s.length;
  let j;

  for (let i = 0, j = l - 1; i <= j; i++, j--) {
    if (s[i] != s[j]) return false;
  }
  return true;
}

function makePalindromNaive(s) {
  let cnt = 0;
  let flag = 0;

  while (s.length > 0) {
    // if string becomes palindrome then break
    if (ispalindrome(s)) {
      flag = 1;
      break;
    } else {
      cnt++;

      // erase the last element of the string
      s = s.substring(0, s.length - 1);
    }
    return cnt;
  }
}

function makePalindrom(s) {
  let n = s.length;
  let rev = reverse(s);
  s += "$";
  s += rev;
  let lps = findLps(s);
  return n - lps;
}

function reverse(s) {
  let i = 0,
    j = s.length - 1;
  let sArr = s.split("");
  while (i < j) {
    [sArr[i], sArr[j]] = [sArr[j], sArr[i]];
    i++, j--;
  }
  return sArr.join("");
}

function findLps(s) {
  let n = s.length;
  let pre = 0,
    suf = 1;
  let lpsArr = Array.from({ length: n }, () => 0);
  while (suf < n) {
    if (s[pre] === s[suf]) {
      lpsArr[suf] = pre + 1;
      pre++, suf++;
    } else {
      if (pre === 0) {
        suf++;
      } else {
        pre = lpsArr[pre - 1];
      }
    }
  }
  return lpsArr[n - 1];
}

console.log(reverse("abc"));

console.log(makePalindrom("aaaotcaakr"));

/*
Given a string s. In one step you can insert any character at any index of the string.

Return the minimum number of steps to make s palindrome.

A Palindrome String is one that reads the same backward as well as forward.

 

Example 1:

Input: s = "zzazz"
Output: 0
Explanation: The string "zzazz" is already palindrome we do not need any insertions.
Example 2:

Input: s = "mbadm"
Output: 2
Explanation: String can be "mbdadbm" or "mdbabdm".
Example 3:

Input: s = "leetcode"
Output: 5
Explanation: Inserting 5 characters the string becomes "leetcodocteel".
 

Constraints:

1 <= s.length <= 500
s consists of lowercase English letters.
*/
