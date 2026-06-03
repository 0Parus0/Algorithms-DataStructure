/*
3433. Count Mentions Per User
Medium
Topics
premium lock icon
Companies
Hint
You are given an integer numberOfUsers representing the total number of users and an array events of size n x 3.

Each events[i] can be either of the following two types:

Message Event: ["MESSAGE", "timestampi", "mentions_stringi"]
This event indicates that a set of users was mentioned in a message at timestampi.
The mentions_stringi string can contain one of the following tokens:
id<number>: where <number> is an integer in range [0,numberOfUsers - 1]. There can be multiple ids separated by a single whitespace and may contain duplicates. This can mention even the offline users.
ALL: mentions all users.
HERE: mentions all online users.
Offline Event: ["OFFLINE", "timestampi", "idi"]
This event indicates that the user idi had become offline at timestampi for 60 time units. The user will automatically be online again at time timestampi + 60.
Return an array mentions where mentions[i] represents the number of mentions the user with id i has across all MESSAGE events.

All users are initially online, and if a user goes offline or comes back online, their status change is processed before handling any message event that occurs at the same timestamp.

Note that a user can be mentioned multiple times in a single message event, and each mention should be counted separately.

 

Example 1:

Input: numberOfUsers = 2, events = [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","71","HERE"]]

Output: [2,2]

Explanation:

Initially, all users are online.

At timestamp 10, id1 and id0 are mentioned. mentions = [1,1]

At timestamp 11, id0 goes offline.

At timestamp 71, id0 comes back online and "HERE" is mentioned. mentions = [2,2]

Example 2:

Input: numberOfUsers = 2, events = [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","12","ALL"]]

Output: [2,2]

Explanation:

Initially, all users are online.

At timestamp 10, id1 and id0 are mentioned. mentions = [1,1]

At timestamp 11, id0 goes offline.

At timestamp 12, "ALL" is mentioned. This includes offline users, so both id0 and id1 are mentioned. mentions = [2,2]

Example 3:

Input: numberOfUsers = 2, events = [["OFFLINE","10","0"],["MESSAGE","12","HERE"]]

Output: [0,1]

Explanation:

Initially, all users are online.

At timestamp 10, id0 goes offline.

At timestamp 12, "HERE" is mentioned. Because id0 is still offline, they will not be mentioned. mentions = [0,1]

 

Constraints:

1 <= numberOfUsers <= 100
1 <= events.length <= 100
events[i].length == 3
events[i][0] will be one of MESSAGE or OFFLINE.
1 <= int(events[i][1]) <= 105
The number of id<number> mentions in any "MESSAGE" event is between 1 and 100.
0 <= <number> <= numberOfUsers - 1
It is guaranteed that the user id referenced in the OFFLINE event is online at the time the event occurs.
*/
/**
 * @param {number} numberOfUsers
 * @param {string[][]} events
 * @return {number[]}
 */
var countMentions = function (numberOfUsers, events) {
  // 1. Sort events:
  //    Primary: Timestamp (ascending)
  //    Secondary: Type (OFFLINE before MESSAGE for same timestamp)
  events.sort((a, b) => {
    const timeA = parseInt(a[1]);
    const timeB = parseInt(b[1]);
    if (timeA !== timeB) return timeA - timeB;
    if (a[0] === "OFFLINE" && b[0] === "MESSAGE") return -1;
    if (a[0] === "MESSAGE" && b[0] === "OFFLINE") return 1;
    return 0;
  });

  const mentions = new Array(numberOfUsers).fill(0);
  // onlineAt[i] stores the timestamp when user i becomes online
  const onlineAt = new Array(numberOfUsers).fill(0);

  for (const [type, timestampStr, data] of events) {
    const T = parseInt(timestampStr);

    if (type === "OFFLINE") {
      const userId = parseInt(data);
      onlineAt[userId] = T + 60;
    } else {
      // MESSAGE event
      if (data === "ALL") {
        for (let i = 0; i < numberOfUsers; i++) {
          mentions[i]++;
        }
      } else if (data === "HERE") {
        for (let i = 0; i < numberOfUsers; i++) {
          // User is online if their 'back-to-online' time is <= current time
          if (onlineAt[i] <= T) {
            mentions[i]++;
          }
        }
      } else {
        // Specific IDs like "id1 id0 id1"
        const ids = data.split(" ");
        for (const token of ids) {
          const userId = parseInt(token.substring(2)); // Remove "id"
          mentions[userId]++;
        }
      }
    }
  }

  return mentions;
};

// ========================================================================
// 1. SECTION NAME
// ========================================================================

/**
 * @param {number} numberOfUsers
 * @param {string[][]} events
 * @return {number[]}
 */
var countMentions = function (numberOfUsers, events) {
  // Sort by timestamp
  // OFFLINE should come before MESSAGE at same timestamp
  events.sort((a, b) => {
    const timeA = Number(a[1]);
    const timeB = Number(b[1]);

    if (timeA !== timeB) {
      return timeA - timeB;
    }

    // OFFLINE first
    if (a[0] === "OFFLINE" && b[0] === "MESSAGE") {
      return -1;
    }

    if (a[0] === "MESSAGE" && b[0] === "OFFLINE") {
      return 1;
    }

    return 0;
  });

  const mentions = new Array(numberOfUsers).fill(0);

  // offlineUntil[i] = time when user becomes online again
  const offlineUntil = new Array(numberOfUsers).fill(0);

  for (const [type, timestampStr, data] of events) {
    const time = Number(timestampStr);

    // OFFLINE EVENT
    if (type === "OFFLINE") {
      const userId = Number(data);

      offlineUntil[userId] = time + 60;
    }

    // MESSAGE EVENT
    else {
      // ALL
      if (data === "ALL") {
        for (let user = 0; user < numberOfUsers; user++) {
          mentions[user]++;
        }
      }

      // HERE
      else if (data === "HERE") {
        for (let user = 0; user < numberOfUsers; user++) {
          // online
          if (time >= offlineUntil[user]) {
            mentions[user]++;
          }
        }
      }

      // id mentions
      else {
        const tokens = data.split(" ");

        for (const token of tokens) {
          // token format: "id<number>"
          const userId = Number(token.slice(2));

          mentions[userId]++;
        }
      }
    }
  }

  return mentions;
};
