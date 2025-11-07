/**
 * *******************
 * Queues:
 * *******************
 * An other abstract data type
 * abide only by the rule FIFO
 * First In First Out
 */

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
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }

// class Queue {
//   constructor() {
//     this.first = null;
//     this.last = null;
//     this.size = 0;
//   }

//   enqueue(val) {
//     let node = new Node(val);
//     if (!this.first) {
//       this.first = node;
//       this.last = node;
//     } else {
//       this.last.next = node;
//       this.last = node;
//     }

//     return ++this.size;
//   }

//   dequeue() {
//     if (!this.first) return false;
//     let popped = this.first;
//     if (this.first === this.last) {
//       this.first = null;
//       this.last = null;
//     } else {
//       this.first = this.first.next;
//       popped.next = null;
//     }

//     this.size--;
//     return popped;
//   }
// }

// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }

// class Queue {
//   constructor() {
//     this.first = null;
//     this.last = null;
//     this.size = 0;
//   }

//   enqueue(val) { // adding to the end/last/tail/bottom;
//     const newNode = new Node(val);
//     if(!this.first) {
//       this.first= newNode;
//       this.last = this.first;
//     }else {
//       this.last.next = newNode;
//       this.last = newNode;
//     }
//     return ++this.size;
//  }
//  dequeue() { // removing from beginning/top/head/first // basically shift()
//    const firstNode = this.first;
//    if(!this.first)return null;
//    if(this.size === 1) {
//      this.first = null;
//      this.last = null;
//    } else {
//      this.first = firstNode.next;
//      firstNode.next = null;
//    }
//    this.size--;
//    return firstNode;
//  }
// }

// const que = new Queue();
// que.enqueue('first');
// que.enqueue('second');
// que.enqueue('third');
// que.enqueue('last');
// console.log(que.dequeue());
// console.log(que.dequeue());
// // console.log(que.dequeue());
// // console.log(que.dequeue());
// console.log(JSON.stringify(que, null, 2));
// // console.log(que);
