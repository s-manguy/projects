//all the calculations should be made in pennies to avoid decimal numbers problems
var currency = [
  {name: "ONE HUNDRED", value: 10000}, // in pennies
  {name: "TWENTY", value: 2000},
  {name: "TEN", value: 1000},
  {name: "FIVE", value: 500},
  {name: "ONE", value: 100},
  {name: "QUARTER", value: 25},
  {name: "DIME", value: 10},
  {name: "NICKEL", value: 5},
  {name: "PENNY", value: 1},
];

function checkCashRegister(price, cash, cid) {
  var result = { status: null, change: [] };
  var change = cash * 100 - price * 100; // in pennies

  // transform the  cid array 2D into an object composed by the name of the currency as a key and the amount in the currency as the key value ; the acc give one more key named after the given initial value ("total" in this case) ; all the keys are in alphabetical order (a console.log can show that)
  var initialValue = { total: 0}; // add the total key (could have any name in fact) and initiate the value
  var register = cid.reduce(
    function(acc, current) { 
      acc.total += current[1] * 100; // give the value in pennies to add to the key "total"
      acc[current[0]] = current[1] *100;// [current[0]] give the key name ; current[1] give the key value in pennies
      return acc; // return the cid array as an object
    },
    initialValue
  );

  // cid = exact change due
  if (register.total === change) { // The key total is used as the cid total amount
    result.status = "CLOSED";
    result.change = cid;
    return result;
  }

  // cid < change due
  if (register.total < change) {
    result.status = "INSUFFICIENT_FUNDS";
    return result;
  }

  // cid > change due
  // the currency name is looked for in the register object 
  var changeArray = currency.reduce(function(acc, current) {
    var returnedChange = 0;
    while (register[current.name] > 0 && change >= current.value) {
      change -= current.value;
      register[current.name] -= current.value;
      returnedChange += current.value;

      // Round change to avoid the drawer problem like ["DIME", 3.1] and the decimal numbers sum round problems
      change = Math.round(change* 100) / 100;
    }
    // Add this currency and his value to the changeArray.
    if (returnedChange > 0) {
      acc.push([current.name, returnedChange/100]); // transform back in dollars
    }
    return acc; 
  }, []); 

  // if the changeArray is void or the exact change cannot be returned
  if (changeArray.length < 1 || change > 0) {
    result.status = "INSUFFICIENT_FUNDS";
    return result;
  }

  // if there is no problem to return the exact change
  result.status = "OPEN";
  result.change = changeArray;
  return result;
}




checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);