function printSum(arr) {
  let result = [];

  // recursion helper method
  function recurse(temp = [], index = 0, sum = 0) {
    // base condition
    if (index === arr.length) {
      console.log(sum, [...temp]);
      result.push([...temp]);
      return;
    }
    // Not included
    recurse(temp, index + 1, sum);

    // Included
    // to tell which of the arr element has been used to get the sum
    temp.push(arr[index]);
    recurse(temp, index + 1, sum + arr[index]);
    temp.pop();
  }
  recurse();
  return result;
}

console.log(printSum([1, 2, 3, 4]));
