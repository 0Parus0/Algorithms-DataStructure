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

  return prev;
}
