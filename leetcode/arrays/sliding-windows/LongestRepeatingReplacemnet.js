/*
You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

 

Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.
 

Constraints:

1 <= s.length <= 105
s consists of only uppercase English letters.
0 <= k <= s.length
*/
function longestSubStrWithRepBF(str, k) {
    let n = str.length;
    let longest = 0;
    for(let i = 0; i < n; i++){
        let charCount = new Map();
        let maxCharCount = 0;
        for(let j = i; j < n; j++) {
            charCount.set(str[j], (charCount.get(str[j]) || 0) + 1 );
            maxCharCount = Math.max(maxCharCount, charCount.get(str[j]));

            let replacementNeeded = (j - i + 1) - maxCharCount;
            if(replacementNeeded <= k) {
                longest = Math.max(longest, j - i + 1);
            }
        }
    }

    return longest;
}

function longestSubStrWithRep(str, k) {
    let n = str.length;
    let start = 0; 
    let longest = 0;
    let charCount = new Map();
    let maxCharCount = 0;
    for(let end = 0; end < n; end++){
        // Expand the window 
        charCount.set(str[end], (charCount.get(str[end]) || 0 ) + 1);
        maxCharCount = Math.max(maxCharCount, charCount.get(str[end]));
        let needed = end - start + 1 -maxCharCount;
        
        // Shrink the window 
        while( needed   > k ) {
            charCount.set(str[start], charCount.get(str[start]) -1);
            start++;
            needed = end - start + 1 -maxCharCount;
        }

        // Update the longest
        longest = Math.max(longest, end - start + 1);
    }

    return longest;
}



console.log(longestSubStrWithRep('AABABBA', 1));
console.log(longestSubStrWithRep('ABBA', 1));