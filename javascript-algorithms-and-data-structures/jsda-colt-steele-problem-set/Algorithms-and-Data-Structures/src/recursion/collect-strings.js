// collectStrings
// Write a function called collectStrings which accepts an object and
// returns an array of all the values in the object that have a typeof string.

/*function collectStrings (obj) {
  let resultArr = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'string') resultArr.push(obj[key]);
      if (typeof obj[key] === 'object') resultArr = resultArr.concat(collectStrings(obj[key]));
    }
  }

  return resultArr;
}
*/

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

const obj = {
  stuff: "foo",
  data: {
    val: {
      thing: {
        info: "bar",
        nothing: null,
        someArr: ["some", "one", "two", 1, 2],
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: "baz",
          },
        },
      },
    },
  },
};

console.log(collectStrings(obj)); // ['foo', 'bar', 'baz'])
