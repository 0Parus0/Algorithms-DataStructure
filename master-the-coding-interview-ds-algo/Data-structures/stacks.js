// /**
// |--------------------------------------------------
// | Stack data structure using Linked lists
// |--------------------------------------------------
// */

// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }

// class Stack {
//   constructor() {
//     this.top = null;
//     this.bottom = null;
//     this.length = 0;
//   }

//   peek() {
//     return this.top;
//   }

//   push(value) {
//     const newNode = new Node(value);
//     if(this.length === 0) {
//       this.top = newNode;
//       this.bottom = this.top;
//       this.length = 1;
//     } else if(this.length === 1) {
//       let topNode = this.top;
//       this.top = newNode;
//       this.bottom = topNode;
//       this.top.next = topNode;
//       this.length++;
//     }else {
//       let topNode = this.top;
//       this.top = newNode;
//       this.top.next = topNode;
//       this.length++;
//     }
//     return this;
//   }

//   pop() {
//     let NodeToRemove = this.top;
//     if(this.length === 0) return null;
//     if(this.length === 1) {
//       this.top = null;
//       this.bottom = null;
//       this.length = 0;
//     } else {
//       this.top = this.top.next;
//       this.length--;
//     }
//     return this;
//   }
// }

// const myStack = new Stack();

// // myStack.push('google');
// // myStack.push('Udemy');
// // myStack.push('Discord');
// // myStack.push('stackoverflow')
// // myStack.pop();
// // myStack.pop();
// // myStack.pop();
// // myStack.pop();
// // console.log(myStack);

// /**
// |--------------------------------------------------
// | Stack data structure using array
// |--------------------------------------------------
// */

// class ArrayStack {
//   constructor() {
//     this.array = [];
//   }

//   peek() {
//     return this.array[this.array.length - 1];
//   }

//   push(value) {
//     this.array.push(value);
//   }

//   pop() {
//     this.array.pop();
//   }
// }

// const myStack1 = new ArrayStack()

// myStack1.push('google');
// myStack1.push('Udemy');
// myStack1.push('Discord');
// myStack1.push('stackoverflow')
// // myStack1.pop();
// myStack1.pop();
// myStack1.pop();
// myStack1.pop();
// console.log(myStack1.peek());

class Node {
  constructor(value) {
    this.value = value;
    this.next = null
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  peek() {
    return this.top;
  }

  push(value) {
    const newNode = new Node(value);
    if(!this.length) {
      this.top = newNode;
      this.bottom = newNode;
      this.length++
    } else if(this.length === 1) {
      let topNode = this.top;
      this.top = newNode;
      newNode.next = topNode;
      this.bottom = topNode;
      this.length++
    } else {
      let topNode = this.top;
      this.top = newNode;
      newNode.next = topNode;
      this.length++;
    }
    return this;
  }

  pop() {
    if(this.length === 1) {
      let nodeToRemove = this.top;
      this.top= null;
      this.bottom = null;
      this.length--;
      return nodeToRemove;
    } else {
      let nodeToRemove = this.top;
      let newTop = this.top.next;
      this.top = newTop;
      this.length--;
      return nodeToRemove;
    }
  }
}

const myStack = new Stack();


// myStack.push('google');
// myStack.push('Udemy');
// myStack.push('Discord');
// myStack.push('stackoverflow')

// myStack.pop();
// myStack.pop();
// myStack.pop();


// console.log(myStack.peek());
// console.log(myStack);


class ArrayStack {
  constructor() {
    this.array = [];
  }

  peek() {
    return this.array[this.array.length - 1];
  }

  push(value) {
    this.array.push(value);
    return this;
  }

  pop() {
    this.array.pop();
    return this;
  }
}

const myStack1 = new ArrayStack();


myStack1.push('google');
myStack1.push('Udemy');
myStack1.push('Discord');
myStack1.push('stackoverflow')

// myStack1.pop();
// myStack1.pop();
myStack1.pop();


console.log(myStack1.peek());
console.log(myStack1);
