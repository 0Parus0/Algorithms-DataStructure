/*
1733. Minimum Number of People to Teach
Medium
Topics
premium lock icon
Companies
Hint
On a social network consisting of m users and some friendships between users, two users can communicate with each other if they know a common language.

You are given an integer n, an array languages, and an array friendships where:

There are n languages numbered 1 through n,
languages[i] is the set of languages the i​​​​​​th​​​​ user knows, and
friendships[i] = [u​​​​​​i​​​, v​​​​​​i] denotes a friendship between the users u​​​​​​​​​​​i​​​​​ and vi.
You can choose one language and teach it to some users so that all friends can communicate with each other. Return the minimum number of users you need to teach.

Note that friendships are not transitive, meaning if x is a friend of y and y is a friend of z, this doesn't guarantee that x is a friend of z.
 

Example 1:

Input: n = 2, languages = [[1],[2],[1,2]], friendships = [[1,2],[1,3],[2,3]]
Output: 1
Explanation: You can either teach user 1 the second language or user 2 the first language.
Example 2:

Input: n = 3, languages = [[2],[1,3],[1,2],[3]], friendships = [[1,4],[1,2],[3,4],[2,3]]
Output: 2
Explanation: Teach the third language to users 1 and 3, yielding two users to teach.
 

Constraints:

2 <= n <= 500
languages.length == m
1 <= m <= 500
1 <= languages[i].length <= n
1 <= languages[i][j] <= n
1 <= u​​​​​​i < v​​​​​​i <= languages.length
1 <= friendships.length <= 500
All tuples (u​​​​​i, v​​​​​​i) are unique
languages[i] contains only unique values
*/

// ========================================================================
// 1. Best and Optimal
// ========================================================================

var minimumTeachings = function (n, languages, friendships) {
  const checkCommunication = (a, b) => {
    for (const langA of languages[a - 1]) {
      if (languages[b - 1].includes(langA)) return true;
    }
    return false;
  };

  const usersToTeach = new Set();
  for (const [u, v] of friendships) {
    if (!checkCommunication(u, v)) {
      usersToTeach.add(u - 1);
      usersToTeach.add(v - 1);
    }
  }

  let minTeach = Infinity;
  for (let lang = 1; lang <= n; lang++) {
    let count = 0;
    for (const user of usersToTeach) {
      if (!languages[user].includes(lang)) count++;
    }
    minTeach = Math.min(minTeach, count);
  }

  return minTeach;
};

// ========================================================================
// 1. Optimal
// ========================================================================

/**
 * @param {number} n
 * @param {number[][]} languages
 * @param {number[][]} friendships
 * @return {number}
 */
var minimumTeachings = function (n, languages, friendships) {
  const m = languages.length;
  const langSet = languages.map((arr) => new Set(arr));

  const badUsers = new Set();
  const badEdges = [];

  // Step 1: find bad friendships
  for (const [u, v] of friendships) {
    const a = u - 1,
      b = v - 1;

    let canTalk = false;

    for (const lang of langSet[a]) {
      if (langSet[b].has(lang)) {
        canTalk = true;
        break;
      }
    }

    if (!canTalk) {
      badEdges.push([a, b]);
      badUsers.add(a);
      badUsers.add(b);
    }
  }

  if (badEdges.length === 0) return 0;

  // Step 2: frequency of languages among bad users
  const freq = new Array(n + 1).fill(0);

  for (const user of badUsers) {
    for (const lang of langSet[user]) {
      freq[lang]++;
    }
  }

  // Step 3: compute best language
  let best = Infinity;

  for (let lang = 1; lang <= n; lang++) {
    const teachNeeded = badUsers.size - freq[lang];
    best = Math.min(best, teachNeeded);
  }

  return best;
};

// ========================================================================
// 1. Okay Not Intuitive
// ========================================================================

/**
 * @param {number} n
 * @param {number[][]} languages
 * @param {number[][]} friendships
 * @return {number}
 */
var minimumTeachings = function (n, languages, friendships) {
  const m = languages.length;

  // Convert language arrays to Sets for O(1) lookup
  const langSets = languages.map((list) => new Set(list));

  // Helper function to check if two users share a common language
  const canCommunicate = (u, v) => {
    const setU = langSets[u];
    const setV = langSets[v];
    // Iterate through the smaller set for efficiency
    if (setU.size > setV.size) return canCommunicate(v, u);
    for (let lang of setU) {
      if (setV.has(lang)) return true;
    }
    return false;
  };

  // 1. Identify users who are part of at least one broken friendship
  const brokenUsers = new Set();
  for (const [u, v] of friendships) {
    // Users in friendships are 1-indexed
    if (!canCommunicate(u - 1, v - 1)) {
      brokenUsers.add(u - 1);
      brokenUsers.add(v - 1);
    }
  }

  // If all friends can already communicate, no teaching required
  if (brokenUsers.size === 0) return 0;

  let minToTeach = Infinity;

  // 2. For each language, check how many 'broken' users need to learn it
  for (let lang = 1; lang <= n; lang++) {
    let count = 0;
    for (let userIdx of brokenUsers) {
      if (!langSets[userIdx].has(lang)) {
        count++;
      }
    }
    minToTeach = Math.min(minToTeach, count);
  }

  return minToTeach;
};

// ========================================================================
// 2. Slow
// ========================================================================

/**
 * @param {number} n
 * @param {number[][]} languages
 * @param {number[][]} friendships
 * @return {number}
 */
var minimumTeachings = function (n, languages, friendships) {
  const m = languages.length;

  // Convert to sets for fast lookup
  const langSet = languages.map((arr) => new Set(arr));

  // Step 1: find bad friendships
  const bad = [];

  for (let [u, v] of friendships) {
    u--;
    v--;
    let canTalk = false;

    for (const lang of langSet[u]) {
      if (langSet[v].has(lang)) {
        canTalk = true;
        break;
      }
    }

    if (!canTalk) {
      bad.push([u, v]);
    }
  }

  if (bad.length === 0) return 0;

  let ans = Infinity;

  // Step 2: try every language
  for (let L = 1; L <= n; L++) {
    const needTeach = new Set();

    for (const [u, v] of bad) {
      if (!langSet[u].has(L)) needTeach.add(u);
      if (!langSet[v].has(L)) needTeach.add(v);
    }

    ans = Math.min(ans, needTeach.size);
  }

  return ans;
};
