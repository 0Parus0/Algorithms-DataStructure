/*
Converting Roman Numerals to Decimal lying between 1 to 3999
Read
Courses
Jobs
Given a Roman numeral, the task is to find its corresponding decimal value.

Example : 

Input: IX
Output: 9
Explanation: IX is a Roman symbol which represents 9

Input: XL
Output: 40
Explanation: XL is a Roman symbol which represents 40


Input: MCMIV
Output: 1904
Explanation: M is a thousand, CM is nine hundred and IV is four
*/

/*
Given a number, find its corresponding Roman numeral. 

Examples: 

Input : 9
Output : IX
Input : 40
Output : XL
Input :  1904
Output : MCMIV
Following is the list of Roman symbols which include subtractive cases also:

SYMBOL       VALUE
I             1
IV            4
V             5
IX            9
X             10
XL            40
L             50
XC            90
C             100
CD            400
D             500
CM            900 
M             1000       
Recommended Problem
Convert to Roman No
Strings
Data Structures
Amazon
Microsoft
+3 more
Solve Problem
Submission count: 31.2K
Idea is to convert the units, tens, hundreds, and thousands of places of the given number separately. If the digit is 0, then there’s no corresponding Roman numeral symbol. The conversion of digit’s 4’s and 9’s are little bit different from other digits because these digits follow subtractive notation. 


Algorithm to convert decimal number to Roman Numeral 
Compare given number with base values in the order 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1. Base value which is just smaller or equal to the given number will be the initial base value (largest base value) .Divide the number by its largest base value, the corresponding base symbol will be repeated quotient times, the remainder will then become the number for future division and repetitions.The process will be repeated until the number becomes zero.

Example to demonstrate above algorithm: 

Convert 3549 to its Roman Numerals
Output: 
*/
function romanToInt(str) {
  let n = str.length;
  let map = {
    I: 1,
    IV: 4,
    V: 5,
    IX: 9,
    X: 10,
    XL: 40,
    L: 50,
    XC: 90,
    C: 100,
    CD: 400,
    D: 500,
    CM: 900,
    M: 1000,
  };
  let sum = 0;
  for (let i = 0; i < n - 1; i++) {
    let num1 = map[str[i]],
      num2 = map[str[i + 1]];
    if (num1 < num2) {
      sum -= num1;
    } else {
      sum += num1;
    }
  }
  sum += map[str[n - 1]];
  return sum;
}

console.log(romanToInt("LXX"));
