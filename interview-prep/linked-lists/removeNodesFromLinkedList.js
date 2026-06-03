/*
2487. Remove Nodes From Linked List
Medium
Topics
premium lock icon
Companies
Hint
You are given the head of a linked list.

Remove every node which has a node with a greater value anywhere to the right side of it.

Return the head of the modified linked list.

 

Example 1:


Input: head = [5,2,13,3,8]
Output: [13,8]
Explanation: The nodes that should be removed are 5, 2 and 3.
- Node 13 is to the right of node 5.
- Node 13 is to the right of node 2.
- Node 8 is to the right of node 3.
Example 2:

Input: head = [1,1,1,1]
Output: [1,1,1,1]
Explanation: Every node has value 1, so no nodes are removed.
 

Constraints:

The number of the nodes in the given list is in the range [1, 105].
1 <= Node.val <= 105
*/

function reverse(head) {
  if (!head || !head.next) return head;

  const last = reverse(head.next);
  head.next.next = head;
  head.next = null;

  return last;
}

function removeNodes(head) {
  head = reverse(head);

  let max = head.val;
  let prev = null;
  let curr = head;

  while (curr) {
    max = Math.max(max, curr.val);

    if (curr.val < max) {
      prev.next = curr.next;
      curr = curr.next;
    } else {
      prev = curr;
      curr = curr.next;
    }
  }
  return reverse(head);
}

// ========================================================================
// 2. Approach Two
// ========================================================================

function removeNodes(head) {
  if (!head || !head.next) return head;

  let nextNode = removeNodes(head.next);

  if (head.val < nextNode.val) {
    return nextNode;
  }

  head.next = nextNode;
  return head;
}
