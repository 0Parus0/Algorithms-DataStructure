/*
Program for Tower of Hanoi Algorithm
Last Updated : 23 Jul, 2025
Tower of Hanoi is a mathematical puzzle where we have three rods (A, B, and C) and N disks. Initially, all the disks are stacked in decreasing value of diameter i.e., the smallest disk is placed on the top and they are on rod A. The objective of the puzzle is to move the entire stack to another rod (here considered C), obeying the following simple rules:

Only one disk can be moved at a time.
Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack i.e. a disk can only be moved if it is the uppermost disk on a stack.
No disk may be placed on top of a smaller disk.
*/

function toh1(num, source, helper, destination) {
  if (num === 1) {
    console.log(`Move disk ${num} from ${source} to ${destination}`);
    return;
  }

  toh(num - 1, source, destination, helper);
  console.log(`Move disk ${num} from ${source} to ${destination}`);
  toh(num - 1, helper, source, destination);
}

function toh(num, source, helper, destination) {
  if (num === 1) {
    console.log(`Move disk ${num} from ${source} to ${destination}`);
    return 1;
  }

  let moves = 0;
  moves += toh(num - 1, source, destination, helper);
  console.log(`Move disk ${num} from ${source} to ${destination}`);
  moves += 1;
  moves += toh(num - 1, helper, source, destination);

  return moves;
}

console.log("Total moves:", toh(3, "A", "B", "C"));

// console.log(toh(5, 1, 2, 3));
