function solution(str, n) {
  let res = "";
  let total = 0;
  for (let i = 0; i < str.length; i++) {
    let charCode = str[i].charCodeAt() - 97 + 1;
    // console.log(charCode);
    res += charCode;
  }
  for (let i = 0; i < res.length; i++) {
    total += parseInt(res[i]);
  }
  for (let i = 0; i < n; i++) {
    total = add(total);
  }
  return total;
}
function add(num) {
  num = num.toString();
  let sum = 0;
  for (let i = 0; i < num.length; i++) {
    sum += parseInt(num[i]);
  }
  return sum;
}

// console.log(solution("turing", 2));

function position(arr) {
  let result = [];
  let sorted = [...arr].sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    result[i] = sorted.indexOf(num);
  }
  return result;
}

// let arr = [35, 9, 45, 8, 7];
function position2(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    let pos = findPivot(arr, i);
    res.push(pos);
  }

  return res;
}
function findPivot(arr, first) {
  let pivot = arr[first];
  let pivotIdx = first;
  for (let i = first + 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      pivotIdx++;
    }
  }
  return pivotIdx;
}

let arr = [35, 9, 45, 8];

position2(arr);
