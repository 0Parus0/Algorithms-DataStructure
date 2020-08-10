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

/* Singly Linked List */

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let newNode = new Node(val);
    if(!this.head) {
      this.head = newNode;
      this.tail = this.head;
      } else {
      this.tail.next = newNode;
      this.tail = newNode;     
    }
    this.length++;
    return this;
  }
  pop() {
    if(!this.head)return undefined;
    let current = this.head;
    let newTail = current;
    while(current.next) {
      newTail = current;
      current = current.next;
    }
    // console.log(current.val)
    // console.log(newTail.val)
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if(!this.length) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }
  unshift(val) {
    const newNode = new Node(val);
    if(!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      let currentHead = this.head;
      this.head = newNode;
      this.head.next = currentHead;
    }
    this.length++;
    return this;
  }
  shift() {
    if(!this.head) return undefined;
    let currentHead = this.head;
    if(this.length === 1) {
      this.head = null;
      this.tail = null;
    }
    this.head = currentHead.next;
    this.length--;
    return currentHead;
  }
  get(idx) {
    if(idx < 0 || idx >= this.length) return null;
    let count = 0;
    let current = this.head;
    while(count < idx) {
      current = current.next;
      count++;
    }
    return current;
  }
  set(idx, val) {
    var foundNode = this.get(idx);
    if(foundNode) {
      foundNode.val = val;
      return true;
    }
    return false;
  }
  insert(idx, val) {
    if(idx > this.length || idx < 0) { 
      throw new Error('Index given is too high or too small');
    }else if(idx === this.length) {
console.log(list.insert(0,'new head'));
      return !!this.push(val);
    } else if(idx === 0) {
console.log(list.insert(0,'new head'));
      return !!this.unshift(val);
    } else {
      const newNode = new Node(val);
      let prev = this.traverse(idx -1);
      let next = prev.next;
      prev.next = newNode;
      newNode.next = next;
      this.length++;
      return true;
    }
  }
  remove(idx) {
    if(idx < 0 || idx > this.length) return null;
    if(idx === 0) return this.shift();
    if(idx === this.length) return this.pop();
    let prev = this.get(idx -1);
    let nodeToRemove = prev.next;
    prev.next = nodeToRemove.next; 
    return nodeToRemove;
  }
  reverse() {
    // let current = this.head;
    // this.head = this.tail;
    // this.tail = current;
    // let next;
    // let prev = null;
    // for(let i = 0; i < this.length; i++) {
    //   next = current.next;
    //   current.next = prev;
    //   prev = current;
    //   current = next
    // }
    // return this;
    if(!this.length)return;
    if(!this.head.next) return this.head;
    let first = this.head;
    this.tail = this.head;
    let second = first.next;
    while(second) {
      const temp = second.next;
      second.next = first;
      first = second;
      second = temp;     
    }
    this.head.next = null;
    this.head = first;
    return this;
  }
  traverse(idx) {
    if(idx > this.length) throw new Error('Index provided is too high');
    let current = this.head;
    let count = 0;
    while(count !== idx) {
      // console.log(current.val);
      current = current.next;
      count++
    }
    return current;
  }
  print() {
    let arr = [];
    let current = this.head;
    while(current) {
      arr.push(current.val);
      current = current.next;
    }
    console.log(arr);
  }
}

const list = new SinglyLinkedList();
list.push({one: 'one'});
list.push({two: 'two'});
list.push({three: 'three'});
list.push({last: 'last'});
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
list.reverse();
console.log(JSON.stringify(list, null, 2));
