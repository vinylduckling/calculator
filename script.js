var currentDisplay = "";
var currentExpression = [];

//add event listeners to all number buttons
const numberButtons = Array.from(document.querySelectorAll('.numberButton'));
numberButtons.forEach(button => {
    button.addEventListener("click", function() {
        updateDisplay(button.textContent);
    });
});

//add event listener to clear button
const clearButton = document.querySelector('#clear');
clearButton.addEventListener("click", clearDisplay);

//add event listener to operators
const operatorButtons = Array.from(document.querySelectorAll('.operatorButton'));
operatorButtons.forEach(button => {
    button.addEventListener("click", function() {
        //grab the current number in the display
        if(currentDisplay === ""){ //only let store operand if not empty number
            return;
        } else {
            currentExpression.push(currentDisplay);
        }
        //grab the operand (only 1)
        currentExpression.push(button.textContent); //only if operand not empty
        clearDisplay();
    });

});

//for equals button, make sure to store the last number
const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener("click", function(){
    //grab current number in the display
    if(currentDisplay === "") {
        return;
    } else {
        currentExpression.push(currentDisplay);
    }
    console.log(currentExpression);

    let result = evaluateExpression();
    //displayResult and clearExpression
    console.log(result);
    clearDisplay();
    updateDisplay(result);
    currentDisplay = "";
    currentExpression = [];


});

function evaluateExpression() {
    let result;
    //evaluate all *, /
    for(let i = 0; i < currentExpression.length-1; i++) {
        if(currentExpression[i] == '*') {
            result = operate('*', currentExpression[i-1], currentExpression[i+1]);
            currentExpression[i-1] = result;
            currentExpression[i] = result;
            currentExpression[i+1] = result;
        } else if(currentExpression[i] == '/') {
            result = operate('/', currentExpression[i-1], currentExpression[i+1]);
            currentExpression[i-1] = result;
            currentExpression[i] = result;
            currentExpression[i+1] = result;
        }
   
    }
    //evaluate all +, -
    for(let i = 0; i < currentExpression.length-1; i++) {
        if(currentExpression[i] == '+') {
            result = operate('+', currentExpression[i-1], currentExpression[i+1]);
            currentExpression[i-1] = result;
            currentExpression[i] = result;
            currentExpression[i+1] = result;
        } else if(currentExpression[i] == '-') {
            result = operate('-', currentExpression[i-1], currentExpression[i+1]);
            currentExpression[i-1] = result;
            currentExpression[i] = result;
            currentExpression[i+1] = result;
        }
    }
    //at this point grab the last result
    return result;
}


function updateDisplay(str) {
    currentDisplay += str;
    document.querySelector('#display').textContent = currentDisplay;
}

function clearDisplay() {
    currentDisplay = "";
    document.querySelector('#display').textContent = currentDisplay;
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            console.log('Operator does not match +, -, *, /') 
    }
}


function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
}
