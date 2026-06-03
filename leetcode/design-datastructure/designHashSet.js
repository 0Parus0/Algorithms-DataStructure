/*
705. Design HashSet
Easy
Topics
premium lock icon
Companies
Design a HashSet without using any built-in hash table libraries.

Implement MyHashSet class:

void add(key) Inserts the value key into the HashSet.
bool contains(key) Returns whether the value key exists in the HashSet or not.
void remove(key) Removes the value key in the HashSet. If key does not exist in the HashSet, do nothing.
 

Example 1:

Input
["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
[[], [1], [2], [1], [3], [2], [2], [2], [2]]
Output
[null, null, null, true, false, null, true, null, false]

Explanation
MyHashSet myHashSet = new MyHashSet();
myHashSet.add(1);      // set = [1]
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(1); // return True
myHashSet.contains(3); // return False, (not found)
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(2); // return True
myHashSet.remove(2);   // set = [1]
myHashSet.contains(2); // return False, (already removed)
 

Constraints:

0 <= key <= 106
At most 104 calls will be made to add, remove, and contains.
*/
// ========================================================================
// 1. Separate Chaining
// ========================================================================
class MyHashSet {
  constructor() {
    this.capacity = 1001; // Using a prime number to reduce collisions
    this.table = new Array(this.capacity).fill(null).map(() => []);
  }

  _hash(key) {
    return key % this.capacity;
  }

  add(key) {
    const index = this._hash(key);
    const bucket = this.table[index];
    if (!bucket.includes(key)) {
      bucket.push(key);
    }
  }

  remove(key) {
    const index = this._hash(key);
    const bucket = this.table[index];
    const keyIndex = bucket.indexOf(key);
    if (keyIndex !== -1) {
      bucket.splice(keyIndex, 1);
    }
  }

  contains(key) {
    const index = this._hash(key);
    return this.table[index].includes(key);
  }
}

// ========================================================================
// 2. Linear Probing (Open Addressing)
// ========================================================================
class MyHashSetLinear {
  constructor() {
    this.capacity = 20011; // Larger capacity for open addressing
    this.table = new Array(this.capacity).fill(null);
    this.TOMBSTONE = Symbol("deleted");
  }

  _hash(key) {
    return key % this.capacity;
  }

  add(key) {
    let index = this._hash(key);
    let firstTombstone = -1;

    while (this.table[index] !== null) {
      if (this.table[index] === key) return; // Already exists
      if (this.table[index] === this.TOMBSTONE && firstTombstone === -1) {
        firstTombstone = index; // Remember first available tombstone
      }
      index = (index + 1) % this.capacity;
    }

    // Insert at tombstone if we found one, otherwise at the null slot
    const insertPos = firstTombstone !== -1 ? firstTombstone : index;
    this.table[insertPos] = key;
  }

  remove(key) {
    let index = this._hash(key);
    while (this.table[index] !== null) {
      if (this.table[index] === key) {
        this.table[index] = this.TOMBSTONE;
        return;
      }
      index = (index + 1) % this.capacity;
    }
  }

  contains(key) {
    let index = this._hash(key);
    while (this.table[index] !== null) {
      if (this.table[index] === key) return true;
      index = (index + 1) % this.capacity;
    }
    return false;
  }
}
// ========================================================================
// 3. Quadratic Probing (Open Addressing)
// ========================================================================
class MyHashSetQuadratic {
  constructor() {
    this.capacity = 20011;
    this.table = new Array(this.capacity).fill(null);
    this.TOMBSTONE = Symbol("deleted");
  }

  _hash(key) {
    return key % this.capacity;
  }

  add(key) {
    let h = this._hash(key);
    let i = 0;
    let firstTombstone = -1;

    while (true) {
      let index = (h + i * i) % this.capacity;
      if (this.table[index] === key) return;
      if (this.table[index] === null) {
        this.table[firstTombstone !== -1 ? firstTombstone : index] = key;
        return;
      }
      if (this.table[index] === this.TOMBSTONE && firstTombstone === -1) {
        firstTombstone = index;
      }
      i++;
    }
  }

  remove(key) {
    let h = this._hash(key);
    let i = 0;
    while (true) {
      let index = (h + i * i) % this.capacity;
      if (this.table[index] === null) return;
      if (this.table[index] === key) {
        this.table[index] = this.TOMBSTONE;
        return;
      }
      i++;
    }
  }

  contains(key) {
    let h = this._hash(key);
    let i = 0;
    while (true) {
      let index = (h + i * i) % this.capacity;
      if (this.table[index] === null) return false;
      if (this.table[index] === key) return true;
      i++;
    }
  }
}
