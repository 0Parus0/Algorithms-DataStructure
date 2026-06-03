/*
732. My Calendar III
Solved
Hard
Topics
premium lock icon
Companies
Hint
A k-booking happens when k events have some non-empty intersection (i.e., there is some time that is common to all k events.)

You are given some events [startTime, endTime), after each given event, return an integer k representing the maximum k-booking between all the previous events.

Implement the MyCalendarThree class:

MyCalendarThree() Initializes the object.
int book(int startTime, int endTime) Returns an integer k representing the largest integer such that there exists a k-booking in the calendar.
 

Example 1:

Input
["MyCalendarThree", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output
[null, 1, 1, 2, 3, 3, 3]

Explanation
MyCalendarThree myCalendarThree = new MyCalendarThree();
myCalendarThree.book(10, 20); // return 1
myCalendarThree.book(50, 60); // return 1
myCalendarThree.book(10, 40); // return 2
myCalendarThree.book(5, 15); // return 3
myCalendarThree.book(5, 10); // return 3
myCalendarThree.book(25, 55); // return 3

 

Constraints:

0 <= startTime < endTime <= 109
At most 400 calls will be made to book.
*/

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {number}
 */
class MyCalendarThree {
  constructor() {
    this.boundaries = [];
  }

  book(start, end) {
    this.boundaries.push([start, 1]);
    this.boundaries.push([end, -1]);

    this.boundaries.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

    let active = 0,
      maxK = 0;
    for (const [, delta] of this.boundaries) {
      active += delta;
      maxK = Math.max(maxK, active);
    }

    return maxK;
  }
}

class MyCalendarThree {
  constructor() {
    this.timeline = new Map(); // time -> diff
  }

  book(start, end) {
    // Apply difference
    this.timeline.set(start, (this.timeline.get(start) || 0) + 1);
    this.timeline.set(end, (this.timeline.get(end) || 0) + 1);

    // Sweep line
    let active = 0;
    let maxOverlap = 0;
    const times = Array.from(this.timeline.keys()).sort((a, b) => a - b);

    for (let time of times) {
      active += this.timeline.get(time);
      maxOverlap = Math.max(maxOverlap, active);
    }

    return maxOverlap;
  }
}

class MyCalenderThree {
  constructor() {
    this.boundaries = [];
  }

  book(start, end) {
    this.boundaries.push([start, 1]);
    this.boundaries.push([end, -1]);

    // this.boundaries.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
    this.boundaries.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    let active = 0;
    let maxK = 0;
    for (let [, delta] of this.boundaries) {
      active += delta;
      maxK = Math.max(maxK, active);
    }
    return maxK;
  }
}
