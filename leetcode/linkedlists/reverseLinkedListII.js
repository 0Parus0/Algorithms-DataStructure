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
