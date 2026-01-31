/*
990. Satisfiability of Equality Equations
Medium
Topics
premium lock icon
Companies
You are given an array of strings equations that represent relationships between variables where each string equations[i] is of length 4 and takes one of two different forms: "xi==yi" or "xi!=yi".Here, xi and yi are lowercase letters (not necessarily different) that represent one-letter variable names.

Return true if it is possible to assign integers to variable names so as to satisfy all the given equations, or false otherwise.

 

Example 1:

Input: equations = ["a==b","b!=a"]
Output: false
Explanation: If we assign say, a = 1 and b = 1, then the first equation is satisfied, but not the second.
There is no way to assign the variables to satisfy both equations.
Example 2:

Input: equations = ["b==a","a==b"]
Output: true
Explanation: We could assign a = 1 and b = 1 to satisfy both equations.
 

Constraints:

1 <= equations.length <= 500
equations[i].length == 4
equations[i][0] is a lowercase letter.
equations[i][1] is either '=' or '!'.
equations[i][2] is '='.
equations[i][3] is a lowercase letter.
*/

function equationPossible(equations) {
  const parent = Array.from({ length: 26 }, (_, i) => i);
  const rank = new Array(26).fill(0);

  function find(x) {
    if (x !== parent[x]) {
      parent[x] = find(parent[x]);
    }

    return parent[x];
  }

  function union(x, y) {
    let rootX = find(x);
    let rootY = find(y);

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

  for (let s of equations) {
    // Union all equal chars
    if (s[1] === "=") {
      //'a==b'
      union(s[0].charCodeAt() - 97, s[3].charCodeAt() - 97);
    }
  }

  for (let s of equations) {
    if (s[1] === "!") {
      // 'a!=b
      let first = s[0].charCodeAt() - 97; // a
      let second = s[3].charCodeAt() - 97; // b

      let parentFirst = find(first);
      let parentSecond = find(second);
      if (parentFirst === parentSecond) return false;
    }
  }
  return true;
}

const equationsPossible = function (equations) {
  const parent = Array.from({ length: 26 }, (_, i) => i);
  const rank = new Array(26).fill(0);

  const find = (x) => {
    if (x !== parent[x]) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };

  const union = (x, y) => {
    let rootX = find(x);
    let rootY = find(y);

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
  };

  const charToIndex = (char) => char.charCodeAt() - 97;
  const isEquality = (eq) => eq[1] === "=";

  // First pass: Union all equalities
  for (let eq of equations) {
    if (isEquality(eq)) {
      union(charToIndex(eq[0]), charToIndex(eq[3]));
    }
  }

  // Second pass: Check inequalities
  for (let eq of equations) {
    if (!isEquality(eq)) {
      const rootA = find(charToIndex(eq[0]));
      const rootB = find(charToIndex(eq[3]));
      if (rootA === rootB) return false;
    }
  }

  return true;
};

equationsPossible = function (equations) {
  const parent = Array.from({ length: 26 }, (_, i) => i);

  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));

  // First, process all equality equations
  for (const eq of equations) {
    if (eq[1] === "=") {
      const a = eq[0].charCodeAt() - 97;
      const b = eq[3].charCodeAt() - 97;
      parent[find(a)] = find(b);
    }
  }

  // Then, check all inequality equations
  for (const eq of equations) {
    if (eq[1] === "!") {
      const a = eq[0].charCodeAt() - 97;
      const b = eq[3].charCodeAt() - 97;
      if (find(a) === find(b)) {
        return false;
      }
    }
  }

  return true;
};

/**
 * @param {string[]} equations
 * @return {boolean}
 */
equationsPossible = function (equations) {
  const n = 26; // a-z
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);

  // Helper functions with arrow syntax for auto-binding
  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };

  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) return;

    // Union by rank
    if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else if (rank[rootY] > rank[rootX]) {
      parent[rootX] = rootY;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }
  };

  const toIndex = (char) => char.charCodeAt(0) - 97;

  // Separate equations into equalities and inequalities
  const equalities = [];
  const inequalities = [];

  for (const eq of equations) {
    if (eq[1] === "=") {
      equalities.push(eq);
    } else {
      // Check for "a!=a" which is always false
      if (eq[0] === eq[3]) return false;
      inequalities.push(eq);
    }
  }

  // Process all equalities first
  for (const eq of equalities) {
    union(toIndex(eq[0]), toIndex(eq[3]));
  }

  // Check all inequalities
  for (const eq of inequalities) {
    if (find(toIndex(eq[0])) === find(toIndex(eq[3]))) {
      return false;
    }
  }

  return true;
};
