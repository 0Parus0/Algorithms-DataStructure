/*
Huffman Encoding
Difficulty: HardAccuracy: 32.4%Submissions: 43K+Points: 8Average Time: 30m
Given a string S of distinct character of size N and their corresponding frequency f[ ] i.e. character S[i] has f[i] frequency. Your task is to build the Huffman tree print all the huffman codes in preorder traversal of the tree.
Note: While merging if two nodes have the same value, then the node which occurs at first will be taken on the left of Binary Tree and the other one to the right, otherwise Node with less value will be taken on the left of the subtree and other one to the right.

Example 1:

S = "abcdef"
f[] = {5, 9, 12, 13, 16, 45}
Output: 
0 100 101 1100 1101 111
Explanation:

HuffmanCodes will be:
f : 0
c : 100
d : 101
a : 1100
b : 1101
e : 111
Hence printing them in the PreOrder of Binary 
Tree.
Your Task:
You don't need to read or print anything. Your task is to complete the function huffmanCodes() which takes the given string S, frequency array f[ ] and number of characters N as input parameters and returns a vector of strings containing all huffman codes in order of preorder traversal of the tree.

Expected Time complexity: O(N * LogN) 
Expected Space complexity: O(N) 

Constraints:
1 ≤ N ≤ 26
*/
class MinHeap {
  constructor(compareFn) {
    this.heap = [];
    this.compare = compareFn; // Allows custom comparison
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp(this.size() - 1);
  }

  pop() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();
    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return root;
  }

  heapifyUp(index) {
    let parent = Math.floor((index - 1) / 2);
    while (index > 0 && this.compare(this.heap[index], this.heap[parent]) < 0) {
      [this.heap[index], this.heap[parent]] = [
        this.heap[parent],
        this.heap[index],
      ];
      index = parent;
    }
  }

  heapifyDown(index) {
    const len = this.size();
    while (true) {
      let smallest = index;
      let left = 2 * index + 1;
      let right = 2 * index + 2;

      if (left < len && this.compare(this.heap[left], this.heap[smallest]) < 0)
        smallest = left;
      if (
        right < len &&
        this.compare(this.heap[right], this.heap[smallest]) < 0
      )
        smallest = right;

      if (smallest === index) break;
      [this.heap[smallest], this.heap[index]] = [
        this.heap[index],
        this.heap[smallest],
      ];
      index = smallest;
    }
  }
}

function huffmanCodes(S, f, N) {
  class Node {
    constructor(char, freq) {
      this.char = char;
      this.freq = freq;
      this.left = this.right = null;
    }
  }

  const pq = new MinHeap((a, b) => a.freq - b.freq);

  for (let i = 0; i < N; i++) {
    pq.push(new Node(S[i], f[i]));
  }

  while (pq.size() > 1) {
    const left = pq.pop();
    const right = pq.pop();

    const merged = new Node("$", left.freq + right.freq);
    merged.left = left;
    merged.right = right;

    pq.push(merged);
  }

  const root = pq.pop();
  const result = [];

  function preorder(node, path) {
    if (!node) return;

    if (node.char !== "$") {
      result.push(path);
    }

    preorder(node.left, path + "0");
    preorder(node.right, path + 1);
  }

  preorder(root, "");
  return result;
}

/*
⏱️ Step 5: Complexity

Building tree: O(N log N) (heap operations)

Traversal: O(N)

Space: O(N)
*/
S = "abcdef";
f = [5, 9, 12, 13, 16, 45];
console.log(huffmanCodes(S, f, 6));
