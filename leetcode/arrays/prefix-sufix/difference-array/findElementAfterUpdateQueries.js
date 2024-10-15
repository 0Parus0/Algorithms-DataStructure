function makeArrEqual(arr, queries){
     for(let query of queries){
        let [L, R, val] = query;
        applyQueries(arr, L, R, val);
     }
     return arr;
}

function applyQueries(arr, L, R, val){
    for(let i = L; i <= R; i++){
        arr[i] += val
    }
    return arr;
}

function makeArrEqualOptimized(arr,queries){
    let n = arr.length;
    // Difference array 
    let diffArr = new Array(n +1).fill(0); // One extra element for boundary handling

    // Apply difference array approach for each query
    for(let query of queries){
        let [L, R, val] = query;
        diffArr[L] += val;

        // Check if the R + 1 is inbound
        if(R + 1 < n){
            diffArr[R + 1] -= val;

        }
        
    }

    // Compute the final array by taking the prefix sum of the difference array
    let finalArr = [...arr];
    let prefixSum = 0;
    
    for(let i = 0; i < n; i++){
        prefixSum += diffArr[i];
        finalArr[i] += prefixSum;
    }

    return finalArr;
}

console.log(makeArrEqualOptimized([1, 2, 3], [[1, 2, 1], [0, 1, 2]]));