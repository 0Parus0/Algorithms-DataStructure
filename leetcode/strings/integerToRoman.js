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
  //   number = number.toString();
  //   let ans = "",
  //     pos = 0;
  //   let map = {
  //     1: "I",
  //     2: "II",
  //     3: "III",

  //     4: "IV",
  //     5: "V",
  //     6: "VI",
  //     7: "VII",
  //     8: "VIII",

  //     9: "IX",
  //     10: "X",
  //     20: "XX",
  //     30: "XXX",

  //     40: "XL",
  //     50: "L",
  //     60: "LX",
  //     70: "LXX",
  //     80: "LXXX",

  //     90: "XC",
  //     100: "C",
  //     200: "CC",
  //     300: "CCC",

  //     400: "CD",
  //     500: "D",
  //     600: "DC",
  //     700: "DCC",
  //     800: "DCCC",
  //     900: "CM",
  //     1000: "M",
  //     2000: "MM",
  //     3000: "MMM",
  //     4000: "IVM",
  //   };

  //   for (let i = number.length - 1; i >= 0; i--) {
  //     let num = parseInt(number[i]) * Math.pow(10, pos);
  //     pos++;
  //     if (num === 0) continue;
  //     ans = map[num] + ans;
  //     // console.log(map[num]);
  //     console.log(ans);
  //   }
  //   return ans;
  /* GeeksForGeeks */
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
    let div = Math.floor(number / num[i]);

    console.log({ div }, { i });
    number = number % num[i];
    while (div--) {
      ans += sym[i];
    }
    i--;
  }
  return ans;
}

console.log(intToRoman(79));
