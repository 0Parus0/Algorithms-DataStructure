/*
1948. Delete Duplicate Folders in System
Hard
Topics
premium lock icon
Companies
Hint
Due to a bug, there are many duplicate folders in a file system. You are given a 2D array paths, where paths[i] is an array representing an absolute path to the ith folder in the file system.

For example, ["one", "two", "three"] represents the path "/one/two/three".
Two folders (not necessarily on the same level) are identical if they contain the same non-empty set of identical subfolders and underlying subfolder structure. The folders do not need to be at the root level to be identical. If two or more folders are identical, then mark the folders as well as all their subfolders.

For example, folders "/a" and "/b" in the file structure below are identical. They (as well as their subfolders) should all be marked:
/a
/a/x
/a/x/y
/a/z
/b
/b/x
/b/x/y
/b/z
However, if the file structure also included the path "/b/w", then the folders "/a" and "/b" would not be identical. Note that "/a/x" and "/b/x" would still be considered identical even with the added folder.
Once all the identical folders and their subfolders have been marked, the file system will delete all of them. The file system only runs the deletion once, so any folders that become identical after the initial deletion are not deleted.

Return the 2D array ans containing the paths of the remaining folders after deleting all the marked folders. The paths may be returned in any order.

 

Example 1:


Input: paths = [["a"],["c"],["d"],["a","b"],["c","b"],["d","a"]]
Output: [["d"],["d","a"]]
Explanation: The file structure is as shown.
Folders "/a" and "/c" (and their subfolders) are marked for deletion because they both contain an empty
folder named "b".
Example 2:


Input: paths = [["a"],["c"],["a","b"],["c","b"],["a","b","x"],["a","b","x","y"],["w"],["w","y"]]
Output: [["c"],["c","b"],["a"],["a","b"]]
Explanation: The file structure is as shown. 
Folders "/a/b/x" and "/w" (and their subfolders) are marked for deletion because they both contain an empty folder named "y".
Note that folders "/a" and "/c" are identical after the deletion, but they are not deleted because they were not marked beforehand.
Example 3:


Input: paths = [["a","b"],["c","d"],["c"],["a"]]
Output: [["c"],["c","d"],["a"],["a","b"]]
Explanation: All folders are unique in the file system.
Note that the returned array can be in a different order as the order does not matter.
 

Constraints:

1 <= paths.length <= 2 * 104
1 <= paths[i].length <= 500
1 <= paths[i][j].length <= 10
1 <= sum(paths[i][j].length) <= 2 * 105
path[i][j] consists of lowercase English letters.
No two paths lead to the same folder.
For any folder not at the root level, its parent folder will also be in the input.
*/
class TrieNode {
  constructor(name = "") {
    this.name = name;
    this.children = new Map();
    this.deleted = false;
    this.serial = "";
  }
}

/**
 * @param {string[][]} paths
 * @return {string[][]}
 */
var deleteDuplicateFolder = function (paths) {
  const root = new TrieNode();

  // Step 1: Build folder tree
  for (const path of paths) {
    let node = root;

    for (const folder of path) {
      if (!node.children.has(folder)) {
        node.children.set(folder, new TrieNode(folder));
      }

      node = node.children.get(folder);
    }
  }

  // Map serialization -> nodes
  const map = new Map();

  // Step 2: Serialize subtrees
  function serialize(node) {
    // Leaf folder
    if (node.children.size === 0) {
      return "";
    }

    let sub = [];

    // Sort for deterministic structure
    const keys = [...node.children.keys()].sort();

    for (const key of keys) {
      const child = node.children.get(key);

      const childSerial = serialize(child);

      sub.push(`${key}(${childSerial})`);
    }

    const serial = sub.join("");

    node.serial = serial;

    if (!map.has(serial)) {
      map.set(serial, []);
    }

    map.get(serial).push(node);

    return serial;
  }

  serialize(root);

  // Step 3: Mark duplicates
  for (const [serial, nodes] of map.entries()) {
    if (nodes.length > 1) {
      for (const node of nodes) {
        node.deleted = true;
      }
    }
  }

  // Step 4: Collect remaining paths
  const result = [];

  function dfs(node, path) {
    const keys = [...node.children.keys()];

    for (const key of keys) {
      const child = node.children.get(key);

      if (child.deleted) continue;

      path.push(key);

      result.push([...path]);

      dfs(child, path);

      path.pop();
    }
  }

  dfs(root, []);

  return result;
};

// ========================================================================
// 2. Approach Two
// ========================================================================

class TrieNode {
  constructor(name = "") {
    this.name = name;
    this.children = new Map();
    this.isDeleted = false;
    this.serial = ""; // Stores the structure of its subfolders
  }
}

/**
 * @param {string[][]} paths
 * @return {string[][]}
 */
var deleteDuplicateFolder = function (paths) {
  const root = new TrieNode();

  // 1. Build the Trie
  for (const path of paths) {
    let node = root;
    for (const folder of path) {
      if (!node.children.has(folder)) {
        node.children.set(folder, new TrieNode(folder));
      }
      node = node.children.get(folder);
    }
  }

  const serialCount = new Map();

  // 2. Post-Order Traversal to serialize structures
  function serialize(node) {
    if (node.children.size === 0) return "";

    let keys = Array.from(node.children.keys()).sort();
    let parts = [];
    for (let key of keys) {
      let child = node.children.get(key);
      parts.push(`${key}(${serialize(child)})`);
    }

    let res = parts.join("");
    node.serial = res;

    // Only folders with subfolders are candidates for deletion
    serialCount.set(res, (serialCount.get(res) || 0) + 1);
    return res;
  }

  serialize(root);

  // 3. Mark duplicate structures for deletion
  function markDuplicates(node) {
    if (node.serial && serialCount.get(node.serial) > 1) {
      node.isDeleted = true;
      return; // No need to check children if parent is deleted
    }
    for (let child of node.children.values()) {
      markDuplicates(child);
    }
  }

  markDuplicates(root);

  // 4. Collect remaining paths
  const result = [];
  function collect(node, currentPath) {
    if (node.isDeleted) return;

    if (currentPath.length > 0) {
      result.push([...currentPath]);
    }

    for (let [name, child] of node.children) {
      currentPath.push(name);
      collect(child, currentPath);
      currentPath.pop();
    }
  }

  collect(root, []);
  return result;
};
