/*
You are given an array of N elements and num queries, In each query you are given three numbers L,R and K and you have to tell, how many indexes are there in between L and R(L<=i<=R) such that the frequency of a[i] from index i to n-1 is k.

Note: 0-based indexing

Example 1:

Input:
N=5
num=3
A={1,1,3,4,3}
Q={{0,2,2},{0,2,1},{0,4,2}}
Output:
2 1 2
Explanation:
For query 1: 0 2 2
L=0,R=2,K=2
let, L<=i<=R
For i=0: frequency of a[i] i.e. 1 from i to n-1 is 2.
For i=1: frequency of a[i] i.e. 1 from i to n-1 is 1.
For i=2: frequency of a[i] i.e. 3 from i to n-1 is 2.
Hence we have two elements from index 0 to 2 
whose frequency from i to n-1 is 2.

For query 2: 0 2 1
L=0,R=2,K=1
As we can see from the above query that there is 
only a single element in 0 to 2 whose frequency 
from i to n-1 is 1.

For query 3: 0 4 2
The answer will be 2 because of the index 0 and 2.
Example 2:

Input:
N=5
num=2
A={1,1,1,1,1}
Q={{0,4,2},{0,4,1}}
Output:
1 1 
Explanation: 
For query 1: 0 4 2 
L=0,R=4,K=2 
let, L<=i<=R 
For i=0: frequency of a[i] i.e. 1 from i to n-1 is 5. 
For i=1: frequency of a[i] i.e. 1 from i to n-1 is 4. 
For i=2: frequency of a[i] i.e. 1 from i to n-1 is 3.
For i=3: frequency of a[i] i.e. 1 from i to n-1 is 2.
For i=4: frequency of a[i] i.e. 1 from i to n-1 is 1. 
Hence we have one elements from index 0 to 4 whose frequency from i to n-1 is 2. 

Similarly For query 2: 
there is only 1 element in 0 to 4 whose frequency from i to n-1 is 1.
Expected Time Complexity: O(N2)
Expected Auxiliary Space: O(N2)

Your Task:
You don't need to read input or print anything. Your task is to complete the function solveQueries() which take two variable N and num representing the length of the original array and number of queries and two arrays as input, A and Q representing the original array and an array of queries(2-D array with 3 columns of L,R and K respectively), and returns the array of length num with the solution to each query.
 

Constraints:
1 <= N <= 103
0 <= Q < 103
1 <= A[i] <= 105
*/
/* Brute Force approach */
function freqCount(arr, n, L, R, K){
    let result = 0; // To return the frequency of given index A[i]
    for(let i = L; i <= R; i++){
        // Iterate from index L to index R inclusive
        let freq = 0; // If subarray contains the element increase freq

        for(let j = i; j < n; j++){
            if(arr[j] === arr[i]) freq++;
        }
        
        if(freq === K) result++;
    }

    return result;
}

function processQueries(arr, n, queries){
    let results = [] 

    for(let query of queries){
        let L = query[0];
        let R = query[1];
        let K = query[2];

        let result = freqCount(arr, n, L, R, K);
        results.push(result);
    }

    return results;
}
let arr = [1, 1, 3, 4, 3];
let queries = [[0, 2, 2], [0, 2, 1], [0, 4, 2]];

/* Optimize Solution */


function computeFreq(arr, n){
    // Array to store frequency maps for each index
    let freqMap = new Array(n).fill(null).map(() => new Map());
    console.log(freqMap)

    // Frequency map to store counts from current index to the end of array
    let currFreq = new Map();
    // Traverse the array from right to left compute frequencies
    for(let i = n -1; i >= 0; i--){
        let elm = arr[i];

        // Update the frequency of arr[i]
        if(!currFreq.has(elm)){
            currFreq.set(elm, 0);
        }
        currFreq.set(elm, currFreq.get(elm) + 1)

        // Copy the current frequency map to freqMap[i];
        freqMap[i] = new Map(currFreq);
    }
    return freqMap
}

function processQueriesOptimized(arr, n, queries, freqMap){
    let results = [];
    
    for(let query of queries){
        let L = query[0];
        let R = query[1];
        let K = query[2];

        let result = 0;

        // Traverse the range [L, R];
        for(let i = L; i <= R; i++){
            let elm = arr[i];
            // Check if the frequency of elm from index i to n -1 equals K
            if(freqMap[i].get(elm) === K) result++;
        }
        results.push(result);
    }
    return results;
}

let computeFrequencies = computeFreq(arr, 5);
console.log(processQueriesOptimized(arr, 5, queries, computeFrequencies));