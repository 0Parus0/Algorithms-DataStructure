/*
380. Insert Delete GetRandom O(1)
Medium
Topics
premium lock icon
Companies
Implement the RandomizedSet class:

RandomizedSet() Initializes the RandomizedSet object.
bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise.
bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise.
int getRandom() Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.
You must implement the functions of the class such that each function works in average O(1) time complexity.

 

Example 1:

Input
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output
[null, true, false, true, 2, true, false, 2]

Explanation
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
randomizedSet.insert(2); // 2 was already in the set, so return false.
randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.
 

Constraints:

-231 <= val <= 231 - 1
At most 2 * 105 calls will be made to insert, remove, and getRandom.
There will be at least one element in the data structure when getRandom is called.
*/

// ========================================================================
// 1. SECTION NAME
// ========================================================================

class RandomizedSet {
  constructor() {
    this.map = new Map(); // Stores: val -> index in the array
    this.list = []; // Stores: values
  }

  /**
   * @param {number} val
   * @return {boolean}
   */
  insert(val) {
    if (this.map.has(val)) return false;

    // Add to map with the index being the current length of the array
    this.map.set(val, this.list.length);
    this.list.push(val);
    return true;
  }

  /**
   * @param {number} val
   * @return {boolean}
   */
  remove(val) {
    if (!this.map.has(val)) return false;

    const indexToRemove = this.map.get(val);
    const lastElement = this.list[this.list.length - 1];

    // 1. Move the last element to the position of the element we want to remove
    this.list[indexToRemove] = lastElement;

    // 2. Update the map with the last element's new index
    this.map.set(lastElement, indexToRemove);

    // 3. Remove the last element from both structures
    this.list.pop();
    this.map.delete(val);

    return true;
  }

  /**
   * @return {number}
   */
  getRandom() {
    // Pick a random index between 0 and list.length - 1
    const randomIndex = Math.floor(Math.random() * this.list.length);
    return this.list[randomIndex];
  }
}

// ========================================================================
// 2. Approach Two Faster (using POJOs)
// ========================================================================

var RandomizedSet = function () {
  this.vals = [];
  this.valToIndex = {};
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (val in this.valToIndex) return false;

  this.vals.push(val);
  this.valToIndex[val] = this.vals.length - 1;
  return true;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (!(val in this.valToIndex)) return false;
  const lastVal = this.vals[this.vals.length - 1];
  const idx = this.valToIndex[val];
  this.vals[idx] = lastVal;
  this.valToIndex[lastVal] = idx;
  this.vals.pop();
  delete this.valToIndex[val];
  return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  const randomIndex = Math.floor(Math.random() * this.vals.length);
  return this.vals[randomIndex];
};
