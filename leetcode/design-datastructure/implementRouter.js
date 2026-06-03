/*
3508. Implement Router
Medium
Topics
premium lock icon
Companies
Hint
Design a data structure that can efficiently manage data packets in a network router. Each data packet consists of the following attributes:

source: A unique identifier for the machine that generated the packet.
destination: A unique identifier for the target machine.
timestamp: The time at which the packet arrived at the router.
Implement the Router class:

Router(int memoryLimit): Initializes the Router object with a fixed memory limit.

memoryLimit is the maximum number of packets the router can store at any given time.
If adding a new packet would exceed this limit, the oldest packet must be removed to free up space.
bool addPacket(int source, int destination, int timestamp): Adds a packet with the given attributes to the router.

A packet is considered a duplicate if another packet with the same source, destination, and timestamp already exists in the router.
Return true if the packet is successfully added (i.e., it is not a duplicate); otherwise return false.
int[] forwardPacket(): Forwards the next packet in FIFO (First In First Out) order.

Remove the packet from storage.
Return the packet as an array [source, destination, timestamp].
If there are no packets to forward, return an empty array.
int getCount(int destination, int startTime, int endTime):

Returns the number of packets currently stored in the router (i.e., not yet forwarded) that have the specified destination and have timestamps in the inclusive range [startTime, endTime].
Note that queries for addPacket will be made in non-decreasing order of timestamp.

 

Example 1:

Input:
["Router", "addPacket", "addPacket", "addPacket", "addPacket", "addPacket", "forwardPacket", "addPacket", "getCount"]
[[3], [1, 4, 90], [2, 5, 90], [1, 4, 90], [3, 5, 95], [4, 5, 105], [], [5, 2, 110], [5, 100, 110]]

Output:
[null, true, true, false, true, true, [2, 5, 90], true, 1]

Explanation

Router router = new Router(3); // Initialize Router with memoryLimit of 3.
router.addPacket(1, 4, 90); // Packet is added. Return True.
router.addPacket(2, 5, 90); // Packet is added. Return True.
router.addPacket(1, 4, 90); // This is a duplicate packet. Return False.
router.addPacket(3, 5, 95); // Packet is added. Return True
router.addPacket(4, 5, 105); // Packet is added, [1, 4, 90] is removed as number of packets exceeds memoryLimit. Return True.
router.forwardPacket(); // Return [2, 5, 90] and remove it from router.
router.addPacket(5, 2, 110); // Packet is added. Return True.
router.getCount(5, 100, 110); // The only packet with destination 5 and timestamp in the inclusive range [100, 110] is [4, 5, 105]. Return 1.
Example 2:

Input:
["Router", "addPacket", "forwardPacket", "forwardPacket"]
[[2], [7, 4, 90], [], []]

Output:
[null, true, [7, 4, 90], []]

Explanation

Router router = new Router(2); // Initialize Router with memoryLimit of 2.
router.addPacket(7, 4, 90); // Return True.
router.forwardPacket(); // Return [7, 4, 90].
router.forwardPacket(); // There are no packets left, return [].
 

Constraints:

2 <= memoryLimit <= 105
1 <= source, destination <= 2 * 105
1 <= timestamp <= 109
1 <= startTime <= endTime <= 109
At most 105 calls will be made to addPacket, forwardPacket, and getCount methods altogether.
queries for addPacket will be made in non-decreasing order of timestamp.
*/

// ========================================================================
// 1. SECTION NAME
// ========================================================================

class Router {
  constructor(memoryLimit) {
    this.limit = memoryLimit;
    this.size = 0;
    this.gq = [];
    this.gqHead = 0;
    this.duplicateSet = new Set();
    this.destQueues = new Map(); // destination -> { arr: [], head: 0 }
  }

  addPacket(source, destination, timestamp) {
    const key = `${source}-${destination}-${timestamp}`;
    if (this.duplicateSet.has(key)) return false;

    this.gq.push({ source, destination, timestamp });
    this.duplicateSet.add(key);
    this.size++;

    if (!this.destQueues.has(destination)) {
      this.destQueues.set(destination, { arr: [], head: 0 });
    }
    this.destQueues.get(destination).arr.push(timestamp);

    if (this.size > this.limit) {
      this._removeOldest();
    }

    return true;
  }

  forwardPacket() {
    if (this.size === 0) return [];

    const pkt = this._removeOldest();
    return [pkt.source, pkt.destination, pkt.timestamp];
  }

  getCount(destination, startTime, endTime) {
    if (!this.destQueues.has(destination)) return 0;

    const { arr, head } = this.destQueues.get(destination);

    // Find the first index i >= head such that arr[i] >= startTime
    let left = head;
    let right = arr.length - 1;
    let startIdx = -1;
    while (left <= right) {
      let mid = (left + right) >> 1;
      if (arr[mid] >= startTime) {
        startIdx = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    if (startIdx === -1) return 0;

    // Find the last index j >= startIdx such that arr[j] <= endTime
    left = startIdx;
    right = arr.length - 1;
    let endIdx = -1;
    while (left <= right) {
      let mid = (left + right) >> 1;
      if (arr[mid] <= endTime) {
        endIdx = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    if (endIdx === -1) return 0;

    return endIdx - startIdx + 1;
  }

  _removeOldest() {
    const pkt = this.gq[this.gqHead];
    const key = `${pkt.source}-${pkt.destination}-${pkt.timestamp}`;

    // Remove from duplicate tracking
    this.duplicateSet.delete(key);

    // Advance pointer in destination-specific queue
    const dq = this.destQueues.get(pkt.destination);
    dq.head++;

    // Clean up global queue reference and move pointer
    this.gq[this.gqHead] = null; // GC optimization
    this.gqHead++;
    this.size--;

    return pkt;
  }
}

// ========================================================================
// 1. SECTION NAME
// ========================================================================

class Router {
  /**
   * @param {number} memoryLimit
   */
  constructor(memoryLimit) {
    this.limit = memoryLimit;
    this.size = 0;
    this.gq = [];
    this.gqHead = 0;
    this.duplicateSet = new Set();
    this.destQueues = new Map(); // destination -> { arr: [], head: 0 }
  }

  /**
   * @param {number} source
   * @param {number} destination
   * @param {number} timestamp
   * @return {boolean}
   */
  addPacket(source, destination, timestamp) {
    const key = `${source}-${destination}-${timestamp}`;
    if (this.duplicateSet.has(key)) return false;

    // Add to global storage
    this.gq.push({ source, destination, timestamp });
    this.duplicateSet.add(key);
    this.size++;

    // Add to destination-specific sorted storage
    if (!this.destQueues.has(destination)) {
      this.destQueues.set(destination, { arr: [], head: 0 });
    }
    this.destQueues.get(destination).arr.push(timestamp);

    // Enforce memory limit
    if (this.size > this.limit) {
      this._removeOldest();
    }

    return true;
  }

  /**
   * @return {number[]}
   */
  forwardPacket() {
    if (this.size === 0) return [];

    const pkt = this._removeOldest();
    return [pkt.source, pkt.destination, pkt.timestamp];
  }

  /**
   * @param {number} destination
   * @param {number} startTime
   * @param {number} endTime
   * @return {number}
   */
  getCount(destination, startTime, endTime) {
    if (!this.destQueues.has(destination)) return 0;

    const { arr, head } = this.destQueues.get(destination);

    // Find the first index i >= head such that arr[i] >= startTime
    let left = head;
    let right = arr.length - 1;
    let startIdx = -1;
    while (left <= right) {
      let mid = (left + right) >> 1;
      if (arr[mid] >= startTime) {
        startIdx = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    if (startIdx === -1) return 0;

    // Find the last index j >= startIdx such that arr[j] <= endTime
    left = startIdx;
    right = arr.length - 1;
    let endIdx = -1;
    while (left <= right) {
      let mid = (left + right) >> 1;
      if (arr[mid] <= endTime) {
        endIdx = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    if (endIdx === -1) return 0;

    return endIdx - startIdx + 1;
  }

  /**
   * Helper to remove the oldest packet globally and locally
   * @private
   */
  _removeOldest() {
    const pkt = this.gq[this.gqHead];
    const key = `${pkt.source}-${pkt.destination}-${pkt.timestamp}`;

    // Remove from duplicate tracking
    this.duplicateSet.delete(key);

    // Advance pointer in destination-specific queue
    const dq = this.destQueues.get(pkt.destination);
    dq.head++;

    // Clean up global queue reference and move pointer
    this.gq[this.gqHead] = null; // GC optimization
    this.gqHead++;
    this.size--;

    return pkt;
  }
}
// ========================================================================
// 1. SECTION NAME
// ========================================================================
class Router {
  constructor(memoryLimit) {
    this.memoryLimit = memoryLimit;
    this.queue = []; // FIFO queue
    this.head = 0; // pointer to front of queue
    this.packetSet = new Set();
    this.destMap = new Map(); // destination -> array of timestamps
  }

  // Binary search to insert timestamp in sorted order
  _insertTimestamp(dest, timestamp) {
    if (!this.destMap.has(dest)) {
      this.destMap.set(dest, []);
    }
    const arr = this.destMap.get(dest);
    let left = 0,
      right = arr.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < timestamp) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    arr.splice(left, 0, timestamp);
  }

  // Binary search to find and remove timestamp
  _removeTimestamp(dest, timestamp) {
    const arr = this.destMap.get(dest);
    if (!arr) return;
    let left = 0,
      right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === timestamp) {
        arr.splice(mid, 1);
        if (arr.length === 0) this.destMap.delete(dest);
        return;
      } else if (arr[mid] < timestamp) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  addPacket(source, destination, timestamp) {
    const key = `${source},${destination},${timestamp}`;
    if (this.packetSet.has(key)) return false;

    if (this.queue.length - this.head >= this.memoryLimit) {
      // Remove oldest packet
      const oldest = this.queue[this.head];
      this.head++;
      const oldKey = `${oldest[0]},${oldest[1]},${oldest[2]}`;
      this.packetSet.delete(oldKey);
      this._removeTimestamp(oldest[1], oldest[2]);
    }

    this.queue.push([source, destination, timestamp]);
    this.packetSet.add(key);
    this._insertTimestamp(destination, timestamp);
    return true;
  }

  forwardPacket() {
    if (this.queue.length === this.head) return [];
    const packet = this.queue[this.head];
    this.head++;
    const key = `${packet[0]},${packet[1]},${packet[2]}`;
    this.packetSet.delete(key);
    this._removeTimestamp(packet[1], packet[2]);
    return packet;
  }

  getCount(destination, startTime, endTime) {
    const arr = this.destMap.get(destination);
    if (!arr) return 0;

    // Binary search for start and end indices
    let left = 0,
      right = arr.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < startTime) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    const startIdx = left;

    ((left = 0), (right = arr.length));
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] <= endTime) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    const endIdx = left;

    return endIdx - startIdx;
  }
}
