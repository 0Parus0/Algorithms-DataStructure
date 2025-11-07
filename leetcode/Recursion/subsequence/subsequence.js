function subSeq1(arr) {
  let ans = [];

  function generate(arr, n = arr.length, index = 0, temp = []) {
    if (index === n) {
      ans.push([...temp]);
      return;
    }

    generate(arr, n, index + 1, temp);
    temp.push(arr[index]);
    generate(arr, n, index + 1, temp);
    temp.pop();
  }
  generate(arr);
  return ans;
}

function subSeq2(arr) {
  let ans = [];
  let n = arr.length;

  function generate(index = 0, temp = []) {
    if (index === n) {
      ans.push([...temp]);
      return;
    }

    // Skip current element
    generate(index + 1, temp);

    // Include current element
    temp.push(arr[index]);
    generate(index + 1, temp);
    temp.pop(); // Backtrack
  }

  generate();
  return ans;
}

function subSeq(arr, index = 0, temp = [], ans = []) {
  if (index === arr.length) {
    ans.push([...temp]);
    return ans;
  }

  // Skip current element
  subSeq(arr, index + 1, temp, ans);

  // Include current element
  temp.push(arr[index]);
  subSeq(arr, index + 1, temp, ans);
  temp.pop(); // Backtrack

  return ans;
}

console.log(subSeq([1, 2, 3]));
