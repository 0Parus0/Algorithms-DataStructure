function buildPatternTable (word) {
  const patternTable = [0];
  let prefixIndex = 0;
  let suffixIndex = 1;

  while(suffixIndex < word.length) {
    if(word[prefixIndex] === word[suffixIndex]) {
      patternTable[suffixIndex] = prefixIndex + 1;
      suffixIndex ++;
      prefixIndex ++;
    } else if( prefixIndex === 0) {
      patternTable[suffixIndex] = 0;
      suffixIndex ++;
    } else {
      prefixIndex = patternTable[prefixIndex - 1];
    }
  }
  return patternTable;
}

// console.log(buildPatternTable('abcdabca'))

function knuthMorrisPratt(text, word) {
  if(!word.length) return 0;
  let count = 0;
  let textIndex = 0;
  let wordIndex = 0;
  const patternTable = buildPatternTable(word);

  while(textIndex < text.length) {
    if(text[textIndex] === word[wordIndex]) {
      // we have found a match.
      if(wordIndex === word.length - 1) {
        count++;
      }
      wordIndex ++;
      textIndex ++;
    }else if(wordIndex > 0) {
      wordIndex = patternTable[wordIndex - 1];
    } else {
      wordIndex = 0;
      textIndex ++;
    }
  }
  return count;
}

console.log(knuthMorrisPratt('abcabcbcab', 'abc'))
