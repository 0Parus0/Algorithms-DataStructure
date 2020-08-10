// /**
// |--------------------------------------------------
// | Queue data structure using Linked list;
// |--------------------------------------------------
// */

// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }

// class Queue {
//   constructor() {
//     this.first = null;
//     this.last = null;
//     this.length = 0;
//   }

//   peek() {
//     return this.first;
//   }

//   enqueue(value) {
//     const newNode = new Node(value);
//     if(this.length === 0) {
//       this.first = newNode;
//       this.last = this.first;
//       this.length = 1;
//     }else if(this.length === 1) {
//       this.last = newNode;
//       this.first.next = this.last;
//       this.length++;
//     } else {
//       let lastNode = this.last;
//       this.last = newNode;
//       lastNode.next = this.last;
//       this.length++;
//     }
//     return this;
//   }

//   dequeue() {
//     if(!this.first) return null;
//     if(!this.first.next){
//       this.first = null;
//       this.length--;
//     }else {
//       let nodeToRemove = this.first;
//       this.first = this.first.next;
//       this.length--
//     }
//     return this;
//   }
// }

// const myQueue = new Queue();

// myQueue.enqueue('Joy');
// myQueue.enqueue('Matt');
// myQueue.enqueue('Paval');
// myQueue.enqueue('Samir');
// myQueue.dequeue();
// myQueue.dequeue();
// myQueue.dequeue();
// myQueue.dequeue();

// console.log(myQueue.peek());


class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  peek() {
    return this.first;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if(!this.length){
      this.first = newNode;
      this.last = newNode;
      this.length++;
    }else if(this.length === 1) {
      this.last = newNode;
      this.first.next = this.last;
      this.length++;
    }else {
      let prevLast = this.last;
      this.last = newNode;
      prevLast.next = this.last;
      this.length++;
    }
    return this;
  }

  dequeue() {
    if(this.length === 1) {
      let nodeToRemove = this.first;
      this.first = null;
      this.last = null;
      this.length = 0;
      return nodeToRemove;
    }else {
      let nodeToRemove = this.first;
      let newFirst = this.first.next;
      this.first = newFirst;
      this.length--;
      return nodeToRemove;
    }
    return this;
  }

  isEmpty() {
    return this.length === 0;
  }
}


// const myQueue = new Queue();

// myQueue.enqueue('Joy');
// myQueue.enqueue('Matt');
// myQueue.enqueue('Paval');
// myQueue.enqueue('Samir');
// // myQueue.dequeue();
// myQueue.dequeue();
// myQueue.dequeue();
// myQueue.dequeue();

// console.log(myQueue.peek());
// console.log(myQueue.isEmpty());


/**
 * **********************************
 * How to implement a que using stacks
 * **********************************
 */

 class CrazyQueue {
   constructor() {
     this.first = [];
     this.last = [];
   }

   enqueue(value) {
     const length = this.first.length;
     for(let i = 0; i < length; i++) {
       this.last.push(this.first.pop());
     }
     this.last.push(value);
     return this;
   }

   dequeue() {
     const length = this.last.length;
     for(let i = 0; i < length; i++) {
       this.first.push(this.last.pop());
     }
     this.first.pop();
     return this;
   }

   peek(){
     if(this.last.length > 0) {
       return this.last[0];
     }
     return this.first[this.first.length -1];
   }

 }


//  const myQueue = new CrazyQueue();
//  myQueue.peek();
//  myQueue.enqueue('joy');
//  myQueue.enqueue('samir');
//  myQueue.enqueue('matt');
//  myQueue.enqueue('pavel');

//  myQueue.dequeue()
//  myQueue.dequeue()
//  myQueue.dequeue()
//  myQueue.dequeue()
//  myQueue.peek();

/**
 * **************************************
 * Implementing a queue using stacks
 * **************************************
 */

 