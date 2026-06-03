/*
731. My Calendar II
Medium
Topics
premium lock icon
Companies
Hint
You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a triple booking.

A triple booking happens when three events have some non-empty intersection (i.e., some moment is common to all the three events.).

The event can be represented as a pair of integers startTime and endTime that represents a booking on the half-open interval [startTime, endTime), the range of real numbers x such that startTime <= x < endTime.

Implement the MyCalendarTwo class:

MyCalendarTwo() Initializes the calendar object.
boolean book(int startTime, int endTime) Returns true if the event can be added to the calendar successfully without causing a triple booking. Otherwise, return false and do not add the event to the calendar.
 

Example 1:

Input
["MyCalendarTwo", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output
[null, true, true, true, false, true, true]

Explanation
MyCalendarTwo myCalendarTwo = new MyCalendarTwo();
myCalendarTwo.book(10, 20); // return True, The event can be booked. 
myCalendarTwo.book(50, 60); // return True, The event can be booked. 
myCalendarTwo.book(10, 40); // return True, The event can be double booked. 
myCalendarTwo.book(5, 15);  // return False, The event cannot be booked, because it would result in a triple booking.
myCalendarTwo.book(5, 10); // return True, The event can be booked, as it does not use time 10 which is already double booked.
myCalendarTwo.book(25, 55); // return True, The event can be booked, as the time in [25, 40) will be double booked with the third event, the time [40, 50) will be single booked, and the time [50, 55) will be double booked with the second event.
 

Constraints:

0 <= start < end <= 109
At most 1000 calls will be made to book.
*/

/* Most Efficient Line Sweep */

class MyCalendarTwo {
  constructor() {
    this.events = [];
    this.overlaps = [];
  }

  book(start, end) {
    // First check against exiting overlaps
    for (let [s, e] of this.overlaps) {
      if (start < e && end > s) {
        return false;
      }
    }

    // Check against exiting events to find new overlaps
    for (let [s, e] of this.events) {
      if (start < e && end > s) {
        // Create overlap region
        const overlapStart = Math.max(start, s);
        const overlapEnd = Math.min(end, e);
        this.overlaps.push([overlapStart, overlapEnd]);
      }
    }

    this.events.push([start, end]);
    return true;
  }
}

/* Line Sweep with Arrays */

class MyCalendarTwo {
  constructor() {
    this.events = [];
  }

  book(start, end) {
    const newStart = [start, 1];
    const newEnd = [end, -1];

    this.events.push(newStart, newEnd);

    this.events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    let active = 0;
    for (let [, delta] of this.events) {
      active += delta;
      if (active >= 3) {
        // rollback
        this.events = this.events.filter((b) => b !== newStart && b !== newEnd);
        return false;
      }
    }

    return true;
  }
}

/* Better */
class MyCalendarTwo {
  constructor() {
    this.timeline = new Map();
  }

  book(start, end) {
    // Apply diff
    this.timeline.set(start, (this.timeline.get(start) || 0) + 1);
    this.timeline.set(end, (this.timeline.get(end) || 0) - 1);

    // Sweep line
    let active = 0;
    const times = Array.from(this.timeline.keys()).sort((a, b) => a - b);

    for (let time of times) {
      active += this.timeline.get(time);
      if (active >= 3) {
        // rollback
        this.timeline.set(start, this.timeline.get(start) - 1);
        this.timeline.set(end, this.timeline.get(end) + 1);

        if (this.timeline.get(start) === 0) this.timeline.delete(start);
        if (this.timeline.get(end) === 0) this.timeline.delete(end);

        return false;
      }
    }
    return true;
  }
}
/* Will pass all test cases but not good */
class MyCalendarTwo {
  constructor() {
    this.events = new Map();
    this.sortedTimes = [];
  }

  book(start, end) {
    // Add new event to events/timeline
    this.events.set(start, (this.events.get(start) || 0) + 1);
    this.events.set(end, (this.events.get(end) || 0) - 1);

    //Update sorted times
    if (!this.sortedTimes.includes(start)) this.sortedTimes.push(start);
    if (!this.sortedTimes.includes(end)) this.sortedTimes.push(end);
    this.sortedTimes.sort((a, b) => a - b);

    // Sweep through timeline
    let active = 0;
    for (let time of this.sortedTimes) {
      active += this.events.get(time) || 0;
      if (active >= 3) {
        // Would cause triple booking, roll back
        this.events.set(start, this.events.get(start) - 1);
        this.events.set(end, this.events.get(end) + 1);
        if (this.events.get(start) === 0) this.events.delete(start);
        if (this.events.get(end) === 0) this.events.delete(end);
        return false;
      }
    }
    return true;
  }
}

class MyCalendarTwo {
  constructor() {
    this.events = [];
  }

  book(start, end) {
    const newStart = [start, 1];
    const newEnd = [end, -1];

    this.events.push(newStart, newEnd);

    this.events.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

    let active = 0;
    for (const [, delta] of this.events) {
      active += delta;
      if (active >= 3) {
        // rollback safely
        const i1 = this.events.indexOf(newStart);
        const i2 = this.events.indexOf(newEnd);
        if (i1 !== -1) this.events.splice(i1, 1);
        if (i2 !== -1) this.events.splice(i2 > i1 ? i2 - 1 : i2, 1);
        return false;
      }
    }

    return true;
  }
}
