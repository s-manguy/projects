function convertToRoman(num) {
    if (num <1 || num > 3999) {
        return "The number should be larger than 0 and smaller than 4000."
    } 
   
    let thousands = {1: "M", 2:"MM", 3: "MMM"};
    let hundreds = {1: "C", 2: "CC", 3: "CCC", 4: "CD", 5: "D", 6: "DC", 7: "DCC", 8: "DCCC", 9: "CM"};
    let tens = {1: "X", 2: "XX", 3: "XXX", 4: "XL", 5:"L", 6:"LX", 7:"LXX", 8:"LXXX", 9: "XC"};
    let units = {1:"I", 2:"II", 3:"III", 4:"IV", 5:"V", 6:"VI", 7:"VII", 8:"VIII", 9: "IX"}

    let roman = [];

if (num >= 1000) {
    let thousandsUnits = Math.floor(num/1000);
    roman.push(thousands[thousandsUnits]);
}

if ((num < 1000 && num > 100) || (num % 1000 > 100)) {
    let hundredsUnits = Math.floor((num % 1000) /100);
    roman.push(hundreds[hundredsUnits]);
}

if((num < 100 && num > 10) || (num % 100 > 10 )) {
    let tensUnits = Math.floor((num%100)/10);
    roman.push(tens[tensUnits]);
}

if((num < 10) || (num % 10 < 10)) {
    let unitsUnits = num % 10;
    roman.push(units[unitsUnits]);
}

return roman.join("");

}

convertToRoman(36);