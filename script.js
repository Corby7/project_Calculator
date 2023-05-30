var firstValue = null;
var operator = null;
var secondValue = null;

var displayValue = null;

var temp = false;

const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");

const decimal = document.querySelector(".decimal");
const sign = document.querySelector(".sign");
const percent = document.querySelector(".percent");
const backspace = document.querySelector(".backspace");

backspace.addEventListener('click', event => {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
});

percent.addEventListener('click', event => {
    if (displayValue !== null && temp === true) {
        displayValue = (displayValue/100);
        firstValue = displayValue;
        updateDisplay();
    } else if (displayValue !== null) {
        displayValue = (displayValue/100);
        updateDisplay();
    }
});

sign.addEventListener('click', event => {
    if (displayValue.includes("-")) {
        displayValue = displayValue.replace('-', '');
        updateDisplay();
    } else {
    displayValue = "-" + displayValue;
    console.log(displayValue);
    updateDisplay();
    }
});

//adds decimal to displayValue string, only if there is not already a decimal present
decimal.addEventListener('click', event => {
    if (displayValue === null) {
        displayValue = "0.";
        updateDisplay();
    } else if (displayValue.includes(".")) {
    } else {
        displayValue += ".";
        updateDisplay();
        console.log(displayValue);
    }
});

let numbersArray = Array.from(numbers);
numbersArray.forEach(button => {
    button.addEventListener('click', event => {
        if (displayValue == null) {
            displayValue = (event.target.id);
        } else if (displayValue !== null & temp === true) {
            clearAll();
            displayValue = (event.target.id);
            temp = false;
        } else {
            displayValue += (event.target.id);
        } 
        console.log("pressed-key: " + event.target.id);
        updateDisplay();
    });
});

let operatorsArray = Array.from(operators);
operatorsArray.forEach(button => {
    button.addEventListener('click', event => { 
        if (displayValue !== null && firstValue === null) {
            firstValue = displayValue
            operator = (event.target.id);
            clearDisplay();

            console.log("--------------------------------------------------");
            console.log("pressed-operator " + operator);
            console.log("firstValue: " + firstValue);
            console.log("secondValue: " + secondValue);
            console.log("--------------------------------------------------");

        } else if (firstValue !== null & temp == false) {
            secondValue = displayValue;
            clearDisplay();
            firstValue = operate(Number(firstValue), operator, Number(secondValue));
            operator = (event.target.id);

            console.log("--------------------------------------------------");
            console.log("pressed-operator " + operator);
            console.log("firstValue: " + firstValue);
            console.log("secondValue: " + secondValue);
            console.log("--------------------------------------------------");

        } else if (firstValue !== null & temp == true) {
            clearDisplay();
            operator = (event.target.id);
            temp = false;
            console.log("--------------------------------------------------");
            console.log("pressed-operator " + operator);
            console.log("firstValue: " + firstValue);
            console.log("secondValue: " + secondValue);
            console.log("--------------------------------------------------");
        }
    });
});


function updateDisplay() {
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = null;
    updateDisplay();
}

function clearAll() {
    displayValue = null;
    updateDisplay();
    firstValue = null;
    secondValue = null;
    operator = null;
    temp = false;
    console.log("clear All");
}

function equals() {
    if (temp === false) {
        secondValue = displayValue;
        displayValue = operate(Number(firstValue), operator, Number(secondValue));
        updateDisplay();
        firstValue = displayValue;
        temp = true;  
    }

    console.log("--------------------------------------------------");
    console.log("equals");
    console.log("firstValue: " + firstValue);
    console.log("secondValue: " + secondValue);
    console.log(temp)
    console.log("--------------------------------------------------");
}

//
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
