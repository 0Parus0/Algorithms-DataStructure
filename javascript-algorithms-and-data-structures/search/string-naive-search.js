/**
 * String Naive Search Pseudo Code
 *
 * Loop over the longer string
 * Loop over the shorter string
 * If the characters don't match, break out of the inner loop
 * If the characters do match, keep going
 * If you complete the inner loop and find a match,
 * Increment the count of matches
 * Return the count
 */

// function stringNaiveSearch(long, short) {
//   let count = 0;
//   for(let i = 0; i < long.length; i++) {
//     for(let j = 0; j < short.length; j++) {
//       if (short[j] !== long[i + j]) break;
//       if( j === short.length -1) count++;
//     }
//   }
//   return count;
// }

function stringNaiveSearch(str, pattern) {
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (pattern[j] !== str[i + j]) break;
      // if j pointer has reached to end of the pattern that means we have found a match which is starting on the ith index of str so we have to return i;
      if (j === pattern.length - 1) return i;
    }
  }
}

console.log(stringNaiveSearch("lorie loled", "lol"));
