/*
Converting Decimal Number lying between 1 to 3999 to Roman Numerals
Read
Courses
Jobs
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
*/
function intToRoman(number) {
  let ans = "";
  let num = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
  let sym = [
    "I",
    "IV",
    "V",
    "IX",
    "X",
    "XL",
    "L",
    "XC",
    "C",
    "CD",
    "D",
    "CM",
    "M",
  ];
  let i = 12;
  while (number > 0) {
    let times = Math.floor(number / num[i]);

    number = number % num[i];
    while (times--) {
      ans += sym[i];
    }
    i--;
  }
  return ans;
}

console.log(intToRoman(79));
