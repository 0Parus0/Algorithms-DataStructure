/*
2069. Walking Robot Simulation II
Solved
Medium
Topics
premium lock icon
Companies
Hint
A width x height grid is on an XY-plane with the bottom-left cell at (0, 0) and the top-right cell at (width - 1, height - 1). The grid is aligned with the four cardinal directions ("North", "East", "South", and "West"). A robot is initially at cell (0, 0) facing direction "East".

The robot can be instructed to move for a specific number of steps. For each step, it does the following.

Attempts to move forward one cell in the direction it is facing.
If the cell the robot is moving to is out of bounds, the robot instead turns 90 degrees counterclockwise and retries the step.
After the robot finishes moving the number of steps required, it stops and awaits the next instruction.

Implement the Robot class:

Robot(int width, int height) Initializes the width x height grid with the robot at (0, 0) facing "East".
void step(int num) Instructs the robot to move forward num steps.
int[] getPos() Returns the current cell the robot is at, as an array of length 2, [x, y].
String getDir() Returns the current direction of the robot, "North", "East", "South", or "West".
 

Example 1:

example-1
Input
["Robot", "step", "step", "getPos", "getDir", "step", "step", "step", "getPos", "getDir"]
[[6, 3], [2], [2], [], [], [2], [1], [4], [], []]
Output
[null, null, null, [4, 0], "East", null, null, null, [1, 2], "West"]

Explanation
Robot robot = new Robot(6, 3); // Initialize the grid and the robot at (0, 0) facing East.
robot.step(2);  // It moves two steps East to (2, 0), and faces East.
robot.step(2);  // It moves two steps East to (4, 0), and faces East.
robot.getPos(); // return [4, 0]
robot.getDir(); // return "East"
robot.step(2);  // It moves one step East to (5, 0), and faces East.
                // Moving the next step East would be out of bounds, so it turns and faces North.
                // Then, it moves one step North to (5, 1), and faces North.
robot.step(1);  // It moves one step North to (5, 2), and faces North (not West).
robot.step(4);  // Moving the next step North would be out of bounds, so it turns and faces West.
                // Then, it moves four steps West to (1, 2), and faces West.
robot.getPos(); // return [1, 2]
robot.getDir(); // return "West"

 

Constraints:

2 <= width, height <= 100
1 <= num <= 105
At most 104 calls in total will be made to step, getPos, and getDir.
*/

// ========================================================================
// 1. SECTION NAME
// ========================================================================

class Robot {
  constructor(width, height) {
    this.directions = ["East", "North", "West", "South"];
    this.peri = []; // [x, y, dir] --> dirs [0, 1, 2, 3]
    this.i = 0;

    // Pre-calculate the entire perimeter path
    // Bottom edge (East)
    for (let x = 0; x < width; x++) {
      // x = x , y = 0, dir = 0 --> directions[0] = east
      this.peri.push([x, 0, 0]);
    }
    // Right edge (North)
    for (let y = 1; y < height; y++) {
      // x = width - 1, y = y, dir = 1 --> directions[i] = north
      this.peri.push([width - 1, y, 1]);
    }
    // Top edge (West)
    for (let x = width - 2; x >= 0; x--) {
      // x = x , y = height - 1, dir = 2 --> directions[2] = west
      this.peri.push([x, height - 1, 2]);
    }
    // Left edge (South)
    for (let y = height - 2; y > 0; y--) {
      // x = 0 , y = height - 2, dir = 3 --> directions[3] = south
      this.peri.push([0, y, 3]);
    }
  }

  step(num) {
    // Use modulo to skip redundant full laps
    this.i = (this.i + num) % this.peri.length;

    /* 
           Special Case: The origin (0,0). 
           Initially, the robot faces "East". 
           However, once the robot starts moving, if it ever returns to or 
           passes (0,0), it does so from the South-facing leg. 
        */
    this.peri[0][2] = 3;
  }
  getPos() {
    const point = this.peri[this.i];
    return [point[0], point[1]];
  }
  getDir() {
    return this.directions[this.peri[this.i][2]];
  }
}
// ========================================================================
// 1. SECTION NAME
// ========================================================================

class Robot {
  constructor(width, height) {
    this.w = width;
    this.h = height;
    // The perimeter length defines the movement cycle
    this.p = 2 * (width + height) - 4;
    this.currentStep = 0;
    this.hasMoved = false;
  }

  step(num) {
    this.hasMoved = true;
    // Use modulo to skip full laps
    this.currentStep = (this.currentStep + num) % this.p;
  }

  getPos() {
    const s = this.currentStep;
    const { w, h } = this;

    // Bottom Edge: x moves 0 -> w-1, y is 0
    if (s >= 0 && s <= w - 1) return [s, 0];

    // Right Edge: x is w-1, y moves 1 -> h-1
    if (s <= w + h - 2) return [w - 1, s - (w - 1)];

    // Top Edge: x moves w-2 -> 0, y is h-1
    if (s <= 2 * w + h - 3) return [w - 1 - (s - (w + h - 2)), h - 1];

    // Left Edge: x is 0, y moves h-2 -> 1
    return [0, h - 1 - (s - (2 * w + h - 3))];
  }

  getDir() {
    const s = this.currentStep;
    const { w, h } = this;

    // Special handling for the origin (0, 0)
    if (s === 0) return this.hasMoved ? "South" : "East";

    // Boundary ranges determine the facing direction
    // Note: the robot only turns *after* it can no longer move forward.
    if (s <= w - 1) return "East";
    if (s <= w + h - 2) return "North";
    if (s <= 2 * w + h - 3) return "West";
    return "South";
  }
}
