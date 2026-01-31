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
  // Recursive helper function that returns 0-based index of winner
  function josephus(n, k) {
    // Base case: if only 1 person remains, they win (index 0)
    if (n === 1) return 0;

    // Recursive case:
    // 1. Solve for n-1 people to get the winner's position in smaller circle
    // 2. Add k to account for the elimination shift
    // 3. Use modulo n to handle circular wrapping
    return (josephus(n - 1, k) + k) % n;
  }

  // Convert 0-based index to 1-based numbering (since friends are numbered 1 to n)
  return josephus(n, k) + 1;
}

function findTheWinnerI(n, k) {
  // Start with the base case: for 1 person, winner is at index 0
  let winner = 0;

  // Build up the solution from 2 to n people
  for (let i = 2; i <= n; i++) {
    // For a circle of i people, the winner's position is:
    // (winner position for i-1 people + k) % i
    // This accounts for the circular nature and elimination shift
    winner = (winner + k) % i;
  }

  // Convert 0-based index to 1-based numbering
  return winner + 1;
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

function myWinner(n, k) {
  let persons = new Array(n).fill(0); // 0 = alive, 1 = eliminated
  let personsLeft = n;
  let currentIndex = 0;

  function winner() {
    if (personsLeft === 1) {
      // Find and return the last surviving person (1-based)
      for (let i = 0; i < n; i++) {
        if (persons[i] === 0) return i + 1;
      }
    }

    // Count k alive persons (skip eliminated ones)
    let count = 0;
    while (count < k) {
      if (persons[currentIndex] === 0) {
        count++;
      }
      if (count < k) {
        currentIndex = (currentIndex + 1) % n;
      }
    }

    // Eliminate the k-th alive person
    persons[currentIndex] = 1;
    personsLeft--;

    // Move to next alive person
    do {
      currentIndex = (currentIndex + 1) % n;
    } while (persons[currentIndex] === 1);

    return winner();
  }

  return winner();
}
