/*
2305. Fair Distribution of Cookies
Solved
Medium
Topics
premium lock icon
Companies
Hint
You are given an integer array cookies, where cookies[i] denotes the number of cookies in the ith bag. You are also given an integer k that denotes the number of children to distribute all the bags of cookies to. All the cookies in the same bag must go to the same child and cannot be split up.

The unfairness of a distribution is defined as the maximum total cookies obtained by a single child in the distribution.

Return the minimum unfairness of all distributions.

 

Example 1:

Input: cookies = [8,15,10,20,8], k = 2
Output: 31
Explanation: One optimal distribution is [8,15,8] and [10,20]
- The 1st child receives [8,15,8] which has a total of 8 + 15 + 8 = 31 cookies.
- The 2nd child receives [10,20] which has a total of 10 + 20 = 30 cookies.
The unfairness of the distribution is max(31,30) = 31.
It can be shown that there is no distribution with an unfairness less than 31.
Example 2:

Input: cookies = [6,1,3,2,2,4,1,2], k = 3
Output: 7
Explanation: One optimal distribution is [6,1], [3,2,2], and [4,1,2]
- The 1st child receives [6,1] which has a total of 6 + 1 = 7 cookies.
- The 2nd child receives [3,2,2] which has a total of 3 + 2 + 2 = 7 cookies.
- The 3rd child receives [4,1,2] which has a total of 4 + 1 + 2 = 7 cookies.
The unfairness of the distribution is max(7,7,7) = 7.
It can be shown that there is no distribution with an unfairness less than 7.
 

Constraints:

2 <= cookies.length <= 8
1 <= cookies[i] <= 105
2 <= k <= cookies.length
 
*/

function distributeCookies(cookies, k) {
  cookies.sort((a, b) => b - a);

  let left = Math.max(...cookies);
  let right = cookies.reduce((a, b) => a + b, 0);

  function canDistribute(limit) {
    const children = new Array(k).fill(0);

    function dfs(index) {
      if (index === cookies.length) return true;

      const bag = cookies[index];
      const seen = new Set();

      for (let i = 0; i < k; i++) {
        if (children[i] + bag > limit) continue;

        if (seen.has(children[i])) continue; // symmetric pruning
        seen.add(children[i]);

        children[i] += bag;

        if (dfs(index + 1)) return true;

        children[i] -= bag;

        if (children[i] === 0) break; // empty bucket pruning
      }

      return false;
    }

    return dfs(0);
  }

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (canDistribute(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

var distributeCookies = function (cookies, k) {
  const n = cookies.length;
  const sums = new Array(k).fill(0);
  let ans = Infinity;

  const backtrack = (idx) => {
    if (idx === n) {
      ans = Math.min(ans, Math.max(...sums));
      return;
    }

    const seen = new Set();
    for (let j = 0; j < k; j++) {
      if (seen.has(sums[j])) continue;
      seen.add(sums[j]);
      sums[j] += cookies[idx];
      if (sums[j] < ans) backtrack(idx + 1);
      sums[j] -= cookies[idx];
    }
  };

  backtrack(0);
  return ans;
};
