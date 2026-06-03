/*
341. Flatten Nested List Iterator
Medium
Topics
premium lock icon
Companies
You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists. Implement an iterator to flatten it.

Implement the NestedIterator class:

NestedIterator(List<NestedInteger> nestedList) Initializes the iterator with the nested list nestedList.
int next() Returns the next integer in the nested list.
boolean hasNext() Returns true if there are still some integers in the nested list and false otherwise.
Your code will be tested with the following pseudocode:

initialize iterator with nestedList
res = []
while iterator.hasNext()
    append iterator.next() to the end of res
return res
If res matches the expected flattened list, then your code will be judged as correct.

 

Example 1:

Input: nestedList = [[1,1],2,[1,1]]
Output: [1,1,2,1,1]
Explanation: By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,1,2,1,1].
Example 2:

Input: nestedList = [1,[4,[6]]]
Output: [1,4,6]
Explanation: By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,4,6].
 

Constraints:

1 <= nestedList.length <= 500
The values of the integers in the nested list is in the range [-106, 106].
*/
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     return {
 *         isInteger: function() { ... },
 *         getInteger: function() { ... },
 *         getList: function() { ... }
 *     };
 * };
 */

class NestedIterator {
  /**
   * @param {NestedInteger[]} nestedList
   */
  constructor(nestedList) {
    // Reverse the list so the first element is at the end of the array
    // This allows us to use stack.pop() in O(1)
    this.stack = nestedList.reverse();
  }

  /**
   * @this NestedIterator
   * @returns {integer}
   */
  next() {
    // hasNext() is guaranteed to be called before next()
    // and it ensures the top of the stack is an integer.
    return this.stack.pop().getInteger();
  }

  /**
   * @this NestedIterator
   * @returns {boolean}
   */
  hasNext() {
    while (this.stack.length > 0) {
      let top = this.stack[this.stack.length - 1];

      if (top.isInteger()) {
        return true;
      }

      // If it's a list, pop it and push its contents back onto the stack in reverse
      this.stack.pop();
      let list = top.getList();
      for (let i = list.length - 1; i >= 0; i--) {
        this.stack.push(list[i]);
      }
    }
    return false;
  }
}

// ========================================================================
// 2. The JavaScript Generator Approach (Idiomatic)
// ========================================================================

class NestedIterator {
  constructor(nestedList) {
    this.gen = this._generator(nestedList);
    // We "peek" at the first value to know if hasNext is true
    this.current = this.gen.next();
  }

  // Recursive generator function
  *_generator(list) {
    for (let item of list) {
      if (item.isInteger()) {
        yield item.getInteger();
      } else {
        // yield* delegates to another generator (recursion)
        yield* this._generator(item.getList());
      }
    }
  }

  next() {
    const val = this.current.value;
    this.current = this.gen.next();
    return val;
  }

  hasNext() {
    return !this.current.done;
  }
}
