/*
You are given an array ‘pages’ of integer numbers. In this array, the ‘pages[i]’ represents the number of pages in the ‘i-th’ book. There are ‘m’ number of students, and the task is to allocate all the books to the students. 

Allocate books in a way such that:

Each student gets at least one book.
Each book should be allocated to a student.
Book allocation should be in a contiguous manner.
 
You have to allocate the books to ‘m’ students such that the maximum number of pages assigned to a student is minimum.

Try to solve this problem on your own before moving on to further discussion here.

Let’s understand the problem statement through an example.

Example
Input
Number of books = 4 and Number of students = 2

pages[] = { 10,20,30,40}

Output
 60

Explanation
All possible ways of book allocation are shown in the below figure-

The minimum of the maximum number of pages assigned = min{90,70,60} = 60. Hence, the required answer is 60.

Analysis
We have to minimize the value of the maximum number of pages assigned to a student during the allocation. 
 
If the maximum number of pages assigned to a student in a book allocation is a number x, then the number of pages assigned to every student is less than or equal to x.
 
We have to assign at least one book to every student, so there can’t be any allocation such that a student gets no books assigned.
 
While allocating the books, no book should be left out. In other words, we have to allocate every book given.
 
Allocate in a contiguous manner. Let's say; for example, you have to allocate three books to a student from pages[] = { 10,20,30,40}. Then, the possible allocations can be - {10,20,30} and {20,30,40}. You can’t allocate {10,30,40} as it is not contiguous.
Brute force Approach
Algorithm
Let N be the number of books and M the number of students.

 

In the case of M > N:

Simply return -1 as the number of students exceeds the number of books available. According to the given constraints, giving at least one book to each student is impossible.
 

Let’s see the algorithm for all other cases where M<=N:

For all of these cases, we will try to find all possible values of the number of pages that can be assigned to a student.
 
The minimum value should be greater than 0 (In this problem, you must assign each student at least one book, so the number of pages can't be zero).
 
The maximum number of pages will be the sum of the number of pages in all books. (This will happen when you assign all the books to one student).
 
The range of the maximum number of pages we obtained is - 
(0, sum of all the values of pages array]. Open interval on 0 because at least one book needs to be assigned to every student. So, we get the interval [1, sum of pages array].
 
Steps of Algorithm
Iterate over all values of the number of pages(say x) ranging from x = 1 to x = sum of elements in the pages array.
 
Check if it is possible to allocate the books such that the value of the number of pages assigned to any student is less than or equal to x in each iteration.
 
If the maximum number of pages equals x, then return x as the answer. We don’t need to iterate further because the value of x will increase after this. But, we are interested in finding the minimum value of the maximum number of pages that can be allocated.
 

How to check if it is possible to allocate the books such that the maximum number of pages assigned to any student is x?

Initialize the count of students with 1.
 
Keep allocating the books to a student until the sum of the pages assigned is less than x.
 
If at any point the number of pages assigned to a student exceeds x, then allocate the current book to the next student and increment the count of students.
 
If the count for the number of students exceeds M, then return false.
 
At the end, if the count of students is equal to M, return true. 
*/
function bookAllocation(booksArr, numStudents) {
  if (booksArr.length < numStudents) return -1;
  const sum = booksArr.reduce((total, pages) => total + pages, 0);
  let start = 0,
    end = sum,
    ans = -1;
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    if (possibleSolution(booksArr, numStudents, mid)) {
      ans = mid;
      end = mid - 1;
    } else start = mid + 1;
  }
  return ans;
}

function possibleSolution(booksArr, numStudents, mid) {
  let studentCount = 1;
  let pagesSum = 0;
  for (let i = 0; i < booksArr.length; i++) {
    if (booksArr[i] + pagesSum <= mid) {
      pagesSum += booksArr[i];
    } else {
      studentCount++;
      if (studentCount > numStudents || booksArr[i] > mid) return false;
      //   pagesSum = 0;
      //   pagesSum += booksArr[i];
      pagesSum = booksArr[i];
    }
  }
  return true;
}
let books = [25, 46, 28, 49, 24];
let students = 5;
console.log(bookAllocation(books, students));
