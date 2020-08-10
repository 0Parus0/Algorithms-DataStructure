// class HashTable {
//   constructor(size) {
//     this.data = new Array(size);

//   }

//   _hash(key) {
//     let hash = 0;
//     for (let i = 0; i < key.length; i++) {
//       hash = (hash + key.charCodeAt(i) * i) % this.data.length
//     }
//     return hash;
//   }
//   set(key, value) {
//     let address = this._hash(key);
//     if(!this.data[address]) {
//       this.data[address] = [];
//     } 
//     this.data[address].push([key, value]);
//     return this.data;
//   }

//   get(key) {
//     let address = this._hash(key);
//     const currentBucket = this.data[address];
//     if(currentBucket) {
//       for(let i = 0; i < currentBucket.length; i++) {
//         if(currentBucket[i][0] === key) {
//           return currentBucket[i][1]
//         }
//       }
//     }
//   }
// }

// const myHashTable = new HashTable(50);

// console.log(myHashTable.set('grapes', 10000));
// console.log(myHashTable.set('apples', 54));
// console.log(myHashTable.get('grapes'));

class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }

  _hash(key) {
    let hash = 0;
    for(let i = 0; i < key.length; i++ ){
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }
  set(key, value) {
    let address = this._hash(key);
    if(!this.data[address]){
      this.data[address] = []; 
    } 
    this.data[address].push([key, value]);
    return this.data;
  }

  get(key) {
    let address = this._hash(key);
    const currentBucket =  this.data[address];
    if(currentBucket) {
      for(let i = 0; i < currentBucket.length; i++){
        if(currentBucket[i][0] === key) return currentBucket;
      }
    }
    return undefined;
  }

  keys() {
    const keysArray = [];
    for(let i = 0; i < this.data.length; i++){
      if(this.data[i] && this.data[i].length > 0) {
        for(let j = 0; j < this.data[i].length; j++)
        keysArray.push( this.data[i][0][0]);
      }
    }
    return keysArray;
  }

}

const myHashTable = new HashTable(2);
myHashTable.set('grapes', 10000);
myHashTable.set('grapess', 10000);
myHashTable.set('grapessd', 10000);
myHashTable.set('apple', 10000);
myHashTable.set('banana', 10000);
// console.log(myHashTable.data)
// myHashTable.get('grapes');
// console.log(myHashTable.keys()); //(5) ["apple", "grapes", "grapes", "grapes", "grapes"]

/* (2) [empty, Array(3)]1: Array(3)0: (2) ["grapes", 10000]1: (2) ["grapess", 10000]2: (2) ["grapessd", 10000]length: 3__proto__: Array(0)length: 2__proto__: Array(0) */

// function firstRecChar(arr) {
//   for(let i = 0; i < arr.length; i++) {
//     for(let j = i + 1; j < arr.length; j++) {
//       if(arr[i] === arr[j])return arr[i];
//     }
//   }
//   return false;
// }



function firstRecChar2(arr) {
  let map = {};
  for(let i = 0; i < arr.length; i++){
    if(map[arr[i]] !== undefined)return arr[i];
    map[arr[i]] = i;
  }
  return false;
}

console.log(firstRecChar2([2,5,1,2,3,5,1,2,4]))
// console.log(firstRecChar([7,5,1,2,3,8,1,2,4]))
// console.log(firstRecChar([2,3,4,5]))