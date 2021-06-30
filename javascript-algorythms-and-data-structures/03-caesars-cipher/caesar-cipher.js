function rot13(str) {
let originalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let rot13Letters = originalLetters.slice(13).concat(originalLetters.slice(0,13));

let strArray = str.split("");
let decodedArray = [];

for (let i = 0; i< strArray.length; i++) {
  if (rot13Letters.indexOf(strArray[i]) !== -1) {
    let index = rot13Letters.indexOf(strArray[i]);
    decodedArray.push(originalLetters[index]);
  } else {
    decodedArray.push(strArray[i]);
  }
}

  return decodedArray.join("");
}

rot13("SERR PBQR PNZC");