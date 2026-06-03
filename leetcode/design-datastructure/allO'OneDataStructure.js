/*
432. All O`one Data Structure
Hard
Topics
premium lock icon
Companies
Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.

Implement the AllOne class:

AllOne() Initializes the object of the data structure.
inc(String key) Increments the count of the string key by 1. If key does not exist in the data structure, insert it with count 1.
dec(String key) Decrements the count of the string key by 1. If the count of key is 0 after the decrement, remove it from the data structure. It is guaranteed that key exists in the data structure before the decrement.
getMaxKey() Returns one of the keys with the maximal count. If no element exists, return an empty string "".
getMinKey() Returns one of the keys with the minimum count. If no element exists, return an empty string "".
Note that each function must run in O(1) average time complexity.

 

Example 1:

Input
["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
[[], ["hello"], ["hello"], [], [], ["leet"], [], []]
Output
[null, null, null, "hello", "hello", null, "hello", "leet"]

Explanation
AllOne allOne = new AllOne();
allOne.inc("hello");
allOne.inc("hello");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "hello"
allOne.inc("leet");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "leet"
 

Constraints:

1 <= key.length <= 10
key consists of lowercase English letters.
It is guaranteed that for each call to dec, key is existing in the data structure.
At most 5 * 104 calls will be made to inc, dec, getMaxKey, and getMinKey.
*/
class Node {
  constructor(count) {
    this.count = count;
    this.keys = new Set();
    this.prev = null;
    this.next = null;
  }
}

class AllOne {
  constructor() {
    this.keyToNode = new Map(); // string -> Node
    this.head = new Node(0); // Dummy head
    this.tail = new Node(0); // Dummy tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * @param {string} key
   * @return {void}
   */
  inc(key) {
    if (this.keyToNode.has(key)) {
      const currNode = this.keyToNode.get(key);
      const nextNode = currNode.next;

      // If the next node doesn't have the incremented count, create it
      if (nextNode === this.tail || nextNode.count !== currNode.count + 1) {
        this._insertNodeAfter(new Node(currNode.count + 1), currNode);
      }

      currNode.next.keys.add(key);
      this.keyToNode.set(key, currNode.next);

      currNode.keys.delete(key);
      if (currNode.keys.size === 0) this._removeNode(currNode);
    } else {
      // New key, count is 1
      if (this.head.next === this.tail || this.head.next.count !== 1) {
        this._insertNodeAfter(new Node(1), this.head);
      }
      this.head.next.keys.add(key);
      this.keyToNode.set(key, this.head.next);
    }
  }

  /**
   * @param {string} key
   * @return {void}
   */
  dec(key) {
    const currNode = this.keyToNode.get(key);

    if (currNode.count === 1) {
      this.keyToNode.delete(key);
    } else {
      const prevNode = currNode.prev;
      if (prevNode === this.head || prevNode.count !== currNode.count - 1) {
        this._insertNodeAfter(new Node(currNode.count - 1), prevNode);
      }
      currNode.prev.keys.add(key);
      this.keyToNode.set(key, currNode.prev);
    }

    currNode.keys.delete(key);
    if (currNode.keys.size === 0) this._removeNode(currNode);
  }

  /**
   * @return {string}
   */
  getMaxKey() {
    if (this.tail.prev === this.head) return "";
    // Get any element from the Set
    return this.tail.prev.keys.values().next().value;
  }

  /**
   * @return {string}
   */
  getMinKey() {
    if (this.head.next === this.tail) return "";
    // Get any element from the Set
    return this.head.next.keys.values().next().value;
  }

  // --- Helper Methods ---

  _insertNodeAfter(newNode, prevNode) {
    newNode.next = prevNode.next;
    newNode.prev = prevNode;
    prevNode.next.prev = newNode;
    prevNode.next = newNode;
  }

  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
}

// ========================================================================
// 1. SECTION NAME
// ========================================================================

class Node {
  constructor(count) {
    this.count = count;
    this.keys = new Set();
    this.prev = null;
    this.next = null;
  }
}

var AllOne = function () {
  this.head = new Node(0);
  this.tail = new Node(0);

  this.head.next = this.tail;
  this.tail.prev = this.head;

  this.map = new Map(); // key -> node
};

AllOne.prototype._insertAfter = function (node, newNode) {
  newNode.next = node.next;
  newNode.prev = node;
  node.next.prev = newNode;
  node.next = newNode;
};

AllOne.prototype._removeNode = function (node) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
};

AllOne.prototype.inc = function (key) {
  if (!this.map.has(key)) {
    let node = this.head.next;

    if (node === this.tail || node.count !== 1) {
      let newNode = new Node(1);
      this._insertAfter(this.head, newNode);
      node = newNode;
    }

    node.keys.add(key);
    this.map.set(key, node);
  } else {
    let node = this.map.get(key);
    let next = node.next;
    let newCount = node.count + 1;

    if (next === this.tail || next.count !== newCount) {
      let newNode = new Node(newCount);
      this._insertAfter(node, newNode);
      next = newNode;
    }

    next.keys.add(key);
    this.map.set(key, next);

    node.keys.delete(key);
    if (node.keys.size === 0) this._removeNode(node);
  }
};

AllOne.prototype.dec = function (key) {
  let node = this.map.get(key);

  if (node.count === 1) {
    node.keys.delete(key);
    this.map.delete(key);
  } else {
    let prev = node.prev;
    let newCount = node.count - 1;

    if (prev === this.head || prev.count !== newCount) {
      let newNode = new Node(newCount);
      this._insertAfter(prev, newNode);
      prev = newNode;
    }

    prev.keys.add(key);
    this.map.set(key, prev);

    node.keys.delete(key);
  }

  if (node.keys.size === 0) this._removeNode(node);
};

AllOne.prototype.getMaxKey = function () {
  if (this.tail.prev === this.head) return "";
  return this.tail.prev.keys.values().next().value;
};

AllOne.prototype.getMinKey = function () {
  if (this.head.next === this.tail) return "";
  return this.head.next.keys.values().next().value;
};
