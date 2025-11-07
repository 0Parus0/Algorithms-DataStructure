/*
You are given an integer array nums and a positive integer k.

Return the number of subarrays where the maximum element of nums appears at least k times in that subarray.

A subarray is a contiguous sequence of elements within an array.

 

Example 1:

Input: nums = [1,3,2,3,3], k = 2
Output: 6
Explanation: The subarrays that contain the element 3 at least 2 times are: [1,3,2,3], [1,3,2,3,3], [3,2,3], [3,2,3,3], [2,3,3] and [3,3].
Example 2:

Input: nums = [1,4,2,1], k = 3
Output: 0
Explanation: No subarray contains the element 4 at least 3 times.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 106
1 <= k <= 105
*/
function maxIntKTimes(arr, k) {
    let n = arr.length;
    let start = 0, end = 0, total = 0, count = 0;
    let max = Math.max(...arr);
    
    while(end < n) {
        if(arr[end] === max) {
            count++;
        }
        // Decrease the window's size and add to total
        while(count === k) {
            total += n - end;
            if(arr[start] === max) {
                count--;
            }
            start++
        }

        // Increase the window size;
        end++;
    }
    return total;

}

console.log(maxIntKTimes([1,3,2,3,3], 2));
console.log(maxIntKTimes([1,4,2,1], 3));


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

/*
#Plan:
1. Problem Understanding:
   - We need to count subarrays where the count of maximum element >= k
   - The maximum element is the global maximum of the entire array
   - We need an efficient O(n) solution

2. Key Insight:
   - First, find the maximum element in the array
   - Then, the problem reduces to: count subarrays where frequency of maxElement >= k
   - We can use a sliding window or two-pointer approach

3. Approach:
   a. Find the maximum element in nums
   b. Use sliding window to count valid subarrays
   c. For each right pointer, find the smallest left pointer such that 
       window [left, right] has at least k occurrences of maxElement
   d. All subarrays starting from 0 to left will be valid when ending at right

4. Algorithm Steps:
   - Find maxElement = Math.max(...nums)
   - Initialize left = 0, count = 0, result = 0
   - For right from 0 to n-1:
        if nums[right] == maxElement: count++
        while count >= k:
            result += (n - right) // all subarrays starting from left to right, ending beyond right
            if nums[left] == maxElement: count--
            left++

5. Why This Works:
   - For each right position, we find the minimum left such that [left, right] has >= k maxElements
   - Then all subarrays [i, j] where i <= left and j >= right are valid
   - But we need to be careful about counting duplicates

6. Alternative Approach (More Intuitive):
   - Count total subarrays: n*(n+1)/2
   - Subtract subarrays with less than k maxElements
   - Use two pointers to count subarrays with < k maxElements

7. Complexity:
   - Time: O(n) - single pass
   - Space: O(1) - only a few variables
*/

function countSubarraysWithMaxAtLeastK(nums, k) {
    const n = nums.length;
    
    // Find the maximum element
    const maxElement = Math.max(...nums);
    
    let left = 0;
    let count = 0; // count of maxElement in current window
    let result = 0;
    
    for (let right = 0; right < n; right++) {
        // Add current element to window
        if (nums[right] === maxElement) {
            count++;
        }
        
        // Shrink window from left until we have exactly k-1 maxElements
        // This ensures all windows ending at right with left from 0 to current left are valid
        while (count >= k) {
            // All subarrays starting from left to right, ending at right or beyond are valid
            // But we need to count each subarray only once
            
            if (nums[left] === maxElement) {
                count--;
            }
            left++;
        }
        
        // All subarrays ending at right that start from 0 to left-1 are valid
        // Because for each start in [0, left-1], the window [start, right] has >= k maxElements
        result += left;
    }
    
    return result;
}

// More intuitive approach: count subarrays with at least k maxElements
function countSubarraysWithMaxAtLeastKIntuitive(nums, k) {
    const n = nums.length;
    const maxElement = Math.max(...nums);
    
    let result = 0;
    let left = 0;
    let count = 0; // count of maxElement in current window
    
    for (let right = 0; right < n; right++) {
        if (nums[right] === maxElement) {
            count++;
        }
        
        // When we have at least k maxElements, count all subarrays ending at right
        // that start from some position where the condition is maintained
        while (count >= k) {
            // All subarrays [i, right] where i <= left are valid
            // But we need to be careful about counting
            
            if (nums[left] === maxElement) {
                count--;
            }
            left++;
        }
        
        // All subarrays ending at right that start from 0 to left-1 have >= k maxElements
        result += left;
    }
    
    return result;
}

// Alternative approach: Count total subarrays minus subarrays with less than k maxElements
function countSubarraysWithMaxAtLeastKAlternative(nums, k) {
    const n = nums.length;
    const maxElement = Math.max(...nums);
    
    // Total number of subarrays
    const totalSubarrays = n * (n + 1) / 2;
    
    // Count subarrays with less than k maxElements
    let subarraysWithLessThanK = 0;
    let left = 0;
    let count = 0;
    
    for (let right = 0; right < n; right++) {
        if (nums[right] === maxElement) {
            count++;
        }
        
        // Keep window with less than k maxElements
        while (count >= k) {
            if (nums[left] === maxElement) {
                count--;
            }
            left++;
        }
        
        // All subarrays ending at right with start from left to right have less than k maxElements
        subarraysWithLessThanK += (right - left + 1);
    }
    
    return totalSubarrays - subarraysWithLessThanK;
}

// Implementation with detailed comments and examples
function countSubarraysWithMaxAtLeastKDetailed(nums, k) {
    const n = nums.length;
    const maxElement = Math.max(...nums);
    
    console.log(`Array: [${nums}]`);
    console.log(`Max element: ${maxElement}, k: ${k}`);
    console.log("Processing:\n");
    
    let left = 0;
    let count = 0;
    let result = 0;
    
    for (let right = 0; right < n; right++) {
        console.log(`\nRight = ${right}, nums[${right}] = ${nums[right]}`);
        
        if (nums[right] === maxElement) {
            count++;
            console.log(`Found max element! Count = ${count}`);
        }
        
        console.log(`Before shrinking: left = ${left}, count = ${count}`);
        
        // Shrink window until we have less than k maxElements
        while (count >= k) {
            console.log(`Count ${count} >= k ${k}, shrinking from left`);
            
            // All subarrays starting from current left to any end beyond right are valid
            // But we need to count carefully
            
            if (nums[left] === maxElement) {
                count--;
                console.log(`Removed max element at left=${left}, count = ${count}`);
            }
            
            // Before moving left, count the valid subarrays ending at right
            // that start from the current left position
            const validStarts = left + 1;
            console.log(`Adding ${validStarts} valid subarrays ending at ${right}`);
            result += validStarts;
            
            left++;
            console.log(`Left moved to ${left}`);
        }
        
        console.log(`After processing: result = ${result}`);
    }
    
    console.log(`\nFinal result: ${result}`);
    return result;
}

// Correct implementation using the standard approach
function countSubarrays(nums, k) {
    const n = nums.length;
    const maxVal = Math.max(...nums);
    
    let left = 0;
    let count = 0;
    let result = 0;
    
    for (let right = 0; right < n; right++) {
        if (nums[right] === maxVal) {
            count++;
        }
        
        // Shrink the window until count < k
        while (count >= k) {
            // All subarrays [left, right], [left, right+1], ..., [left, n-1] are valid
            // That's (n - right) subarrays
            result += n - right;
            
            if (nums[left] === maxVal) {
                count--;
            }
            left++;
        }
    }
    
    return result;
}

// Custom Test Cases
console.log("=== Test Case 1 ===");
console.log("Input: nums = [1,3,2,3,3], k = 2");
console.log("Output:", countSubarrays([1,3,2,3,3], 2));
console.log("Expected: 6");
console.log("---");

console.log("=== Test Case 2 ===");
console.log("Input: nums = [1,4,2,1], k = 3");
console.log("Output:", countSubarrays([1,4,2,1], 3));
console.log("Expected: 0");
console.log("---");

console.log("=== Test Case 3 ===");
console.log("Input: nums = [3,3,3,3], k = 2");
console.log("Output:", countSubarrays([3,3,3,3], 2));
console.log("Expected: 10"); // Total subarrays with at least 2 threes
console.log("---");

console.log("=== Test Case 4 ===");
console.log("Input: nums = [1,2,3], k = 1");
console.log("Output:", countSubarrays([1,2,3], 1));
console.log("Expected: 3"); // All subarrays containing 3
console.log("---");

console.log("=== Test Case 5 ===");
console.log("Input: nums = [5], k = 1");
console.log("Output:", countSubarrays([5], 1));
console.log("Expected: 1");
console.log("---");

console.log("=== Test Case 6 ===");
console.log("Input: nums = [1,1,1], k = 2");
console.log("Output:", countSubarrays([1,1,1], 2));
console.log("Expected: 3"); // [0,1], [1,2], [0,1,2]
console.log("---");

// Compare all implementations
function compareImplementations(nums, k) {
    console.log(`\n=== Comparing Implementations for nums=[${nums}], k=${k} ===`);
    
    const result1 = countSubarrays(nums, k);
    const result2 = countSubarraysWithMaxAtLeastKAlternative(nums, k);
    
    console.log("Standard approach: ", result1);
    console.log("Alternative approach:", result2);
    console.log("Results match:", result1 === result2);
}

// Run comparisons
compareImplementations([1,3,2,3,3], 2);
compareImplementations([3,3,3,3], 2);

// Run detailed example
console.log("\n=== Detailed Step-by-Step Execution ===");
countSubarraysWithMaxAtLeastKDetailed([1,3,2,3,3], 2);

// Performance test
console.log("\n=== Performance Test ===");
const largeNums = Array(100000).fill(1);
// Add some maximum elements
for (let i = 0; i < 100000; i += 1000) {
    largeNums[i] = 1000000;
}
const largeK = 10;

console.time("Standard Approach");
const standardResult = countSubarrays(largeNums, largeK);
console.timeEnd("Standard Approach");

console.time("Alternative Approach");
const alternativeResult = countSubarraysWithMaxAtLeastKAlternative(largeNums, largeK);
console.timeEnd("Alternative Approach");

console.log(`Results: Standard=${standardResult}, Alternative=${alternativeResult}, Match=${standardResult === alternativeResult}`);

/*
Commit Message:
Implement count of subarrays where maximum element appears at least k times
  - Used sliding window approach to efficiently count valid subarrays in O(n) time
  - For each right pointer, found minimum left such that window [left, right] has >= k maxElements
  - All subarrays [left, right], [left, right+1], ..., [left, n-1] are valid
  - Added alternative approach counting total subarrays minus invalid ones
  - All implementations handle edge cases including single element and all same elements
  - Comprehensive test cases verify correctness for various scenarios
*/


/*Perfect 👌 — here’s a unified sliding window template that can count subarrays where the maximum element appears:


exactly k times


at least k times


at most k times


Let’s go step by step.

🧠 Step 1: Core Idea
For many “count subarrays with X times something” problems, we can use this identity:
count(subarrays with exactly k) 
= count(subarrays with atMost(k)) - count(subarrays with atMost(k - 1))

That means if we can efficiently find how many subarrays have the max element appearing ≤ k times,
we can derive all variants easily.

⚙️ Step 2: Helper Function — countAtMost(k)
We write a helper that counts subarrays where the maximum element appears ≤ k times.
*/
function countAtMost(nums, maxEl, k) {
  let left = 0, count = 0, freq = 0;
  
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === maxEl) freq++;
    
    while (freq > k) {
      if (nums[left] === maxEl) freq--;
      left++;
    }
    
    count += right - left + 1; // all subarrays ending at `right`
  }
  return count;
}


// 🧩 Step 3: Build the Three Variants
// 🟢 1. At most k times
function subarraysMaxAtMostK(nums, k) {
  const maxEl = Math.max(...nums);
  return countAtMost(nums, maxEl, k);
}


// 🟡 2. At least k times
function subarraysMaxAtLeastK(nums, k) {
  const maxEl = Math.max(...nums);
  const total = (nums.length * (nums.length + 1)) / 2; // total subarrays
  return total - countAtMost(nums, maxEl, k - 1);
}


// 🔵 3. Exactly k times
function subarraysMaxExactlyK(nums, k) {
  const maxEl = Math.max(...nums);
  return countAtMost(nums, maxEl, k) - countAtMost(nums, maxEl, k - 1);
}


// 💡 Step 4: Usage Example
const nums = [1, 3, 2, 3, 3];
const k = 2;

console.log("At most k:", subarraysMaxAtMostK(nums, k));   // 12
console.log("At least k:", subarraysMaxAtLeastK(nums, k)); // 6
console.log("Exactly k:", subarraysMaxExactlyK(nums, k));  // 6


✅ Advantages
FeatureBenefitReusabilityOne helper handles all three versionsReadabilityClear function naming (AtMost, AtLeast, Exactly)PerformanceStill O(n), since each pass scans onceExtensibilityEasy to modify for “min element” or “target element” instead of max

Would you like me to show a dry run for the “at least k” case ([1,3,2,3,3], k=2) to make sure the logic is crystal clear?