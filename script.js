var firstValue = null;
var operator = null;
var secondValue = null;

var displayValue = null;

const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");


let numbersArray = Array.from(numbers);
numbersArray.forEach(button => {
    button.addEventListener('click', event => {
        if (displayValue == null) {
            displayValue = (event.target.id);
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

        } else if (firstValue !== null) {
            secondValue = displayValue;
            clearDisplay();
            firstValue = operate(Number(firstValue), operator, Number(secondValue));
            operator = (event.target.id);

            console.log("--------------------------------------------------");
            console.log("pressed-operator " + operator);
            console.log("firstvalue: " + firstValue);
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
    console.log("clear All");
}

function equals() {
    secondValue = displayValue;
    console.log("secondValue: " + secondValue);
    displayValue = operate(Number(firstValue), operator, Number(secondValue));
    updateDisplay();
    console.log(operate(Number(firstValue), operator, Number(secondValue)));
}

function operate(a, op, b) {
    if (op === "+") {
        return add(a, b);
    } else if (op === "-") {
        return subtract(a, b);
    } else if (op === "*") {
        return multiply(a, b);
    } else if (op === "-") {
        return subtract(a, b);
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
