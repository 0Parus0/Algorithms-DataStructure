**_ Storage _**
let us suppose there is a type called nibble which is 4bits

---

Binary | Decimal
0000 | 0
0001 | 1
0010 | 2
0011 | 3
0100 | 4
0101 | 5
0110 | 6
0111 | 7
1000 | -8
1001 | -7
1010 | -6
1011 | -5
1100 | -4
1101 | -3
1110 | -2
1111 | -1

# **Going binary to decimal**

To store a decimal number in any size of data type the system used is

- The first bit (MSB ==> Most Significant Bit) if 0 then its a positive number and simply convert it to the decimal
- The first bit (MSB ==> Most Significant Bit) if 1 then take it's 2's complement(i.e take 1's complement "flip all its bit" and add binary 1 to it) and then convert it to decimal and add a negative sign
  Example:- Positive decimal numbers are stored in machine as following
  0000 ==> 0 first bit is 0 it will be positive but all bits are 0 so in decimal its 0
  0001 ==> 1 first bit is zero its a positive number and simply convert it will become 1
  Example:- Negative decimal numbers are stored in machine as following
  let our number in binary is 1000
  1000 ==> first bit is 1 so take its 2's complement i.e 1's complement + binary 1 ==>
  1110 ==> 1's complement i.e flip all its bits
  0001 ==> add binary's 1 to it

  ***

  1000 ==> convert it to decimal and add a negative sign it will become -8
  let our number in binary is 1111
  1111 ==> first bit is 1 so take it's 2's complement i.e 1's complement + binary 1 ==>
  0000 ==> 1's complement i.e flip all its bits
  0001 ==> add binary's 1 to it

  ***

  0001 ==> convert it to decimal and dd a negative sign it will become -1

  ## **_ Decimal to binary _**

  If it's a positive number convert to binary and fit in bits
  If it's a negative sign then leave the sign convert to binary fit in bits and store its 2's complement

  - Example let suppose number is -5 in decimal
    leave the sign convert it to binary it will be 101
    fit in bits mean in nibble there are 4 bits so it will be 0101
    take its 2's complement (i.e 1's complement(flip all bits) and add a binary 1 to it)
    0101 ==> 1010 + 0001 => 1011
    so -5 will be stored in a nibble as a 1011;

  ## **_ Range of all data types _**

        ### Nibble
        There is no such thing as nibble just for the sake of understanding the nibble is of 4 bits
        4 bits ==> 2(power 4) ==> -2(power 3) to 2(power 3) -1
        ### Byte
        One byte is of 8 bits
        8 bits ==> 2(power 8) ==> -2(power 7) to 2(power 7) -1
        ### short
        One short has 16 bits
        16 bits ==> 2(power 16) ==> -2(power 15) to 2(power 15) -1
        ### integer
        One integer has 32 bits
        32 bits ==> 2(power 32) ==> -2(power 31) to 2(power 31) -1
        ### long
        One long has 64 bits
        64 bits ==> 2(power 64) ==> -2(power 63) to 2(power 63) -1

  ## **_ Out of range _**

  let us suppose you are trying to store decimal 12 in a nibble which only has 4 bits and can only store up to +7
  then binary of 12 is 1100 that in nibble is -4 so it will be stored as 1100 but when you will print it in decimal it will print -4;
  if we wanted to store decimal 16 in nibble its binary is 10000 but in a nibble there are only 4 bits so it will drop the first bit thats one and remaining 4 zeros will be stored as 0000 and that will be printed as 0 in decimal because it has only 4 bits and the fifth bits will be dropped.

  **_ Check if a number is even or odd _**

1. if number & 1 returns 1 the number is odd;
2. if number & 1 returns 0 the number is even;

let number is 3
bin(3) = 011 & 001 ==> 1
let number is 4
bin(4) = 100 & 001 ==> 0

**_ check if a number is power of two _**
1 if number & (number - 1) returns 0 the number is a power of two;
let number is 16
bin(16) 10000 ;
bin(number - 1) = 15 = 01111
now 10000 & 01111 ==> 0
There is an edge case if number is 0 this method is still going to return 0;

**_ Playing with the Kth bit_**
kth bit = kth least significant bit

1. Check if kth bit is set number & (1 << k)
   left shift 1 to the kth bit and bitwise and & the number with it
   if it returns zero then the bit is not set else its set
2. Toggle the kth bit number ^ (1 << k)
   if you want to toggle kth bit in a number
   left shift 1 to the kth bit and bitwise xor ^ the number with it

3. Set the kth bit number | (1 << k)
   if you want to set the kth bit
   left shift 1 to kth bit and bitwise or | the number with it

4. Unset the kth bit number & ~(1 << k)
   if you want to unset the kth bit in a number
   left shift 1 to the kth bit and bitwise & bitwise not ~ with it;

**_ Multiply or Divide a number with 2(^k) _**

    1. If you want to divide a number with 2(power k) then right shift the number k time
    2. If you want to multiply a number with 2(power k) then left shift the number k time

    80 / 2 ==> 80 >> 2(power 0) ie 80 >> 1
    100 / 8 ==> 100 >> 3
    -----
    14 * 2 ==> 14 << 1
    29 * 8 ==> 29 << 3

**_ Find out the number % 2(power k) _**
number & ((1 << k) -1);
number bitwise and 1 left shift k time -1;

**_ Swapping 2 numbers X and Y without a temporary variable _**

X = X ^ Y i.e ==> x = x ^ y, while y = y
Y = X ^ Y i.e ==> x = x ^ y, and y = x ^ y ^ y ==> y = x
X = X ^ Y i.e ==> x = x ^ y, and y = x ==> x = y

**_ Property: _**
** If number of set bits in A = X **
** if number of set bits in B = Y **
** And number of set bits in (A^B) = Z **

then - Z is even if X + Y is even - Z is odd if X + Y is odd

**_ X = A ^ B ^ X _**
-If (X === A) {
X = B
} else if(X === B) {
X = A
}

**_ Two Important identities _**
A + B = (A ^ B) + 2(A & B);
A + B = (A | B) + (A & B);
