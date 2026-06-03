class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      const lru = this.cache.keys().next().value;

      this.cache.delete(lru);
    }
  }
}

class Node {
  constructor(key, val) {
    this.val = val;
    this.key = key;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.head = new Node(0, 0); // dummy head node
    this.tail = new Node(0, 0); // dummy tail node
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.cache = new Map(); // key --> Node
  }

  #add(node) {
    const nextNode = this.head.next;
    this.head.next = node;
    node.prev = this.head;
    node.next = nextNode;
    nextNode.prev = node;
  }

  #remove(node) {
    const nextNode = node.next;
    const prevNode = node.prev;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const node = this.cache.get(key);

    this.#remove(node);
    this.#add(node);
    return node.val;
  }

  put(key, val) {
    if (this.cache.has(key)) {
      this.#remove(this.cache.get(key));
    }

    const newNode = new Node(key, val);
    this.cache.set(key, newNode);
    this.#add(newNode);

    if (this.cache.size > this.capacity) {
      const lru = this.tail.prev;
      this.#remove(lru);
      this.cache.delete(lru.key);
    }
  }
}
