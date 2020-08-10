// function addUpToSlower(n) {
//   let total = 0;
//   for(let i = 1; i <= n; i++) {
//     total += i
//   }
//   return total;
// };

// function addUpToFaster(n) {
//   return n * (n + 1) / 2;
// }

// function countUpAndDown(n) {
//   console.log('Going up!');
//   for(let i = 0; i < n; i++) {
//     console.log(i);
//   }
//   console.log('At the top!\nGoing down...');
//   for (let j = n; j >= 0; j--) {
//     console.log(j);
//   }
// }

// function printAllPairs(n) {
//   for (let i = 0; i < n; i++) {
//     for(let j = 0; j < n; j++) {
//       console.log(i, j);
//     }
//   }
// }

// function logAtLeast5(n) {
//   for ( let i = 1; i <= Math.max(5, n); i++) {
//     console.log(i);
//   }
// }

// function logAtMost5(n) {
//   for (let i = 1; i < 5; i++) {
//     console.log(i);
//   }
// }


// var t5 = performance.now();
// logAtLeast5(10);
// var t6 = performance.now()
// console.log(`Time Elapsed logAtLeast5: ${(t6 - t5) / 1000} second`);



// var t9 = performance.now();
// logAtMost5(10);
// var t10 = performance.now()
// console.log(`Time Elapsed CountUpAndDown: ${(t10 - t9) / 1000} second`);





// var t1 = performance.now();
// addUpToSlower(100000000);
// var t2 = performance.now()
// console.log(`Time Elapsed Slower: ${(t2 - t1) / 1000} second`);


// var t3 = performance.now();
// addUpToFaster(100000000);
// var t4 = performance.now()
// console.log(`Time Elapsed Faster: ${(t4 - t3) / 1000} second`);


// var t5 = performance.now();
// countUpAndDown(10);
// var t6 = performance.now()
// console.log(`Time Elapsed CountUpAndDown: ${(t6 - t5) / 1000} second`);



// var t7 = performance.now();
// printAllPairs(5);
// var t8 = performance.now()
// console.log(`Time Elapsed printAllPairs: ${(t6 - t5) / 1000} second`);
