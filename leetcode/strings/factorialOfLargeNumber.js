/*
Given an integer ‘N’, you are supposed to return the factorial of the given integer in the form of a string.
*/
function factorial(num) {
  let ans = [1];
  while (num > 1) {
    let carry = 0,
      res,
      size = ans.length;
    for (let i = 0; i < size; i++) {
      res = ans[i] * num + carry;
      carry = parseInt(res / 10);
      ans[i] = res % 10;
    }
    while (carry) {
      ans.push(carry % 10);
      carry = parseInt(carry / 10);
    }
    num--;
  }
  return reverse(ans).join("");
}

function reverse(arr) {
  let n = arr.length - 1;
  let left = 0;
  right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++, right--;
  }
  return arr;
}

console.log(factorial(8));
