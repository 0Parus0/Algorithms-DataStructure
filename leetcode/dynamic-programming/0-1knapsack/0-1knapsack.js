/*
The 0-1 Knapsack Problem is a classic dynamic programming problem. Here's a comprehensive explanation with multiple solutions:
Problem Statement

Given:

    weights[] - array of item weights

    values[] - array of item values

    capacity - maximum weight the knapsack can hold

Goal: Maximize the total value without exceeding the capacity. Each item can be taken at most once (0 or 1).
*/

function knapsack(values, weights, W) {
  const n = values.length;

  // dp[i][w] = maximum value using first i items with capacity w
  const dp = Array.from({ length: n }, () => new Array(W + 1).fill(-1));

  // Recursive helper with memoiztion
  function solve(i, capacity) {
    //Base case
    if (i < 0 || capacity <= 0) return 0;

    // Return cached result
    if (dp[i][capacity] !== -1) return dp[i][capacity];

    // Option 1: skip the current item
    const skip = solve(i - 1, capacity);

    // Option 2: Include the current item only if it fits
    let take = 0;
    if (weights[i] <= capacity) {
      take = values[i] + solve(i - 1, capacity - weights[i]);
    }

    // Store and return the maximum of both choices
    dp[i][capacity] = Math.max(skip, take);
    return dp[i][capacity];
  }

  // Start recursion from last item with full capacity
  return solve(n - 1, W);
}

function knapSack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n }, () => new Array(capacity + 1).fill(0));

  // Base case: first item
  for (let w = weights[0]; w <= capacity; w++) {
    dp[0][w] = values[0];
  }

  // Fill dp table
  for (let i = 1; i < n; i++) {
    for (let w = 0; w <= capacity; w++) {
      const notTake = dp[i - 1][w];
      let take = 0;
      if (weights[i] <= w) {
        take = values[i] + dp[i - 1][w - weights[i]];
      }

      dp[i][w] = Math.max(take, notTake);
    }
  }
  console.log(dp);

  return dp[n - 1][capacity];
}

function knapSack(weights, values, capacity) {
  const n = weights.length;
  let prev = new Array(capacity + 1).fill(0);
  let curr = new Array(capacity + 1).fill(0);

  for (let i = 0; i < n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i] <= w) {
        // You can either take this item or skip it
        curr[w] = Math.max(
          prev[w], // skip
          values[i] + prev[w - weights[i]] // take
        );
      } else {
        curr[w] = prev[w]; // item too heavy
      }
    }
    // Move current row results to previous for iteration
    prev = [...curr];
  }

  return prev[capacity];
}

function knapSack1(weights, values, capacity) {
  const n = weights.length;
  let dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < n; i++) {
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
    }
  }
  return dp[capacity];
}

/*
| Version                 | Time            | Space           |
| ----------------------- | --------------- | --------------- |
| Recursion + Memoization | O(N × Capacity) | O(N × Capacity) |
| Bottom-Up (2D)          | O(N × Capacity) | O(N × Capacity) |
| Space-Optimized (1D)    | O(N × Capacity) | O(Capacity)     |
*/

// Test case 1
console.log(knapSack([1, 3, 4, 5], [1, 4, 5, 7], 7)); // 9

// Test case 2
console.log(knapSack([10, 20, 30], [60, 100, 120], 50)); // 220

// Test case 3
console.log(knapSack([1, 2, 3], [10, 15, 40], 6)); // 65

// Test case 4 (edge case)
console.log(knapSack([5, 4, 6], [10, 40, 30], 10)); // 70
