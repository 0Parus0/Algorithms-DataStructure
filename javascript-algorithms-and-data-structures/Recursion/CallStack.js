/**
|--------------------------------------------------
| Call Stack => when functions are invoked they are place on top of the call stack
|--------------------------------------------------
*/

function takeShower() {
  return 'Showering!';
};

function eatBreakfast() {
  let meal = cookFood();
  return `Eating ${meal}`;
};

function cookFood() {
  const items = [ 'Oatmeal', 'Eggs', 'Protein Shake']
  return items[Math.floor(Math.random() * items.length)];
};

function wakeUp() {
  takeShower();
  eatBreakfast();
  console.log('Ok ready to go to work!');
};

wakeUp()