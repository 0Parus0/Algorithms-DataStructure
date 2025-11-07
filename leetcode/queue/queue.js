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
