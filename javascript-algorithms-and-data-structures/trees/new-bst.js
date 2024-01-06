class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class Bst {
  constructor() {
    this.root = null;
  }

  insert(val) {
    let node = new Node(val);
    if (!this.root) {
      this.root = node;
      return this;
    }
    let current = this.root;
    while (true) {
      if (val === current.val) return undefined;
      if (current.val > val) {
        if (!current.left) {
          current.left = node;
          return this;
        }
        current = current.left;
      } else {
        if (current.val < val) {
          if (!current.right) {
            current.right = node;
            return this;
          }
          current = current.right;
        }
      }
    }
  }

  find(val) {
    if (!this.root) return false;
    let current = this.root;
    let found = false;
    while (current && !found) {
      if (val < current.val) {
        current = current.left;
      } else if (val > current.val) {
        current = current.right;
      } else {
        found = true;
      }
    }
    if (!found) return undefined;
    return current;
  }

  BFS() {
    // let node = this.root,
    //   que = [],
    //   data = [];
    // que.push(node);
    // while (que.length) {
    //   node = que.shift();
    //   data.push(node.val);
    //   if (node.left) que.push(node.left);
    //   if (node.right) que.push(node.right);
    // }
    // return data;
    let visited = [];
    let current = this.root;
    function recurse(node) {
      
    }
  }

  DFSPreOrder() {
    let visited = [];
    let current = this.root;

    function recurse(node) {
      visited.push(node.val);
      if (node.left) recurse(node.left);
      if (node.right) recurse(node.right);
    }
    recurse(current);
    return visited;
  }

  DFSPostOrder() {
    let visited = [];
    let current = this.root;

    function recurse(node) {
      if (node.left) recurse(node.left);
      if (node.right) recurse(node.right);
      visited.push(node.val);
    }
    recurse(current);
    return visited;
  }

  DFSInOrder() {
    let visited = [];
    let current = this.root;

    function recurse(node) {
      if (node.left) recurse(node.left);
      visited.push(node.val);
      if (node.right) recurse(node.right);
    }
    recurse(current);
    return visited;
  }

  // n-array tree bfs
  // BFS() {
  //   let q = [];
  //   let data = [];
  //   let node = this.root;
  //   q.push(node);
  //   while (q.length) {
  //     let len = q.length;
  //     data.push(q.map((node) => node.val));
  //     while (len--) {
  //       node = q.shift();
  //       for (let child of children) {
  //         q.push(child);
  //       }
  //     }
  //   }
  //   return data;
  // }
}

const tree = new Bst();

tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);

// console.log(tree);
// console.log(tree.BFS());
// console.log(tree.DFSPreOrder());
// console.log(tree.DFSPostOrder());
console.log(tree.DFSInOrder());
console.log(tree.find(17));

// console.log(JSON.stringify(tree, null, 2));
