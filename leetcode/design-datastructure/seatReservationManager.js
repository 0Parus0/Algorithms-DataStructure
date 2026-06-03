/*
1845. Seat Reservation Manager
Medium
Topics
premium lock icon
Companies
Hint
Design a system that manages the reservation state of n seats that are numbered from 1 to n.

Implement the SeatManager class:

SeatManager(int n) Initializes a SeatManager object that will manage n seats numbered from 1 to n. All seats are initially available.
int reserve() Fetches the smallest-numbered unreserved seat, reserves it, and returns its number.
void unreserve(int seatNumber) Unreserves the seat with the given seatNumber.
 

Example 1:

Input
["SeatManager", "reserve", "reserve", "unreserve", "reserve", "reserve", "reserve", "reserve", "unreserve"]
[[5], [], [], [2], [], [], [], [], [5]]
Output
[null, 1, 2, null, 2, 3, 4, 5, null]

Explanation
SeatManager seatManager = new SeatManager(5); // Initializes a SeatManager with 5 seats.
seatManager.reserve();    // All seats are available, so return the lowest numbered seat, which is 1.
seatManager.reserve();    // The available seats are [2,3,4,5], so return the lowest of them, which is 2.
seatManager.unreserve(2); // Unreserve seat 2, so now the available seats are [2,3,4,5].
seatManager.reserve();    // The available seats are [2,3,4,5], so return the lowest of them, which is 2.
seatManager.reserve();    // The available seats are [3,4,5], so return the lowest of them, which is 3.
seatManager.reserve();    // The available seats are [4,5], so return the lowest of them, which is 4.
seatManager.reserve();    // The only available seat is seat 5, so return 5.
seatManager.unreserve(5); // Unreserve seat 5, so now the available seats are [5].
 

Constraints:

1 <= n <= 105
1 <= seatNumber <= n
For each call to reserve, it is guaranteed that there will be at least one unreserved seat.
For each call to unreserve, it is guaranteed that seatNumber will be reserved.
At most 105 calls in total will be made to reserve and unreserve.
*/
class SeatManager {
  /**
   * @param {number} n
   */
  constructor(n) {
    this.marker = 1;
    this.minHeap = [];
  }

  /**
   * @return {number}
   */
  reserve() {
    // If we have unreserved seats in the heap, they are guaranteed
    // to be smaller than the marker.
    if (this.minHeap.length > 0) {
      return this._pop();
    }

    // Otherwise, take the next seat that has never been used
    const seat = this.marker;
    this.marker++;
    return seat;
  }

  /**
   * @param {number} seatNumber
   * @return {void}
   */
  unreserve(seatNumber) {
    this._push(seatNumber);
  }

  // --- Min-Heap Helper Methods ---

  _push(val) {
    this.minHeap.push(val);
    let idx = this.minHeap.length - 1;

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.minHeap[idx] >= this.minHeap[parentIdx]) break;

      [this.minHeap[idx], this.minHeap[parentIdx]] = [
        this.minHeap[parentIdx],
        this.minHeap[idx],
      ];
      idx = parentIdx;
    }
  }

  _pop() {
    if (this.minHeap.length === 1) return this.minHeap.pop();

    const min = this.minHeap[0];
    this.minHeap[0] = this.minHeap.pop();

    let idx = 0;
    while (true) {
      let left = 2 * idx + 1;
      let right = 2 * idx + 2;
      let smallest = idx;

      if (
        left < this.minHeap.length &&
        this.minHeap[left] < this.minHeap[smallest]
      ) {
        smallest = left;
      }
      if (
        right < this.minHeap.length &&
        this.minHeap[right] < this.minHeap[smallest]
      ) {
        smallest = right;
      }

      if (smallest === idx) break;

      [this.minHeap[idx], this.minHeap[smallest]] = [
        this.minHeap[smallest],
        this.minHeap[idx],
      ];
      idx = smallest;
    }
    return min;
  }
}
/*
reserve(): 
O
(logk)
O(logk)
 where k
k
 is the number of unreserved seats.
unreserve(): 
O
(
log
⁡
k
)
O(logk)
.
Initialization: 
O
(
1
)
O(1)
. We don't pre-fill the heap with 
N
N
 elements, saving 
O
(
N
)
O(N)
 time and memory.
Space Complexity: 
O
(
N
)
O(N)
 in the absolute worst case (if all seats are reserved and then all are unreserved), but typically much lower.
 */
