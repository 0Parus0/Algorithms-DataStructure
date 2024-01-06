/*
 * Let us suppose the number is 76
 * It's binary is 1001100
 * it's 2's complement is (1's complement + binary 1)
 * 1's complement(flip all bits) 0110011
 *                    add 1 =>   0000001
 *                               0110100
 * now 1001100 & 0110100 ==> 0000100
 * and it's right most set bit mask would be 0000100
 */

let x = 76;
// Then the right most set bit mas of x would be
let onesComplement = ~x;
let twosComplement = onesComplement + 0000001;
let rsbMask = x & twosComplement; // rsbMask is also equal to x & -x and two's complement of any number is -x that number

console.log(x, onesComplement, twosComplement, rsbMask);
