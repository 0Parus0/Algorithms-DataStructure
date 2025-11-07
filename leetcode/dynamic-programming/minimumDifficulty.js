/*
1335. Minimum Difficulty of a Job Schedule
Hard
Topics
premium lock icon
Companies
Hint
You want to schedule a list of jobs in d days. Jobs are dependent (i.e To work on the ith job, you have to finish all the jobs j where 0 <= j < i).

You have to finish at least one task every day. The difficulty of a job schedule is the sum of difficulties of each day of the d days. The difficulty of a day is the maximum difficulty of a job done on that day.

You are given an integer array jobDifficulty and an integer d. The difficulty of the ith job is jobDifficulty[i].

Return the minimum difficulty of a job schedule. If you cannot find a schedule for the jobs return -1.

 

Example 1:


Input: jobDifficulty = [6,5,4,3,2,1], d = 2
Output: 7
Explanation: First day you can finish the first 5 jobs, total difficulty = 6.
Second day you can finish the last job, total difficulty = 1.
The difficulty of the schedule = 6 + 1 = 7 
Example 2:

Input: jobDifficulty = [9,9,9], d = 4
Output: -1
Explanation: If you finish a job per day you will still have a free day. you cannot find a schedule for the given jobs.
Example 3:

Input: jobDifficulty = [1,1,1], d = 3
Output: 3
Explanation: The schedule is one job per day. total difficulty will be 3.
 

Constraints:

1 <= jobDifficulty.length <= 300
0 <= jobDifficulty[i] <= 1000
1 <= d <= 10
*/
function minDifficulty(jd, d) {
  const n = jd.length;
  if (n < d) return -1;

  const memo = new Map();

  function dfs(i, daysUsed, todayMax) {
    if (i === n) {
      // We must have used exactly d days
      return daysUsed === d ? todayMax : Infinity;
    }

    const key = `${i},${daysUsed},${todayMax}`;
    if (memo.has(key)) return memo.get(key);

    let result = Infinity;

    // Update today's max with current job
    const newTodayMax = Math.max(todayMax, jd[i]);

    // Option 1: Continue current day (add job i to today)
    result = Math.min(result, dfs(i + 1, daysUsed, newTodayMax));

    // Option 2: Finish current day and start new day tomorrow
    // Only if: we have days left AND we've processed at least one job today
    if (daysUsed < d && todayMax !== -1) {
      result = Math.min(result, todayMax + dfs(i, daysUsed + 1, -1));
    }

    memo.set(key, result);
    return result;
  }

  // Start with day 1, no jobs processed for current day (todayMax = -1)
  return dfs(0, 1, -1);
}

var minDifficulty1 = function (jobDifficulty, d) {
  const n = jobDifficulty.length;
  if (n < d) return -1;

  let dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let day = 1; day <= d; day++) {
    const newDp = new Array(n + 1).fill(Infinity);
    for (let i = day; i <= n; i++) {
      let maxToday = 0;
      for (let j = i; j >= day; j--) {
        maxToday = Math.max(maxToday, jobDifficulty[j - 1]);
        newDp[i] = Math.min(newDp[i], dp[j - 1] + maxToday);
      }
    }
    dp = newDp;
  }

  return dp[n];
};

var minDifficulty1 = function (jobDifficulty, d) {
  const n = jobDifficulty.length;
  if (n < d) return -1;

  // dp[i][k] = min difficulty starting from job i with k days remaining
  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(d + 1).fill(-1);
  }

  function dfs(i, daysRemaining) {
    // Base case: no jobs left and no days remaining
    if (i === n && daysRemaining === 0) return 0;
    // Invalid case: either no jobs left but days remain, or no days but jobs remain
    if (i === n || daysRemaining === 0) return Infinity;

    // Return cached result
    if (dp[i][daysRemaining] !== -1) return dp[i][daysRemaining];

    let maxToday = 0;
    let minDiff = Infinity;

    // Try all possible endings for current day
    // We need to leave at least (daysRemaining - 1) jobs for remaining days
    for (let j = i; j <= n - daysRemaining; j++) {
      maxToday = Math.max(maxToday, jobDifficulty[j]);
      const nextDay = dfs(j + 1, daysRemaining - 1);
      minDiff = Math.min(minDiff, maxToday + nextDay);
    }

    return (dp[i][daysRemaining] = minDiff);
  }

  const result = dfs(0, d);
  return result === Infinity ? -1 : result;
};

console.log(minDifficulty([6, 5, 4, 3, 2, 1], 2)); // 7
console.log(minDifficulty([9, 9, 9], 4)); // -1
console.log(minDifficulty([1, 1, 1], 3)); // 3
console.log(minDifficulty([1, 2, 3, 4], 3)); // 6
console.log(minDifficulty([7, 1, 7, 1, 7, 1], 3)); // 15
