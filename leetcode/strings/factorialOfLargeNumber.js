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

/**
 * # Plan (Turing Style)
 * 1️⃣ If N <= 1 → return "1"
 * 2️⃣ Initialize result array with one element: [1]
 * 3️⃣ For i = 2 to N:
 *     - multiply each digit of result with i
 *     - maintain carry for each multiplication
 * 4️⃣ After processing all digits, push remaining carry digits
 * 5️⃣ Reverse result array and join to form final string
 * 6️⃣ Return the factorial as a string
 */

function factorialAsStringManual(N) {
  if (N <= 1) return "1";

  let res = [1]; // stores digits in reverse order

  for (let x = 2; x <= N; x++) {
    let carry = 0;

    // Multiply current number with each digit
    for (let i = 0; i < res.length; i++) {
      let product = res[i] * x + carry;
      res[i] = product % 10; // store last digit
      carry = Math.floor(product / 10); // keep carry
    }

    // Handle leftover carry
    while (carry > 0) {
      res.push(carry % 10);
      carry = Math.floor(carry / 10);
    }
  }

  // The result array is in reverse order
  return res.reverse().join("");
}

/*
# Custom Test Cases
*/
console.log(factorialAsStringManual(5)); // "120"
console.log(factorialAsStringManual(10)); // "3628800"
console.log(factorialAsStringManual(20)); // "2432902008176640000"
console.log(factorialAsStringManual(100)); // 158-digit factorial string

console.log(factorial(8));
