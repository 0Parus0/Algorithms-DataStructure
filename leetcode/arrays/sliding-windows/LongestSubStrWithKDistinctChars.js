/*
Question 2: Longest Substring with K Distinct Characters
Problem Statement: You are given a string s and an integer K. Write a function to find the length of the longest substring in s that contains exactly K distinct characters.

Example:
text
Copy code
Input: s = "araaci", K = 2
Output: 4
Explanation: The longest substring with exactly 2 distinct characters is "araa".
Constraints:
If there are no substrings with exactly K distinct characters, return 0.
You can assume 1 ≤ K ≤ length of the string.
Follow-up question (after solving the main problem):

Can you also solve the variant where we need the longest substring with at most K distinct characters?
*/
function longestSubstrWithDistinctChars(str, k) {
    let n = str.length;
    let longest = 0;
    let distinct = 0;
    let start = 0;
    let chars = {}
    for(let end = 0; end < n; end++) {
        const seenChar = str[end];

        // Add character to the window
        if(!chars[seenChar]) {
            chars[seenChar] = 0;
            distinct++;
        }

        chars[seenChar] ++;

        // Shrink window until we have exactly k distinct characters

        while(distinct > k) {
            const startChar = str[start];
            chars[startChar]--;

            if(chars[startChar] === 0) {
                delete chars[startChar]; // Remove the character when frequency is 0
                distinct--;
            }
            start++; // Move the start pointer to shrink the window
        }
        longest = Math.max(longest, end - start + 1);
       }
    return longest;
}

function longestWithK(str, k) {
    let n = str.length;
    let start = 0, end = 0, distinct = 0, result = 0;
    let charMap = new Map();

    while(end < n){
        let endChar = str[end];

        // Add characters to the window
        if(!charMap.has(endChar)) {
            distinct++;
            charMap.set(endChar, 0);
        }
        charMap.set(endChar, charMap.get(endChar) + 1);

        // Shrink the window until exactly k distinct charaters
        while(distinct > k) {
            let startChar = str[start];
            charMap.set(startChar, charMap.get(startChar) - 1);
            if(charMap.get(startChar) === 0) {
                charMap.delete(startChar);

                distinct--;
            }
            start++;
        }
        result = Math.max(result, end - start + 1);
        end++;
    }
    return result;
}

// console.log(longestSubstrWithDistinctChars('araaci', 2));
console.log(longestWithK('araaci', 2));