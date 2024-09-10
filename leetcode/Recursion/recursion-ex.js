function countDown(num) {
  if (num <= 0) {
    console.log("All done!");
    return;
  }
  console.log(num);
  num--;
  countDown(num);
}

// countDown(5);

function countDownIterative(num) {
  for (let i = num; i > 0; i--) {
    console.log(i);
  }
  console.log("All done");
}

// countDownIterative(5);

function sumRange(num) {
  if (num === 1) return 1;
  return num + sumRange(num - 1);
}

// console.log(sumRange(10));
