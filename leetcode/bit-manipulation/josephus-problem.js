/*
There are n friends that are playing a game. The friends are sitting in a circle and are numbered from 1 to n in clockwise order. More formally, moving clockwise from the ith friend brings you to the (i+1)th friend for 1 <= i < n, and moving clockwise from the nth friend brings you to the 1st friend.

The rules of the game are as follows:

Start at the 1st friend.
Count the next k friends in the clockwise direction including the friend you started at. The counting wraps around the circle and may count some friends more than once.
The last friend you counted leaves the circle and loses the game.
If there is still more than one friend in the circle, go back to step 2 starting from the friend immediately clockwise of the friend who just lost and repeat.
Else, the last friend in the circle wins the game.
Given the number of friends, n, and an integer k, return the winner of the game.


*/

// Solution is try to express the number of friends n in the form of  2(power x) + l
// where 2 to the power x  is equal to or less than n and l is the remainder
// then the answer would be 2l + 1;

function powerOfTwo(n) {
  let i = 1;
  while (i * 2 <= n) {
    i = i * 2;
  }

  return i;
}

function josephusProblem(num) {
  let highestPowerOfTwo = powerOfTwo(num);
  let l = num - highestPowerOfTwo;
  return 2 * l + 1;
}

console.log(josephusProblem(17));
