'use strict';

const scores = [90, 30, 20, 75, 85, 95, 0, 55, 60, 40];

const total = scores.reduce((acc, curr) => {
  // console.log(acc, curr);
  return acc + curr
}, 0);

const minMax = scores.reduce((acc, score) => {
  // console.log(acc, score);
  return [Math.min(acc[0], score), Math.max(acc[1], score)]
}, [100, 0]);

// console.log(minMax)

const students = [
  {
    userId: 'stevenh',
    name: 'Steven',
    passFail: true
  },
  {
    userId: 'debbw',
    name: 'Debbie',
    passFail: true
  },
  {
    userId: 'maxv',
    name: 'Max',
    passFail: true
  }
]

const studentObj = students.reduce(function(acc, student){
  // console.log(acc);
  // return {...acc, [student.userId] : student}
  // console.log(student);
  return {...acc, [student.userId]: student};
}, {})

console.log(studentObj)