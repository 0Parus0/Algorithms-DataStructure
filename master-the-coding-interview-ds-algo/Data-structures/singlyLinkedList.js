// class LinkedList {
//   constructor(value) {
//     this.head = {
//       value: value,
//       next: null
//     }
//     this.tail = this.head;
//     this.length = 1;
//   }
//   append(value) {
//     const newNode = {
//       value: value,
//       next: null
//     }
//     this.tail.next = newNode;
//     this.tail = newNode;
//     this.length++;
//     return this
//   }

//   prepend(value) {
//     const newNode = {
//       value: value,
//       next: null
//     }
//     newNode.next = this.head;
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
//     if(index >= this.length) this.append(value);
//     const newNode = {
//       value: value,
//       next: null
//     }
//     const leader = this.traverseToIndex(index -1);
//     const holdingPointer = leader.next;
//     leader.next = newNode;
//     newNode.next = holdingPointer;
//     this.length++;
//     return this.printList();
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
//     if(index >= this.length)return alert('The index provided is too big');
//     if(index === this.length -1){
//       const leader = this.traverseToIndex(index -1);
//       let unwantedNode = leader.next;
//       leader.next = unwantedNode.next;
//       this.tail = leader;
//       this.length --;
//       return this.printList();

//     } else {
//       const leader = this.traverseToIndex(index -1);
//       const unwantedNode = leader.next;
//       leader.next = unwantedNode.next;
//       this.length--;
//       return this.printList();
//     }
    
//   }
//   reverse() {
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
//   }
// }

// const myLinkedList = new LinkedList(10);
// myLinkedList.append(5)
// myLinkedList.append(16)
// myLinkedList.prepend(1)
// myLinkedList.insert(2, 99);
// console.log(myLinkedList.printList());

// myLinkedList.reverse();
// console.log(myLinkedList.printList());

// // myLinkedList.remove(4);


// // console.log(myLinkedList);
// // console.log(myLinkedList.printList());

class Node {
  constructor(value) {
    this.value = value,
    this.next = null
  }
}


class LinkedList {
  constructor(value) {
    this.head = {
      value: value,
      next: null
    }
    this.tail = this.head;
    this.length = 1;
  }

  append(value) {
    const newNode = new Node(value);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return this;
  }

  insert(index, value) {
    if(index >= this.length) return this.append(value);
    // let pre = this.head;
    // for(let i = 0; i < index -1; i++) {
    //   pre = pre.next;
    // }
    let pre = this.traverseToIndex(index -1);
    let aft = pre.next;
    const newNode = new Node(value);
    pre.next = newNode;
    newNode.next = aft;
    this.length++;
    return this;
  }

  printList() {
    const array = [];
    let currentNode = this.head;
    while(currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  }

  traverseToIndex(index) {
    let currentNode = this.head;
    for(let i = 0; i < index ; i++) {
      currentNode = currentNode.next;
      // console.log(i, currentNode);
    }
    return currentNode;
  }
  remove(index) {
    // check the parameters
    let pre = this.traverseToIndex(index -1);
    let nodeToRemove = pre.next;
    let aft = nodeToRemove.next;
    pre.next = aft;
    this.length--;
    return nodeToRemove;
  }
  reverse(){
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
}

const myLinkedList = new LinkedList(10);
myLinkedList.append(5);
myLinkedList.append(51);
myLinkedList.append(9);
myLinkedList.prepend(34);
myLinkedList.prepend(4);
// myLinkedList.insert(3, 70);
// myLinkedList.insert(77, 70);
myLinkedList.remove(2);




console.log(myLinkedList.printList());
console.log(myLinkedList.reverse());
console.log(myLinkedList.printList());

