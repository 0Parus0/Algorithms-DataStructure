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
