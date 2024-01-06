function countingSort(arr, size = arr.length, place = 1) {
  let output = new Array(size).fill(0);

  // If counting sort is implemented on its own then freq
  // let max = Math.max(...arr)
  // let freq = new Array(max + 1).fill(0)

  let freq = new Array(10).fill(0);

  // Calculate count of elements
  for (let i = 0; i < size; i++) {
    const num = Math.floor(arr[i] / place) % 10;
    freq[num]++;
    // console.log({ num }, { freq });
  }

  // Calculate cumulative count
  for (let i = 1; i < 10; i++) {
    freq[i] += freq[i - 1];
  }
  console.log({ freq });

  // Place the elements in sorted order
  for (let i = size - 1; i >= 0; i--) {
    const num = Math.floor(arr[i] / place) % 10;
    output[freq[num] - 1] = arr[i];
    freq[num]--;
  }

  // Copy the output array
  for (let i = 0; i < size; i++) {
    arr[i] = output[i];
  }
  return arr;
}

console.log(countingSort([8, 5, 7, 3, 1, 0]));

function radixSortUsingCountingSort(arr, size = arr.length) {
  // Get the max element
  let max = Math.max(...arr);

  // sort the array using counting sort
  for (let i = 1; parseInt(max / i) > 0; i *= 10) {
    countingSort(arr, size, i);
  }
  return arr;
}
const arr = [121, 432, 564, 45, 788];

// console.log(radixSortUsingCountingSort(arr));
