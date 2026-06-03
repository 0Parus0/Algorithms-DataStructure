/*
706. Design HashMap
Easy
Topics
premium lock icon
Companies
Design a HashMap without using any built-in hash table libraries.

Implement the MyHashMap class:

MyHashMap() initializes the object with an empty map.
void put(int key, int value) inserts a (key, value) pair into the HashMap. If the key already exists in the map, update the corresponding value.
int get(int key) returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
void remove(key) removes the key and its corresponding value if the map contains the mapping for the key.
 

Example 1:

Input
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
Output
[null, null, null, 1, -1, null, 1, null, -1]

Explanation
MyHashMap myHashMap = new MyHashMap();
myHashMap.put(1, 1); // The map is now [[1,1]]
myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]
 

Constraints:

0 <= key, value <= 106
At most 104 calls will be made to put, get, and remove.
*/
class MyHashMap {
  constructor() {
    // Using a prime number for capacity helps distribute keys more evenly
    this.capacity = 1001;
    this.table = new Array(this.capacity).fill(null).map(() => []);
  }

  /**
   * @param {number} key
   * @return {number}
   */
  _hash(key) {
    return key % this.capacity;
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    const index = this._hash(key);
    const bucket = this.table[index];

    for (let i = 0; i < bucket.length; i++) {
      // If key already exists, update the value
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    // If key does not exist, push a new pair
    bucket.push([key, value]);
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    const index = this._hash(key);
    const bucket = this.table[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }

    return -1;
  }

  /**
   * @param {number} key
   * @return {void}
   */
  remove(key) {
    const index = this._hash(key);
    const bucket = this.table[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        // Remove the pair from the array
        bucket.splice(i, 1);
        return;
      }
    }
  }
}

// ========================================================================
// 1. SECTION NAME
// ========================================================================

class MyHashMap {
  constructor(capacity = 1001) {
    this.capacity = capacity;
    this.size = 0;
    this.loadFactor = 0.75;
    this.table = Array.from({ length: this.capacity }, () => []);
  }

  _hash(key) {
    return key % this.capacity;
  }

  _resize() {
    const oldTable = this.table;
    this.capacity = Math.floor(this.capacity * 2);
    this.table = Array.from({ length: this.capacity }, () => []);
    this.size = 0;

    for (const bucket of oldTable) {
      for (const [key, value] of bucket) {
        this.put(key, value);
      }
    }
  }

  put(key, value) {
    const index = this._hash(key);
    const bucket = this.table[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this._resize();
    }
  }

  get(key) {
    const index = this._hash(key);
    const bucket = this.table[index];

    for (const [k, v] of bucket) {
      if (k === key) return v;
    }

    return -1;
  }

  remove(key) {
    const index = this._hash(key);
    const bucket = this.table[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        // O(1) removal trick
        const lastIdx = bucket.length - 1;
        if (i !== lastIdx) {
          [bucket[i], bucket[lastIdx]] = [bucket[lastIdx], bucket[i]];
        }
        bucket.pop();
        this.size--;
        return;
      }
    }
  }
}
