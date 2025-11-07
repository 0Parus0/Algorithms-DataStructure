/**
 * ***********************
 *  Singly Linked List:
 * ***********************
 */

/* Node */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// /* Singly Linked List */

class SinglyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  push(val) {
    const node = new Node(val);
    if (!this.length) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  traverse() {
    let current = this.head;
    while (current) {
      console.log(current.val);
      current = current.next;
    }
  }

  pop() {
    if (!this.head) return null;
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  shift() {
    if (!this.head) return null;
    let temp = this.head;
    this.head = temp.next;
    this.length--;
    temp.next = null;
    if (this.length === 0) {
      this.tail = null;
    }
    return temp;
  }

  unshift(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return -1;
    let counter = 0;
    let current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }

  set(index, val) {
    if (index < 0 || index >= this.length)
      return `The index ${index} is out of bound`;
    if (index === 0) {
      this.head.val = val;
      return this.head;
    }
    if (index === this.length - 1) {
      this.tail.val = val;
      return this.tail;
    }

    let counter = 0;
    let current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    current.val = val;
    return current;
  }
  insert(index, val) {
    const node = new Node(val);
    if (index < 0 || index > this.length)
      return `The index ${index} is out of bound`;
    if (index === 0) {
      node.next = this.head;
      this.head = node;
      return true;
    } else if (index === this.length) {
      this.tail.next = node;
      this.tail = node;
      return true;
    } else {
      let counter = 0;
      let current = this.head;
      while (counter !== index - 1) {
        current = current.next;
        counter++;
      }
      console.log({ counter }, { current });
      node.next = current.next;
      current.next = node;
      return true;
    }
  }

  remove(index) {
    if (index < 0 || index >= this.length) return null;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    let prev = this.get(index - 1);
    let removed = prev.next;
    prev.next = removed.next;
    this.length--;
    return removed;
  }

  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let prev = null;
    let next;
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;

      prev = node;
      node = next;
    }
  }

  print() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    console.log(arr);
  }
}

function reverseIterative(head) {
  let prev = null;
  let current = head;

  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

function reverseList(head) {
  if (!head || !head.next) return head;

  // Imagine: [HEAD] → [REST OF LIST]
  // We want: [REVERSED REST] ← [HEAD]

  // Reverse everything after head
  const newHead = reverseList(head.next);

  // At this point:
  // head.next is still pointing to what was originally the next node
  // but that next node is now the last node of the reversed portion

  // Make the last node of reversed portion point back to current node
  head.next.next = head; // This creates the backward link

  // Sever the original forward link
  head.next = null;

  return newHead;
}

function revers1(head) {
  // base case
  if (!head || !head.next) return head;
  let next = revers1(head.next);
  head.next.next = head;
  head.next = null;

  return next;
}

function reverseList(head) {
  // BASE CASE: If we've reached the end of the list
  // or the list is empty, just return the current node
  if (head === null || head.next === null) {
    return head;
  }

  // STEP 1: Reverse everything after the current node
  // This gives us the reversed list starting from head.next
  const reversedTail = reverseList(head.next);

  // STEP 2: The node after current (head.next) should now
  // point back to the current node to reverse the connection
  head.next.next = head;

  // STEP 3: Break the original forward connection
  // (This will be fixed in previous recursive calls)
  head.next = null;

  // The new head of the reversed list is the node
  // that was originally at the end
  return reversedTail;
}

const singlyLinkedList = new SinglyLinkedList();
// console.log(typeof singlyLinkedList);
singlyLinkedList.push(3);
singlyLinkedList.push("hi");
singlyLinkedList.push(4);
singlyLinkedList.push(8);
singlyLinkedList.push("bye");
// singlyLinkedList.print();
// singlyLinkedList.reverse();
// singlyLinkedList.print();
// console.log(singlyLinkedList.shift());
// console.log(singlyLinkedList);
console.log(revers1(singlyLinkedList.head));

// singlyLinkedList.unshift(5);
// console.log(singlyLinkedList.shift());
// console.log(singlyLinkedList.shift());
// console.log(singlyLinkedList.get(100));
// console.log(singlyLinkedList.set(3, "bye"));
// console.log(singlyLinkedList.insert(0, "bye"));

// console.log(singlyLinkedList.traverse());
// console.log(singlyLinkedList.remove(2));
// console.log(singlyLinkedList.traverse());
// console.log(singlyLinkedList);
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }

// /* Singly Linked List */

// class SinglyLinkedList {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//     this.length = 0;
//   }
//   push(val) {
//     let newNode = new Node(val);
//     if(!this.head) {
//       this.head = newNode;
//       this.tail = this.head;
//       } else {
//       this.tail.next = newNode;
//       this.tail = newNode;
//     }
//     this.length++;
//     return this;
//   }
//   pop() {
//     if(!this.head)return undefined;
//     let current = this.head;
//     let newTail = current;
//     while(current.next) {
//       newTail = current;
//       current = current.next;
//     }
//     // console.log(current.val)
//     // console.log(newTail.val)
//     this.tail = newTail;
//     this.tail.next = null;
//     this.length--;
//     if(!this.length) {
//       this.head = null;
//       this.tail = null;
//     }
//     return current;
//   }
//   unshift(val) {
//     const newNode = new Node(val);
//     if(!this.head) {
//       this.head = newNode;
//       this.tail = this.head;
//     } else {
//       let currentHead = this.head;
//       this.head = newNode;
//       this.head.next = currentHead;
//     }
//     this.length++;
//     return this;
//   }
//   shift() {
//     if(!this.head) return undefined;
//     let currentHead = this.head;
//     if(this.length === 1) {
//       this.head = null;
//       this.tail = null;
//     }
//     this.head = currentHead.next;
//     this.length--;
//     return currentHead;
//   }
//   get(idx) {
//     if(idx < 0 || idx >= this.length) return null;
//     let count = 0;
//     let current = this.head;
//     while(count < idx) {
//       current = current.next;
//       count++;
//     }
//     return current;
//   }
//   set(idx, val) {
//     var foundNode = this.get(idx);
//     if(foundNode) {
//       foundNode.val = val;
//       return true;
//     }
//     return false;
//   }
//   insert(idx, val) {
//     if(idx > this.length || idx < 0) {
//       throw new Error('Index given is too high or too small');
//     }else if(idx === this.length) {
// console.log(list.insert(0,'new head'));
//       return !!this.push(val);
//     } else if(idx === 0) {
// console.log(list.insert(0,'new head'));
//       return !!this.unshift(val);
//     } else {
//       const newNode = new Node(val);
//       let prev = this.traverse(idx -1);
//       let next = prev.next;
//       prev.next = newNode;
//       newNode.next = next;
//       this.length++;
//       return true;
//     }
//   }
//   remove(idx) {
//     if(idx < 0 || idx > this.length) return null;
//     if(idx === 0) return this.shift();
//     if(idx === this.length) return this.pop();
//     let prev = this.get(idx -1);
//     let nodeToRemove = prev.next;
//     prev.next = nodeToRemove.next;
//     return nodeToRemove;
//   }
//   reverse() {
//     // let current = this.head;
//     // this.head = this.tail;
//     // this.tail = current;
//     // let next;
//     // let prev = null;
//     // for(let i = 0; i < this.length; i++) {
//     //   next = current.next;
//     //   current.next = prev;
//     //   prev = current;
//     //   current = next
//     // }
//     // return this;
//     if(!this.length)return;
//     if(!this.head.next) return this.head;
//     let first = this.head;
//     this.tail = this.head;
//     let second = first.next;
//     while(second) {
//       const temp = second.next;
//       second.next = first;
//       first = second;
//       second = temp;
//     }
//     this.head.next = null;
//     this.head = first;
//     return this;
//   }
//   traverse(idx) {
//     if(idx > this.length) throw new Error('Index provided is too high');
//     let current = this.head;
//     let count = 0;
//     while(count !== idx) {
//       // console.log(current.val);
//       current = current.next;
//       count++
//     }
//     return current;
//   }
//   print() {
//     let arr = [];
//     let current = this.head;
//     while(current) {
//       arr.push(current.val);
//       current = current.next;
//     }
//     console.log(arr);
//   }
// }

// const list = new SinglyLinkedList();
// list.push({one: 'one'});
// list.push({two: 'two'});
// list.push({three: 'three'});
// list.push({last: 'last'});
// console.log(list.pop());
// console.log(list.pop());
// console.log(list.pop());
// console.log(list.pop());
// console.log(list.shift());
// console.log(list.unshift('some thing new'));
// console.log(list.get(-89));
// console.log(list.set(2,'new 3rd'));
// console.log(list.insert(-1,'new head'));
// console.log(list.insert(3,'2nd last'));
// console.log(list.remove(1));
// console.log(list.reverse());
// list.reverse();
// console.log(JSON.stringify(list, null, 2));
