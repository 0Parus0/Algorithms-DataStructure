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
    this.val === undefined ? 0 : val;
    this.next = null;
  }
}

function reversInSizes(head, k) {
  let first = new Node(0);
  first.next = head;
  head = first;
  let second, prev, curr, x, front;
  while (first.next) {
    x = k;
    second = first.next;
    prev = first;
    curr = first.next;

    while (x && curr) {
      front = curr.next;
      curr.next = prev;
      prev = curr;
      curr = front;
      x--;
    }

    first.next = prev;
    second.next = curr;
    first = second;
  }
  first = head;
  head = head.next;
  delete first;
  return head;
}
