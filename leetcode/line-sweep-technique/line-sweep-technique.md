# Line Sweep Technique

The **Line Sweep** (or plane sweep) algorithm is a computational geometry technique used to solve problems involving geometric objects in a 2D plane (or higher dimensions) by "sweeping" an imaginary line across the plane and processing events at specific points.

## Core Idea

Imagine a vertical line moving from left to right (or a horizontal line moving up/down) across the plane, stopping at key positions (**"events"**) to process or update the state of the system. This converts a complex 2D problem into a series of 1D updates.

## Key Components

1.  **Sweep Line:** The imaginary line moving across the plane.
2.  **Events:** Discrete points where the state changes (e.g., the start/end of an interval, the edge of a rectangle, or a point coordinate).
3.  **Event Queue:** A collection of events sorted by their position along the sweep axis (usually a Sorted List or Priority Queue).
4.  **Status Structure:** A data structure that maintains the "active" elements currently intersecting the sweep line (often a Balanced BST, Set, or Segment Tree).

---

## Typical Workflow

1.  **Identify Events:** Determine what points constitute a change in state.
2.  **Sort Events:** Order all events by their primary coordinate (e.g., X-coordinate).
3.  **Sweep:** Iterate through the sorted events:
    - Update the **Status Structure** (Add/Remove elements).
    - Perform queries or calculations based on the current active elements.
    - Update the global result.

---

## Common Applications

### 1. Interval Problems

Used to find maximum overlaps or to merge overlapping intervals.

**Pseudocode: Maximum Overlapping Intervals**

```text
FUNCTION findMaxOverlap(intervals):
    events = EMPTY LIST

    FOR EACH [start, end] IN intervals:
        ADD {position: start, type: START (+1)} TO events
        ADD {position: end, type: END (-1)} TO events

    SORT events BY position ASCENDING
    // Note: If positions are equal, process START before END if intervals are inclusive

    maxOverlap = 0
    currentOverlap = 0

    FOR EACH event IN events:
        currentOverlap = currentOverlap + event.type
        IF currentOverlap > maxOverlap:
            maxOverlap = currentOverlap

    RETURN maxOverlap
```

### 2. Rectangle Union Area

Calculates the total area covered by multiple overlapping rectangles.

- **Sweep Line:** Moves along the X-axis.
- **Status:** A Segment Tree tracks the length of vertical segments (Y-axis) currently covered.
- **Area Update:** `TotalArea += (Current_X - Previous_X) * Active_Vertical_Length`.

### 3. Closest Pair of Points

Finds the two closest points in a set.

- **Logic:** As the line sweeps right, the status structure only keeps points whose X-distance to the current point is less than the current minimum distance `d`.

### 4. Skyline Problem

Finding the collective outline of several overlapping buildings.

- **Events:** Building start and end points.
- **Status:** A Max-Heap to track the highest active building height.

---

## Example: Meeting Rooms II

**Problem:** Given meeting intervals, find the minimum number of rooms required to hold all meetings.

**Pseudocode Solution:**

```text
FUNCTION minMeetingRooms(intervals):
    events = EMPTY LIST

    FOR EACH [start, end] IN intervals:
        // Mark starting a meeting as needing a room (+1)
        // Mark ending a meeting as freeing a room (-1)
        ADD {time: start, delta: 1} TO events
        ADD {time: end, delta: -1} TO events

    SORT events BY time ASCENDING
    // Handle tie-break: if times are equal, process ENDs before STARTs

    currentRooms = 0
    maxRooms = 0

    FOR EACH event IN events:
        currentRooms = currentRooms + event.delta
        IF currentRooms > maxRooms:
            maxRooms = currentRooms

    RETURN maxRooms
```

---

## Complexity & Benefits

- **Time Complexity:** Usually **O(N log N)** because of the sorting step or the use of a Priority Queue/Balanced BST.
- **Space Complexity:** Usually **O(N)** to store the events and the status structure.
- **Benefit:** It avoids the **O(N²)** brute-force approach of checking every object against every other object.

## When to Use

- The problem involves intervals, segments, or 2D shapes.
- You need to track "active" elements as you scan across a dimension.
- The problem asks about overlaps, total coverage, density, or intersections.

## Common Data Structures Used

- **Priority Queue / Heap:** To manage the order of upcoming events.
- **Balanced BST (TreeSet / OrderedSet):** To maintain the relative order of active elements along the non-sweep axis.
- **Segment Tree / Fenwick Tree:** For efficient range queries and updates during the sweep.

## Limitations

- Requires events to be sortable along an axis.
- Handling edge cases (like multiple events at the exact same coordinate) can be tricky.
- Higher-dimensional problems (3D+) significantly increase implementation complexity.

```

```
