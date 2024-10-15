/*
Given a valid (IPv4) IP address, return a defanged version of that IP address.

A defanged IP address replaces every period "." with "[.]".

 

Example 1:

Input: address = "1.1.1.1"
Output: "1[.]1[.]1[.]1"
Example 2:

Input: address = "255.100.50.0"
Output: "255[.]100[.]50[.]0"
 

Constraints:

The given address is a valid IPv4 address.
*/

function defang(ipAddress) {
  let n = ipAddress.length;
  let result = "";
  let index = 0;
  while (index < n) {
    // console.log(result);
    if (ipAddress[index] === ".") {
      result = result.concat("[.]");
    } else {
      result = result.concat(ipAddress[index]);
    }
    index++;
  }
  return result;
}

function defanged(ip){
  let n = ip.length;
  let result = '';
  for(let i = 0; i < n; i++){
    if(ip[i] === '.') result += '[.]';
    else result += ip[i];
  }
  return result
}

console.log(defanged("255.100.50.0"));
