
 const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']


/**
 * ****************
 * Binary Search Pseudo Code:
 * This function accepts a sorted array and a value
 * Create a start/left pointer at the start of the array, and a end/right pointer at the end of the array
 * While the left pointer comes before the right pointer
 *  * Create a pointer in the middle
 *  * If you find the value you want, return the index
 *  * If the value is too small, move the left pointer up
 *  * If the value is too big, move the right pointer down
 * If you never find the value, return -1
 * ****************
*/

// function binarySearch(arr, el) {

//   let start = 0;
//   let end = arr.length - 1;
//   let middle = Math.floor((start + end ) / 2);

//   while ( arr[middle] !== el && start <= end) {
//     if(el < arr[middle]){
//       end = middle - 1;
//     } else {
//       start = middle + 1;
//     }
//     middle = Math.floor((start + end ) / 2);

//   }
//   if(arr[middle] === el) return middle;
//   return -1;
// }



function binarySearch(arr, el) {

  let start = 0;
  let end = arr.length - 1;
  let middle = Math.floor((start + end ) / 2);

  while (start <= end) {
    if(el === arr[middle]) return middle;
    if(el < arr[middle]){
      end = middle - 1;
    } else {
      start = middle + 1;
    }
    middle = Math.floor((start + end ) / 2);

  }
  return -1;
}


console.log(binarySearch(states, 'Minnesota'))
console.log(binarySearch([2, 5, 6, 9, 13, 15, 28,30 ],30));