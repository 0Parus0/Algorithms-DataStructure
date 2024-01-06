// collectStrings
// Write a function called collectStrings which accepts an object and
// returns an array of all the values in the object that have a typeof string.

/*function collectStrings(obj) {
  let result = [];
  for (let value of Object.values(obj)) {
    // console.log(value);
    if (typeof value === "string") result.push(value);
    if (value === null) continue;
    // if you want to collect only strings that are a value in objet
    // if (typeof value === "object" && !(value instanceof Array))
    // if you want to collect all the strings even if they are in an array
    if (typeof value === "object")
      // result = result.concat(collectStrings(value));
      result = result.concat(collectStrings(value));
  }

  return result;
} */

//with helper

/*function collectStrings(obj) {
  // result that will be returned;
  const result = [];
  function recurse(newObj) {
    for (let value of Object.values(newObj)) {
      // base case
      if (typeof value === "string") result.push(value);

      // if value is null so it shouldn't throw an error;
      if (value === null) continue;

      // if you want to only collect the strings which are a direct value in an object.
      // if (typeof value === "object" && !Array.isArray(value)) recurse(value);

      // if you want to collect all the strings even if they are in an array.
      if (typeof value === "object") recurse(value);
    }
  }
  recurse(obj);
  return result;
}
*/

/*function collectStrings(obj) {
  let result = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === "string") result.push(obj[key]);
      if (typeof obj[key] === "object")
        result = result.concat(collectStrings(obj[key]));
    }
  }
  return result;
} */

function collectStrings(obj) {
  const result = [];
  function recurse(newObj) {
    for (let key in newObj) {
      if (Object.hasOwn(newObj, key)) {
        if (typeof newObj[key] === "string") result.push(newObj[key]);
        if (typeof newObj[key] === "object") recurse(newObj[key]);
      }
    }
  }
  recurse(obj);
  return result;
}
// With helper method

// function collectStrings(obj) {
//   const result = [];
//   function recurse(newObj) {
//     for (let key in newObj) {
//       if (Object.prototype.hasOwnProperty.call(newObj, key)) {
//         if (typeof newObj[key] === "string") result.push(newObj[key]);
//         if (typeof newObj[key] === "object") recurse(newObj[key]);
//       }
//     }
//   }
//   recurse(obj);
//   return result;
// }

const obj = {
  stuff: "foo",
  data: {
    val: {
      thing: {
        info: "bar",
        nothing: null,
        notDefined: undefined,
        num: 4,
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: "baz",
            someArr: ["string", "info", 3],
          },
        },
      },
    },
  },
};
console.log(typeof null);
console.log(collectStrings(obj)); // ['foo', 'bar', 'baz'])
