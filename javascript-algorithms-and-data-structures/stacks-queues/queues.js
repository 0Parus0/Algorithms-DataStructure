/**
 * *******************
 * Queues:
 * *******************
 * An other abstract data type
 * abide only by the rule FIFO
 * First In First Out
*/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(val) { // adding to the end/last/tail/bottom;
    const newNode = new Node(val);
    if(!this.first) {
      this.first= newNode;
      this.last = this.first;
    }else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
 }
 dequeue() { // removing from beginning/top/head/first // basically shift()
   const firstNode = this.first;
   if(!this.first)return null;
   if(this.size === 1) {
     this.first = null;
     this.last = null;
   } else {
     this.first = firstNode.next;
     firstNode.next = null;
   }
   this.size--;
   return firstNode;
 }
}


const que = new Queue();
que.enqueue('first');
que.enqueue('second');
que.enqueue('third');
que.enqueue('last');
console.log(que.dequeue());
console.log(que.dequeue());
// console.log(que.dequeue());
// console.log(que.dequeue());
console.log(JSON.stringify(que, null, 2));
// console.log(que);