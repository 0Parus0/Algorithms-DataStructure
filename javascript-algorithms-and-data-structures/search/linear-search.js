/**
 * Linear Search Pseudo code For Arrays
 * This function accepts an array and a value
 * Loop through the array and check if the current array element is equal to value
 * If it is, return the index at which the element is found
 * If the value is never found, return -1
 */


 function searchArray(arr, el) {
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === el) return i;
  }
  return -1;
 }

 const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']



 console.log(searchArray(states,'South Dakota'));