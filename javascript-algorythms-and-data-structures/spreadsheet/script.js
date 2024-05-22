const infixToFunction = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
};

const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));// do not forget to use [] when accessing a property through a variable name

const highPrecedence = (str) => {
    const regex = /([\d.]+)([*\/])([\d.]+)/;
    const str2 = infixEval(str, regex);
    return str2 === str ? str : highPrecedence(str2);
};

const sum = (nums) => nums.reduce((acc, num) => acc + num, 0);
const isEven = (num) => num % 2 === 0 ? true : false;
const average = (nums) => sum(nums) / nums.length;
const median = (nums) => {
    const sorted = nums.slice().sort((a, b) => a - b);
    const length = sorted.length;
    const middle = length / 2 - 1;
    return isEven(length) ? average([sorted[middle], sorted[middle + 1]]) : sorted[Math.ceil(middle)];
};
// Added function on my own
const isOdd = (num) => num % 2 !== 0 ? true : false;

const spreadsheetFunctions = {
    sum,
    isEven,
    average,
    median,
    even: nums => nums.filter(isEven),
    someeven: nums => nums.some(num => isEven(num)),
    everyeven: nums => nums.every(num => isEven(num)),
    firsttwo: nums => nums.slice(0, 2),
    lasttwo: nums => nums.slice(-2),
    has2: nums => nums.includes(2),
    increment: nums => nums.map((num) => num + 1),
    random: ([x, y]) => Math.floor(Math.random() * y + x),
    range: nums => range(...nums),  
    nodupes: nums => [...new Set(nums).values()], 
    "": el => el, 
    // Added properties on my own
    odd: nums => nums.filter(isOdd),
    someodd: nums => nums.some(num => isOdd(num)),
    everyodd: nums => nums.every(num => isOdd(num)),
}

const applyFunction = (str) => {
    const noHigh = highPrecedence(str);
    const infix = /([\d.]+)([+-])([\d.]+)/;
    const str2 = infixEval(noHigh, infix);
    const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
    const toNumberList = (args) => args.split(",").map(parseFloat);
    const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
    return str2.replace(functionCall, (match, fn, args) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match);
};

const range = (start, end) => Array(end - start + 1) // +1 to skip the first column?
    .fill(start) // array filled with the same value...
    .map((element, index) => element + index); // all the values will be different
// implicit return when no brackets
// nothing in the Array() means empty array
// something inside ? --> size

const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0))
    .map((code) => String.fromCharCode(code));
// received string parameter
// .charCodeAt from letter to letter code (number) for range function
// String.fromCharCode(code) from number (letter code) to String

const evalFormula = (x, cells) => {
    const idToText = (id) => cells.find((cell) => cell.id === id).value;
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
    const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
    // const elemValue = (num) => {
    //     const inner = character => {
    //         return idToText(character + num);
    //       }
    //     return inner();
    // };
    const elemValue = num => character => idToText(character + num);
    const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue(num));
    const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
    const cellRegex = /[A-J][1-9][0-9]?/ig;
    const cellExpanded = rangeExpanded.replace(cellRegex, (match) => idToText(match.toUpperCase()));
    const functionExpanded = applyFunction(cellExpanded);
    return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);
};

window.onload = () => {
    const container  = document.getElementById('container');

    const createLabel = (name) => {
        const label = document.createElement('div');
        label.className = "label";
        label.textContent = name;
        container.appendChild(label);
    };

    const letters = charRange("A", "J");
    letters.forEach(createLabel);   
    range(1,99).forEach((number) => {
        createLabel(number);
        letters.forEach((letter) => {
            const input = document.createElement('input');
            input.type = "text";
            input.id = letter + number;
            input.ariaLabel = letter + number;
            input.onchange = update;
            container.appendChild(input);
        });
    });
} // onload method to wait for the end of the html file is displayed

const update = (event) => {
    const element =  event.target;
    const value = element.value.replace(/\s/g, "");
    if (!value.includes(element.id) && value[0] === "=") {
        element.value = evalFormula(value.slice(1), Array.from(document.getElementById('container').children));//the method .children an array like, use Array.from() no convert it in an array
    }
};



