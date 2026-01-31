class UnionFind {
  constructor(size) {
    this.parent = new Array(size);
    this.rank = new Array(size);

    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
      this.rank[i] = 0;
    }
  }

  find(x) {
    if (x !== this.parent[x]) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  unionByRank(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return;

    if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else if (this.rank[rootY] > this.rank[rootX]) {
      this.parent[rootX] = rootY;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

/**
 * Creates a UnionFind structure of given size
 *
 * @param {number} size - Number of elements
 * @returns {{parent: number[], rank: number[]}} Initialized UnionFind structure
 */
function createUnionFind(size) {
  const parent = Array.from({ length: size }, (_, i) => i);
  const rank = new Array(size).fill(0);
  return { parent, rank };
}

/**
 * Functional version of find with path compression
 *
 * @param {number} x - Element to find
 * @param {number[]} parent - Parent array
 * @returns {number} Root of element x
 */
function find(x, parent) {
  if (parent[x] !== x) {
    parent[x] = find(parent[x], parent);
  }
  return parent[x];
}

/**
 * Functional version of union by rank
 *
 * @param {number} x - First element
 * @param {number} y - Second element
 * @param {number[]} parent - Parent array
 * @param {number[]} rank - Rank array
 * @returns {boolean} True if union was performed
 */
function unionByRank(x, y, parent, rank) {
  const rootX = find(x, parent);
  const rootY = find(y, parent);

  if (rootX === rootY) return false;

  if (rank[rootX] > rank[rootY]) {
    parent[rootY] = rootX;
  } else if (rank[rootY] > rank[rootX]) {
    parent[rootX] = rootY;
  } else {
    parent[rootY] = rootX;
    rank[rootX]++;
  }

  return true;
}

/**
 * Disjoint Set Union (Union-Find) data structure with optimizations
 */
class UnionFind {
  /**
   * Creates a new UnionFind structure
   * @param {number} size - Number of elements
   * @throws {Error} If size is not a positive integer
   */
  constructor(size) {
    if (!Number.isInteger(size) || size <= 0) {
      throw new Error("Size must be a positive integer");
    }

    /**
     * @type {number[]} parent - Array where parent[i] = parent of element i
     * @private
     */
    this.parent = new Array(size);

    /**
     * @type {number[]} rank - Array where rank[i] = rank (height) of tree rooted at i
     * @private
     */
    this.rank = new Array(size);

    // Initialize each element as its own parent with rank 0
    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
      this.rank[i] = 0;
    }
  }

  /**
   * Finds the representative (root) of the set containing element x
   * Uses path compression for optimization
   *
   * @param {number} x - Element to find
   * @returns {number} The representative (root) of x's set
   * @throws {Error} If x is out of bounds
   *
   * @example
   * const uf = new UnionFind(5);
   * uf.find(3); // returns 3 (initially)
   * uf.union(3, 4);
   * uf.find(3); // returns 4 (or 3 after path compression)
   *
   * @timeComplexity Amortized O(α(n)) where α is the inverse Ackermann function
   */
  find(x) {
    this._validateIndex(x);

    // Path compression: make each node point directly to the root
    if (x !== this.parent[x]) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  /**
   * Union operation without rank optimization
   * Merges the sets containing x and y
   *
   * @param {number} x - First element
   * @param {number} y - Second element
   * @returns {boolean} True if the sets were merged, false if already in same set
   * @throws {Error} If x or y is out of bounds
   *
   * @example
   * const uf = new UnionFind(5);
   * uf.union(0, 1); // returns true
   * uf.union(0, 1); // returns false (already in same set)
   */
  union(x, y) {
    this._validateIndex(x);
    this._validateIndex(y);

    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      return false; // Already in same set
    }

    this.parent[rootX] = rootY;
    return true;
  }

  /**
   * Union operation with rank optimization
   * Merges sets by attaching smaller rank tree under root of higher rank tree
   *
   * @param {number} x - First element
   * @param {number} y - Second element
   * @returns {boolean} True if the sets were merged, false if already in same set
   * @throws {Error} If x or y is out of bounds
   *
   * @example
   * const uf = new UnionFind(5);
   * uf.unionByRank(0, 1); // returns true
   * uf.unionByRank(1, 2); // returns true
   *
   * @timeComplexity Amortized O(α(n))
   */
  unionByRank(x, y) {
    this._validateIndex(x);
    this._validateIndex(y);

    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      return false; // Already in same set
    }

    // Union by rank: attach smaller rank tree under root of higher rank tree
    if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else if (this.rank[rootY] > this.rank[rootX]) {
      this.parent[rootX] = rootY;
    } else {
      // Ranks are equal, choose one as parent and increment its rank
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    return true;
  }

  /**
   * Checks if two elements are in the same set
   *
   * @param {number} x - First element
   * @param {number} y - Second element
   * @returns {boolean} True if x and y are in the same set
   * @throws {Error} If x or y is out of bounds
   *
   * @example
   * const uf = new UnionFind(5);
   * uf.union(0, 1);
   * uf.connected(0, 1); // returns true
   * uf.connected(0, 2); // returns false
   */
  connected(x, y) {
    this._validateIndex(x);
    this._validateIndex(y);

    return this.find(x) === this.find(y);
  }

  /**
   * Gets the number of elements in the structure
   *
   * @returns {number} The total number of elements
   */
  size() {
    return this.parent.length;
  }

  /**
   * Gets the number of disjoint sets
   *
   * @returns {number} The number of distinct sets
   *
   * @example
   * const uf = new UnionFind(5);
   * uf.countSets(); // returns 5
   * uf.union(0, 1);
   * uf.union(2, 3);
   * uf.countSets(); // returns 3
   */
  countSets() {
    const uniqueRoots = new Set();
    for (let i = 0; i < this.parent.length; i++) {
      uniqueRoots.add(this.find(i));
    }
    return uniqueRoots.size;
  }

  /**
   * Gets all elements in the same set as x
   *
   * @param {number} x - The element
   * @returns {number[]} Array of elements in the same set
   * @throws {Error} If x is out of bounds
   */
  getSet(x) {
    this._validateIndex(x);

    const root = this.find(x);
    const set = [];
    for (let i = 0; i < this.parent.length; i++) {
      if (this.find(i) === root) {
        set.push(i);
      }
    }
    return set;
  }

  /**
   * Resets all elements to be in their own sets
   *
   * @example
   * const uf = new UnionFind(5);
   * uf.union(0, 1);
   * uf.reset();
   * uf.connected(0, 1); // returns false
   */
  reset() {
    for (let i = 0; i < this.parent.length; i++) {
      this.parent[i] = i;
      this.rank[i] = 0;
    }
  }

  /**
   * Validates if an index is within bounds
   *
   * @param {number} index - Index to validate
   * @throws {Error} If index is out of bounds
   * @private
   */
  _validateIndex(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.parent.length) {
      throw new Error(
        `Index ${index} is out of bounds. Valid range: 0-${
          this.parent.length - 1
        }`
      );
    }
  }
}

// Export for CommonJS (Node.js)
if (typeof module !== "undefined" && module.exports) {
  module.exports = UnionFind;
}

// Export for ES6 modules
if (typeof exports !== "undefined") {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.UnionFind = UnionFind;
}
