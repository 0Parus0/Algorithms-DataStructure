/*
1 - Detect cycle in LinkedList
2 - Remove cycle from LinkedList
3 - Beginning / start node of loop in LinkedList
*/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function detectCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }
  return false;
}

function countLoopLength(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) break;
  }

  if (!fast || !fast.next) return false;

  let count = 1;
  slow = slow.next;
  while (slow !== fast) {
    count++;
    slow = slow.next;
  }

  return count;
}

function removeLoop(head) {
  if (!head || !head.next) return null;
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) break;
  }

  if (!fast || !fast.next) return head;

  if (slow === head) {
    // Special case: loop starts at head
    while (slow.next !== head) {
      slow = slow.next;
    }
    slow.next = null;
    return head;
  }

  let temp = head;
  let prev = null;
  while (temp !== slow) {
    prev = slow;
    temp = temp.next;
    slow = slow.next;
  }

  prev.next = null;
  return head;
}
// Helper function to create a linked list with cycle
function createLinkedListWithCycle(values, cycleStartIndex) {
  if (values.length === 0) return null;

  const nodes = values.map((val) => new Node(val));

  // Connect nodes normally
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  // Create cycle if specified
  if (cycleStartIndex >= 0 && cycleStartIndex < nodes.length) {
    nodes[nodes.length - 1].next = nodes[cycleStartIndex];
  }

  return nodes[0];
}

// Test the functions
const listWithCycle = createLinkedListWithCycle([1], 0);
console.log(listWithCycle);
console.log("Has cycle:", detectCycle(listWithCycle)); // true
console.log(removeLoop(listWithCycle));

console.log("Has cycle:", detectCycle(listWithCycle)); // false

// const startNode = findLoopStart(listWithCycle);
// console.log("Loop starts at node with value:", startNode.val); // 3

// const loopLength = countLoopLength(startNode, startNode); // You'd need to pass meeting point
// console.log("Loop length:", loopLength);

// const fixedList = removeLoopOptimized(listWithCycle);
// console.log("Has cycle after removal:", detectCycle(fixedList)); // false
