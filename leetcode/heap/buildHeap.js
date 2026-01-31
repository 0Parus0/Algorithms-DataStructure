function buildMaxHeap(arr, size = arr.length) {
  // step down
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    heapifyDown(arr, i, size);
  }

  function heapifyDown(arr, index, size) {
    let largest = index;
    let left = 2 * index + 1;
    let right = 2 * index + 2;

    if (left < size && arr[left] > arr[largest]) largest = left;
    if (right < size && arr[right] > arr[largest]) largest = right;

    if (largest !== index) {
      [arr[largest], arr[index]] = [arr[index], arr[largest]];
      heapifyDown(arr, largest, size);
    }
  }

  // function printHeap(heap) {
  //   for (let i = 0; i < heap.length; i++) console.log(heap[i]);
  // }
  // return printHeap(arr);
  return arr;
}

function heapifyUp(arr, index) {
  while (index > 0) {
    let parent = Math.floor((index - 1) / 2);

    if (arr[parent] < arr[index]) {
      [arr[parent], arr[index]] = [arr[index], arr[parent]];
      index = parent; // move up
    } else {
      break;
    }
  }
}

function buildHeapInPlace(arr) {
  for (let i = 1; i < arr.length; i++) {
    heapifyUp(arr, i); // treat arr[0..i] as a heap
  }
  return arr;
}

// Example
let arr = [10, 3, 8, 9, 5, 13];
console.log(buildHeapInPlace(arr));

console.log(buildMaxHeap([10, 3, 8, 9, 5, 13, 18, 14, 11, 70]));
