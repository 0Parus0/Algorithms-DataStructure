/*
23. Merge k Sorted Lists
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

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

var mergeKLists = function (lists) {
  if (!lists || lists.length === 0) return null;
  return mergeLists(lists, 0, lists.length - 1);
};

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

/*
🧠 Complexity

Time: O(N log k)
(Each node is processed in each level of merge — log k levels.)

Space: O(1) (ignoring recursion stack, since merge is in-place).
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

/*
#Plan:
1. Problem Understanding:
   - We have k sorted linked lists that need to be merged into one sorted list
   - Each list is already sorted in ascending order
   - We need to efficiently combine them while maintaining sorted order

2. Approaches:
   a. Priority Queue/Min-Heap (Most Efficient): O(N log k)
   b. Divide and Conquer/Merge Sort: O(N log k)  
   c. Brute Force: Collect all nodes and sort: O(N log N)

3. Priority Queue Approach (Optimal):
   - Use a min-heap to always get the smallest node from all lists
   - Add the head of each list to the heap
   - Repeatedly extract min, add to result, and push next node from same list
   - Time: O(N log k), Space: O(k)

4. Divide and Conquer Approach:
   - Pair up lists and merge them recursively
   - Merge pairs until only one list remains
   - Time: O(N log k), Space: O(1) excluding recursion stack

5. Complexity Analysis:
   - N = total number of nodes across all lists
   - k = number of linked lists
*/

// Priority Queue implementation using JavaScript array as min-heap
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent].val <= this.heap[index].val) break;

      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  }

  bubbleDown(index) {
    const length = this.heap.length;

    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (left < length && this.heap[left].val < this.heap[smallest].val) {
        smallest = left;
      }

      if (right < length && this.heap[right].val < this.heap[smallest].val) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  size() {
    return this.heap.length;
  }
}

// Solution 1: Priority Queue (Most Efficient)
function mergeKLists(lists) {
  if (!lists || lists.length === 0) return null;

  const minHeap = new MinHeap();
  const dummy = new ListNode(0);
  let current = dummy;

  // Add the head of each non-empty list to the heap
  for (let list of lists) {
    if (list !== null) {
      minHeap.push(list);
    }
  }

  // Process nodes from heap
  while (minHeap.size() > 0) {
    const smallest = minHeap.pop();
    current.next = smallest;
    current = current.next;

    // If there's a next node in the same list, add it to heap
    if (smallest.next !== null) {
      minHeap.push(smallest.next);
    }
  }

  return dummy.next;
}

// Solution 2: Divide and Conquer (Merge Sort Style)
function mergeKListsDivideConquer(lists) {
  if (lists.length === 0) return null;

  let interval = 1;
  const n = lists.length;

  while (interval < n) {
    for (let i = 0; i < n - interval; i += interval * 2) {
      lists[i] = mergeTwoLists(lists[i], lists[i + interval]);
    }
    interval *= 2;
  }

  return lists[0];
}

// Helper function to merge two sorted lists
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;

  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  // Attach remaining nodes
  if (l1 !== null) {
    current.next = l1;
  } else {
    current.next = l2;
  }

  return dummy.next;
}

// Solution 3: Sequential Merging
function mergeKListsSequential(lists) {
  if (lists.length === 0) return null;

  let result = lists[0];

  for (let i = 1; i < lists.length; i++) {
    result = mergeTwoLists(result, lists[i]);
  }

  return result;
}

// Solution 4: Using built-in sort (Simpler but less efficient)
function mergeKListsBruteForce(lists) {
  const nodes = [];

  // Collect all nodes
  for (let list of lists) {
    while (list !== null) {
      nodes.push(list);
      list = list.next;
    }
  }

  // Sort by value
  nodes.sort((a, b) => a.val - b.val);

  // Reconstruct linked list
  const dummy = new ListNode(0);
  let current = dummy;

  for (let node of nodes) {
    current.next = node;
    current = current.next;
  }

  current.next = null; // Important: break any existing links
  return dummy.next;
}

// Helper function to create linked list from array (for testing)
function createLinkedList(arr) {
  const dummy = new ListNode(0);
  let current = dummy;

  for (let val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }

  return dummy.next;
}

// Helper function to convert linked list to array (for testing)
function linkedListToArray(head) {
  const result = [];
  let current = head;

  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

// Custom Test Cases
console.log("Test Case 1:");
const list1 = createLinkedList([1, 4, 5]);
const list2 = createLinkedList([1, 3, 4]);
const list3 = createLinkedList([2, 6]);
const result1 = mergeKLists([list1, list2, list3]);
console.log("Output:", linkedListToArray(result1));
console.log("Expected: [1, 1, 2, 3, 4, 4, 5, 6]");
console.log("---");

console.log("Test Case 2:");
const result2 = mergeKLists([]);
console.log("Output:", linkedListToArray(result2));
console.log("Expected: []");
console.log("---");

console.log("Test Case 3:");
const result3 = mergeKLists([null]);
console.log("Output:", linkedListToArray(result3));
console.log("Expected: []");
console.log("---");

console.log("Test Case 4:");
const list4 = createLinkedList([1, 2, 3]);
const list5 = createLinkedList([4, 5, 6]);
const list6 = createLinkedList([7, 8, 9]);
const result4 = mergeKLists([list4, list5, list6]);
console.log("Output:", linkedListToArray(result4));
console.log("Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9]");
console.log("---");

// Compare all approaches
function compareApproaches(lists) {
  console.log("Comparing all approaches:");

  // Create copies of lists for each approach
  const listsCopy1 = lists.map((list) => {
    if (!list) return null;
    const dummy = new ListNode(0);
    let current = dummy;
    let original = list;
    while (original) {
      current.next = new ListNode(original.val);
      current = current.next;
      original = original.next;
    }
    return dummy.next;
  });

  const listsCopy2 = lists.map((list) => {
    if (!list) return null;
    const dummy = new ListNode(0);
    let current = dummy;
    let original = list;
    while (original) {
      current.next = new ListNode(original.val);
      current = current.next;
      original = original.next;
    }
    return dummy.next;
  });

  const listsCopy3 = lists.map((list) => {
    if (!list) return null;
    const dummy = new ListNode(0);
    let current = dummy;
    let original = list;
    while (original) {
      current.next = new ListNode(original.val);
      current = current.next;
      original = original.next;
    }
    return dummy.next;
  });

  const result1 = mergeKLists(lists);
  const result2 = mergeKListsDivideConquer(listsCopy1);
  const result3 = mergeKListsBruteForce(listsCopy2);

  const arr1 = linkedListToArray(result1);
  const arr2 = linkedListToArray(result2);
  const arr3 = linkedListToArray(result3);

  console.log("Priority Queue:", arr1);
  console.log("Divide & Conquer:", arr2);
  console.log("Brute Force:", arr3);
  console.log(
    "All match:",
    JSON.stringify(arr1) === JSON.stringify(arr2) &&
      JSON.stringify(arr2) === JSON.stringify(arr3)
  );
}

// Run comparison
const testLists = [
  createLinkedList([1, 4, 5]),
  createLinkedList([1, 3, 4]),
  createLinkedList([2, 6]),
];
compareApproaches(testLists);

/*
Commit Message:
Implement merge k sorted lists using multiple approaches
  - Priority Queue (Optimal): O(N log k) time, O(k) space using min-heap
  - Divide and Conquer: O(N log k) time by merging pairs recursively
  - Brute Force: O(N log N) time by collecting all nodes and sorting
  - Added comprehensive helper functions for linked list manipulation
  - Included thorough test cases covering edge cases
  - Priority queue approach is recommended for optimal performance
  - All solutions correctly handle empty lists and null inputs
*/
