/*
621. Task Scheduler
Medium
Topics
premium lock icon
Companies
Hint
You are given an array of CPU tasks, each labeled with a letter from A to Z, and a number n. Each CPU interval can be idle or allow the completion of one task. Tasks can be completed in any order, but there's a constraint: there has to be a gap of at least n intervals between two tasks with the same label.

Return the minimum number of CPU intervals required to complete all tasks.

 

Example 1:

Input: tasks = ["A","A","A","B","B","B"], n = 2

Output: 8

Explanation: A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.

After completing task A, you must wait two intervals before doing A again. The same applies to task B. In the 3rd interval, neither A nor B can be done, so you idle. By the 4th interval, you can do A again as 2 intervals have passed.

Example 2:

Input: tasks = ["A","C","A","B","D","B"], n = 1

Output: 6

Explanation: A possible sequence is: A -> B -> C -> D -> A -> B.

With a cooling interval of 1, you can repeat a task after just one other task.

Example 3:

Input: tasks = ["A","A","A", "B","B","B"], n = 3

Output: 10

Explanation: A possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.

There are only two types of tasks, A and B, which need to be separated by 3 intervals. This leads to idling twice between repetitions of these tasks.

 

Constraints:

1 <= tasks.length <= 104
tasks[i] is an uppercase English letter.
0 <= n <= 100
*/

function leastInterval(tasks, n) {
  if (n === 0) return tasks.length;

  // Count frequency of each task
  const freq = new Array(26).fill(0);
  for (let task of tasks) {
    freq[task.charCodeAt(0) - 65]++;
  }

  // Find maximum frequency
  const maxFreq = Math.max(...freq);

  // Count how many tasks have maximum frequency
  let maxCount = 0;
  for (let count of freq) {
    if (count === maxFreq) maxCount++;
  }

  // Calculate minimum intervals
  const result = Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);

  return result;
}

// Turing.com-style structure and clarity
function leastInterval(tasks, n) {
  // Step 1: Count task frequencies
  const freq = new Array(26).fill(0);
  for (let t of tasks) {
    freq[t.charCodeAt(0) - 65]++; // 'A' → index 0
  }

  // Step 2: Find maximum frequency and count how many tasks share it
  const maxFreq = Math.max(...freq);
  const countMaxFreq = freq.filter((f) => f === maxFreq).length;

  // Step 3: Apply formula to calculate result
  const partCount = (maxFreq - 1) * (n + 1) + countMaxFreq;

  // Step 4: The answer is the larger of total tasks or computed slots
  return Math.max(tasks.length, partCount);
}

/*
Example:
Input: ["A","A","A","B","B","B"], n = 2
Output: 8
*/

/*
⏱️ Step 6: Complexity

Time: O(26 + n) ≈ O(1)

Space: O(26) = O(1)
*/

console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 2)); // 8
console.log(leastInterval(["A", "C", "A", "B", "D", "B"], 1)); // 6
console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 3)); // 10
console.log(leastInterval(["A"], 0)); // 1
console.log(leastInterval(["A", "A", "A", "A"], 0)); // 4
