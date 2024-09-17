/*
Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
Return k.
Custom Judge:

The judge will test your solution with the following code:

int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}

If all assertions pass, then your solution will be accepted.
*/

function removeDuplicatesBF(arr) {
    if(arr.length <= 1) return arr;
    let n = arr.length;
    let uniqueCount = 1

    for(let i = 1; i < n; i++) {
        if(arr[i] === arr[i -1]) {
            for(let j = i; j < n -1; j++){
                arr[j] = arr[j + 1];
                console.log(`i = ${i} j = ${j} j + 1 = ${j +1} ${arr}`)
                console.log('-------------')
            }
            i--;
            n--;
        }else uniqueCount++;
        console.log('+++++++++++++')
    }

    return uniqueCount;
}

function removeDuplicates(arr) {
    let n = arr.length;
    if(arr.length <= 1) return arr.length;
    let uniqIdx = 0; // First element is always going to be unique

    for(let i = 1; i < n; i++) {
        
        if(arr[i] !== arr[uniqIdx]) {
            uniqIdx++;
            arr[uniqIdx] = arr[i];
            
        }


    }
    return uniqIdx + 1;
}

// console.log(removeDuplicatesBF([1, 1, 2, 2, 3, 4]))
console.log(removeDuplicates([]))