class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return false;
    let popped = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = popped.prev;
      popped.prev = null;
      this.tail.next = null;
    }

    this.length--;
    return popped;
  }

  shift() {
    if (!this.head) return false;
    let oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }

  unshift(val) {
    let node = new Node(val);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) return this.head;
    if (index === this.length - 1) return this.tail;
    let current = this.head;
    let counter = 0;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }

  set(index, val) {
    let foundNode = this.get(index);
    if (foundNode !== null) {
      foundNode.val = val;
      return true;
    }
    return false;
  }

  insert(index, val) {
    let node = new Node(val);
    if (index < 0 || index > this.length)
      return `The index ${index} is out of bound`;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);
    let before = this.get(index - 1);
    let after = before.next;
    node.prev = before;
    node.next = after;
    before.next = node;
    after.prev = node;
    this.length++;
    return true;
  }

  delete(index) {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    let previous = this.get(index - 1);
    let toDelete = previous.next;
    previous.next = toDelete.next;
    toDelete.next.prev = previous;
    toDelete.next = null;
    toDelete.prev = null;

    return toDelete;
  }

  reverse() {
    if (!this.head) return null;
    if (this.length === 1) return this;

    let current = this.head;
    this.head = this.tail;
    this.tail = current;
    let before = null;
    let next;
    while (current) {
      next = current.next;
      current.next = before;
      current.prev = next;
      before = current;
      current = next;
    }
  }
  print() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    console.log(result);
  }
}

const list = new DoublyLinkedList();
list.push(3);
list.push(4);
list.push(5);
list.push(6);

// console.log(list.reverse());
// console.log(list.print());
list.delete(3);
console.log(list.print());
// console.log(list);

// console.log(list.insert(2, 2));
// console.log(list.set(2, 2));
// console.log(list.get(3));
// console.log(list.pop());
// console.log(list.unshift(2));
// console.log(list.shift());

// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//     this.prev = null;
//   }
// }

// class DoublyLinkedList {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//     this.length = 0;
//   }
//   push(val) {
//     const newNode = new Node(val);
//     if(!this.head) {
//       this.head = newNode;
//       this.tail = newNode;
//     } else {
//       this.tail.next = newNode;
//       newNode.prev = this.tail
//       this.tail = newNode;
//     }
//     this.length++;
//     return this;
//   }
//   pop() {
//     const poppedTail = this.tail;
//     if(!this.head) return null;
//     if(this.length === 1) {
//       this.head = null;
//       this.tail = null;
//     }else {
//       let newTail = this.tail.prev;
//       this.tail = newTail;
//       newTail.next = null;
//       poppedTail.prev = null;
//     }
//     this.length--;
//     return poppedTail;
//   }
//   shift() {
//     if(!this.head)return null;
//     let nodeToRemove = this.head;
//     if(this.length === 1) {
//       this.head = null;
//       this.tail = null;
//     } else {
//       const newHead = nodeToRemove.next;
//       newHead.prev = null;
//       this.head = newHead;
//       nodeToRemove.next = null;
//     }
//     this.length--;
//     return nodeToRemove;
//   }
//   unshift(val) {
//     const newNode = new Node(val);
//     if(!this.head) {
//       this.head = newNode;
//       this.tail = this.head;
//     } else  {
//       const prevHead = this.head;
//       this.head = newNode;
//       this.head.next = prevHead;
//       prevHead.prev = this.head;
//     }
//     this.length++;
//     return this;
//   }
//   get(idx) {
//     if(idx < 0 || idx >= this.length) return null;
//     let current, count;
//     if(idx <= this.length/2) {
//       // console.log('Working from start');
//        current = this.head;
//        count = 0;
//       while(count !== idx) {
//         current = current.next;
//         count++;
//       }
//     } else {
//       // console.log('Working from end');
//        current = this.tail;
//        count = this.length - 1;
//       while( count !== idx) {
//         current = current.prev;
//         count--;
//       }
//     }
//     return current;
//   }
//   set(idx, val) {
//     if(idx < 0 || idx >= this.length) return false;
//     console.log('started working')
//     const foundNode = this.get(idx);
//     foundNode.val = val;
//     return true;
//   }
//   insert(idx, val) {
//     if(idx < 0 || idx >= this.length) return false;
//     if(idx === 0)  return !!this.unshift(val);
//     if(idx === this.length) return !!this.push(val);

//     const newNode = new Node(val);
//     const before = this.get(idx -1);
//     const after = before.next;

//     before.next = newNode, newNode.prev = before;
//     newNode.next = after, after.prev = newNode;
//     this.length++;
//     return true;
//   }
//   remove(idx) {
//     if(idx < 0 || idx >= this.length) return null;
//     if(idx === 0) return this.shift();
//     if(idx === this.length - 1) return this.pop();

//     const nodeToRemove = this.get(idx);
//     const before = nodeToRemove.prev;
//     const after = nodeToRemove.next;
//     before.next = after;
//     after.prev = before;
//     nodeToRemove.next = null;
//     nodeToRemove.prev = null;
//     return nodeToRemove;
//   }
// }

// const list = new DoublyLinkedList();
// list.push('first');
// list.push('second');
// list.push('third');
// list.push('last');
// // console.log(list.pop());
// // console.log(list.shift());
// // console.log(list.unshift('new head'));

// // console.log(list.get(3));
// // console.log(list.set(2,'new third'));

// // console.log(list);

// // console.log(list.insert(3,'new third'));
// console.log(list.remove(2));

// console.log(list);
