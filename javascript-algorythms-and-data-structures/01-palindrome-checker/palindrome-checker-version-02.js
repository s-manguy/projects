function palindrome(str) {
  //Clean the string given as argument
  str = str.toLowerCase().replace(/[\W_]/g, "");
  
  // create the reverse string
  let reverseStr = str.split("").reverse().join("");

  //compare the two strings
  for (let i=0; i < str.length; i++) {
    if ( str[i] !== reverseStr[i]) {
     return false;
    }
  }
  return true;
}



palindrome("eye");