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

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

var reverseKGroup = function (head, k) {
  if (!head || k <= 1) return head;

  let dummy = new ListNode(0);
  dummy.next = head;
  let prevGroupEnd = dummy;

  while (prevGroupEnd.next) {
    // Check if there are at least k nodes remaining
    let count = 0;
    let checker = prevGroupEnd.next;
    while (checker && count < k) {
      checker = checker.next;
      count++;
    }

    // If fewer than k nodes remain, leave them as is
    if (count < k) break;

    // Reverse the next k nodes
    let groupStart = prevGroupEnd.next;
    let curr = groupStart;
    let prev = null;
    let next = null;
    count = 0;

    while (curr && count < k) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
      count++;
    }

    // Connect the reversed group to the list
    prevGroupEnd.next = prev; // Connect previous group to new group start
    groupStart.next = curr; // Connect new group end to next group

    // Move to the end of the current reversed group
    prevGroupEnd = groupStart;
  }

  return dummy.next;
};
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

var reverseKGroup1 = function (head, k) {
  if (!head || k <= 1) return head;

  let dummy = new ListNode(0);
  dummy.next = head;
  let prevGroupEnd = dummy;

  while (prevGroupEnd.next) {
    // Check if we have at least k nodes remaining
    let groupStart = prevGroupEnd.next;
    let groupEnd = groupStart;
    let count = 1;

    while (groupEnd.next && count < k) {
      groupEnd = groupEnd.next;
      count++;
    }

    // If fewer than k nodes, leave them as is
    if (count < k) break;

    // Store the node after current group
    let nextGroupStart = groupEnd.next;

    // Reverse the current group using helper function
    reverseSublist(groupStart, groupEnd);

    // Connect the reversed group to the list
    prevGroupEnd.next = groupEnd; // Connect previous group to new group start
    groupStart.next = nextGroupStart; // Connect new group end to next group

    // Move to the end of current reversed group
    prevGroupEnd = groupStart;
  }

  return dummy.next;
};

// Helper function to reverse a sublist from start to end (inclusive)
function reverseSublist(start, end) {
  let prev = null;
  let curr = start;
  let stop = end.next; // The node after the end

  while (curr !== stop) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev; // Returns the new start of reversed list
}
var reverseKGroup2 = function (head, k) {
  if (!head || k <= 1) return head;

  let dummy = new ListNode(0);
  dummy.next = head;
  let prevGroupEnd = dummy;

  while (true) {
    // Check if we have k nodes to reverse
    let kth = getKthNode(prevGroupEnd, k);
    if (!kth) break; // Less than k nodes remaining

    let nextGroupStart = kth.next;
    let groupStart = prevGroupEnd.next;

    // Reverse the k nodes
    reverseSublist(groupStart, kth);

    // Reconnect the reversed group
    prevGroupEnd.next = kth; // Connect to new group start
    groupStart.next = nextGroupStart; // Connect to next group

    // Move to next group
    prevGroupEnd = groupStart;
  }

  return dummy.next;
};

// Helper to get the k-th node from current position
function getKthNode(curr, k) {
  while (curr && k > 0) {
    curr = curr.next;
    k--;
  }
  return curr;
}

// Helper to reverse k nodes starting from given node
function reverseSublist(start, end) {
  let prev = end.next; // This will be the node after reversal
  let curr = start;

  while (prev !== end) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}
