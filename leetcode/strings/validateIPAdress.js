/*
468. Validate IP Address
Medium
Topics
premium lock icon
Companies
Given a string queryIP, return "IPv4" if IP is a valid IPv4 address, "IPv6" if IP is a valid IPv6 address or "Neither" if IP is not a correct IP of any type.

A valid IPv4 address is an IP in the form "x1.x2.x3.x4" where 0 <= xi <= 255 and xi cannot contain leading zeros. For example, "192.168.1.1" and "192.168.1.0" are valid IPv4 addresses while "192.168.01.1", "192.168.1.00", and "192.168@1.1" are invalid IPv4 addresses.

A valid IPv6 address is an IP in the form "x1:x2:x3:x4:x5:x6:x7:x8" where:

1 <= xi.length <= 4
xi is a hexadecimal string which may contain digits, lowercase English letter ('a' to 'f') and upper-case English letters ('A' to 'F').
Leading zeros are allowed in xi.
For example, "2001:0db8:85a3:0000:0000:8a2e:0370:7334" and "2001:db8:85a3:0:0:8A2E:0370:7334" are valid IPv6 addresses, while "2001:0db8:85a3::8A2E:037j:7334" and "02001:0db8:85a3:0000:0000:8a2e:0370:7334" are invalid IPv6 addresses.

 

Example 1:

Input: queryIP = "172.16.254.1"
Output: "IPv4"
Explanation: This is a valid IPv4 address, return "IPv4".
Example 2:

Input: queryIP = "2001:0db8:85a3:0:0:8A2E:0370:7334"
Output: "IPv6"
Explanation: This is a valid IPv6 address, return "IPv6".
Example 3:

Input: queryIP = "256.256.256.256"
Output: "Neither"
Explanation: This is neither a IPv4 address nor a IPv6 address.
 

Constraints:

queryIP consists only of English letters, digits and the characters '.' and ':'.
 
*/
function validIPAddress(queryIP) {
  // Case 1: Possible IPv4
  if (queryIP.includes(".")) {
    const parts = queryIP.split(".");

    // IPv4 must have exactly 4 parts
    if (parts.length !== 4) return "Neither";

    for (let part of parts) {
      // Each part must be non empty
      if (part.length === 0) return "Neither";

      // Each part must be numeric only
      if (!/^\d+$/.test(part)) return "Neither";

      // No leading zeros unless the part is exactly '0'
      if (part.length > 1 && part[0] === "0") return "Neither";

      // Convert to number and validate range
      const num = Number(part);
      if (num < 0 || num > 255) return "Neither";
    }

    // All parts passed -> valid IPv4
    return "IPv4";
  }

  // Case 2: Possible IPv6
  if (queryIP.includes(":")) {
    const parts = queryIP.split(":");

    // IPv6 must have exactly 8 parts
    if (parts.length !== 8) return "Neither";

    for (let part of parts) {
      // Each part must be 1 - 4 characters long
      if (part.length === 0 || part.length > 4) return "Neither";

      // Must contain only valid hex characters
      if (!/^[0-9a-fA-F]+$/.test(part)) return "Neither";
    }

    // All parts passed -> valid IPv6
    return "IPv6";
  }
  // Case 3: Neither IPv4 nor IPv6
  return "Neither";
}

console.log(validIPAddress("172.16.254.1"));
// ✅ "IPv4"

console.log(validIPAddress("2001:0db8:85a3:0:0:8A2E:0370:7334"));
// ✅ "IPv6"

console.log(validIPAddress("256.256.256.256"));
// ❌ "Neither"

console.log(validIPAddress("192.168.01.1"));
// ❌ "Neither" (leading zero)

console.log(validIPAddress("02001:0db8:85a3:0000:0000:8a2e:0370:7334"));
// ❌ "Neither" (invalid IPv6 length)

// ========================================================================
// 2. Regular Expressions
// ========================================================================

/**
 *
 * ***Meta characters***
 *   \d -> 0-9 digits
 *   \D not a digit
 *   \w -> A-Z a-z 0-9 word character
 *   \W -> not a word character
 *   \s -> whitespace
 *   \S -> not a white space
 *   \b -> word boundary means a word starts here and end here e.g /\b\w{4}\b/ a word of length 4 only
 *   . -> any character
 *
 * ***Quantifiers***
 * ? 0 or one of the character before it (as an optional character)
 * ? after a Quantifier makes it not greedy
 * * 0 or more of the character before it
 * + one or more of the character before it
 * {2} exactly 2 of the following meta characters like \d \w etc or literal character
 * {2,} at least two and as many as possible
 * {2,8} at least two up to 8 only  3, 4, 5 ... 8 make sure no spaces between the numbers and comma inside the brace
 * ^ start of the line
 *  $ end of the line
 *
 * ***character Classes***
 * [abc] [-.] inside character classes the normal special characters like *+ doesn't work, only special characters are -and^
 *
 * ***Alterations***
 * (com|net|edu) -> Either com or net or edu
 *
 * ***Groups***
 * /\d{3}-\d{3}-\d{4}/ -> matches any 3 digits and a dash 3 digits and a dash and 4 digits this is the first group or group 0 "$0 | \0" the whole match "$" sign is for search and replace and "\" is to refer within the regex itself
 * /(\d{3})-\d{3}-\d{4}/ -> here whatever is inside first pair of parenthesis is 2nd group or group one and if there are more than one pair of parenthesis then the second pair would the the 3rd group or group 2 "$2 | \2"
 *
 * \b(\w+)\s\1\b will match the a word appearing twice inside the text like good good
 *
 *
 * ***RegExp in JS***
 * let r = /abc/ characters inside two slashes is a regex
 * let s = 'abc' characters inside two single/double/ quotes or backticks is a string
 * r.test(s) would be a function on regex will return true or false
 * r.exec(s) would be a function on regex which will return the matching pattern or an array of matching patterns if more than one in the string
 * s.match(regex) would be a function on strings will return an array of  matching results in the string or null if no match found
 * 
 * ***Look Around***
 * 1. Lookahead Assertions
Lookahead matches a string only if it is followed (positive) or not followed (negative) by another specific pattern. 
Positive Lookahead X(?=Y): Matches X only if it is followed by Y.
Example: /\d+(?=€)/ matches "30" in the string "1 turkey costs 30€" because the number is followed by the euro sign.
Negative Lookahead X(?!Y): Matches X only if it is not followed by Y.
Example: /\d+(?!€)/ matches "1" in the same string because "1" is followed by a space, not a euro sign. 

* 2. Lookbehind Assertions
Lookbehind matches a string only if it is preceded (positive) or not preceded (negative) by another specific pattern. These were introduced in ES2018 and are now widely supported across modern browsers. 
Positive Lookbehind (?<=Y)X: Matches X only if it is preceded by Y.
Example: /(?<=\$)\d+/ matches "100" in "$100" because it is preceded by a dollar sign.
Negative Lookbehind (?<!Y)X: Matches X only if it is not preceded by Y.
Example: /(?<!-)\d+/ can be used to find only non-negative integers in a list. 
 */
