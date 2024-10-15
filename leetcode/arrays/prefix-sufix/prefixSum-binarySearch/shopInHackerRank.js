/*
 A shop in hackerland contains n items where the price of the ith item is price[i]. In one operation, the price of any one item can be increased or decreased by 1.
given q queries denoted by the array query[] find the minimum number of operations required to make the price of all items equal to each query[i](0<= i < q)
note all queries are independent of each other, i.e., the original price of items is restored after the competetion of each query
example 
n = 3, q = 4, price = [1,2,3], query = [3,2,1,5]
the answer is [3, 2, 3, 9]
*/
function minOperations(n, q, prices, queries) {
    // Step 1: Sort the prices array
    prices.sort((a, b) => a - b);
    
    // Step 2: Precompute prefix sums
    let prefixSum = new Array(n).fill(0);
    prefixSum[0] = prices[0];
    
    for (let i = 1; i < n; i++) {
        prefixSum[i] = prefixSum[i - 1] + prices[i];
    }
    
    let result = [];
    
    // Step 3: Process each query
    for (let i = 0; i < q; i++) {
        let queryValue = queries[i];
        
        // Binary search to find the position where prices are <= queryValue
        let low = 0;
        let high = n - 1;
        let pos = -1;
        
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (prices[mid] <= queryValue) {
                pos = mid; // Found a valid position where price <= queryValue
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        
        // Step 4: Calculate total operations based on whether prices are <= or > queryValue
        let operations = 0;
        
        // Case 1: Prices less than or equal to queryValue (prices[pos] <= queryValue)
        if (prices[pos] <= queryValue) {
            let totalPricesLessOrEqual = pos + 1;
            let sumPricesLessOrEqual = prefixSum[pos];
            // The total sum we want to achieve is queryValue * totalPricesLessOrEqual
            operations += (queryValue * totalPricesLessOrEqual) - sumPricesLessOrEqual;
        }
        
        // Case 2: Prices greater than queryValue (prices[pos + 1] > queryValue)
        if (prices[pos + 1] > queryValue) {
            let totalPricesGreater = n - pos - 1;
            let sumPricesGreater = prefixSum[n - 1] - (pos >= 0 ? prefixSum[pos] : 0);
            // The total sum we want to reduce is queryValue * totalPricesGreater
            operations += sumPricesGreater - (queryValue * totalPricesGreater);
        }
        
        result.push(operations);
    }
    
    return result;
}

// Example usage:
const n = 3;
const q = 4;
const prices = [1, 2, 3];
const queries = [3, 2, 1, 5];

const answer = minOperations(n, q, prices, queries);
console.log(answer);  // Output: [3, 2, 3, 9]
