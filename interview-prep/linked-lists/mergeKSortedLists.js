/*
23. Merge k Sorted Lists
Solved
Hard
Topics
premium lock icon
Companies
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

 

Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted linked list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []
 

Constraints:

k == lists.length
0 <= k <= 104
0 <= lists[i].length <= 500
-104 <= lists[i][j] <= 104
lists[i] is sorted in ascending order.
The sum of lists[i].length will not exceed 104.
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (!lists || lists.length === 0) return null;
  // Helper function: Divide and conquer approach
  function mergeLists(lists, left, right) {
    if (left === right) return lists[left];
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);
    const leftMerged = mergeLists(lists, left, mid);
    const rightMerged = mergeLists(lists, mid + 1, right);

    return mergeTwoLists(leftMerged, rightMerged);
  }

  // Helper function: Merge two sorted lists
  function mergeTwoLists(l1, l2) {
    let dummy = new ListNode(0);
    let current = dummy;

    while (l1 && l2) {
      if (l1.val <= l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }

    // Attach the remaining nodes
    if (l1) current.next = l1;
    if (l2) current.next = l2;

    return dummy.next;
  }

  return mergeLists(lists, 0, lists.length - 1);
};
