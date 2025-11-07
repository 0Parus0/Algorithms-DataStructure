/*
297. Serialize and Deserialize Binary Tree
Hard
Topics
premium lock iconCompanies

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

 

Example 1:

Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]

Example 2:

Input: root = []
Output: []

 

Constraints:

    The number of nodes in the tree is in the range [0, 104].
    -1000 <= Node.val <= 1000
*/

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class Codec {
  serialize(root) {
    if (!root) return "";

    const queue = [root];
    const result = [];

    while (queue.length > 0) {
      const node = queue.shift();

      if (node) {
        result.push(node.val.toString());
        queue.push(node.left);
        queue.push(node.right);
      } else {
        result.push("#");
      }
    }

    return result.join(",");
  }

  deserialize(data) {
    if (data === "") return null;

    const values = data.split(",");
    const root = new TreeNode(parseInt(values[0]));
    const queue = [root];
    let index = 1;

    while (queue.length > 0) {
      const node = queue.shift();

      if (index < values.length && values[index] !== "#") {
        node.left = new TreeNode(parseInt(values[index]));
        queue.push(node.left);
      }
      index++;

      if (index < values.length && values[index] !== "#") {
        node.right = new TreeNode(parseInt(values[index]));
        queue.push(node.right);
      }
      index++;
    }

    return root;
  }
}

class Codec {
  serialize(root) {
    const result = [];

    function preorder(node) {
      if (!node) {
        result.push("#");
        return;
      }
      result.push(node.val.toString());
      preorder(node.left);
      preorder(node.right);
    }

    preorder(root);
    return result.join(",");
  }

  deserialize(data) {
    const values = data.split(",");
    let index = 0;

    function buildTree() {
      if (index >= values.length || values[index] === "#") {
        index++;
        return null;
      }

      const node = new TreeNode(parseInt(values[index++]));
      node.left = buildTree();
      node.right = buildTree();

      return node;
    }

    return buildTree();
  }
}

class CodecJSONIt {
  serialize(root) {
    if (!root) return "";

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
      const node = queue.shift();

      if (node) {
        result.push(node.val);
        queue.push(node.left);
        queue.push(node.right);
      } else {
        result.push(null);
      }
    }

    return JSON.stringify(result); // Or custom string format
  }

  deserialize(data) {
    if (!data) return null;

    const values = JSON.parse(data);
    if (values.length === 0) return null;

    const root = new TreeNode(values[0]);
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < values.length) {
      const node = queue.shift();

      if (values[i] !== null) {
        node.left = new TreeNode(values[i]);
        queue.push(node.left);
      }
      i++;

      if (i < values.length && values[i] !== null) {
        node.right = new TreeNode(values[i]);
        queue.push(node.right);
      }
      i++;
    }

    return root;
  }
}

class CodecJSONRec {
  serialize(root) {
    const result = [];

    function preorder(node) {
      if (!node) {
        result.push(null);
        return;
      }
      result.push(node.val);
      preorder(node.left);
      preorder(node.right);
    }

    preorder(root);
    return JSON.stringify(result);
  }

  deserialize(data) {
    const values = JSON.parse(data);
    let index = 0;

    function build() {
      if (index >= values.length || values[index] === null) {
        index++;
        return null;
      }
      const node = new TreeNode(values[index++]);
      node.left = build();
      node.right = build();
      return node;
    }

    return build();
  }
}
