/*
Smallest window that contains all characters of string itself

Given a string, find the smallest window length with all distinct characters of the given string. For eg. str = “aabcbcdbca”, then the result would be 4 as of the smallest window will be “dbca” .
Examples: 

Input: aabcbcdbca
Output: dbca
Explanation: 
Possible substrings= {aabcbcd, abcbcd, 
bcdbca, dbca....}
Of the set of possible substrings 'dbca' 
is the shortest substring having all the 
distinct characters of given string. 

Input: aaab
Output: ab
Explanation: 
Possible substrings={aaab, aab, ab}
Of the set of possible substrings 'ab' 
is the shortest substring having all 
the distinct characters of given string.    
*/
function smallest(str) {
  let n = str.length,
    first = 0,
    last = 0,
    diff = 0,
    window = n,
    count = Array.from({ length: 256 }, () => 0);

  while (first < n) {
    let char = str[first].charCodeAt();
    if (count[char] === 0) {
      diff++;
    }
    count[char]++;
    first++;
  }

  for (let i = 0; i < 256; i++) {
    count[i] = 0;
  }
  first = 0;

  while (last < n) {
    // as long as diff exists
    while (diff && last < n) {
      let char = str[last].charCodeAt();
      if (count[char] === 0) diff--;

      count[char]++;
      last++;
    }

    window = Math.min(window, last - first);
    // until diff becomes 1 again

    while (diff !== 1) {
      window = Math.min(window, last - first);
      //   console.log({ first }, { last }, window);
      let char = str[first].charCodeAt();
      count[char]--;

      if (count[char] === 0) diff++;
      first++;
    }
  }
  return window;
}

console.log(smallest("aabbbcbbac"));
