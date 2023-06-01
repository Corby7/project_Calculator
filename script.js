var firstValue = null;
var operator = null;
var secondValue = null;

var displayValue = null;

var equalSwitch = false;

//button declarations
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");

//special button declarations
const decimalButton = document.querySelector(".decimal");
const signButton = document.querySelector(".sign");
const percentButton = document.querySelector(".percent");
const backspaceButton = document.querySelector("#backspace");
const clearAllButton = document.querySelector(".clearall");
const equalsButton = document.querySelector(".equals");

equalsButton.addEventListener('click', equals);
clearAllButton.addEventListener('click', clearAll);

//updates display with typed value and shows scientific notion if string length is above 9
function updateDisplay() {
    display.textContent = displayValue;
    if (displayValue !== null) {
        if (displayValue.length > 9) {
            let numberdisplayValue = Number(displayValue);
            displayValue = numberdisplayValue.toExponential(2);
        }
    }
}

//clears display
function clearDisplay() {
    displayValue = null;
    updateDisplay();
}

//removes last user input
backspaceButton.addEventListener('click', event => {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
});

//divides by 100 to show percentage
percentButton.addEventListener('click', event => {
    if (displayValue !== null && equalSwitch === true) {
        displayValue = (displayValue/100);
        firstValue = displayValue;
        updateDisplay();
    } else if (displayValue !== null) {
        displayValue = (displayValue/100);
        updateDisplay();
    }
});

//adds or removes '-' based on if already present or not
signButton.addEventListener('click', event => {
    displayValue = (Number(displayValue) * -1);
    updateDisplay();
    });

//adds decimal to displayValue string, only if there is not already a decimal present
decimalButton.addEventListener('click', event => {
    if (displayValue === null) {
        displayValue = "0.";
        updateDisplay();
    } else if (displayValue.includes(".")) {
    } else {
        displayValue += ".";
        updateDisplay();
    }
});

//sets all value to null and updates display
function clearAll() {
    displayValue = null;
    updateDisplay();
    firstValue = null;
    secondValue = null;
    operator = null;
    equalSwitch = false;
}

//sets display value as second value, operates and shows result
function equals() {
    if (equalSwitch === false) {
        secondValue = displayValue;
        displayValue = operate(Number(firstValue), operator, Number(secondValue));
        updateDisplay();
        firstValue = displayValue;
        equalSwitch = true;  
    }
}

//inputs chosen number, if user just pressed equals before; clears display and updates display with chosen number
let numbersArray = Array.from(numbers);
numbersArray.forEach(button => {
    button.addEventListener('click', event => {
        if (displayValue == null) {
            displayValue = (event.target.id);
        } else if (displayValue !== null & equalSwitch === true) {
            clearAll();
            displayValue = (event.target.id);
            equalSwitch = false;
        } else {
            displayValue += (event.target.id);
        } 
        updateDisplay();
    });
});

//sets operator and if a third value is chosen, first operates the two first values and then continues further
let operatorsArray = Array.from(operators);
operatorsArray.forEach(button => {
    button.addEventListener('click', event => { 
        if (displayValue !== null && firstValue === null) {
            firstValue = displayValue
            operator = (event.target.id);
            clearDisplay();
        } else if (firstValue !== null & equalSwitch == false) {
            secondValue = displayValue;
            clearDisplay();
            firstValue = operate(Number(firstValue), operator, Number(secondValue));
            operator = (event.target.id);
        } else if (firstValue !== null & equalSwitch == true) {
            firstValue = displayValue;
            clearDisplay();
            operator = (event.target.id);
            equalSwitch = false;
        }
    });
});

//operates based on chosen operator
function operate(a, op, b) {
    if (op === "+") {
        return add(a, b);
    } else if (op === "-") {
        return subtract(a, b);
    } else if (op === "*") {
        return multiply(a, b);
    } else if (op === "÷") {
        return divide(a, b);
    }
}

//basic arithmetic functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
