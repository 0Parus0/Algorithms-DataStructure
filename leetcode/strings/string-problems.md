1. Longest Palindromic Substring
Problem: Given a string s, return the longest palindromic substring.
Input: "babad"
Output: "bab" or "aba"
Explanation: The longest palindromic substring in "babad" is "bab" or "aba".
2. Group Anagrams
Problem: Given an array of strings, group the anagrams together.
Input: ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
Explanation: Group strings that are anagrams of each other.
3. Valid Parentheses
Problem: Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid (i.e., brackets are closed in the correct order).
Input: "()[]{}"
Output: true
Explanation: All parentheses are closed in the correct order.
4. Longest Substring Without Repeating Characters
Problem: Find the length of the longest substring without repeating characters.
Input: "abcabcbb"
Output: 3
Explanation: The longest substring without repeating characters is "abc", with a length of 3.
5. Minimum Window Substring
Problem: Given two strings s and t, find the minimum window in s which contains all characters of t.
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window in "ADOBECODEBANC" that contains all characters of "ABC" is "BANC".
6. String to Integer (atoi)
Problem: Implement the atoi function, which converts a string to an integer.
Input: "-42"
Output: -42
Explanation: Convert the string "-42" to the integer -42.
7. Longest Common Prefix
Problem: Write a function to find the longest common prefix string amongst an array of strings.
Input: ["flower", "flow", "flight"]
Output: "fl"
Explanation: The longest common prefix is "fl".
8. Decode Ways
Problem: A message containing letters from A-Z can be encoded into numbers using 'A' = 1, 'B' = 2, ..., Z = 26'. Given an encoded message, count the number of ways it can be decoded.
Input: "226"
Output: 3
Explanation: "226" can be decoded as "BZ", "VF", or "BBF".
9. Palindrome Partitioning
Problem: Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning.
Input: "aab"
Output: [["a", "a", "b"], ["aa", "b"]]
Explanation: The possible palindrome partitions of "aab" are ["a", "a", "b"] and ["aa", "b"].
10. Find All Anagrams in a String
Problem: Given two strings s and p, return all the start indices of p's anagrams in s.
Input: s = "cbaebabacd", p = "abc"
Output: [0, 6]
Explanation: The substring starting at index 0 and 6 in s are anagrams of p.


Here are 5 string compression problems similar to the one you described, where characters are followed by a number indicating consecutive occurrences:

1. Basic String Compression
Problem: Given a string, compress it so that if a character appears consecutively, it is followed by the number of occurrences. If a character appears only once, it remains unchanged.
Input: "aaabbc"
Output: "a3b2c"
Explanation: "aaabbc" compresses to "a3b2c", since 'a' occurs 3 times, 'b' occurs 2 times, and 'c' occurs once.
2. Compress Vowels in a String
Problem: Compress only the vowels in a string. If a vowel appears consecutively, it is followed by its occurrence count. All other characters remain unchanged.
Input: "hellooooworld"
Output: "helloo3world"
Explanation: The vowel 'o' appears 3 times consecutively, so it is compressed to 'o3'. Other vowels remain unchanged.
3. Compress Consecutive Digits
Problem: Given a string containing digits and letters, compress only the consecutive digits in the string.
Input: "a111bb22ccc"
Output: "a13bb2c3"
Explanation: The digit '1' occurs 3 times, and the digit '2' occurs 2 times. Letters remain unchanged.
4. Compress Uppercase Letters
Problem: Compress only consecutive uppercase letters in a given string. All other characters remain unchanged.
Input: "AAaBBBccccDD"
Output: "A2aB3ccccD2"
Explanation: The uppercase letter 'A' appears twice consecutively, and 'B' appears 3 times. 'D' appears twice, so each is compressed.
5. Compress String with Specific Characters
Problem: Compress only specific characters from a string, say 'a', 'b', and 'c', and leave all other characters unchanged.
Input: "aabccddeeff"
Output: "a2b1c2ddeeff"
Explanation: The characters 'a' and 'c' are compressed to "a2" and "c2" since they occur consecutively, while other characters remain unchanged.
These problems involve compressing strings based on specific rules, and they help test string traversal and manipulation techniques. Let me know if you'd like to explore any of these problems in detail!






