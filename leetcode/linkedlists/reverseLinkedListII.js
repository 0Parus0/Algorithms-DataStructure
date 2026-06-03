/*
Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.

 

Example 1:


Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]
Example 2:

Input: head = [5], left = 1, right = 1
Output: [5]
 

Constraints:

The number of nodes in the list is n.
1 <= n <= 500
-500 <= Node.val <= 500
1 <= left <= right <= n
 

Follow up: Could you do it in one pass?
*/

// Definition for singly-linked list.
function ListNode(val, next) {
  if (!head || !head.next || right === left) return head;
  // Create a dummy node to mark the head of this list
  let dummy = new ListNode(0);
  dummy.next = head;

  let leftPrev = dummy;
  let current = head;
  for (let i = 0; i < left - 1; i++) {
    leftPrev = leftPrev.next;
    current = current.next;
  }

  // Make a marker to node where we start reversing
  let subListHead = current;
  let prev = null;

  for (let i = 0; i <= right - left; i++) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  // join the pieces
  leftPrev.next = prev;
  subListHead.next = current;
  return dummy.next;
}

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function reverseBetween(head, left, right) {
  if (!head || left === right) return head;

  let dummy = new ListNode(0);
  dummy.next = head;

  // 1. Move 'prev' to the node just before the reversal starts
  let prev = dummy;
  for (let i = 1; i < left; i++) {
    prev = prev.next;
  }

  // 2. 'curr' is the first node of the segment to be reversed
  let curr = prev.next;

  // 3. Perform the "shifting" reversal
  for (let i = 0; i < right - left; i++) {
    // 'next' is the node we are about to move to the front
    let next = curr.next;

    // Step A: Cut 'next' out of its current position
    curr.next = next.next;

    // Step B: Point 'next' to the current front of the sub-list
    next.next = prev.next;

    // Step C: Move 'next' to the position immediately after 'prev'
    prev.next = next;
  }

  return dummy.next;
}

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function reverseBetween(head, left, right) {
  if (!head || left === right) return head;

  let dummy = new ListNode(0);
  dummy.next = head;
  let pre = dummy;

  // Move 'pre' to the node just before the start of the reversal
  for (let i = 1; i < left; i++) {
    pre = pre.next;
  }

  // 'start' will be the first node in the segment to reverse
  let start = pre.next;

  // 'then' will be the node that will be reversed into place
  let then = start.next;

  // Perform the reversal
  for (let i = 0; i < right - left; i++) {
    start.next = then.next;
    then.next = pre.next;
    pre.next = then;
    then = start.next;
  }

  return dummy.next;
}

// Example usage:
const head = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))),
);
console.log(reverseBetween(head, 2, 4)); // Output: [1,4,3,2,5]
