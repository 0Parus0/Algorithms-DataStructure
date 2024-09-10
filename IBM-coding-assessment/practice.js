/* Given an array of distinct integers, determine the minimum absolute difference between any two elements. Print all element pairs with that difference in ascending order
let numbers = [6, 2, 4, 10];
the minimum absolute difference is 2 and the pairs with that difference are (2, 4) and (4, 6). When printing element pairs(i, j), they should be ordered ascending first by i and then j.
2, 4 
4, 6
*/

function closestNumbers(arr) {
    let minDiff = Infinity;
    arr.sort((a,b) => a - b);
    for(let i = 1; i < arr.length; i++){
        let diff = arr[i] - arr[i -1];
        if(diff < minDiff) minDiff = diff;

    }
    for(let i = 0; i < arr.length; i++) {
        if(arr[i+1] - arr[i] === minDiff) console.log(arr[i], arr[i + 1]);
    }
    console.log(arr)
    return 'None';
}


// console.log(closestNumbers([6, 2, 4, 10]));
// console.log(closestNumbers([-4, -2, -1, 3]));


/*
A Video game developer is developing a game in which the character makes their way through several segments of a level, in each segment, if the character collects a coin, the player scores a point. However, if a segment doesn't have coin the player loses a point. Player 1 always starts the level and at some point, game play is turned over to the player 2 to complete the level. Player 1's goal is to achieve a higher score than player 2 once level is completed. Given the status of game segments(whether the contain a coin or not) determine the minimum number of segments player1 should play so that, in the end his score is greater than player 2.

*/

function playSegments(coins) {
    let totalPoints = 0;
    for(let i = 0; i < coins.length; i++) {
        if(coins[i] === 1) totalPoints += 1;
        if(coins[i] === 0) totalPoints -= 1;
    }
    let player1Score = 0;
    let neededScore = Math.ceil(totalPoints / 2)
    if (totalPoints < 0) return player1Score;
    
    for(let i = 0; i < coins.length; i++) {
        if(coins[i] === 1) player1Score += 1;
        if(coins[i] === 0) player1Score -= 1;
        if(player1Score > neededScore ) return i + 1;
    }
    if(totalPoints === 1) {
        if(coins[0] === 1) return 1;
        else return coins.length;
    }
}



function minSegmentsToWin(segments) {
    // Calculate the total score of all segments
    let totalScore = segments.reduce((sum, segment) => sum + (segment === 1 ? 1 : -1), 0);

    // If the total score is negative, Player 1 doesn't need to play any segment
    if (totalScore < 0) {
        return 0; // Player 1 doesn't need to play any segment
    }

    // Initialize scores for Player 1 and Player 2
    let p1Score = 0;
    let p2Score = totalScore;

    // Iterate over segments to assign them to Player 1
    for (let i = 0; i < segments.length; i++) {
        // Update Player 1's score: +1 for coin (1), -1 for no coin (0)
        p1Score += (segments[i] === 1 ? 1 : -1);

        // Update Player 2's score accordingly
        p2Score -= (segments[i] === 1 ? 1 : -1);

        // Check if Player 1's score is now greater than Player 2's
        if (p1Score > p2Score) {
            return i + 1; // Minimum number of segments Player 1 needs to play
        }
    }

    // If no point is found, return the total number of segments (in case all are needed)
    return segments.length;
}

// Example usage:
const segments = [0, 0, 0, 1, 1];
// console.log(minSegmentsToWin(segments)); // Output: 4

/*
FC Codelona is trying to assemble a team from a roster of available players. They have a minimum number of players they want to sign, and each player needs to have a skill rating within a certain range. Given a list of player's skill levels with desired upper and lower bounds, determine how many teams can be created from a list

Example 
skills = [12, 4, 6, 13, 5, 10]
minPlayers = 3
minLevel = 4
maxLevel = 10
*/
// function countValidTeams(skills, minPlayers, minLevel, maxLevel) {
//     // Filter out players whose skill is within the specified range
//     const validPlayers = skills.filter(skill => skill >= minLevel && skill <= maxLevel);

//     const n = validPlayers.length;
//     let teamCount = 0;

//     // Helper function to generate combinations
//     function countCombinations(start, currentTeam) {
//         if (currentTeam.length >= minPlayers) {
//             teamCount++; // Count only if the team has enough players
//         }

//         // Generate further combinations
//         for (let i = start; i < n; i++) {
//             currentTeam.push(validPlayers[i]);
//             countCombinations(i + 1, currentTeam);
//             currentTeam.pop(); // Backtrack to explore other combinations
//         }
//     }

//     // Start generating combinations
//     countCombinations(0, []);

//     return teamCount;
// }

function countValidTeams(skills, minPlayers, minLevel, maxLevel, index = 0, currentTeam = []) {
  // Base case: if we've processed all players
  if (index === skills.length) {
    // Check if the current team meets the size requirement and return 1 if valid, else return 0
    return currentTeam.length >= minPlayers ? 1 : 0;
  }

  // Exclude the current player and move to the next index
  let exclude = countValidTeams(skills, minPlayers, minLevel, maxLevel, index + 1, currentTeam);

  // Include the current player if they meet the skill level requirements
  let include = 0;
  if (skills[index] >= minLevel && skills[index] <= maxLevel) {
    currentTeam.push(skills[index]);
    include = countValidTeams(skills, minPlayers, minLevel, maxLevel, index + 1, currentTeam);
    currentTeam.pop(); // Backtrack to try other combinations
  }

  // Return the sum of both possibilities (including or excluding the current player)
  return exclude + include;
}



function countValidTeams(skills, minPlayers, minLevel, maxLevel) {
    let validPlayers = skills.filter((skill) => skill >= minLevel && skill <= maxLevel);

    let teamCount = 0;
    let currentTeam = [];

    function helper(validPlayers,index = 0, currentTeam ) {
        if(index === validPlayers.length){
            return currentTeam.length >= minPlayers ? teamCount +=1 : teamCount += 0; 
        }

        helper(validPlayers, index + 1, currentTeam);
        currentTeam.push(validPlayers[index]);
        helper(validPlayers, index + 1, currentTeam);
        currentTeam.pop();
    }

    helper(validPlayers, 0, currentTeam);

    return teamCount;
    
}

function countValidTeams(skills, minPlayers, minLevel, maxLevel) {
    let validPlayers = skills.filter((skill) => skill >= minLevel && skill <= maxLevel);
    let teamCount = 0;

    function helper(index = 0, currentTeam = []) {
        // Base case: when all players are processed
        if (index === validPlayers.length) {
            // Increment teamCount only if the current team has the required number of players
            if (currentTeam.length >= minPlayers) {
                teamCount++;
            }
            return;
        }

        // Exclude the current player and move to the next index
        helper(index + 1, currentTeam);

        // Include the current player and move to the next index
        currentTeam.push(validPlayers[index]);
        helper(index + 1, currentTeam);

        // Backtrack by removing the last added player
        currentTeam.pop();
    }

    helper(); // Start the recursive exploration

    return teamCount; // Return the total number of valid teams
}


// Example usage:
const skills = [12, 4, 6, 13, 5, 10];
const minPlayers = 3;
const minLevel = 4;
const maxLevel = 10;

console.log(countValidTeams(skills, minPlayers, minLevel, maxLevel)); // Output: 5
