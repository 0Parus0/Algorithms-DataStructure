/*
93. Restore IP Addresses
A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.

For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.
Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.

Example 1:
Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]

Example 2:
Input: s = "0000"
Output: ["0.0.0.0"]

Example 3:
Input: s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

Constraints:
1 <= s.length <= 20
s consists of digits only.
*/

function restoreIpAddresses(s) {
  const n = s.length;
  const result = [];
  if (n < 4 || n > 12) return result;

  function isValid(str) {
    if (str.length > 1 && str[0] === "0") return false;
    let val = Number(str);
    return val >= 0 && val <= 255;
  }
  function solve(idx, temp = "", parts = 0) {
    // Base case
    if (idx === n && parts === 4) {
      result.push(temp.slice(0, -1)); // Remove trailing dot
      return;
    }

    if (parts >= 4 || idx >= n) return; // Early termination

    // Try 1-digit part
    if (idx + 1 <= n) {
      solve(idx + 1, temp + s.slice(idx, idx + 1) + ".", parts + 1);
    }

    // Try 2-digit part (Need to be valid)
    if (idx + 2 <= n && isValid(s.slice(idx, idx + 2))) {
      solve(idx + 2, temp + s.slice(idx, idx + 2) + ".", parts + 1);
    }

    // Try 3-digit part (Need to be valid)
    if (idx + 3 <= n && isValid(s.slice(idx, idx + 3))) {
      solve(idx + 3, temp + s.slice(idx, idx + 3) + ".", parts + 1);
    }
  }

  solve(0);
  return result;
}
