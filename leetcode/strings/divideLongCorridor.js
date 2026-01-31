/*
2147. Number of Ways to Divide a Long Corridor
Hard
Topics
premium lock icon
Companies
Hint
Along a long library corridor, there is a line of seats and decorative plants. You are given a 0-indexed string corridor of length n consisting of letters 'S' and 'P' where each 'S' represents a seat and each 'P' represents a plant.

One room divider has already been installed to the left of index 0, and another to the right of index n - 1. Additional room dividers can be installed. For each position between indices i - 1 and i (1 <= i <= n - 1), at most one divider can be installed.

Divide the corridor into non-overlapping sections, where each section has exactly two seats with any number of plants. There may be multiple ways to perform the division. Two ways are different if there is a position with a room divider installed in the first way but not in the second way.

Return the number of ways to divide the corridor. Since the answer may be very large, return it modulo 109 + 7. If there is no way, return 0.

 

Example 1:


Input: corridor = "SSPPSPS"
Output: 3
Explanation: There are 3 different ways to divide the corridor.
The black bars in the above image indicate the two room dividers already installed.
Note that in each of the ways, each section has exactly two seats.
Example 2:


Input: corridor = "PPSPSP"
Output: 1
Explanation: There is only 1 way to divide the corridor, by not installing any additional dividers.
Installing any would create some section that does not have exactly two seats.
Example 3:


Input: corridor = "S"
Output: 0
Explanation: There is no way to divide the corridor because there will always be a section that does not have exactly two seats.
 

Constraints:

n == corridor.length
1 <= n <= 105
corridor[i] is either 'S' or 'P'.
*/

function numberOfWays(corridor) {
  const n = corridor.length;
  const mod = 1e9 + 7;
  // Storing seats indices
  const seatIndices = [];

  for (let i = 0; i < n; i++) {
    if (corridor[i] === "S") seatIndices.push(i);
  }

  // Check if there are no seats or there are odd number of seats
  if (!seatIndices.length || seatIndices.length % 2 !== 0) return 0;

  let result = 1; // Product
  let prevEndIdx = seatIndices[1]; // End index of the previous 2-seat group/subarray

  for (let i = 2; i < seatIndices.length; i += 2) {
    // Number of indices between two seats pairs
    let len = seatIndices[i] - prevEndIdx;

    result = (result * len) % mod;
    prevEndIdx = seatIndices[i + 1];
  }
  return result;
}

/*
"""
#Plan
Approach: Group Seats and Count Gaps

Key Insights:
1. Total seats must be even and at least 2
2. We divide seats into pairs: (S1,S2), (S3,S4), etc.
3. Between each pair of seat-pairs, we can place dividers in the gaps between plants
4. The number of ways = product of (gaps + 1) between consecutive seat-pairs

Algorithm:
1. Find all seat positions
2. If total seats not even or < 2, return 0
3. Group seats into pairs: 1st-2nd, 3rd-4th, etc.
4. For gaps between pairs: ways = multiply (distance between pairs)
5. Return product modulo 10^9+7

Example: "SSPPSPS"
Seats at indices: [0,1,4,6]
Pairs: (0,1) and (4,6)
Gap between pairs: from index 2 to 3 → 2 positions → 2+1=3 ways
"""
*/

/**
 * Calculates the number of ways to divide the royal corridor
 * @param {string} corridor - String of 'S' (seats) and 'P' (plants)
 * @return {number} - Number of valid divisions modulo 10^9+7
 */
function countCorridorDivisions(corridor) {
  const MOD = 1000000007n;

  // Step 1: Find all seat positions
  const seatIndices = [];
  for (let i = 0; i < corridor.length; i++) {
    if (corridor[i] === "S") {
      seatIndices.push(i);
    }
  }

  const totalSeats = seatIndices.length;

  // Step 2: Check basic validity
  if (totalSeats % 2 !== 0 || totalSeats < 2) {
    return 0;
  }

  // Step 3: Calculate number of ways
  let result = 1n;

  // For each pair of seat-pairs (skip first pair)
  for (let i = 2; i < totalSeats; i += 2) {
    // The gap between current pair's first seat and previous pair's last seat
    const gap = seatIndices[i] - seatIndices[i - 1];
    result = (result * BigInt(gap)) % MOD;
  }

  return Number(result);
}

// More detailed implementation with step-by-step explanation
function countCorridorDivisionsDetailed(corridor) {
  const MOD = 1000000007n;
  const n = corridor.length;

  // Collect all seat positions
  const seats = [];
  for (let i = 0; i < n; i++) {
    if (corridor[i] === "S") {
      seats.push(i);
    }
  }

  const numSeats = seats.length;

  // Validation checks
  if (numSeats === 0 || numSeats % 2 !== 0) {
    return 0;
  }

  // If exactly 2 seats, only 1 way (no additional dividers)
  if (numSeats === 2) {
    return 1;
  }

  let ways = 1n;

  // Process each section between seat pairs
  for (let i = 2; i < numSeats; i += 2) {
    // The number of positions where we CAN place a divider
    // between the (i-1)th seat and (i)th seat
    const gap = seats[i] - seats[i - 1];
    ways = (ways * BigInt(gap)) % MOD;
  }

  return Number(ways);
}

// Alternative approach using traversal without storing all indices
function countCorridorDivisionsOptimized(corridor) {
  const MOD = 1000000007n;
  let totalSeats = 0;

  // First pass: count total seats
  for (let i = 0; i < corridor.length; i++) {
    if (corridor[i] === "S") totalSeats++;
  }

  // Basic validation
  if (totalSeats % 2 !== 0 || totalSeats < 2) return 0;
  if (totalSeats === 2) return 1;

  let result = 1n;
  let seatCount = 0;
  let previousSeatIndex = -1;

  for (let i = 0; i < corridor.length; i++) {
    if (corridor[i] === "S") {
      seatCount++;

      // When we complete a pair and start a new one
      if (seatCount % 2 === 0 && seatCount < totalSeats) {
        // Store the index of this seat (end of current pair)
        previousSeatIndex = i;
      }
      // When we start a new pair (odd seat count > 2)
      else if (seatCount % 2 === 1 && seatCount > 2) {
        // Calculate gap between pairs
        const gap = i - previousSeatIndex;
        result = (result * BigInt(gap)) % MOD;
      }
    }
  }

  return Number(result);
}

// Custom Test Cases
console.log("Test 1:", countCorridorDivisions("SSPPSPS")); // 3
console.log("Test 2:", countCorridorDivisions("PPSPSP")); // 1
console.log("Test 3:", countCorridorDivisions("S")); // 0
console.log("Test 4:", countCorridorDivisions("SS")); // 1
console.log("Test 5:", countCorridorDivisions("SPPSSPPPSS")); // 6

// Edge cases
console.log("Edge 1 - No seats:", countCorridorDivisions("PPP")); // 0
console.log("Edge 2 - Odd seats:", countCorridorDivisions("SSS")); // 0
console.log("Edge 3 - Only seats:", countCorridorDivisions("SSSS")); // 2
console.log("Edge 4 - Alternating:", countCorridorDivisions("SPSPSP")); // 1

// Let's trace through the first example
console.log("\n--- Tracing 'SSPPSPS' ---");
console.log("Seat positions: [0, 1, 4, 6]");
console.log("Seat pairs: (0,1) and (4,6)");
console.log("Gap between pairs: from index 2 to 3");
console.log("Possible divider positions: between 1-2, 2-3, 3-4");
console.log("That's 3 choices → 3 ways total");
