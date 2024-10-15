/*
Given two strings s1 and s2, return true if s2 contains a 
permutation
 of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.

 

Example 1:

Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
Example 2:

Input: s1 = "ab", s2 = "eidboaoo"
Output: false
 

Constraints:

1 <= s1.length, s2.length <= 104
s1 and s2 consist of lowercase English letters.
*/
function checkInclusionBF(s1, s2){
    let n = s1.length, m = s2.length;
    // If s1 is longer than s2, s2 can't contain s1
    if(n > m) return false;

    // Sort s1 so it can be compared with sorted substr
    const sortedS1 = s1.split('').sort().join('');

    // Check every substring of s2 of length n
    for(let i = 0; i <= m - n; i++){
        // Extract substring of length n from s2
        let subStr = s2.slice(i, i+n);
        let sortedSubstr = subStr.split('').sort().join('');
        if(sortedS1 === sortedSubstr) return true;
    }
    return false // No permutation of s1 found in s2
}

function checkInclusion(s1, s2){
    let n = s1.length, m = s2.length;
    if(n > m) return false;

    // Character frequency arrays
    const s1Count = new Array(26).fill(0);
    const s2Count = new Array(26).fill(0);

    // Fill frequency array for s1
    for(let i = 0; i < n; i++){
        s1Count[s1.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }

    // Initialize the first window of s2
    for(let i = 0; i < n; i++){
        s2Count[s2.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }

    // Compare the frequency arrays
    if(arraysEqual(s1Count, s2Count)) return true;

    // Slide the window over s2
    for(let i = n; i < m; i++){
        // Add the next character to the window
        s2Count[s2.charCodeAt(i) - 'a'.charCodeAt(0)]++;

        // Remove the first character of the previous window
        s2Count[s2.charCodeAt(i - n) - 'a'.charCodeAt(0)]--;

       if(arraysEqual(s1Count, s2Count)) return true;
    }
    return false;
}

function arraysEqual(arr1, arr2){
    for(let i = 0; i < arr1.length; i++){
        if(arr1[i] !== arr2[i]) return false
    }
    return true;
}

console.log(checkInclusionBF('bdie', 'eidbaooo'));