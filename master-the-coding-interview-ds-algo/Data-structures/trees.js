// class Node {
//   constructor(value) {
//     this.left = null;
//     this.right = null;
//     this.value = value;
//   }
// }

// class BinarySearchTree {
//   constructor() {
//     this.root = null;
//   }

//   insert(value) {
//     const newNode = new Node(value)
//     if(!this.root) {
//       this.root = newNode
//     } else {
//       let currentNode = this.root;
//       while(true) {
//         if(value < currentNode.value) {
//           // left
//           if(!currentNode.left) {
//             currentNode.left = newNode;
//             return this
//           } 
//           currentNode = currentNode.left
//         }else {
//           // Right
//           if(!currentNode.right){
//             currentNode.right = newNode;
//             return this
//           }
//           currentNode = currentNode.right;
//         }
//       }
//     }
//   }

//   lookup(value) {
//     if(!this.root) return false;
//     let currentNode = this.root;
//     while(currentNode) {
//       if(value < currentNode.value) {
//         currentNode = currentNode.left;
//       } else if (value > currentNode.value){
//         currentNode = currentNode.right;
//       } else if (value === currentNode.value) {
//         return currentNode;
//       }
//     }
//     return false;
//   }

//   remove() {
//     if(!this.root) return false;
//     let currentNode = this.root;
//     let parentNode = null;
//     while(currentNode) {
//       if(value < currentNode.value) {
//         parentNode = currentNode;
//         currentNode = currentNode.left;
//       } else if (value > currentNode.value) {
//         parentNode = currentNode;
//         currentNode = currentNode.right;
//       } else if (value === currentNode.value) {
//         //Option 1: No right child
//         if(!currentNode.right){
//           //Option 2: Right child which doesn't have a left child
//           if(!parentNode) {
//             this.root = currentNode.left;
//           } else {
//             currentNode.right.left = currentNode.left;
//           }
//           // if parent > current, make right child of the left of the parent
//           if(currentNode.value < parentNode.value) {
//             parentNode.left = currentNode.right;
//             // if parent < current , make right child a right child of the parent
//           } else if(currentNode.value > parentNode.value) {
//             parentNode.right = currentNode.right;
//             // Option 3: Right child that has a left child
//           } else {
//             // find the right child's left most child
//             let leftMost = currentNode.right.left;
//             let leftMostParent = currentNode.right;
//             while(leftMost.left !== null) {
//               leftMostParent = leftMost;
//               leftMost = leftMost.left;
//             }
//             // Parent's left subtree is now leftMost's right subtree
//             leftMostParent.left = leftMost.right;
//             leftMost.left = currentNode.left;
//             leftMost.right = currentNode.right;

//             if(parentNode === null) {
//               this.root = leftmost;
//             } else {
//               if(currentNode.value < parentNode.value) {
//                 parentNode.left = leftMost;
//               } else if( currentNode.value > parentNode.value) {
//                 parentNode.right = leftMost;
//               }
//             }
//           }


//         }else if(currentNode.right.left === null) {

//         }else {

//         }
//       }
//     }
//   }
// }

// const tree = new BinarySearchTree();
// tree.insert(9);
// tree.insert(4);
// tree.insert(6);
// tree.insert(20);
// tree.insert(170);
// tree.insert(15);
// tree.insert(1);

// console.log(tree.lookup(150));

// // console.log(tree);

// function traverse(node) {
//   const tree = { value: node.value };
//   tree.left = node.left === null ? null : traverse(node.left);
//   tree.right = node.right === null ? null : traverse(node.right);
//   return tree;
// }

// // console.log(JSON.stringify(traverse(tree.root)));

class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if(!this.root){
      this.root = newNode;
      return this;
    } else {
      let currentNode = this.root;
      while(true) {
        if(value < currentNode.value) {
          // Left
          if(!currentNode.left){
            currentNode.left = newNode;
            return this;
          }
          currentNode = currentNode.left;
        }else {
          if(value > currentNode.value) {
            // Right
            if(!currentNode.right) {
              currentNode.right = newNode;
              return this;
            }
          }
          currentNode = currentNode.right;
        }
      }
    }
  }

  lookup(value) {
    if(value === this.root.value) return this.root.value;
    let currentNode = this.root;
    while(currentNode) {
      if(value < currentNode.value) {
        currentNode = currentNode.left;
      } else if(value > currentNode.value) {
        currentNode = currentNode.right;
      } else if(currentNode.value === value){
        return currentNode;
      }
    }
    return false;
  } 

  remove(value) {
    let currentNode = this.root;
    let parentNode = null;
    while(currentNode) {
      if(value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if(value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if(currentNode.value === value) {
        // Option 1: No right child
        if(currentNode.right === null) {
          if(parentNode === null) {
            this.root = currentNode.left
          } else {
            // if parent.value > current.value, make current left child a left child of parent 
            if(currentNode.value < parentNode.value) {
              parentNode.left = currentNode.left;

              // if parent < current value, make left child a right child of parent
            }else if(currentNode.value > parentNode.value) {
              parentNode.right = currentNode.left;
            }
          }
          // Option 2: Right child which doesn't have a left child;
        } else if(currentNode.right.left === null) {
          if(parentNode === null) {
            this.root = currentNode.left;
          }else {
            currentNode.right.left = currentNode.left;
            // if parent > current, make right child of the left of the parent
            if(currentNode.value < parentNode.value) {
              parentNode.left = currentNode.right;
              // if parent < current, make right child a right child of the parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.right;
            }
          }
          // Option 3: Right child that has a left child
        } else {
          // find the Right child's left most child
          let leftmost = currentNode.right.left;
          let leftMostParent = currentNode.right;
          while(leftmost.left !== null) {
            leftMostParent = leftmost;
            leftmost = leftmost.left;
          }
          
          // parent's left subtree is now leftmost's right subtree
          leftMostParent.left =  leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;

          if(parentNode === null) {
            this.root = leftmost;

          }else {
            if(currentNode.value < parentNode.value) {
              parentNode.left = leftmost;

            } else if(currentNode.value > parentNode.value) {
              parentNode.right = leftmost;
            }
          }
        }
        return true;
      }
    }
  }

}

const tree = new BinarySearchTree();
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);
// console.log(tree);

// console.log(tree.lookup(9));
// console.log(tree.lookup(94));
// console.log(tree.lookup(15));
// console.log(tree.lookup(170));

console.log(tree.remove(20));



function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}

console.log(JSON.stringify(traverse(tree.root)));


