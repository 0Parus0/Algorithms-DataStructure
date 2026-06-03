/*
1109. Corporate Flight Bookings
Solved
Medium
Topics
premium lock icon
Companies
There are n flights that are labeled from 1 to n.

You are given an array of flight bookings bookings, where bookings[i] = [firsti, lasti, seatsi] represents a booking for flights firsti through lasti (inclusive) with seatsi seats reserved for each flight in the range.

Return an array answer of length n, where answer[i] is the total number of seats reserved for flight i.

 

Example 1:

Input: bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
Output: [10,55,45,25,25]
Explanation:
Flight labels:        1   2   3   4   5
Booking 1 reserved:  10  10
Booking 2 reserved:      20  20
Booking 3 reserved:      25  25  25  25
Total seats:         10  55  45  25  25
Hence, answer = [10,55,45,25,25]
Example 2:

Input: bookings = [[1,2,10],[2,2,15]], n = 2
Output: [10,25]
Explanation:
Flight labels:        1   2
Booking 1 reserved:  10  10
Booking 2 reserved:      15
Total seats:         10  25
Hence, answer = [10,25]
*/
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
  const result = new Int32Array(n);

  for (const [first, last, seats] of bookings) {
    result[first - 1] += seats;

    if (last < n) {
      result[last] -= seats;
    }
  }

  for (let i = 1; i < n; i++) {
    result[i] += result[i - 1];
  }

  return result;
};

var corpFlightBookings = function (bookings, n) {
  const result = new Int32Array(n);
  const len = bookings.length;

  for (let i = 0; i < len; i++) {
    const booking = bookings[i];
    const first = booking[0];
    const last = booking[1];
    const seats = booking[2];

    result[first - 1] += seats;
    if (last < n) {
      result[last] -= seats;
    }
  }

  for (let i = 1; i < n; i++) {
    result[i] += result[i - 1];
  }

  return result;
};
