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
    const newNode = new Node(val);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    const poppedTail = this.tail;
    if(!this.head) return null;
    if(this.length === 1) {
      this.head = null;
      this.tail = null;
    }else {
      let newTail = this.tail.prev;
      this.tail = newTail;
      newTail.next = null;
      poppedTail.prev = null;
    }
    this.length--;
    return poppedTail;
  }
  shift() {
    if(!this.head)return null;
    let nodeToRemove = this.head;
    if(this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      const newHead = nodeToRemove.next;
      newHead.prev = null;
      this.head = newHead;
      nodeToRemove.next = null;
    }
    this.length--;
    return nodeToRemove;
  }
  unshift(val) {
    const newNode = new Node(val);
    if(!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else  {
      const prevHead = this.head;
      this.head = newNode;
      this.head.next = prevHead;
      prevHead.prev = this.head;
    }
    this.length++;
    return this;
  }
  get(idx) {
    if(idx < 0 || idx >= this.length) return null;
    let current, count;
    if(idx <= this.length/2) {
      // console.log('Working from start');
       current = this.head;
       count = 0;
      while(count !== idx) {
        current = current.next;
        count++;
      }
    } else {
      // console.log('Working from end');
       current = this.tail;
       count = this.length - 1;
      while( count !== idx) {
        current = current.prev;
        count--;
      }
    } 
    return current;   
  }
  set(idx, val) {
    if(idx < 0 || idx >= this.length) return false;
    console.log('started working')
    const foundNode = this.get(idx);
    foundNode.val = val;
    return true;
  }
  insert(idx, val) {
    if(idx < 0 || idx >= this.length) return false;
    if(idx === 0)  return !!this.unshift(val);
    if(idx === this.length) return !!this.push(val);
    
    const newNode = new Node(val);
    const before = this.get(idx -1);
    const after = before.next;

    before.next = newNode, newNode.prev = before;
    newNode.next = after, after.prev = newNode;
    this.length++;
    return true;    
  }
  remove(idx) {
    if(idx < 0 || idx >= this.length) return null;
    if(idx === 0) return this.shift();
    if(idx === this.length - 1) return this.pop();
    
    const nodeToRemove = this.get(idx);
    const before = nodeToRemove.prev;
    const after = nodeToRemove.next;
    before.next = after;
    after.prev = before;
    nodeToRemove.next = null;
    nodeToRemove.prev = null;
    return nodeToRemove;
  }
}


const list = new DoublyLinkedList();
list.push('first');
list.push('second');
list.push('third');
list.push('last');
// console.log(list.pop());
// console.log(list.shift());
// console.log(list.unshift('new head'));

// console.log(list.get(3));
// console.log(list.set(2,'new third'));

// console.log(list);

// console.log(list.insert(3,'new third'));
console.log(list.remove(2));

console.log(list);
