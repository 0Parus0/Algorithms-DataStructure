/* Reverse a Singly linked list */

function reverseSinglyLinkedList(head) {
  if (!head) return null;
  if (!head.next) return head;

  let current = head;
  let prev = null;
  let next;
  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  head = prev;
  return head;
}
function reverseIterative(head) {
  let prev = null;
  let current = head;

  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}
function reverseList(head) {
  // BASE CASE: If we've reached the end of the list
  // or the list is empty, just return the current node
  if (head === null || head.next === null) {
    return head;
  }

  // STEP 1: Reverse everything after the current node
  // This gives us the reversed list starting from head.next
  const reversedTail = reverseList(head.next);

  // STEP 2: The node after current (head.next) should now
  // point back to the current node to reverse the connection
  head.next.next = head;

  // STEP 3: Break the original forward connection
  // (This will be fixed in previous recursive calls)
  head.next = null;

  // The new head of the reversed list is the node
  // that was originally at the end
  return reversedTail;
}
function reverseList(head) {
  return reverseRecursive(head, null);
}

function reverseRecursive(current, previous) {
  // Base case: reached the end of the list
  if (current === null) {
    return previous; // Previous is now the new head
  }

  // Save the next node before we change the pointer
  const nextNode = current.next;

  // Reverse the current node's pointer
  current.next = previous;

  // Move to the next node, with current becoming the new previous
  return reverseRecursive(nextNode, current);
}

function revers1(head) {
  // Base case: if list is empty or has only one node
  if (!head || !head.next) return head;

  // Recursive call to reverse the rest of the list
  let next = revers1(head.next);

  // Reverse the current node's pointer
  head.next.next = head;

  // Set current node's next to null (will be updated in previous calls)
  head.next = null;

  return next;
}
