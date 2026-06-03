/*
LFU Cache
Hard
Topics
premium lock icon
Companies
Design and implement a data structure for a Least Frequently Used (LFU) cache.
Implement the LFUCache class:
LFUCache(int capacity) Initializes the object with the capacity of the data structure.
int get(int key) Gets the value of the key if the key exists in the cache. Otherwise, returns -1.
void put(int key, int value) Update the value of the key if present, or inserts the key if not already present. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item. For this problem, when there is a tie (i.e., two or more keys with the same frequency), the least recently used key would be invalidated.
To determine the least frequently used key, a use counter is maintained for each key in the cache. The key with the smallest use counter is the least frequently used key.
When a key is first inserted into the cache, its use counter is set to 1 (due to the put operation). The use counter for a key in the cache is incremented either a get or put operation is called on it.
The functions get and put must each run in O(1) average time complexity.
Example 1:
Input
["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]
Explanation
cnt(x) = the use counter for key x
cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
LFUCache lfu = new LFUCache(2);
lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
lfu.get(1);      // return 1
cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
cache=[3,1], cnt(3)=1, cnt(1)=2
lfu.get(2);      // return -1 (not found)
lfu.get(3);      // return 3
cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
cache=[4,3], cnt(4)=1, cnt(3)=2
lfu.get(1);      // return -1 (not found)
lfu.get(3);      // return 3
cache=[3,4], cnt(4)=1, cnt(3)=3
lfu.get(4);      // return 4
cache=[4,3], cnt(4)=2, cnt(3)=3
Constraints:
1 <= capacity <= 104
0 <= key <= 105
0 <= value <= 109
At most 2 * 105 calls will be made to get and put.
*/
class LFUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.minFreq = 0;

    this.valuesMap = new Map(); // key -> value
    this.countsMap = new Map(); // key -> frequency
    this.freqListMap = new Map(); // frequency -> Set(keys)
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (!this.valuesMap.has(key)) return -1;

    const value = this.valuesMap.get(key);
    this._updateFrequency(key);
    return value;
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.capacity <= 0) return;

    if (this.valuesMap.has(key)) {
      this.valuesMap.set(key, value);
      this._updateFrequency(key);
      return;
    }

    if (this.size >= this.capacity) {
      this._evictLRU();
    }

    // Insert new item
    this.valuesMap.set(key, value);
    this.countsMap.set(key, 1);
    this.minFreq = 1;
    this.size++;

    if (!this.freqListMap.has(1)) {
      this.freqListMap.set(1, new Set());
    }
    this.freqListMap.get(1).add(key);
  }

  /**
   * Helper to increment frequency and manage minFreq
   */
  _updateFrequency(key) {
    const count = this.countsMap.get(key);
    this.countsMap.set(key, count + 1);

    // Remove from current frequency set
    const oldSet = this.freqListMap.get(count);
    oldSet.delete(key);

    // If the current minFreq set is empty, increment minFreq
    if (count === this.minFreq && oldSet.size === 0) {
      this.minFreq++;
    }

    // Add to new frequency set
    if (!this.freqListMap.has(count + 1)) {
      this.freqListMap.set(count + 1, new Set());
    }
    this.freqListMap.get(count + 1).add(key);
  }

  /**
   * Helper to remove the LFU (and LRU tie-breaker) item
   */
  _evictLRU() {
    const lfuSet = this.freqListMap.get(this.minFreq);

    // The first element in the Set is the Least Recently Used
    const keyToEvict = lfuSet.values().next().value;

    lfuSet.delete(keyToEvict);
    this.valuesMap.delete(keyToEvict);
    this.countsMap.delete(keyToEvict);
    this.size--;
  }
}

// ========================================================================
// 1. SECTION NAME
// ========================================================================
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.freq = 1;
    this.prev = null;
    this.next = null;
  }
}

// A standard Doubly Linked List used to implement LRU logic
class DoublyLinkedList {
  constructor() {
    this.head = new Node(0, 0); // Dummy
    this.tail = new Node(0, 0); // Dummy
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }

  // Add to the front (Most Recently Used)
  addNode(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
    this.size++;
  }

  // Remove a specific node
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
  }

  // Remove the last node (Least Recently Used)
  removeTail() {
    if (this.size === 0) return null;
    const res = this.tail.prev;
    this.removeNode(res);
    return res;
  }
}

class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.currentSize = 0;
    this.minFreq = 0;
    this.cache = new Map(); // key -> Node
    this.freqMap = new Map(); // frequency -> DoublyLinkedList (LRU)
  }

  get(key) {
    const node = this.cache.get(key);
    if (!node) return -1;
    this._update(node);
    return node.value;
  }

  put(key, value) {
    if (this.capacity === 0) return;

    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value;
      this._update(node);
    } else {
      if (this.currentSize === this.capacity) {
        // Get the LRU list for the minimum frequency
        const minFreqList = this.freqMap.get(this.minFreq);
        // Evict the LRU (tail) from that specific frequency list
        const evictedNode = minFreqList.removeTail();
        this.cache.delete(evictedNode.key);
        this.currentSize--;
      }

      const newNode = new Node(key, value);
      this.cache.set(key, newNode);

      // New items always start at frequency 1
      this.minFreq = 1;
      this._addNodeToFreqList(1, newNode);
      this.currentSize++;
    }
  }

  // Logic to move a node from its current frequency LRU to the next
  _update(node) {
    const oldFreq = node.freq;
    const oldList = this.freqMap.get(oldFreq);
    oldList.removeNode(node);

    // If the current minFreq list becomes empty, update minFreq
    if (oldFreq === this.minFreq && oldList.size === 0) {
      this.minFreq++;
    }

    node.freq++;
    this._addNodeToFreqList(node.freq, node);
  }

  _addNodeToFreqList(freq, node) {
    if (!this.freqMap.has(freq)) {
      this.freqMap.set(freq, new DoublyLinkedList());
    }
    this.freqMap.get(freq).addNode(node);
  }
}
