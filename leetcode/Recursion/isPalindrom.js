// isPalindrome
// Write a recursive function called isPalindrome which returns true
// if the string passed to it is a palindrome (reads the same forward and backward).
// Otherwise it returns false.

function isPalindrome(str, start = 0, end = str.length - 1) {
  // let start = 0,
  //   end = str.length - 1;
  if (start >= end) return true;
  if (str[start] !== str[end]) return false;
  return isPalindrome(str, start + 1, end - 1);
  // if (!str.length) return true;
  // if (str[0] !== str[str.length - 1]) return false;
  // return isPalindrome(str.slice(1, -1));
}

console.log(isPalindrome("amanaplanacanalpanama")); // true
console.log(isPalindrome("amanaplanacanalpandemonium")); // false

function countVowel(str, index = str.length - 1) {
  const vowels = "aeiou";
  if (index === -1) return 0;
  if (vowels.includes(str[index])) return 1 + countVowel(str, index - 1);
  else return countVowel(str, index - 1);
}
console.log(countVowel("ali"));
