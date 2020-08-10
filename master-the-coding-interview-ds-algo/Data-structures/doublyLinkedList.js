// class DoublyLinkedList {
//   constructor(value) {
//     this.head = {
//       value: value,
//       next: null, 
//       prev: null
//     }
//     this.tail = this.head;
//     this.length = 1;
//   }
//   append(value) {
//     const newNode = {
//       value: value,
//       next: null,
//       prev: null
//     }
//     newNode.prev = this.tail;
//     this.tail.next = newNode;
//     this.tail = newNode;
//     this.length++;
//     return this
//   }

//   prepend(value) {
//     const newNode = {
//       value: value,
//       next: null,
//       prev: null
//     }
//     newNode.next = this.head;
//     this.head.prev = newNode;
//     this.head = newNode;
//     this.length++;
//     return this;
//   }

//   printList() {
//     const array = [];
//     let currentNode = this.head;
//     while(currentNode) {
//       array.push(currentNode.value);
//       currentNode = currentNode.next;
//     }
//     return array;
//   }

//   insert(index, value) {
//     if(index >= this.length) {this.append(value)}
//     else {
//       const newNode = {
//         value: value,
//         next: null,
//         prev: null
//       }
//       const leader = this.traverseToIndex(index -1);
//       const follower = leader.next;
//       leader.next = newNode;
//       newNode.next = follower;
//       newNode.prev = leader;
//       follower.prev = newNode;
//       this.length++;
//       return this.printList();
//     }
//   }

//   traverseToIndex(index) {
//     if(index >=this.length) {
//       throw new Error('The index provide is too big');
//     }
//     let counter = 0;
//     let currentNode = this.head;
//     while(counter !== index) {
//       currentNode = currentNode.next;
//       counter++;
//     }
//     return currentNode;
//   }

//   remove(index) {
//     if(index >= this.length) return this;
//     if(index === this.length - 1){
//       let unwantedNode = this.tail;
//       this.tail = this.tail.prev
//       unwantedNode = this.tail;
//       this.tail.next = null;
//       this.length--;
//       return this.printList();
//     } else {
//         const leader = this.traverseToIndex(index -1);
//         const follower = leader.next;
//         const unwantedNode = leader.next;
//         leader.next = unwantedNode.next;
//         follower.prev = leader
//         this.length--;
//         return this.printList();
//     }
    
//   }

// }

// const myLinkedList = new DoublyLinkedList(10);
// myLinkedList.append(5)
// myLinkedList.append(16)
// myLinkedList.prepend(1)
// myLinkedList.insert(4, 99);
// console.log(myLinkedList.printList());

// myLinkedList.remove(4);
// myLinkedList.remove(1);


// // console.log(myLinkedList.printList());
// console.log(myLinkedList.printList());
// console.log(myLinkedList);

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null
  }
}

class DoublyLinkedList {
  constructor(value) {
    this.head = {
      value: value,
      next: null,
      previous: null
    }
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = new Node(value);
    let prevNode = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
    this.tail.previous = prevNode;
    this.length++;
    return this;
  }

  prepend(value) {
    const newNode = new Node(value);
    let nextNode = this.head;
    this.head.previous = newNode;
    this.head = newNode;
    this.head.next = nextNode;
    this.length++;
    return this;

  }

  traverseToIndex(index) {
    let currNode = this.head;
    for(let i = 0; i < index; i++){
      currNode = currNode.next;
    }
    return currNode;
  }

  printList() {
    const array = [];
    let currNode = this.head;
    while(currNode !== null){
      array.push(currNode.value);
      currNode = currNode.next;
    }
    return array;
  }
  insert(index, value) {
    const newNode = new Node(value);
    let pre = this.traverseToIndex(index -1);
    let aft = pre.next;
    pre.next = newNode;
    aft.previous = newNode;
    newNode.previous = pre;
    newNode.next = aft;
    this.length++;
    return this;
  }
  remove(index){
    let pre = this.traverseToIndex(index -1);
    let nodeToRemove = pre.next;
    let aft = nodeToRemove.next;
    pre.next = aft;
    aft.previous = pre;
    this.length--;
    return nodeToRemove;
  }
}

myLinkedList = new DoublyLinkedList(5);
myLinkedList.append(13);
myLinkedList.append(17);
myLinkedList.append(23);
myLinkedList.append(37);
myLinkedList.prepend(41);
myLinkedList.insert(1, 44);

myLinkedList.remove(3);

console.log(myLinkedList);
console.log(myLinkedList.printList());