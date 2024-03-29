/**
 * *********************
 *  Stacks:
 * An abstract data type
 * Only rule is LIFO
 * Last In First Out
 * First In Last Out
 * *********************
 */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.size = 0;
  }

  push(val) {
    let node = new Node(val);
    if (!this.top) {
      this.top = node;
      this.bottom = node;
    } else {
      node.next = this.top;
      this.top = node;
    }
    return ++this.size;
  }

  pop() {
    if (!this.top) return false;

    let popped = this.top;
    if (this.top === this.bottom) {
      this.top = null;
      this.bottom = null;
    } else {
      this.top = this.top.next;
      popped.next = null;
    }
    this.size--;
    return popped;
  }
}

const stack = new Stack();
console.log(stack.push(3));
console.log(stack.push(4));
console.log(stack.push(5));
console.log(stack.push(6));
console.log(stack.bottom);
console.log(stack.top);
console.log(stack.pop());
console.log(stack.bottom);
console.log(stack.top);
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }

// class Stack {
//   constructor() {
//     this.top = null;
//     this.bottom = null;
//     this.size = 0;
//   }

//   push(val) { // basically its an unshift
//     const newNode = new Node(val);
//     if(!this.top) {
//       this.top = newNode;
//       this.bottom = this.top;
//     }else {
//       let topNode = this.top;
//       this.top = newNode;
//       this.top.next = topNode;

//     }
//     return ++this.size;
//  }
//   // push(val) {
//   //   const newNode = new Node(val);
//   //   if(!this.top) {
//   //     this.top = newNode;
//   //     this.bottom = newNode;
//   //   }else {
//   //     let topNode = this.top;
//   //     this.top = newNode;
//   //     this.top.next = topNode;
//   //   }
//   //   return ++this.size;
//   // }

//   pop() { // it's a shift
//     if(!this.top)return null;
//     const nodeToRemove = this.top;
//     if(this.size === 1) {
//       this.top = null;
//       this.bottom = null;
//     } else {
//     this.top = this.top.next;
//     nodeToRemove.next = null;
//     }
//     this.size--;
//     return nodeToRemove;

//   }

//   peek() {
//     return this.top;
//   }
// }

// const stack = new Stack();
// stack.push('first');
// stack.push('second');
// stack.push('third');
// stack.push('last');
// console.log(stack.pop());
// // stack.pop();
// // stack.pop();
// console.log(JSON.stringify(stack, null, 2));
// console.log(stack);
