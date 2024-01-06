function buildPrefixTable(pattern) {
  let prefixTable = [0];
  let i = 1;
  let j = 0;
  while (i < pattern.length) {
    if (pattern[i] === pattern[j]) {
      j++;
      prefixTable[i] = j;
      i++;
    } else if (j > 0) {
      j = prefixTable[j - 1];
    } else {
      prefixTable[i] = 0;
      i++;
    }
  }
  return prefixTable;
}
// console.log(buildPrefixTable("ddddabcddddbc"));

function kmpSearch(string, pattern) {
  // edge case: pattern='' return 0;
  if (pattern === "") return 0;
  const prefixTable = buildPrefixTable(string);

  let i = 0;
  let j = 0;
  while (i < string.length && j < pattern.length) {
    if (string[i] === pattern[j]) {
      i++;
      j++;
    } else if (j > 0) {
      j = prefixTable[j - 1];
    } else {
      i++;
    }
  }
  return j === pattern.length ? i - j : -1;
}

console.log(kmpSearch("abcabcbcab", "abc"));
function buildPatternTable(word) {
  const patternTable = [0];
  let prefixIndex = 0;
  let suffixIndex = 1;

  while (suffixIndex < word.length) {
    if (word[prefixIndex] === word[suffixIndex]) {
      patternTable[suffixIndex] = prefixIndex + 1;
      suffixIndex++;
      prefixIndex++;
    } else if (prefixIndex === 0) {
      patternTable[suffixIndex] = 0;
      suffixIndex++;
    } else {
      prefixIndex = patternTable[prefixIndex - 1];
    }
  }
  return patternTable;
}

// console.log(buildPatternTable('abcdabca'))

function knuthMorrisPratt(text, word) {
  if (!word.length) return 0;
  let count = 0;
  let textIndex = 0;
  let wordIndex = 0;
  const patternTable = buildPatternTable(word);

  while (textIndex < text.length) {
    if (text[textIndex] === word[wordIndex]) {
      // we have found a match.
      if (wordIndex === word.length - 1) {
        count++;
      }
      wordIndex++;
      textIndex++;
    } else if (wordIndex > 0) {
      wordIndex = patternTable[wordIndex - 1];
    } else {
      // wordIndex = 0;
      console.log({ wordIndex });
      textIndex++;
    }
  }
  return count;
}

console.log(knuthMorrisPratt("abcabcbcab", "abc"));
