/**
 * ***************************************
 *          Binary Search Trees
 * ***************************************
 */

// function traverse(node) {
// const tree = { value: node.value };
// tree.left = node.left === null ? null : traverse(node.left);
// tree.right = node.right === null ? null : traverse(node.right);
// return tree;
// }

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (val === current.val) return undefined;
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  find(val) {
    if (!this.root) return null;
    let current = this.root;
    let found = false;
    while (!found && current) {
      if (val < current.val) {
        current = current.left;
      } else if (val > current.val) {
        current = current.right;
      } else {
        found = true;
      }
    }
    if (!found) return null;
    return current;
  }
  /* Breadth First Search */

  /**
   *            10    visit 10 first
   *           /  \   then 6 then 15
   *          6    15   hen 3 and then 7 and then 13, and then 20
   *         / \  /  \
   *        3   7 13  20
   *   BFS = [10, 6, 15, 3, 7, 13, 20]
   *
   */

  Bfs() {
    if (!this.root) return [];
    let node = this.root;
    let data = [];
    let queue = [];
    queue.push(node);
    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

  Bfs1() {
    if (!this.root) return [];
    let data = [];
    let queue = [this.root];
    let idx = 0; // pointer to the front of the queue
    while (idx < queue.length) {
      let node = queue[idx++]; // dequeue by moving pointer
      data.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

  recursiveBFS(root) {
    const result = [];
    const queue = [root];

    function processLevel() {
      if (queue.length === 0) return;

      const levelSize = queue.length;
      const level = [];

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();
        if (node) {
          level.push(node.val);
          queue.push(node.left);
          queue.push(node.right);
        } else {
          level.push(null);
        }
      }

      result.push(level);
      processLevel();
    }

    processLevel();
    return result;
  }

  /**
   * ********************
   * Depth First Search
   * ********************
   *
   *  PreOrder;
   *
   * Visit the Node first
   * Then .left of that Node
   * Then .right of that Node if the .left is a leaf node means have no children
   *            10    visit 10 first
   *           /  \   then 6 then 6's left
   *          6    15   3 and then 3 doesn't have left are right
   *         / \  /  \  so 7 then 15 then 13 and then 20
   *        3   7 13  20
   *   PreOrder DFS = [10, 6, 3, 7, 15, 13, 20]
   *
   *
   **/

  DFSPreOrder() {
    let data = [];
    let current = this.root;
    function traverse(node) {
      data.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(current);
    return data;
  }

  DFSUsingStack() {
    if (!this.root) return [];
    const data = [];
    // const stack = [root] // same as below
    const stack = [];
    stack.push(root);
    while (stack.length) {
      const current = stack.pop();
      data.push(current.val);
      if (current.left) stack.push(current.left);
      if (current.right) stack.push(current.right);
    }
  }
  /* *****************************************************
   *
   *  PostOrder;
   *
   * Visit the Node after we have looked at the left and right sub trees of that node
   * first we move to the left of the root node.
   * If there is a left of root then check if there is left of that left
   * If not then add that bottom left and then right of the left of left of root
   * Then move to right of root if there is one then check its left
   * If it has a left then check left of that left
   * If it doesn't have one then add that left then add right of the right of root then right of the root
   * In the end add the root itself.
   *
   *            10    go to bottom left that is 3
   *           /  \   then right of 6  that is 7
   *          6    15   then 6 it self, then right sub tree of root
   *         / \  /  \   visit bottom left of 15 that is 13
   *        3   7 13  20  then right of 15 that's 20 then 15 itself
   *                       then root itself that is 10
   *   PostOrder DFS = [3, 7, 6, 13, 20, 15,10]
   **/

  DFSPostOrder() {
    let data = [];
    let current = this.root;
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.val);
    }
    traverse(current);
    return data;
  }

  /* ****************************************************** */

  /**
   * ***********************
   * DFS-InOrder
   * We visit the whole left sub tree of the root first
   * Then the root it self
   * Then the whole right sub tree of the root
   * recursively
   *  *
   *            10    go to bottom left that is 3
   *           /  \   then then the 6 itself
   *          6    15  then right of 6 that is 7
   *                   then root itself that is 10
   *         / \  /  \   visit bottom left of 15 that is 13
   *        3   7 13  20  then 15 itself then right of the 15
   *   InOrder DFS = [3, 6, 7, 10, 13, 15, 20]
   * ***********************
   */

  DFSInOrder() {
    let data = [];
    let current = this.root;
    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(current);
    return data;
  }

  /* same as above */

  // DFSInOrder() {
  //   let data = []
  //   let current = this.root;
  //   function traverse(node) {
  //     node.left && traverse(node.left);
  //     data.push(node.val);
  //     node.right && traverse(node.right);
  //   }
  //   traverse(current);
  //   return data;
  // }
}

const tree = new BinarySearchTree();

// function traverse(node) {
//   const tree = { value: node.val };
//   tree.left = node.left === null ? null : traverse(node.left);
//   tree.right = node.right === null ? null : traverse(node.right);
//   return tree;
// }

tree.insert(10);
tree.insert(7);
tree.insert(6);
tree.insert(3);
tree.insert(15);
tree.insert(20);
tree.insert(13);

// console.log(tree.find(5));
console.log(tree.Bfs());
console.log(tree.DFSPreOrder());
console.log(tree.DFSPostOrder());
console.log(tree.DFSInOrder());
// console.log(JSON.stringify(tree, traverse(tree.root), 2));
