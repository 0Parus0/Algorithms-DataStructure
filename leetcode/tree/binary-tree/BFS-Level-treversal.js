class QueueNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // O(1) - Add to the end
  enqueue(value) {
    const newNode = new QueueNode(value);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }

  // O(1) - Remove from the front
  dequeue() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.value;
  }

  // O(1) - Peek at the front element
  peek() {
    return this.first ? this.first.value : null;
  }

  // O(1) - Check if empty
  isEmpty() {
    return this.size === 0;
  }

  // O(1) - Get size
  getSize() {
    return this.size;
  }

  // O(n) - Convert to array (for debugging/testing)
  toArray() {
    const array = [];
    let current = this.first;
    while (current) {
      array.push(current.value);
      current = current.next;
    }
    return array;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // BFS Implementation Using Custom Queue

  BFSQueueNode() {
    if (!this.root) return [];

    const data = [];
    const queue = new Queue();
    queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      data.push(node.value);

      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right);
    }

    return data;
  }

  // Level traversal using array with shift()
  BFSArray() {
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

  // Level traversal using array with moving pointers not shift()
  BFSPointers() {
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

  // Additional tree methods would go here...
  // (insert, find, etc.)
}
