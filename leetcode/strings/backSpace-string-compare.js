/*Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.

Note that after backspacing an empty text, the text will continue empty.

 

Example 1:

Input: s = "ab#c", t = "ad#c"
Output: true
Explanation: Both s and t become "ac".
Example 2:

Input: s = "ab##", t = "c#d#"
Output: true
Explanation: Both s and t become "".
Example 3:

Input: s = "a#c", t = "b"
Output: false
Explanation: s becomes "c" while t becomes "b".
 

Constraints:

1 <= s.length, t.length <= 200
s and t only contain lowercase letters and '#' characters.
 

Follow up: Can you solve it in O(n) time and O(1) space?
*/
// Get valid character index
function getValidCharIdx(str, p = str.length - 1) {
  let skipCount = 0;
  while (p >= 0) {
    if (str[p] === "#") {
      skipCount++;
    } else if (skipCount > 0) {
      skipCount--;
    } else break;
    p--;
  }
  return p;
}
// console.log(getValidCharIdx("bxo#j##tw", 6));
function backspaceCompare(s, t) {
  let p1 = s.length - 1;
  let p2 = t.length - 1;
  //   let skipS = 0;
  //   let skipT = 0;
  while (p1 >= 0 || p2 >= 0) {
    // while (p1 >= 0) {
    //   if (s[p1] === "#") {
    //     skipS++;
    //   } else if (skipS > 0) {
    //     skipS--;
    //   } else break;
    //   p1--;
    // }

    // while (p2 >= 0) {
    //   if (t[p2] === "#") {
    //     skipT++;
    //   } else if (skipT > 0) {
    //     skipT--;
    //   } else break;
    //   p2--;
    // }
    p1 = getValidCharIdx(s, p1);
    p2 = getValidCharIdx(t, p2);

    console.log("------ before ----");
    console.log({ p1 }, { p2 });
    let first = p1 < 0 ? "" : s[p1];
    let second = p2 < 0 ? "" : t[p2];
    if (first !== second) return false;
    p1--;
    p2--;
    console.log("------ after ----");
    console.log({ p1 }, { p2 });
  }
  return true;
}

let s = "bxj##tw", //   b t w
  t = "bxo#j##tw"; //    tw
console.log(backspaceCompare(s, t));
