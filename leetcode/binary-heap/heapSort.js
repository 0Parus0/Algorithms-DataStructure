function buildHeap(arr) {
  let size = arr.length;
  let index = Math.floor(size / 2) - 1;

  for (let i = index; i >= 0; i--) {
    heapifyDownIterative(arr, size, i);
  }
  return arr;
}

/**
 * In-place Heap Sort
 * Ascending order by default (using Max-Heap)
 */

function heapSort(arr, ascending = true) {
  const n = arr.length;

  // Helper to heapify subtree rooted at i, within size n
  const heapifyDown = (i, size, compareFn) => {
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let candidate = i;

      if (left < size && compareFn(arr[left], arr[candidate])) candidate = left;
      if (right < size && compareFn(arr[right], arr[candidate]))
        candidate = right;

      if (candidate === i) break;
      [arr[i], arr[candidate]] = [arr[candidate], arr[i]];
      i = candidate;
    }
  };

  // Comparator depending on heap type
  const compareFn = ascending
    ? (a, b) => a > b // Max-heap for ascending
    : (a, b) => a < b; // Min-heap for descending

  // Step 1: Build heap
  for (let i = Math.floor((n - 2) / 2); i >= 0; i--) {
    heapifyDown(i, n, compareFn);
  }

  // Step 2: Repeatedly extract max/min to sort in-place
  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    heapifyDown(0, end, compareFn);
  }

  // If we built a min-heap (for descending), no need to reverse — it's already descending.
  return arr;
}

// ---------------------------
// Example Usage
// ---------------------------

let arr1 = [3, 1, 5, 4, 2, 6];
console.log("Original:", arr1);

heapSort(arr1, true);
console.log("Heap Sort Ascending:", arr1);

let arr2 = [3, 1, 5, 4, 2, 6];
heapSort(arr2, false);
console.log("Heap Sort Descending:", arr2);

/*************** */
class HeapSortInPlace {
  // Main heap sort method
  static sort(arr, order = "ascending") {
    if (arr.length <= 1) return arr;

    const n = arr.length;
    const compare =
      order === "ascending"
        ? (a, b) => a < b // Min-heap for ascending
        : (a, b) => a > b; // Max-heap for descending

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(arr, n, i, compare);
    }

    // One by one extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      [arr[0], arr[i]] = [arr[i], arr[0]];

      // Call heapify on the reduced heap
      this.heapify(arr, i, 0, compare);
    }

    return arr;
  }

  // Heapify a subtree rooted at index i
  static heapify(arr, n, i, compare) {
    let extreme = i; // Initialize extreme as root
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // If left child is more extreme than root
    if (left < n && compare(arr[left], arr[extreme])) {
      extreme = left;
    }

    // If right child is more extreme than current extreme
    if (right < n && compare(arr[right], arr[extreme])) {
      extreme = right;
    }

    // If extreme is not root
    if (extreme !== i) {
      [arr[i], arr[extreme]] = [arr[extreme], arr[i]];

      // Recursively heapify the affected sub-tree
      this.heapify(arr, n, extreme, compare);
    }
  }

  // Non-recursive heapify version (optimized for large arrays)
  static heapifyIterative(arr, n, i, compare) {
    let current = i;

    while (true) {
      let extreme = current;
      const left = 2 * current + 1;
      const right = 2 * current + 2;

      if (left < n && compare(arr[left], arr[extreme])) {
        extreme = left;
      }

      if (right < n && compare(arr[right], arr[extreme])) {
        extreme = right;
      }

      if (extreme === current) break;

      [arr[current], arr[extreme]] = [arr[extreme], arr[current]];
      current = extreme;
    }
  }

  // Alternative implementation using your MinHeap pattern
  static sortMinHeapStyle(arr, order = "ascending") {
    const n = arr.length;
    if (n <= 1) return arr;

    // Build heap using your heapifyDown approach
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapifyDown(arr, n, i, order);
    }

    // Extract elements
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      this.heapifyDown(arr, i, 0, order);
    }

    return arr;
  }

  static heapifyDown(arr, n, i, order) {
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let extreme = i;

      if (order === "ascending") {
        if (left < n && arr[left] < arr[extreme]) extreme = left;
        if (right < n && arr[right] < arr[extreme]) extreme = right;
      } else {
        if (left < n && arr[left] > arr[extreme]) extreme = left;
        if (right < n && arr[right] > arr[extreme]) extreme = right;
      }

      if (extreme === i) break;

      [arr[i], arr[extreme]] = [arr[extreme], arr[i]];
      i = extreme;
    }
  }
}

// Enhanced version that works with arrays (like your original MinHeap)
class AdvancedHeapSort {
  static sort(arr, order = "ascending", compareKey = 0) {
    if (arr.length <= 1) return arr;

    const n = arr.length;
    const compare = this.createComparator(order, compareKey);

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(arr, n, i, compare);
    }

    // Sort
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      this.heapify(arr, i, 0, compare);
    }

    return arr;
  }

  static createComparator(order, compareKey) {
    return order === "ascending"
      ? (a, b) => {
          const valA = Array.isArray(a) ? a[compareKey] : a;
          const valB = Array.isArray(b) ? b[compareKey] : b;
          return valA < valB;
        }
      : (a, b) => {
          const valA = Array.isArray(a) ? a[compareKey] : a;
          const valB = Array.isArray(b) ? b[compareKey] : b;
          return valA > valB;
        };
  }

  static heapify(arr, n, i, compare) {
    let extreme = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && compare(arr[left], arr[extreme])) {
      extreme = left;
    }

    if (right < n && compare(arr[right], arr[extreme])) {
      extreme = right;
    }

    if (extreme !== i) {
      [arr[i], arr[extreme]] = [arr[extreme], arr[i]];
      this.heapify(arr, n, extreme, compare);
    }
  }
}

// Comprehensive Test Suite
class InPlaceHeapSortTest {
  static runAllTests() {
    console.log("=== IN-PLACE HEAP SORT TESTS ===\n");

    this.testBasicSorting();
    this.testEdgeCases();
    this.testArrayElements();
    this.testPerformance();
    this.testComparison();
  }

  static testBasicSorting() {
    console.log("1. BASIC SORTING:");

    const test1 = [64, 34, 25, 12, 22, 11, 90];
    const test2 = [5, 2, 8, 1, 9, 3];
    const test3 = [1, 2, 3, 4, 5]; // already sorted
    const test4 = [5, 4, 3, 2, 1]; // reverse sorted

    console.log("Original:", [...test1]);
    console.log("Ascending:", HeapSortInPlace.sort([...test1], "ascending"));
    console.log("Descending:", HeapSortInPlace.sort([...test1], "descending"));

    console.log(
      "Already sorted:",
      HeapSortInPlace.sort([...test3], "ascending")
    );
    console.log(
      "Reverse sorted:",
      HeapSortInPlace.sort([...test4], "ascending")
    );
    console.log("");
  }

  static testEdgeCases() {
    console.log("2. EDGE CASES:");

    // Empty array
    console.log("Empty array:", HeapSortInPlace.sort([]));

    // Single element
    console.log("Single element:", HeapSortInPlace.sort([42]));

    // Two elements
    console.log("Two elements:", HeapSortInPlace.sort([2, 1]));

    // Duplicates
    const duplicates = [5, 2, 5, 1, 2, 5];
    console.log("Duplicates:", HeapSortInPlace.sort([...duplicates]));

    // Negative numbers
    const negatives = [-3, -1, -2, -5, -4];
    console.log("Negative numbers:", HeapSortInPlace.sort([...negatives]));
    console.log("");
  }

  static testArrayElements() {
    console.log("3. ARRAY ELEMENTS (Like Your MinHeap):");

    const tasks = [
      [3, "Task C"],
      [1, "Task A"],
      [2, "Task B"],
      [1, "Task A1"],
      [4, "Task D"],
    ];

    console.log("Original tasks:");
    tasks.forEach((task) => console.log(`  [${task[0]}, "${task[1]}"]`));

    const sortedAsc = AdvancedHeapSort.sort([...tasks], "ascending", 0);
    console.log("\nAscending by priority:");
    sortedAsc.forEach((task) => console.log(`  [${task[0]}, "${task[1]}"]`));

    const sortedDesc = AdvancedHeapSort.sort([...tasks], "descending", 0);
    console.log("\nDescending by priority:");
    sortedDesc.forEach((task) => console.log(`  [${task[0]}, "${task[1]}"]`));
    console.log("");
  }

  static testPerformance() {
    console.log("4. PERFORMANCE ANALYSIS:");

    const sizes = [1000, 5000, 10000];

    sizes.forEach((size) => {
      const randomArray = Array.from({ length: size }, () =>
        Math.floor(Math.random() * 10000)
      );

      console.log(`\nArray size: ${size}`);

      // Test recursive heapify
      const arr1 = [...randomArray];
      const start1 = performance.now();
      HeapSortInPlace.sort(arr1, "ascending");
      const time1 = performance.now() - start1;
      console.log(`Recursive: ${time1.toFixed(2)}ms`);

      // Test iterative heapify
      const arr2 = [...randomArray];
      const start2 = performance.now();
      HeapSortInPlace.sortMinHeapStyle(arr2, "ascending");
      const time2 = performance.now() - start2;
      console.log(`Iterative: ${time2.toFixed(2)}ms`);

      // Verify both produce same result
      console.log(
        `Results match: ${JSON.stringify(arr1) === JSON.stringify(arr2)}`
      );
    });
  }

  static testComparison() {
    console.log("\n5. COMPARISON WITH BUILT-IN SORT:");

    const largeArray = Array.from({ length: 10000 }, () =>
      Math.floor(Math.random() * 1000000)
    );

    // Heap Sort
    const heapArray = [...largeArray];
    const heapStart = performance.now();
    HeapSortInPlace.sort(heapArray, "ascending");
    const heapTime = performance.now() - heapStart;

    // Built-in Sort
    const builtInArray = [...largeArray];
    const builtInStart = performance.now();
    builtInArray.sort((a, b) => a - b);
    const builtInTime = performance.now() - builtInStart;

    console.log(`Heap Sort: ${heapTime.toFixed(2)}ms`);
    console.log(`Built-in Sort: ${builtInTime.toFixed(2)}ms`);
    console.log(`Ratio: ${(heapTime / builtInTime).toFixed(2)}x`);

    // Verify correctness
    const isCorrect =
      JSON.stringify(heapArray) === JSON.stringify(builtInArray);
    console.log(`Sort correct: ${isCorrect}`);
  }
}

// Visualization Helper
class HeapVisualizer {
  static printHeap(arr) {
    console.log("\nHEAP STRUCTURE:");
    let level = 0;
    let levelSize = 1;
    let i = 0;

    while (i < arr.length) {
      let levelItems = [];
      for (let j = 0; j < levelSize && i < arr.length; j++, i++) {
        levelItems.push(arr[i]);
      }
      console.log(`Level ${level}: ${levelItems.join(" ")}`);
      level++;
      levelSize *= 2;
    }
  }

  static demonstrateHeapBuild(arr) {
    console.log("\nHEAP BUILD PROCESS:");
    const n = arr.length;
    const steps = [];

    // Show initial array
    steps.push([...arr]);

    // Build heap step by step
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      HeapSortInPlace.heapify(arr, n, i, (a, b) => a < b);
      steps.push([...arr]);
    }

    steps.forEach((step, index) => {
      console.log(`Step ${index}:`, step);
    });

    return arr;
  }
}

// Practical Examples
class HeapSortExamples {
  static demonstrate() {
    console.log("\n=== PRACTICAL EXAMPLES ===");

    // Example 1: Sort users by age
    const users = [
      { name: "John", age: 25 },
      { name: "Alice", age: 30 },
      { name: "Bob", age: 20 },
      { name: "Eve", age: 35 },
    ];

    console.log("\n1. SORT OBJECTS BY PROPERTY:");
    const userAges = users.map((user) => [user.age, user.name]);
    const sortedUsers = AdvancedHeapSort.sort(userAges, "ascending", 0);
    console.log("Users by age:", sortedUsers);

    // Example 2: Find top K elements
    console.log("\n2. FIND TOP K ELEMENTS:");
    const findTopK = (arr, k, order = "descending") => {
      const sorted = HeapSortInPlace.sort([...arr], order);
      return sorted.slice(0, k);
    };

    const numbers = [10, 5, 8, 1, 7, 9, 3, 6, 2, 4];
    console.log("Top 3 numbers:", findTopK(numbers, 3, "descending"));
    console.log("Bottom 3 numbers:", findTopK(numbers, 3, "ascending"));

    // Example 3: Median of streaming data
    console.log("\n3. SLIDING WINDOW MEDIAN:");
    const slidingWindowMedian = (arr, k) => {
      const result = [];
      for (let i = 0; i <= arr.length - k; i++) {
        const window = arr.slice(i, i + k);
        const sortedWindow = HeapSortInPlace.sort([...window], "ascending");
        const mid = Math.floor(k / 2);
        const median =
          k % 2 === 0
            ? (sortedWindow[mid - 1] + sortedWindow[mid]) / 2
            : sortedWindow[mid];
        result.push(median);
      }
      return result;
    };

    const data = [1, 3, -1, -3, 5, 3, 6, 7];
    console.log("Sliding window medians (k=3):", slidingWindowMedian(data, 3));
  }
}

// Run all tests
InPlaceHeapSortTest.runAllTests();
HeapSortExamples.demonstrate();

// Quick demonstration
console.log("\n=== QUICK DEMONSTRATION ===");
const demoArray = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
console.log("Original:", demoArray);
HeapVisualizer.printHeap([...demoArray]);
console.log("Sorted:", HeapSortInPlace.sort([...demoArray], "ascending"));

// Export for use
export {
  HeapSortInPlace,
  AdvancedHeapSort,
  InPlaceHeapSortTest,
  HeapVisualizer,
};

function heapifyDownRecursive(arr, size, index) {
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

function heapSortInPlace(arr) {
  const heap = buildHeap(arr);
  for (let i = heap.length - 1; i > 0; i--) {
    [heap[0], heap[i]] = [heap[i], heap[0]];
    heapifyDownIterative(heap, i, 0);
  }

  return heap;
}

function heapifyDownIterative(arr, size, index) {
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

console.log(heapSort([10, 3, 8, 9, 5, 13, 18, 14, 11, 70]));
