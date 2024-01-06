/* 
    How to store 2 numbers in one position?
    We need a range between which the numbers are going to lie between the given range,
    the occurrence is going to be one number and the number itself is going to be one 
    e.g  num = 222222 ==> here occurrence is 6 and number itself is 2, the given range is 1 - 99
    we can store it as multiply the occurrence with 100 because the numbers are only going to between 1 - 99 
    then add the num 2 to that product
    occurrence * bigger number + number
    6 * 100 + 2 = 602
    when we have to take the number and occurrence out
    divide the number with bigger chosen number
      602 / 100 = 6 that's the occurrence,
    take the modulus of number with bigger chosen number to get the number out
    602 % 100 = 2
    that's how we can store two numbers in one variable position
    let num = 1212121212;
    let multiplier = 100;
    let occurrence = 5;
    let position = 5 * 100 + 12;

    to get num out 
    position % multiplier
    to get occurrence 
    position / multiplier
    */
