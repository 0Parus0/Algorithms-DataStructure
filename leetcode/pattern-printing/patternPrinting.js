/*
    1
   21
  321
 4321
54321
*/

let pattern = "";

for (let row = 1; row <= 5; row++) {
  let space = "";
  for (let col = 1; col <= 5 - row; col++) {
    space += " ";
  }
  for (let col = 1; col <= row; col++) {
    space += col;
  }
  pattern += space;
  pattern += "\n";
}

// console.log(pattern);

let pattern2 = "";
for (let row = 1; row <= 5; row++) {
  let space = "";
  for (let col = 1; col <= 5 - row; col++) {
    space += "   "; // 3 spaces
  }

  let stars = 2 * row - 1;
  for (let star = 1; star <= stars; star++) {
    space += " * "; // space * space
  }

  pattern2 += space;
  pattern2 += "\n";
}

console.log(pattern2);
