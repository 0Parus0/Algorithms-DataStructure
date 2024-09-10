/*
Check if a string can be obtained by rotating another string 2 places
Read
Courses
Practice
Given two strings, the task is to find if a string can be obtained by rotating another string by two places. 

Examples: 

Input: string1 = “amazon”, string2 = “azonam” 
Output: Yes 
Explanation: Rotating string1 by 2 places in anti-clockwise gives the string2.

Input: string1 = “amazon”, string2 = “onamaz” 
Output: Yes 
Explanation: Rotating string1 by 2 places in clockwise gives the string2.


Asked in: Amazon Interview

Recommended Problem
Check if string is rotated by two places
Strings
Data Structures
Accolite
Amazon
Solve Problem
Submission count: 2L
Approach 1 (by Rotating String Clockwise and Anti-clockwise):
The idea is to Rotate the String1 in both clockwise and ant-clockwise directions. Then if this rotated string is equal to String2.

Illustration:

str1 = “amazon”
str2 = “azonam”

Initialise: clock_rot = “”, anticlock_rot = “”

str1 after 2 places clockwise rotation:
clock_rot = “onamaz”

str1 after 2 places anti-clockwise rotation:
anticlock_rot = “azonam”

Therefore, anticlock_rot and str2 are same.

Hence, str2 can be achieved from str1

Follow the steps below to solve the problem:

Initialize two empty strings which keep the clockwise and anticlockwise strings respectively.
After rotating the str1 compare both clockwise and anticlockwise strings with str2.
If any of them matches the str2 return true, otherwise false.
*/
function rotated(str1, str2) {
  let clockwise = true;
  let antiClockwise = true;
  let n = str1.length;
  for (let i = 0; i < n; i++) {
    if (str1[i] !== str2[(i + 2) % n]) clockWise = false;
    break;
  }
  for (let i = 0; i < n; i++) {
    if (str2[(i + 2) % n] !== str1[i]) antiClockwise = false;
    break;
  }
  return clockwise || antiClockwise;
}

function clockWise(str, num) {
  let n = str.length;
  let result = [];
  for (let i = 0; i < n; i++) {
    result[(i + num) % n] = str[i];
  }
  return result.join("");
}

function antiClockWise(str, num) {
  let n = str.length;
  let result = [];
  for (let i = 0; i < n; i++) {
    // console.log(Math.abs(i - num), i);
    result[i] = str[(num + i) % n];
  }
  return result.join("");
}

console.log(antiClockWise("amazon", 2), clockWise("amazon", 2));
console.log(rotated("amazon", "onamaz"));

/*
Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s.

A shift on s consists of moving the leftmost character of s to the rightmost position.

For example, if s = "abcde", then it will be "bcdea" after one shift.
 

Example 1:

Input: s = "abcde", goal = "cdeab"
Output: true
Example 2:

Input: s = "abcde", goal = "abced"
Output: false
 

Constraints:

1 <= s.length, goal.length <= 100
s and goal consist of lowercase English letters.
iven two strings s and goal, return true if and only if s can become goal after some number of shifts on s.

A shift on s consists of moving the leftmost character of s to the rightmost position.

For example, if s = "abcde", then it will be "bcdea" after one shift.
 

Example 1:

Input: s = "abcde", goal = "cdeab"
Output: true
Example 2:

Input: s = "abcde", goal = "abced"
Output: false
 

Constraints:

1 <= s.length, goal.length <= 100
s and goal consist of lowercase English letters.
*/
