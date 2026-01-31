/*
Reverse a Linked List in groups of given size
Last Updated : 23 Jul, 2025
Given a Singly linked list containing n nodes. The task is to reverse every group of k nodes in the list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should be considered as a group and must be reversed.

Example: 

Input: head: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> NULL, k = 2 
Output: head: 2 -> 1 -> 4 -> 3 -> 6 -> 5 -> NULL 
Explanation : Linked List is reversed in a group of size k = 2.

Reverse-a-Linked-List-in-groups-of-given-size-1
 


Input: head: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> NULL, k = 4 
Output: head:  4 -> 3 -> 2 -> 1 -> 6 -> 5 -> NULL
Explanation : Linked List is reversed in a group of size k = 4.

Reverse-a-Linked-List-in-groups-of-given-size-2
*/
class Node {
  constructor(val) {
    this.val = val === undefined ? 0 : val;
    this.next = null;
  }
}

class Node {
  constructor(val) {
    this.val = val === undefined ? 0 : val;
    this.next = null;
  }
}

function reverseInGroups(head, k) {
  if (!head || k <= 1) return head;

  let dummy = new Node(0);
  dummy.next = head;
  let groupPrev = dummy; // Node before the current group

  while (groupPrev.next) {
    // Find the start and end of current group
    let groupStart = groupPrev.next;
    let groupEnd = groupStart;
    let count = 1;

    // Move groupEnd to the k-th node (or last node if group is smaller)
    while (groupEnd.next && count < k) {
      groupEnd = groupEnd.next;
      count++;
    }

    if (count < k) {
      // Last group has fewer than k nodes, reverse it and break
      reverseSublist(groupStart, groupEnd);
      break;
    }

    // Store the node after current group
    let nextGroupStart = groupEnd.next;

    // Reverse the current group
    reverseSublist(groupStart, groupEnd);

    // Connect the reversed group to the list
    groupPrev.next = groupEnd; // Connect previous group to new group start
    groupStart.next = nextGroupStart; // Connect new group end to next group

    // Move to next group
    groupPrev = groupStart;
  }

  return dummy.next;
}

// Helper function to reverse a sublist from start to end
function reverseSublist(start, end) {
  let prev = null;
  let curr = start;
  let stop = end.next; // The node after end

  while (curr !== stop) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev; // Returns the new start of reversed list
}

function reverseInGroupsIt(head, k) {
  if (!head || k <= 1) return head;

  let dummy = new Node(0);
  dummy.next = head;
  let prevGroupEnd = dummy;

  while (prevGroupEnd.next) {
    let groupStart = prevGroupEnd.next;
    let curr = groupStart;
    let prev = null;
    let count = 0;

    // Reverse k nodes
    while (curr && count < k) {
      let next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
      count++;
    }

    // Connect the reversed group
    prevGroupEnd.next = prev; // Connect previous group to new group start
    groupStart.next = curr; // Connect new group end to next group

    // Move to next group
    prevGroupEnd = groupStart;

    // If remaining nodes < k, we're done
    if (!curr) break;
  }

  return dummy.next;
}
