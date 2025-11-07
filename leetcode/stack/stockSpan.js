/*
901. Online Stock Span
Medium

Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.

The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

    For example, if the prices of the stock in the last four days is [7,2,1,2] and the price of the stock today is 2, then the span of today is 4 because starting from today, the price of the stock was less than or equal 2 for 4 consecutive days.
    Also, if the prices of the stock in the last four days is [7,34,1,2] and the price of the stock today is 8, then the span of today is 3 because starting from today, the price of the stock was less than or equal 8 for 3 consecutive days.

Implement the StockSpanner class:

    StockSpanner() Initializes the object of the class.
    int next(int price) Returns the span of the stock's price given that today's price is price.

 

Example 1:

Input
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
Output
[null, 1, 1, 1, 2, 1, 4, 6]

Explanation
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
stockSpanner.next(85);  // return 6

 

Constraints:

    1 <= price <= 105
    At most 104 calls will be made to next.
*/

class StockSpannerL1 {
  constructor() {
    this.stack = []; // Stores [price, span] pairs
  }

  next(price) {
    let span = 1;

    // Look back at previous prices to calculate span
    while (
      this.stack.length > 0 &&
      this.stack[this.stack.length - 1][0] <= price
    ) {
      span += this.stack.pop()[1];
    }

    this.stack.push([price, span]);
    return span;
  }
}

var StockSpannerL = function () {
  // Initialize the stack as an instance property
  this.stack = [];
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpannerL.prototype.next = function (price) {
  let span = 1;

  // While stack is not empty and previous price <= current price
  while (
    this.stack.length > 0 &&
    this.stack[this.stack.length - 1][0] <= price
  ) {
    // Add the span of the previous smaller/equal price
    span += this.stack.pop()[1];
  }

  // Push current price with its calculated span
  this.stack.push([price, span]);

  return span;
};

var StockSpanner = function () {
  this.prices = []; // Store prices
  this.spans = []; // Store corresponding spans
};

StockSpanner.prototype.next = function (price) {
  let span = 1;

  // Look backwards while previous prices are <= current price
  let i = this.prices.length - 1;
  while (i >= 0 && this.prices[i] <= price) {
    span += this.spans[i];
    i -= this.spans[i]; // Jump back by the span
  }

  this.prices.push(price);
  this.spans.push(span);

  return span;
};

// console.log(stockSpan([100, 80, 60, 70, 75, 85]));

/*
The Stock Span Problem
Last Updated : 26 Aug, 2025
The stock span problem is a classic financial problem. Given a series of daily stock prices represented by an array arr[], the span of the stock price on the i-th day is defined as the maximum number of consecutive days immediately before and including the i-th day for which the stock price was less than or equal to its price on day i.

Examples:

Input: arr[] = [100, 80, 60, 70, 60, 75, 85]
Output: [1, 1, 1, 2, 1, 4, 6]
Explanation: Traversing the given input span 100 is greater than equal to 100 and there are no more elements behind it so the span is 1, 80 is greater than equal to 80 and smaller than 100 so the span is 1, 60 is greater than equal to 60 and smaller than 80 so the span is 1, 70 is greater than equal to 60,70 and smaller than 80 so the span is 2 and so on.  Hence the output will be 1 1 1 2 1 4 6.

Input: arr[] = [10, 4, 5, 90, 120, 80]
Output: [1, 1, 2, 4, 5, 1]
Explanation: Traversing the given input span 10 is greater than equal to 10 and there are no more elements behind it so the span is 1, 4 is greater than equal to 4 and smaller than 10 so the span is 1, 5 is greater han equal to 4,5 and smaller than 10 so the span is 2,  and so on. Hence the output will be 1 1 2 4 5 1.
*/

function stockSpanGFG(price) {
  const stack = [];
  const result = new Array(price.length).fill(1);

  for (let i = price.length - 1; i >= 0; i--) {
    while (stack.length > 0 && price[i] > price[stack[stack.length - 1]]) {
      result[stack[stack.length - 1]] = stack[stack.length - 1] - i;
      stack.pop();
    }

    stack.push(i);
  }
  while (stack.length > 0) {
    result[stack[stack.length - 1]] = stack[stack.length - 1] + 1;
    stack.pop();
  }
  return result;
}

function stockSpan(prices) {
  const n = prices.length;
  const spans = new Array(n).fill(1);
  const stack = []; // will store indices of previous greater elements

  for (let i = 0; i < n; i++) {
    // Step 1: pop all smaller (or equal) prices
    while (stack.length && prices[stack[stack.length - 1]] <= prices[i]) {
      stack.pop();
    }

    // Step 2: calculate span
    spans[i] = stack.length === 0 ? i + 1 : i - stack[stack.length - 1];

    // Step 3: push current day
    stack.push(i);
  }

  return spans;
}

// console.log(stockSpanGFG([100, 80, 55, 70, 60, 75, 85]));
console.log(stockSpanGFG([55, 60, 60, 75, 85]));
console.log(stockSpanGFG([100, 80, 60, 70, 60, 75, 85]));
console.log(stockSpanGFG([10, 4, 5, 90, 120, 80]));
