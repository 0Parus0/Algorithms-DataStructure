function collectOddValues(arr) {
  let result = [];

  function recursive(inpArr) {
    if (inpArr.length === 0) return;

    if (inpArr[0] % 2 !== 0) {
      result.push(inpArr[0]);
    }

    recursive(inpArr.slice(1));
  }
  recursive(arr);
  return result;
}

// console.log(collectOddValues([3, 5, 6, 7, 8, 10, 13]));

function collectOddValuesPR(arr) {
  let newArr = [];
  if (arr.length === 0) return newArr;

  if (arr[0] % 2 !== 0) {
    newArr.push(arr[0]);
  }

  newArr = newArr.concat(collectOddValuesPR(arr.slice(1)));
  return newArr;
}

// console.log(collectOddValuesPR([3, 5, 6, 7, 8, 10, 13]));
