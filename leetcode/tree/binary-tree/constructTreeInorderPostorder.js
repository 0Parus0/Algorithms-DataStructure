class Node {
  constructor(x) {
    this.key = x;
    this.left = null;
    this.right = null;
  }
}

class Solution {
  buildTree(inorder, postorder) {
    // Create map for O(1) inorder index lookup
    const inorderMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
      inorderMap.set(inorder[i], i);
    }

    let postIndex = postorder.length - 1; // Start from the end

    const build = (inStart, inEnd) => {
      if (inStart > inEnd) return null;

      // Get current node from postorder (last element is root)
      const currentNode = new Node(postorder[postIndex--]);

      // Find position in inorder
      const inIndex = inorderMap.get(currentNode.key);

      // Important: Build right subtree first, then left subtree
      currentNode.right = build(inIndex + 1, inEnd);
      currentNode.left = build(inStart, inIndex - 1);

      return currentNode;
    };

    return build(0, inorder.length - 1);
  }
}
