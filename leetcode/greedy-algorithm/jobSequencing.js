/*
Job Sequencing Problem
Difficulty: MediumAccuracy: 34.51%Submissions: 346K+Points: 4
You are given two arrays: deadline[], and profit[], which represent a set of jobs, where each job is associated with a deadline, and a profit. Each job takes 1 unit of time to complete, and only one job can be scheduled at a time. You will earn the profit associated with a job only if it is completed by its deadline.

Your task is to find:

The maximum number of jobs that can be completed within their deadlines.
The total maximum profit earned by completing those jobs.
Examples :

Input: deadline[] = [4, 1, 1, 1], profit[] = [20, 10, 40, 30]
Output: [2, 60]
Explanation: Job1 and Job3 can be done with maximum profit of 60 (20+40).
Input: deadline[] = [2, 1, 2, 1, 1], profit[] = [100, 19, 27, 25, 15]
Output: [2, 127]
Explanation: Job1 and Job3 can be done with maximum profit of 127 (100+27).
Input: deadline[] = [3, 1, 2, 2], profit[] = [50, 10, 20, 30]
Output: [3, 100]
Explanation: Job1, Job3 and Job4 can be completed with a maximum profit of 100 (50 + 20 + 30).
Constraints:
1 ≤ deadline.size() = profit.size() ≤ 105
1 ≤ deadline[i] ≤ deadline.size()
1 ≤ profit[i] ≤ 500
*/

function jobSequencing(deadline, profit) {
  const n = deadline.length;
  const jobs = [];

  // Combine jobs
  for (let i = 0; i < n; i++) {
    jobs.push({ deadline: deadline[i], profit: profit[i] });
  }

  // Sort by profit (descending)
  jobs.sort((a, b) => b.profit - a.profit);

  const maxDeadline = Math.max(...deadline);

  // Disjoint Set (Union-Find) structure
  const parent = Array.from({ length: maxDeadline + 1 }, (_, i) => i);

  // Find with path compression
  function find(x) {
    if (parent[x] === x) return x;
    parent[x] = find(parent[x]); // path compression
    return parent[x];
  }

  // Union: mark current slot as used and connect to previous slot
  function union(x, y) {
    parent[x] = y;
  }

  let jobCount = 0;
  let totalProfit = 0;

  // Schedule jobs greedily
  for (const job of jobs) {
    const availableSlot = find(job.deadline);

    if (availableSlot > 0) {
      union(availableSlot, availableSlot - 1);
      totalProfit += job.profit;
      jobCount++;
    }
  }

  return [jobCount, totalProfit];
}

/*
⚙️ Time & Space Complexity
Operation	Complexity
Sorting	O(n log n)
Find/Union	O(α(n)) ≈ O(1)
Total	O(n log n)
Space	O(n)
*/

function jobSequencingOpt(deadline, profit) {
  const n = deadline.length;
  const jobs = [];

  // Combine both arrays into one array of job objects
  for (let i = 0; i < n; i++) {
    jobs.push({ deadline: deadline[i], profit: profit[i] });
  }

  // Sort jobs by profit in descending order (greedy strategy)
  jobs.sort((a, b) => b.profit - a.profit);

  const maxDeadline = Math.max(...deadline);

  // Disjoint Set (Union-Find) parent array
  const parent = new Array(maxDeadline + 1);
  for (let i = 0; i <= maxDeadline; i++) {
    parent[i] = i; // Initially, all slots are free
  }

  // Find with path compression — finds latest available slot
  function find(parent, i) {
    if (parent[i] === i) return i;
    return (parent[i] = find(parent, parent[i]));
  }

  let jobCount = 0;
  let totalProfit = 0;

  // Try to schedule each job
  for (let job of jobs) {
    const availableSlot = find(parent, job.deadline);

    // If there’s a free slot available before or at its deadline
    if (availableSlot > 0) {
      jobCount++;
      totalProfit += job.profit;

      // Mark this slot as filled and merge it with the previous slot
      parent[availableSlot] = find(parent, availableSlot - 1);
    }
  }

  return [jobCount, totalProfit];
}

/*
⚙️ Time & Space Complexity
Operation	Complexity
Sorting	O(n log n)
Find/Union	O(α(n)) ≈ O(1)
Total	O(n log n)
Space	O(n)
*/

function jobSequencingOpt(deadline, profit) {
  const n = deadline.length;
  const jobs = Array.from({ length: n }, (_, i) => ({
    deadline: deadline[i],
    profit: profit[i],
  }));
  jobs.sort((a, b) => b.profit - a.profit);

  const maxDeadline = Math.max(...deadline);
  const parent = Array.from({ length: maxDeadline + 1 }, (_, i) => i);

  function find(i) {
    if (parent[i] === i) return i;
    return (parent[i] = find(parent[i])); // path compression
  }

  function union(x, y) {
    parent[x] = y;
  }

  let jobCount = 0,
    totalProfit = 0;

  for (const job of jobs) {
    const availableSlot = find(job.deadline);
    if (availableSlot > 0) {
      union(availableSlot, find(availableSlot - 1));
      jobCount++;
      totalProfit += job.profit;
    }
  }

  return [jobCount, totalProfit];
}

/*
⚙️ Time & Space Complexity
Operation	Complexity
Sorting	O(n log n)
Find/Union	O(α(n)) ≈ O(1)
Total	O(n log n)
Space	O(n)
*/

/* ---------------------------------------------------- */

function jobSequencing(deadline, profit) {
  const n = deadline.length;

  // Create jobs array with deadline and profit
  const jobs = [];
  for (let i = 0; i < n; i++) {
    jobs.push({ deadline: deadline[i], profit: profit[i] });
  }

  // Sort jobs by profit descending
  jobs.sort((a, b) => b.profit - a.profit);

  const maxDeadline = Math.max(...deadline);

  // Array to track occupied time slots
  const slots = new Array(maxDeadline + 1).fill(false);

  let jobCount = 0;
  let totalProfit = 0;

  // Schedule jobs
  for (let job of jobs) {
    // find the latest available slot before deadline
    for (let time = job.deadline; time > 0; time--) {
      if (!slots[time]) {
        // Schedule the job
        slots[time] = true;
        jobCount++;
        totalProfit += job.profit;
        break;
      }
    }
  }

  return [jobCount, totalProfit];
}
// console.log(jobSequencing([2, 1, 2, 1, 1], [100, 19, 27, 25, 15]));
console.log(jobSequencingOpt([2, 1, 2, 1, 1], [100, 19, 27, 25, 15]));
/*
⚙️ Time & Space Complexity

Time: O(n log n + n * D) (but practically closer to O(n log n))

Space: O(D)
where D = max deadline ≤ n
*/
