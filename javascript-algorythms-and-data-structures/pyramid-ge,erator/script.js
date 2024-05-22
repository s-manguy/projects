
// let character;
// let character = "Hello";
// let character = 'Hello';
// const character = "Hello";
const character = "#"; // changed to !
// console.log(character);
// character = "World";
// console.log(character);
// let secondCharacter;
// secondCharacter = "Test";
// secondCharacter = character;
// console.log(secondCharacter);
// let count = 8;
const count = 8; // changed to 10
// console.log(count + 1);
// let rows = ["Naomi", "Quincy", "CamperChan"];
// console.log(rows[0]);
// rows[2] = 10;
// rows[rows.length - 1];
// rows.push("freeCodeCamp");
// let pushed = rows.push("freeCodeCamp");
// console.log(pushed); // push() return the new length of the array
// let popped = rows.pop();
// console.log(popped); // pop() return the removed value from the array
// console.log(rows);
// let rows = [];
const rows = [];
let inverted = true; // changed to false

// function padRow(name) {
//     const test = "Testing";
//     // return "Hello!";
//     // return name;
//     return character + name; 
// }
// console.log(test);
// padRow();
// const call = padRow("Sandrine");
// function padRow() {
//     const test = "Testing";
//     return test; 
// }
// const call = padRow();
// console.log(call);
function padRow(rowNumber, rowCount ) {
    // return character.repeat(rowNumber);
    // return (" " + character + " ").repeat(rowNumber);
    // return (" ".repeat(rowCount - rowNumber) + character + " ".repeat(rowCount - rowNumber)).repeat(rowNumber);
    return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber -1) + " ".repeat(rowCount - rowNumber);
}

// TODO: use a different type of loop
/*
// for (iterator; condition; iteration) {
//     logic;
// }
// for (let i = 0; i < count; i = i + 1) {
// for (let i = 0; i < count; i += 1) {
// for (let i = 0; i < count; i++) {
// for (let i = 1; i < count; i++) {
for (let i = 1; i <= count; i++) {
    // console.log(i);
    // rows.push(i);
    // rows.push(character);
    // rows.push(character.repeat(i + 1));
    // rows.push(padRow(i + 1, count));
    rows.push(padRow(i, count));
}
*/

for (let i = 1; i <= count; i++) {
    if(inverted) {
        rows.unshift(padRow(i, count));
    } else {
        rows.push(padRow(i, count));
    }
}

/*
// if (condition) {
//     logic
// }
if (true) {
    console.log("Condition is true");
} // print true

 if (false) {
    console.log("Condition is true");
}  // print nothing

if ("false") {
    console.log("Condition is true");
} // print true

if ("") {
    console.log("Condition is true");
} // print nothing

if (condition) {
    logic
  } else {
    logic
  }
*/


  

// let continueLoop = false;
// let continueLoop = true; // removed because of unused declaration after having changed the while loop condition
// let done = 0; // removed because of unused declaration after having changed the while loop logic and condition

/*
// while (condition) {
//     logic;
// }
// while (continueLoop) {
//     done++;
//     rows.push(padRow(done, count));

//     if(done === count) {
//         continueLoop = false;
//     }
// }
// while (done !== count) {
// while (done <= count) {
//     done++;
//     rows.push(padRow(done, count));
// }
while (rows.length < count) {
    rows.push(padRow(rows.length + 1, count));
}
*/
 
/*
// Reversed pyramid
// for (let i = count; i > 0; i = i - 1) {
// for (let i = count; i > 0; i -= 1) {
for (let i = count; i > 0; i--) {
    rows.push(padRow(i, count)); 
}
*/

/*
// shift() and unshift() Array methods
const numbers = [1, 2, 3];
const shifted = numbers.shift(); // returns the removed value;
console.log(shifted);
const unshifted = numbers.unshift(5); // unshift return the new array langth.
console.log(unshifted);
console.log(numbers);
*/

let result = "";

// for (const value of iterable) {
    
// }
for (const row of rows) {
    result = result + "\n" + row;
}

console.log(result);

  