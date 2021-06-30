function palindrome(str) {
  //Clean the string given as argument
  let originalStr = str.replace(/[\W_]/g, "").toLowerCase();
  
  // create the reverse string
  let reverseStr = originalStr.split("").reverse().join("");

//compare the two strings
  return originalStr===reverseStr;
}


palindrome("eye");