// nestedEvenSum
// Write a recursive function called nestedEvenSum.
// Return the sum of all even numbers in an object which may contain nested objects.

// function nestedEvenSum(obj) {
//   let sum = 0;
//   for (let key in obj) {
//     if (Object.hasOwn(obj, key)) {
//       if (typeof obj[key] === "number" && obj[key] % 2 === 0) sum += obj[key];
//       if (typeof obj[key] === "object") sum += nestedEvenSum(obj[key]);
//     }
//   }
//   return sum;
// }

function nestedEvenSum(obj) {
  let sum = 0;
  for (let value of Object.values(obj)) {
    if (value === null) continue;
    if (typeof value === "number" && value % 2 === 0) sum += value;
    if (typeof value === "object") sum += nestedEvenSum(value);
  }
  return sum;
}

const obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    nothing: null,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: "yup",
    },
  },
};

const obj2 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: "ball", ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: "car" },
};

console.log(nestedEvenSum(obj1)); // 6
console.log(nestedEvenSum(obj2)); // 10
