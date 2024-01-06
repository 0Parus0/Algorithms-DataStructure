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
