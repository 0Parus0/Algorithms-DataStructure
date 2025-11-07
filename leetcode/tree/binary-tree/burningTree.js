/*
Burning Tree
Difficulty: HardAccuracy: 53.53%Submissions: 125K+Points: 8
Given a binary tree and a target node, determine the minimum time required to burn the entire tree if the target node is set on fire. In one second, the fire spreads from a node to its left child, right child, and parent.
Note: The tree contains unique values.

Examples : 

Input: root[] = [1, 2, 3, 4, 5, 6, 7], target = 2
  
Output: 3
Explanation: Initially 2 is set to fire at 0 sec 
At 1 sec: Nodes 4, 5, 1 catches fire.
At 2 sec: Node 3 catches fire.
At 3 sec: Nodes 6, 7 catches fire.
It takes 3s to burn the complete tree.
Input: root[] = [1, 2, 3, 4, 5, N, 7, 8, N, 10], target = 10

Output: 5
Explanation: Initially 10 is set to fire at 0 sec 
At 1 sec: Node 5 catches fire.
At 2 sec: Node 2 catches fire.
At 3 sec: Nodes 1 and 4 catches fire.
At 4 sec: Node 3 and 8 catches fire.
At 5 sec: Node 7 catches fire.
It takes 5s to burn the complete tree.
Constraints:
1 ≤ number of nodes ≤ 105
1 ≤ node->data ≤ 105

🧩 Problem Restatement

We’re given:

A binary tree.

A target node where fire starts.

Rules:

Fire spreads every second to → left child, right child, and parent.

We need the minimum time to burn the whole tree.

🔑 Intuition

Normally, tree traversal is downward (left/right), but here the fire also spreads upward to parent.

So we need a way to move up from a node.

That means: first map each node to its parent.

Once we have parent mapping:

Start BFS from the target node.

Each second, fire spreads to all unvisited neighbors (left, right, parent).

Count how many levels (seconds) it takes until all nodes are burned.

⚙️ Steps
Step 1: Map parents

Traverse the tree (BFS or DFS).

Store parent[node] = parentNode.

Also keep track of the target node reference (since we’re given target’s value).

Step 2: BFS from target

Use a queue for BFS.

Start with target as burning at time 0.

Spread to all neighbors (left, right, parent).

Track visited nodes (to avoid infinite loops).

Keep counting levels (time).

Step 3: Result

The last level we process = time to burn tree.

*/

class Solution {
  minTime(root, target) {
    if (!root) return 0;

    // Step 1: Parent mapping + find target node
    const parent = new Map();
    let targetNode = null;

    function buildParentMap(node, par = null) {
      if (!node) return;
      if (node.key === target) targetNode = node; // ✅ FIX
      if (par) parent.set(node, par);
      buildParentMap(node.left, node);
      buildParentMap(node.right, node);
    }
    buildParentMap(root);

    // Safety check (in case target not found)
    if (!targetNode) return 0;

    // Step 2: BFS from target node
    const q = [targetNode];
    const visited = new Set([targetNode]);
    let time = -1;

    while (q.length > 0) {
      let size = q.length;
      time++; // each level = +1 second
      for (let i = 0; i < size; i++) {
        let node = q.shift();
        if (!node) continue;

        // Check neighbors (left, right, parent)
        for (let next of [node.left, node.right, parent.get(node)]) {
          if (next && !visited.has(next)) {
            visited.add(next);
            q.push(next);
          }
        }
      }
    }

    return time;
  }
}

class Solution {
  minTime(root, target) {
    if (!root) return 0;

    // Step 1: Build parent map and find target node
    const parent = new Map();
    let targetNode = null;

    function buildParentMap(node, par = null) {
      if (!node) return;
      if (node.data === target) targetNode = node; // ✅ use data instead of key
      if (par) parent.set(node, par);
      buildParentMap(node.left, node);
      buildParentMap(node.right, node);
    }

    buildParentMap(root);
    if (!targetNode) return 0; // safety

    // Step 2: BFS from target
    const q = [targetNode];
    const visited = new Set([targetNode]);
    let time = -1;
    let i = 0; // queue pointer for O(1) dequeue

    while (i < q.length) {
      let size = q.length - i;
      time++;
      for (let j = 0; j < size; j++) {
        const node = q[i++];

        for (const next of [node.left, node.right, parent.get(node)]) {
          if (next && !visited.has(next)) {
            visited.add(next);
            q.push(next);
          }
        }
      }
    }

    return time;
  }
}

class Solution {
  minTime(root, target) {
    let timer = 0;

    function dfs(node, target) {
      if (!node) return 0;

      // Base case: found the target node
      if (node.data === target) {
        // Start burning downward from this node
        burnSubtree(node, null, 0);
        return -1; // Indicate this is the burning source
      }

      const left = dfs(node.left, target);
      const right = dfs(node.right, target);

      // If target found in left subtree
      if (left < 0) {
        burnSubtree(node, node.left, Math.abs(left));
        return left - 1;
      }

      // If target found in right subtree
      if (right < 0) {
        burnSubtree(node, node.right, Math.abs(right));
        return right - 1;
      }

      return 1 + Math.max(left, right);
    }

    // Helper to calculate max burn time downward from a node (excluding the coming side)
    function burnSubtree(node, block, time) {
      if (!node || node === block) return;
      timer = Math.max(timer, time);
      burnSubtree(node.left, block, time + 1);
      burnSubtree(node.right, block, time + 1);
    }

    dfs(root, target);
    return timer;
  }
}

class Solution {
  minTime(root, target) {
    let timer = 0;
    let burnNode = null;

    const burn = (node, target) => {
      if (!node) return 0;

      if (node.key === target) return -1;

      const left = burn(node.left, target);
      const right = burn(node.right, target);

      if (left < 0) {
        timer = Math.max(timer, Math.abs(left) + right);
        return left - 1;
      }
      if (right < 0) {
        timer = Math.max(timer, Math.abs(right) + left);
        return right - 1;
      }

      return 1 + Math.max(left, right);
    };

    const find = (node, target) => {
      if (!node) return null;
      if (node.key === target) return node;

      const leftResult = find(node.left, target);
      if (leftResult) return leftResult;

      const rightResult = find(node.right, target);
      return rightResult;
    };

    const height = (node) => {
      if (!node) return 0;
      return 1 + Math.max(height(node.left), height(node.right));
    };

    burn(root, target);
    burnNode = find(root, target);

    if (!burnNode) return 0;

    const burnHigh = height(burnNode) - 1;
    return Math.max(timer, burnHigh);
  }
}

class Solution {
  minTime(root, target) {
    // Initialize the maximum time counter
    this.maxTime = 0;

    // Find the target node in the tree
    const targetNode = this.findTarget(root, target);

    // If target node doesn't exist, return 0
    if (!targetNode) return 0;

    // Calculate burning time through parent paths
    this.calculateBurnTime(root, target);

    // Return maximum of:
    // 1. Time through parent paths (maxTime)
    // 2. Time to burn target's subtree (height - 1)
    return Math.max(this.maxTime, this.getHeight(targetNode) - 1);
  }

  /**
   * Calculates burning time and returns distance from target
   * @param {Node} node - Current node being processed
   * @param {number} target - Target value to find
   * @returns {number} - Distance from target (negative if target found in subtree)
   */
  calculateBurnTime(node, target) {
    if (!node) return 0;

    // Base case: found the target node
    if (node.data === target) return -1; // Return -1 to indicate target found at distance 1

    // Recursively process left and right subtrees
    const left = this.calculateBurnTime(node.left, target);
    const right = this.calculateBurnTime(node.right, target);

    // If target found in left subtree
    if (left < 0) {
      // Calculate time: distance from target + height of right subtree
      this.maxTime = Math.max(this.maxTime, Math.abs(left) + right);
      // Return increased distance (move closer to root)
      return left - 1;
    }

    // If target found in right subtree
    if (right < 0) {
      // Calculate time: distance from target + height of left subtree
      this.maxTime = Math.max(this.maxTime, Math.abs(right) + left);
      // Return increased distance (move closer to root)
      return right - 1;
    }

    // Target not found in this subtree, return height of current subtree
    return Math.max(left, right) + 1;
  }

  /**
   * Finds the target node in the binary tree
   * @param {Node} node - Current node being searched
   * @param {number} target - Target value to find
   * @returns {Node|null} - Target node or null if not found
   */
  findTarget(node, target) {
    if (!node) return null;

    // Check if current node is the target
    if (node.data === target) return node;

    // Search in left subtree, if not found, search right subtree
    return (
      this.findTarget(node.left, target) || this.findTarget(node.right, target)
    );
  }

  /**
   * Calculates the height of a binary tree
   * @param {Node} node - Root of the subtree
   * @returns {number} - Height of the tree
   */
  getHeight(node) {
    if (!node) return 0;

    // Height = 1 + maximum height of left and right subtrees
    return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }
}

class Solution {
  minTime(root, target) {
    let timer = 0;

    // 🔥 Recursive function to simulate fire spreading and update timer
    function burn(node, target) {
      if (!node) return 0;

      // If this is the target node → fire source
      if (node.key === target) return -1;

      const left = burn(node.left, target);
      const right = burn(node.right, target);

      // Target is in the left subtree
      if (left < 0) {
        timer = Math.max(timer, Math.abs(left) + right);
        return left - 1; // propagate fire upwards
      }

      // Target is in the right subtree
      if (right < 0) {
        timer = Math.max(timer, Math.abs(right) + left);
        return right - 1; // propagate fire upwards
      }

      // Normal case: return height of subtree
      return 1 + Math.max(left, right);
    }

    // 🌿 Find a reference to the burn node
    function find(node, target) {
      if (!node) return null;
      if (node.key === target) return node;

      return find(node.left, target) || find(node.right, target);
    }

    // 🌲 Compute height of a subtree
    function height(node) {
      if (!node) return 0;
      return 1 + Math.max(height(node.left), height(node.right));
    }

    // 🚀 Step 1: Run burn simulation
    burn(root, target);

    // 🚀 Step 2: Get the target node
    const burnNode = find(root, target);
    if (!burnNode) return 0;

    // 🚀 Step 3: Fire takes longest path in target’s subtree
    const burnHigh = height(burnNode) - 1;

    return Math.max(timer, burnHigh);
  }
}
