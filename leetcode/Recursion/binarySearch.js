function binarysearch(arr, start = 0, end = arr.length - 1, X) {
  if (start > end) return false;
  let mid = start + (end - start) / 2;
  if (arr[mid] === X) return true;
  else if (arr[mid] < X) return binarysearch(arr, mid + 1, end, X);
  else return binarysearch(arr, start, mid - 1, X);
}
let arr = [3, 6, 8, 10, 15, 18, 20];
console.log(binarysearch(arr, 0, arr.length - 1, 1));
