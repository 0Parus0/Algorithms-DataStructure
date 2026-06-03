/*
1171. Remove Zero Sum Consecutive Nodes from Linked List
Given the head of a linked list, we repeatedly delete consecutive sequences of nodes that sum to 0 until there are no such sequences.
After doing so, return the head of the final linked list.  You may return any such answer.
(Note that in the examples below, all sequences are serializations of ListNode objects.)

Example 1:
Input: head = [1,2,-3,3,1]
Output: [3,1]
Note: The answer [1,2,1] would also be accepted.
Example 2:
Input: head = [1,2,3,-3,4]
Output: [1,2,4]
Example 3:
Input: head = [1,2,3,-3,-2]
Output: [1]

Constraints:
The given linked list will contain between 1 and 1000 nodes.
Each node in the linked list has -1000 <= node.val <= 1000.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function removeZeroSumSublists(head) {
  const dummy = new ListNode(0);
  dummy.next = head;

  const mp = new Map();
  mp.set(0, dummy);
  let prefixSum = 0;

  let curr = head; // Use 'curr' to iterate so we don't lose the reference logic

  while (curr) {
    prefixSum += curr.val;

    if (mp.has(prefixSum)) {
      // We found a sublist that sums to zero
      let start = mp.get(prefixSum);
      let temp = start.next;
      let pSum = prefixSum;

      // Important: Remove the intermediate prefix sums from the map
      // so they don't interfere with future calculations
      while (temp !== curr) {
        pSum += temp.val;
        mp.delete(pSum);
        temp = temp.next;
      }

      // Snap the link to skip the zero-sum section
      start.next = curr.next;
    } else {
      // New prefix sum, add it to the map
      mp.set(prefixSum, curr);
    }

    curr = curr.next;
  }

  return dummy.next;
}

function removeZeroSumSublists(head) {
  const dummy = new ListNode(0);
  dummy.next = head;

  const mp = new Map();
  mp.set(0, dummy);
  let prefixSum = 0;

  while (!head) {
    prefixSum += head.val;
    if (mp.has(prefixSum)) {
      let start = mp.get(prefixSum);
      let temp = start;

      let pSum = prefixSum;
      while (temp !== head) {
        temp = temp.next;
        pSum += temp.val;

        if (temp !== head) {
          mp.delete(pSum);
        }
      }

      start.next = head.next;
    } else {
      mp.set(prefixSum, head);
    }

    head = head.next;
  }

  return dummy.next;
}
