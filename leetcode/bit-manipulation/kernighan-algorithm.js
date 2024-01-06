/*
The Brian Kernighan's Algorithm states that for an integer num :- (N) AND (N-1) is equivalent to N but with all the bits from and including the rightmost set bit (1) flipped.

Example :-

num = 7 ==>B==I==N==A==R==Y==> 111
num = 6 ==>B==I==N==A==R==Y==> 110
num = 5 ==>B==I==N==A==R==Y==> 101
num = 4 ==>B==I==N==A==R==Y==> 100
num = 3 ==>B==I==N==A==R==Y==> 011
num = 2 ==>B==I==N==A==R==Y==> 010
num = 1 ==>B==I==N==A==R==Y==> 001

In above, the rightmost set bit is bold. Under each rightmost set bit (boldened), the bits to it's right and including it are flipped (shown in italics).

Let's say the number whose set bits we wish to count is 7.

7 AND 6 ===> 110
6 AND 5 ===> 100
5 AND 4 ===> 100
4 AND 3 ===> 000

From above, we can see that we got a non-zero number upon ANDing 3 times which corresponds to the 3 set bits in 7.

So, we can simple run the loop for each number whose count of set bits is to be found and apply the algorithm.
*/

function kernighan(num) {
  let counter = 0;
  while (num !== 0) {
    let rsbm = num & -num;
    num -= rsbm;
    counter++;
  }

  return counter;
}

console.log(kernighan(76)); // 01001100 // ans 3;
