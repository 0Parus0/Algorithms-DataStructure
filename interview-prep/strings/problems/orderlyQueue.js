/*
899. Orderly Queue
You are given a string s and an integer k. You can choose one of the first k letters of s and append it at the end of the string.gReturn the lexicographically smallest string you could have after applying the mentioned step any number of moves.g gExample 1:gInput: s = "cba", k = 1
Output: "acb"
Explanation: 
In the first move, we move the 1st character 'c' to the end, obtaining the string "bac".
In the second move, we move the 1st character 'b' to the end, obtaining the final result "acb".
Example 2:gInput: s = "baaca", k = 3
Output: "aaabc"
Explanation: 
In the first move, we move the 1st character 'b' to the end, obtaining the string "aacab".
In the second move, we move the 3rd character 'c' to the end, obtaining the final result "aaabc".
 gConstraints:g1 <= k <= s.length <= 1000
s consist of lowercase English letters.
*/
function orderlyQueue(s, k) {
  if (k === 1) {
    let result = s;
    for (let i = 1; i <= s.length; i++) {
      let temp = s.slice(i) + s.slice(0, i);
      result = temp > result ? result : temp;
    }
    return result;
  } else {
    return s.split("").sort().join("");
  }
}

function orderlyQueue(s, k) {
  if (k === 1) {
    let result = s;
    let temp = s;
    for (let i = 0; i < s.length; i++) {
      temp = temp.slice(1) + temp[0];
      result = temp < result ? temp : result;
    }
    return result;
  } else {
    return s.split("").sort().join("");
  }
}

function orderlyQueue(s, k) {
  if (k === 1) {
    let result = s;
    for (let i = 1; i <= s.length; i++) {
      let temp = s.slice(i) + s.slice(0, i);
      if (temp < result) result = temp;
    }
    return result;
  } else {
    return s.split("").sort().join("");
  }
}
