function heapifyUpRecursive(arr, index) {
  // Min heap
  if (index === 0) return; // root reached

  let parent = Math.floor((index - 1) / 2);

  if (arr[parent] > arr[index]) {
    [arr[parent], arr[index]] = [arr[index], arr[parent]];
    heapifyUpRecursive(arr, parent);
  }
}

function heapifyUpIterative(arr, index) {
  // Min heap
  while (index > 0) {
    let parent = Math.floor((index - 1) / 2);

    if (arr[parent] > arr[index]) {
      [arr[parent], arr[index]] = [arr[index], arr[parent]];
      index = parent; // move up
    } else {
      break;
    }
  }
}

function heapifyDownRecursive(arr, size, index) {
  // Max heap
  let left = 2 * index + 1;
  let right = 2 * index + 2;

  let largest = index;

  if (left < size && arr[left] > arr[largest]) largest = left;
  if (right < size && arr[right] > arr[largest]) largest = right;

  if (largest !== index) {
    [arr[index], arr[largest]] = [arr[largest], arr[index]];
    heapify(arr, size, largest);
  }
}

function heapifyDownIterative(arr, size, index) {
  // Max heap
  while (true) {
    let largest = index;
    let left = 2 * index + 1;
    let right = 2 * index + 2;

    if (left < size && arr[left] > arr[index]) largest = left;
    if (right < size && arr[right] > arr[largest]) largest = right;

    if (largest !== index) {
      [arr[index], arr[largest]] = [arr[largest], arr[index]];
      index = largest;
    } else {
      break; // heap property satisfied
    }
  }
}
