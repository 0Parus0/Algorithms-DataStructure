/*
2353. Design a Food Rating System
Medium
Topics
premium lock icon
Companies
Hint
Design a food rating system that can do the following:

Modify the rating of a food item listed in the system.
Return the highest-rated food item for a type of cuisine in the system.
Implement the FoodRatings class:

FoodRatings(String[] foods, String[] cuisines, int[] ratings) Initializes the system. The food items are described by foods, cuisines and ratings, all of which have a length of n.
foods[i] is the name of the ith food,
cuisines[i] is the type of cuisine of the ith food, and
ratings[i] is the initial rating of the ith food.
void changeRating(String food, int newRating) Changes the rating of the food item with the name food.
String highestRated(String cuisine) Returns the name of the food item that has the highest rating for the given type of cuisine. If there is a tie, return the item with the lexicographically smaller name.
Note that a string x is lexicographically smaller than string y if x comes before y in dictionary order, that is, either x is a prefix of y, or if i is the first position such that x[i] != y[i], then x[i] comes before y[i] in alphabetic order.

 

Example 1:

Input
["FoodRatings", "highestRated", "highestRated", "changeRating", "highestRated", "changeRating", "highestRated"]
[[["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]], ["korean"], ["japanese"], ["sushi", 16], ["japanese"], ["ramen", 16], ["japanese"]]
Output
[null, "kimchi", "ramen", null, "sushi", null, "ramen"]

Explanation
FoodRatings foodRatings = new FoodRatings(["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]);
foodRatings.highestRated("korean"); // return "kimchi"
                                    // "kimchi" is the highest rated korean food with a rating of 9.
foodRatings.highestRated("japanese"); // return "ramen"
                                      // "ramen" is the highest rated japanese food with a rating of 14.
foodRatings.changeRating("sushi", 16); // "sushi" now has a rating of 16.
foodRatings.highestRated("japanese"); // return "sushi"
                                      // "sushi" is the highest rated japanese food with a rating of 16.
foodRatings.changeRating("ramen", 16); // "ramen" now has a rating of 16.
foodRatings.highestRated("japanese"); // return "ramen"
                                      // Both "sushi" and "ramen" have a rating of 16.
                                      // However, "ramen" is lexicographically smaller than "sushi".
 

Constraints:

1 <= n <= 2 * 104
n == foods.length == cuisines.length == ratings.length
1 <= foods[i].length, cuisines[i].length <= 10
foods[i], cuisines[i] consist of lowercase English letters.
1 <= ratings[i] <= 108
All the strings in foods are distinct.
food will be the name of a food item in the system across all calls to changeRating.
cuisine will be a type of cuisine of at least one food item in the system across all calls to highestRated.
At most 2 * 104 calls in total will be made to changeRating and highestRated.
*/
class FoodRatings {
  /**
   * @param {string[]} foods
   * @param {string[]} cuisines
   * @param {number[]} ratings
   */
  constructor(foods, cuisines, ratings) {
    this.foodInfo = new Map(); // food -> { rating, cuisine }
    this.cuisineHeaps = new Map(); // cuisine -> MaxHeap

    for (let i = 0; i < foods.length; i++) {
      const food = foods[i];
      const cuisine = cuisines[i];
      const rating = ratings[i];

      this.foodInfo.set(food, { rating, cuisine });

      if (!this.cuisineHeaps.has(cuisine)) {
        this.cuisineHeaps.set(cuisine, new PriorityQueue());
      }
      this.cuisineHeaps.get(cuisine).push({ rating, food });
    }
  }

  /**
   * @param {string} food
   * @param {number} newRating
   * @return {void}
   */
  changeRating(food, newRating) {
    const info = this.foodInfo.get(food);
    info.rating = newRating;
    // Push new version to heap. Old version stays but is ignored later.
    this.cuisineHeaps.get(info.cuisine).push({ rating: newRating, food });
  }

  /**
   * @param {string} cuisine
   * @return {string}
   */
  highestRated(cuisine) {
    const heap = this.cuisineHeaps.get(cuisine);

    // Remove stale entries from the top
    while (true) {
      const top = heap.peek();
      const currentRating = this.foodInfo.get(top.food).rating;

      if (top.rating === currentRating) {
        return top.food;
      }
      heap.pop(); // Entry is stale, remove it
    }
  }
}

/**
 * Basic Priority Queue implementation
 */
class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  // Custom comparator for this problem
  _compare(a, b) {
    if (a.rating !== b.rating) {
      return b.rating - a.rating; // Higher rating first
    }
    return a.food < b.food ? -1 : 1; // Lexicographical smaller name first
  }

  push(val) {
    this.heap.push(val);
    this._bubbleUp();
  }

  pop() {
    if (this.size() === 0) return null;
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.size() > 0) {
      this.heap[0] = last;
      this._bubbleDown();
    }
    return top;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  _bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this._compare(this.heap[index], this.heap[parent]) >= 0) break;
      [this.heap[index], this.heap[parent]] = [
        this.heap[parent],
        this.heap[index],
      ];
      index = parent;
    }
  }

  _bubbleDown() {
    let index = 0;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (
        left < this.heap.length &&
        this._compare(this.heap[left], this.heap[smallest]) < 0
      )
        smallest = left;
      if (
        right < this.heap.length &&
        this._compare(this.heap[right], this.heap[smallest]) < 0
      )
        smallest = right;
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}
