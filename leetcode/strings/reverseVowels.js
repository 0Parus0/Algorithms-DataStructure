/*
Given a string s, reverse only all the vowels in the string and return it.

The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

 

Example 1:

Input: s = "IceCreAm"

Output: "AceCreIm"

Explanation:

The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels, s becomes "AceCreIm".

Example 2:

Input: s = "leetcode"

Output: "leotcede"

 

Constraints:

1 <= s.length <= 3 * 105
s consist of printable ASCII characters.
*/

function reverseVowelsBF(str){
    let chars = str.split('');
    let vowels = [];
    for(let i = 0; i < chars.length; i++) {
        if(isVowel(chars[i])){
            vowels.push(chars[i]);
        }
    }

    for(let i = 0; i < chars.length; i++) {
        if(isVowel(chars[i])) {
            chars[i] = vowels.pop();
        }
    }

    return chars.join('');


}

/* Helper function to check if a character is a vowel */
function isVowel(char) {
    return 'aeiouAEIOU'.includes(char);
}

/* Optimized version */

function reverseVowels(str) {
    // Cover string to array for easier manipulation
    let chars = str.split('');
    let left = 0, right = chars.length -1;

    // Two pointers approach
    while(left < right) {
        // Move left pointer until a vowel is found
        while(left < right && !isVowel(chars[left])) left++;
        // Move the right pointer until a vowel is found
        while(left < right && !isVowel(chars[right])) right--;

        // Swap the vowels but make sure first left is less than right;
        if(left < right) {
            [chars[left], chars[right]] = [chars[right], chars[left]]
            left++, right--;
        }
    }
    return chars.join(''); // Convert array back to string
}

console.log(reverseVowels('leetcode'));