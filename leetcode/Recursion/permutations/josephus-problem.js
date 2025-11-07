/*
1823. Find the Winner of the Circular Game
There are n friends that are playing a game. The friends are sitting in a circle and are numbered from 1 to n in clockwise order. More formally, moving clockwise from the ith friend brings you to the (i+1)th friend for 1 <= i < n, and moving clockwise from the nth friend brings you to the 1st friend.

The rules of the game are as follows:

Start at the 1st friend.
Count the next k friends in the clockwise direction including the friend you started at. The counting wraps around the circle and may count some friends more than once.
The last friend you counted leaves the circle and loses the game.
If there is still more than one friend in the circle, go back to step 2 starting from the friend immediately clockwise of the friend who just lost and repeat.
Else, the last friend in the circle wins the game.
Given the number of friends, n, and an integer k, return the winner of the game.

*/

function findTheWinnerR(n, k) {
  function josephus(n, k) {
    if (n === 1) return 0; // Base case: only one person left (index 0)
    return (josephus(n - 1, k) + k) % n;
  }

  return josephus(n, k) + 1; // Convert 0-based index to 1-based
}

function findTheWinnerI(n, k) {
  let winner = 0; // For 1 person, winner is at index 0

  // Build up solution from 1 to n people
  for (let i = 2; i <= n; i++) {
    winner = (winner + k) % i;
  }

  return winner + 1; // Convert 0-based to 1-based
}

function findTheWinnerEasy(n, k) {
  // Create circle of friends [1, 2, 3, ..., n]
  const circle = [];
  for (let i = 1; i <= n; i++) {
    circle.push(i);
  }

  let index = 0;
  while (circle.length > 1) {
    // Calculate next elimination index: (current + k - 1) % length
    index = (index + k - 1) % circle.length;
    circle.splice(index, 1); // Remove the eliminated friend
  }

  return circle[0];
}

function findTheWinnerBest(n, k) {
  let winner = 0;
  for (let i = 2; i <= n; i++) {
    winner = (winner + k) % i;
  }
  return winner + 1;
}

function myWinner(n, k) {
  let persons = new Array(n).fill(0);

  function winner(persons, n, index, personsLeft, k) {
    if (personsLeft === 1) {
      for (let i = 0; i < n; i++) {
        if (persons[i] === 0) return i;
      }
    }

    let kill = (k - 1) % personsLeft;
    while (kill--) {
      index = (index + 1) % n;

      while (persons[index] === 1) index = (index + 1) % n; // skip the killed persons
    }

    persons[index] = 1;

    winner(persons, n, index, personsLeft - 1, k);
  }

  return winner(persons, n, 0, n, k);
}
