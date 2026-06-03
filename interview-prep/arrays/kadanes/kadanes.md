# Kadane's Algorithm

Kadane's algorithm is a classic and highly prized tool for a senior frontend engineer's interview toolkit, primarily because it demonstrates an ability to move beyond brute-force solutions to optimal, linear-time algorithms. It's a shining example of applying dynamic programming principles to array problems in an elegant and efficient way .

## Part 1: Explaining Kadane's Algorithm in an Interview

When asked a question like "Maximum Subarray Sum," your explanation should showcase depth. Don't just recite code; tell a story.

- Start with the Naive Approach (Mentally): Begin by acknowledging the brute-force method. "A straightforward way would be to check the sum of every single contiguous subarray, which would take O(n²) time. For an array of size n, that's a lot of redundant calculations." This immediately frames the need for optimization .

- Introduce the Core Insight (The "Ah-ha!" Moment): This is the heart of your explanation. "The key insight Kadane's algorithm provides is that a maximum subarray ending at the current position i is either the element itself, or the element added to the maximum subarray ending at position i-1 ."

- Frame it as a decision: "As I traverse the array, at each step I have a choice: Should I extend the existing subarray, or is it better to start a brand new subarray from the current element?"

- Introduce the Dynamic Programming Formulation (Optional but Impressive): You can formalize this insight with a recurrence relation, which clearly shows the optimal substructure property.

Let dp[i] be the maximum sum of a subarray that ends at index i.

The recurrence is: dp[i] = max(nums[i], nums[i] + dp[i-1]) .

The final answer is the maximum value in the entire dp array.

- Explain the Optimization (Space and Time): "Since dp[i] only ever depends on dp[i-1], we don't need to store the whole array. We can just keep track of the current_max (which is dp[i] in the moment) and the global_max (the best we've seen so far)" . This reduces the space complexity from O(n) to O(1) , while the time complexity is a linear O(n) .

Walk Through a Concrete Example: Use a simple array, like [-2, 1, -3, 4, -1, 2, 1, -5, 4], to trace the values of current_max and global_max . This demonstrates your understanding in a tangible way.

Index Value current_max = max(value, value + previous_current_max) global_max = max(global_max, current_max)
0 -2 -2 -2
1 1 max(1, 1 + (-2)) = 1 max(-2, 1) = 1
2 -3 max(-3, -3 + 1) = -2 max(1, -2) = 1
3 4 max(4, 4 + (-2)) = 4 max(1, 4) = 4
4 -1 max(-1, -1 + 4) = 3 max(4, 3) = 4
5 2 max(2, 2 + 3) = 5 max(4, 5) = 5
6 1 max(1, 1 + 5) = 6 max(5, 6) = 6
7 -5 max(-5, -5 + 6) = 1 max(6, 1) = 6
8 4 max(4, 4 + 1) = 5 max(6, 5) = 6

## Part 2: Recognizing Kadane's Algorithm Problems

As a senior engineer, pattern recognition is key. Here’s how to spot a Kadane's-style problem :

Keywords: The problem will almost always ask for the "maximum/largest/minimum/smallest sum" of a "contiguous subarray" or "contiguous sequence." It could also ask for the length of such a subarray.

The Array Contains Mixed Signs: The problem is trivial if all numbers are positive (the whole array is the answer) or all are negative (the largest element is the answer). The challenge—and the need for Kadane's—arises from the presence of both positive and negative numbers .

The "Reset" Intuition: Think about when you would want to "reset" your running count. In Kadane's for maximum sum, you reset when the current sum becomes negative because it will only drag down future sums . This "reset" concept can be adapted to other rules, like when a comparison pattern breaks .

## Part 3: Types and Patterns of Kadane's Algorithm

While the core principle is the same, the algorithm can be adapted. Here are the common patterns with LeetCode examples.

### Pattern 1: The Classic - Maximum Subarray Sum

    This is the fundamental pattern. The goal is to find the largest sum of any contiguous subarray.

    Core Logic: current_max = max(nums[i], current_max + nums[i])

    LeetCode Problems:

    53. Maximum Subarray (The quintessential problem)

    918. Maximum Sum Circular Subarray (A twist where the array is circular. The solution involves finding the max subarray using Kadane's and the min subarray using a variation, then comparing the total sum minus the min subarray with the standard max.)

### Pattern 2: The Twist - Minimum Subarray Sum

    This is a simple but important variant. Instead of looking for the largest sum, you're looking for the smallest (most negative) sum. You can solve this by either flipping the signs of the numbers and running the classic Kadane's, or by modifying the logic to track the minimum .

    Core Logic: current_min = min(nums[i], current_min + nums[i])

    LeetCode Problems:

    This pattern is often a step in solving more complex problems, like the circular array problem mentioned above (918).

### Pattern 3: Tracking the Subarray Itself

    Often, an interviewer will ask not just for the sum, but for the subarray that produces it. This requires tracking the start and end indices whenever you update the global_max .

    Core Logic: When you reset and start a new subarray (nums[i] > current_max + nums[i]), you note a potential new start index. When you update the global_max, you solidify those indices as the answer.

    LeetCode Problems:

    This is frequently a follow-up question to 53. Maximum Subarray. It's also useful in real-world scenarios where the segment itself is the valuable output, not just its value .

### Pattern 4: The Extension - Following a Different Rule

    The core idea of "building on the previous result if it's beneficial, otherwise restarting" can be extended beyond simple sums. The "benefit" is defined by a different rule .

    Core Logic: Instead of tracking a sum, you track a property (like length) and decide to extend or restart based on a condition (e.g., a comparison pattern).

    LeetCode Problems:

    978. Longest Turbulent Subarray : This problem asks for the longest subarray where the comparison signs alternate (arr[0] > arr[1] < arr[2] > ...). You can use a Kadane-like approach with two "counters" (up and down) that reset or increment based on the comparison between adjacent elements .

### Pattern Core Logic / Problem Goal LeetCode Example(s):

    1. Classic (Max Sum)	max(nums[i], current_max + nums[i])	53. Maximum Subarray.
    2. Twist (Min Sum)	min(nums[i], current_min + nums[i])	918. Maximum Sum Circular Subarray.
    3. Track Subarray	Store start and end indices when global_max updates.	A common follow-up to #53 .
    4. Extended Rule	Extend/restart based on a pattern (e.g., alternating comparisons).	978. Longest Turbulent Subarray.

### Summary for Your Interview

    "Kadane's algorithm is a classic example of dynamic programming that solves the maximum subarray sum problem in O(n) time and O(1) space. It's based on the insight that the optimal solution for the whole array can be found by making local, greedy decisions: at each element, we decide whether to start a new subarray or extend the existing one. This pattern is highly adaptable and forms the basis for solving a variety of problems, from finding the maximum sum to identifying the longest turbulent subarray."
