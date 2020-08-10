function simpleHash(key, arrayLen) {
  let total = 0;
  for(let char of key) {
    let value = char.charCodeAt(0) - 96;
    total = (total + value) % arrayLen;
  }
  // total = total % arrayLen;
  return total;
}


// console.log(simpleHash('simple', 10)); // 4
// console.log(simpleHash('feeble', 10)); // 5
// console.log(simpleHash('pimple', 10)); // 1
// console.log(simpleHash('dimple', 10)); // 9

function hash(key, arrayLen) {
  let total = 0;
  let weirdPrime = 31;
  for(let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i];
    let value = char.charCodeAt(0) - 96;
    total = (total * weirdPrime + value) % arrayLen;
  }
  return total;
}


// console.log(hash('simple', 13)); 
// console.log(hash('feeble', 13)); 
// console.log(hash('pimple', 13)); 
// console.log(hash('dimple', 13)); 


class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    let weirdPrime = 31;
    for(let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * weirdPrime + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, val) {
    let idx = this._hash(key);
    if(!this.keyMap[idx]){
      this.keyMap[idx] = [];
    }
    this.keyMap[idx].push([key, val]);
    return this.keyMap;
  }

  get(key) {
    let idx = this._hash(key);
    if(this.keyMap[idx]){
      for(let i = 0; i < this.keyMap[idx].length; i++) {
        if(this.keyMap[idx][i][0] === key){
          return this.keyMap[idx][i][1];
        }
      }
    }
    return null;
  }

  keys() {
    let keysArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if(this.keyMap[i]) {
        for ( let j = 0; j < this.keyMap[i].length; j++) {
          if(!keysArr.includes(this.keyMap[i][j][0]))
          keysArr.push(this.keyMap[i][j][0]);
        }
      }
    }
    return keysArr;
  }

  values() {
    let valuesArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if(this.keyMap[i]) {
        for ( let j = 0; j < this.keyMap[i].length; j++) {
          if(!valuesArr.includes(this.keyMap[i][j][1]))
          valuesArr.push(this.keyMap[i][j][1]);
        }
      }
    }
    return valuesArr;
  }
  
}

let ht = new HashTable(11);
ht.set('maroon', '#800000');
ht.set('yellow', '#ffff00');
ht.set('olive', '#808000');
ht.set('salmon', '#fa8072');
ht.set('lightcoral', '#f08080');
ht.set('mediumvioletred', '#c71585');
ht.set('plum', '#dda0dd');
ht.set('purple', '#dda0dd');
ht.set('violet', '#dda0dd');
ht.set('are we done', 'yes');

// console.log(ht.get('are we done'));
// console.log(ht.values());
// console.log(ht.keys());
// console.log(ht.keyMap)

ht.keys().forEach(key => console.log(ht.get(key)));

// const empArr = new Array(23);  // returns empty array with 23 empty slots
// console.log(empArr);
// const emptyArr = Array.from({length: 23}); // returns array with 23 slots that have value as undefined
// console.log(emptyArr);


