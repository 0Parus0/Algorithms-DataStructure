/*
1912. Design Movie Rental System
Hard
Topics
premium lock icon
Companies
Hint
You have a movie renting company consisting of n shops. You want to implement a renting system that supports searching for, booking, and returning movies. The system should also support generating a report of the currently rented movies.

Each movie is given as a 2D integer array entries where entries[i] = [shopi, moviei, pricei] indicates that there is a copy of movie moviei at shop shopi with a rental price of pricei. Each shop carries at most one copy of a movie moviei.

The system should support the following functions:

Search: Finds the cheapest 5 shops that have an unrented copy of a given movie. The shops should be sorted by price in ascending order, and in case of a tie, the one with the smaller shopi should appear first. If there are less than 5 matching shops, then all of them should be returned. If no shop has an unrented copy, then an empty list should be returned.
Rent: Rents an unrented copy of a given movie from a given shop.
Drop: Drops off a previously rented copy of a given movie at a given shop.
Report: Returns the cheapest 5 rented movies (possibly of the same movie ID) as a 2D list res where res[j] = [shopj, moviej] describes that the jth cheapest rented movie moviej was rented from the shop shopj. The movies in res should be sorted by price in ascending order, and in case of a tie, the one with the smaller shopj should appear first, and if there is still tie, the one with the smaller moviej should appear first. If there are fewer than 5 rented movies, then all of them should be returned. If no movies are currently being rented, then an empty list should be returned.
Implement the MovieRentingSystem class:

MovieRentingSystem(int n, int[][] entries) Initializes the MovieRentingSystem object with n shops and the movies in entries.
List<Integer> search(int movie) Returns a list of shops that have an unrented copy of the given movie as described above.
void rent(int shop, int movie) Rents the given movie from the given shop.
void drop(int shop, int movie) Drops off a previously rented movie at the given shop.
List<List<Integer>> report() Returns a list of cheapest rented movies as described above.
Note: The test cases will be generated such that rent will only be called if the shop has an unrented copy of the movie, and drop will only be called if the shop had previously rented out the movie.

 

Example 1:

Input
["MovieRentingSystem", "search", "rent", "rent", "report", "drop", "search"]
[[3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]], [1], [0, 1], [1, 2], [], [1, 2], [2]]
Output
[null, [1, 0, 2], null, null, [[0, 1], [1, 2]], null, [0, 1]]

Explanation
MovieRentingSystem movieRentingSystem = new MovieRentingSystem(3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]);
movieRentingSystem.search(1);  // return [1, 0, 2], Movies of ID 1 are unrented at shops 1, 0, and 2. Shop 1 is cheapest; shop 0 and 2 are the same price, so order by shop number.
movieRentingSystem.rent(0, 1); // Rent movie 1 from shop 0. Unrented movies at shop 0 are now [2,3].
movieRentingSystem.rent(1, 2); // Rent movie 2 from shop 1. Unrented movies at shop 1 are now [1].
movieRentingSystem.report();   // return [[0, 1], [1, 2]]. Movie 1 from shop 0 is cheapest, followed by movie 2 from shop 1.
movieRentingSystem.drop(1, 2); // Drop off movie 2 at shop 1. Unrented movies at shop 1 are now [1,2].
movieRentingSystem.search(2);  // return [0, 1]. Movies of ID 2 are unrented at shops 0 and 1. Shop 0 is cheapest, followed by shop 1.
 

Constraints:

1 <= n <= 3 * 105
1 <= entries.length <= 105
0 <= shopi < n
1 <= moviei, pricei <= 104
Each shop carries at most one copy of a movie moviei.
At most 105 calls in total will be made to search, rent, drop and report.
*/
class MovieRentingSystem {
  constructor(n, entries) {
    this.movieToShops = new Map();
    this.shopMovieToPrice = new Map();
    this.rentedMovies = new Set();

    for (const [shop, movie, price] of entries) {
      if (!this.movieToShops.has(movie)) {
        this.movieToShops.set(movie, []);
      }
      this.movieToShops.get(movie).push([price, shop]);

      // Using a string key for the Map and Set as in your original code
      this.shopMovieToPrice.set(`${shop}-${movie}`, price);
    }

    // Pre-sort the unrented lists for each movie
    for (const list of this.movieToShops.values()) {
      list.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
    }
  }

  search(movie) {
    if (!this.movieToShops.has(movie)) return [];

    const result = [];
    const shops = this.movieToShops.get(movie);

    for (const [price, shop] of shops) {
      if (!this.rentedMovies.has(`${shop}-${movie}`)) {
        result.push(shop);
        if (result.length === 5) break;
      }
    }
    return result;
  }

  rent(shop, movie) {
    this.rentedMovies.add(`${shop}-${movie}`);
  }

  drop(shop, movie) {
    this.rentedMovies.delete(`${shop}-${movie}`);
  }

  report() {
    const rentedList = [];

    // Collect all currently rented movies
    for (const key of this.rentedMovies) {
      const [shop, movie] = key.split("-").map(Number);
      const price = this.shopMovieToPrice.get(key);
      rentedList.push([price, shop, movie]);
    }

    // Sort by price, then shop, then movie
    rentedList.sort((a, b) => {
      if (a[0] !== b[0]) return a[0] - b[0]; // price
      if (a[1] !== b[1]) return a[1] - b[1]; // shop
      return a[2] - b[2]; // movie
    });

    // Return top 5 results as [shop, movie]
    return rentedList.slice(0, 5).map((item) => [item[1], item[2]]);
  }
}

// ========================================================================
// 1. SECTION NAME
// ========================================================================

class Heap {
  constructor(compare) {
    this.nodes = [];
    this.compare = compare;
  }
  push(node) {
    this.nodes.push(node);
    this._bubbleUp(this.nodes.length - 1);
  }
  pop() {
    if (this.nodes.length === 0) return null;
    const top = this.nodes[0];
    const last = this.nodes.pop();
    if (this.nodes.length > 0) {
      this.nodes[0] = last;
      this._bubbleDown(0);
    }
    return top;
  }
  _bubbleUp(idx) {
    while (idx > 0) {
      let p = (idx - 1) >> 1;
      if (this.compare(this.nodes[idx], this.nodes[p]) < 0) {
        [this.nodes[idx], this.nodes[p]] = [this.nodes[p], this.nodes[idx]];
        idx = p;
      } else break;
    }
  }
  _bubbleDown(idx) {
    while (true) {
      let l = idx * 2 + 1,
        r = idx * 2 + 2,
        s = idx;
      if (
        l < this.nodes.length &&
        this.compare(this.nodes[l], this.nodes[s]) < 0
      )
        s = l;
      if (
        r < this.nodes.length &&
        this.compare(this.nodes[r], this.nodes[s]) < 0
      )
        s = r;
      if (s !== idx) {
        [this.nodes[idx], this.nodes[s]] = [this.nodes[s], this.nodes[idx]];
        idx = s;
      } else break;
    }
  }
}

class MovieRentingSystem {
  /**
   * @param {number} n
   * @param {number[][]} entries
   */
  constructor(n, entries) {
    this.rentedStatus = new Map(); // hash -> boolean (true: rented)
    this.priceMap = new Map(); // hash -> price
    this.unrentedHeaps = new Map(); // movieID -> MinHeap

    // Global heap for report(): price asc, shop asc, movie asc
    this.rentedHeap = new Heap((a, b) => {
      if (a.price !== b.price) return a.price - b.price;
      if (a.shop !== b.shop) return a.shop - b.shop;
      return a.movie - b.movie;
    });

    for (const [shop, movie, price] of entries) {
      const hash = shop * 10001 + movie;
      this.priceMap.set(hash, price);
      this.rentedStatus.set(hash, false);

      if (!this.unrentedHeaps.has(movie)) {
        this.unrentedHeaps.set(
          movie,
          new Heap((a, b) => {
            if (a.price !== b.price) return a.price - b.price;
            return a.shop - b.shop;
          }),
        );
      }
      this.unrentedHeaps.get(movie).push({ price, shop });
    }
  }

  /**
   * @param {number} movie
   * @return {number[]}
   */
  search(movie) {
    if (!this.unrentedHeaps.has(movie)) return [];
    const heap = this.unrentedHeaps.get(movie);
    const res = [],
      temp = [],
      seen = new Set();

    while (res.length < 5 && heap.nodes.length > 0) {
      const top = heap.pop();
      const hash = top.shop * 10001 + movie;

      // Discard if rented or if we've already found a cheaper entry for this shop
      if (this.rentedStatus.get(hash) || seen.has(top.shop)) continue;

      seen.add(top.shop);
      res.push(top.shop);
      temp.push(top);
    }

    // Put valid unique entries back for the next search
    for (const t of temp) heap.push(t);
    return res;
  }

  /**
   * @param {number} shop
   * @param {number} movie
   */
  rent(shop, movie) {
    const hash = shop * 10001 + movie;
    this.rentedStatus.set(hash, true);
    const price = this.priceMap.get(hash);
    this.rentedHeap.push({ price, shop, movie });
  }

  /**
   * @param {number} shop
   * @param {number} movie
   */
  drop(shop, movie) {
    const hash = shop * 10001 + movie;
    this.rentedStatus.set(hash, false);
    const price = this.priceMap.get(hash);
    this.unrentedHeaps.get(movie).push({ price, shop });
  }

  /**
   * @return {number[][]}
   */
  report() {
    const res = [],
      temp = [],
      seen = new Set();

    while (res.length < 5 && this.rentedHeap.nodes.length > 0) {
      const top = this.rentedHeap.pop();
      const hash = top.shop * 10001 + top.movie;
      const pairKey = `${top.shop}-${top.movie}`;

      // Discard if unrented or if we've already found a cheaper version of this rented pair
      if (!this.rentedStatus.get(hash) || seen.has(pairKey)) continue;

      seen.add(pairKey);
      res.push([top.shop, top.movie]);
      temp.push(top);
    }

    // Put valid unique entries back for the next report
    for (const t of temp) this.rentedHeap.push(t);
    return res;
  }
}
