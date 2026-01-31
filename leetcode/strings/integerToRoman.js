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
/*
🕒 Time Complexity Analysis
Step 1: Fixed-size data

The arrays values and symbols each have 13 elements → constant size.

Step 2: Loop iterations

For each of the 13 Roman values, we repeatedly subtract until num < values[i].

The maximum number of Roman symbols you can have for any number ≤ 3999 is about 15 (e.g., "MMMDCCCLXXXVIII" → 15 characters).

✅ So, even though there’s a nested while loop, it never grows with input — it depends only on the number’s value, which is bounded (≤ 3999).

Hence:

𝑇
(
𝑛
)
=
𝑂
(
1
)
T(n)=O(1)

(Technically proportional to the length of the Roman numeral, but that length is bounded by a constant.)

💾 Space Complexity Analysis

The arrays values and symbols are fixed → O(1).

The result string grows to at most 15 characters → O(1).

No additional data structures or recursion.

𝑆
(
𝑛
)
=
𝑂
(
1
)
S(n)=O(1)
✅ Final Complexities
Complexity Type	Value	Explanation
Time Complexity	O(1)	Fixed-size lookup and limited operations for max input 3999
Space Complexity	O(1)	Constant space for arrays and output string

Would you like me to show a short dry run (e.g., for num = 1904 → "MCMIV") to visualize how the loop executes?
*/
