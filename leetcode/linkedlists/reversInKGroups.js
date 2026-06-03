/*Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

 

Example 1:


Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
Example 2:


Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
 

Constraints:

The number of nodes in the list is n.
1 <= k <= n <= 5000
0 <= Node.val <= 1000
 

Follow-up: Can you solve the problem in O(1) extra memory space?
*/
//Definition for singly-linked list.
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function kReverse(head, k) {
  let count = 0;
  let dummy = new ListNode(-1, head);

  let temp = dummy;

  while (temp.next) {
    temp = temp.next;
    count++;
  }

  temp = dummy;
  while (temp.next) {
    if (count < k) break;
    let nodes = k - 1;
    let tempNext = temp.next;
    let prev = temp.next;
    let curr = prev.next;

    while (nodes-- > 0) {
      let next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    count -= k;
    temp.next = prev;
    tempNext.next = curr;
    temp = tempNext;
  }
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
