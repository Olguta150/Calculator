const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const deleteBtn = document.querySelector('.clear');
const clearBtn = document.querySelector('.all-clear');
const pointBtn = document.querySelector('.pointBtn');
const equalsBtn = document.querySelector('.result');
const previousOperand = document.querySelector('.previous-operand');
const currentOperand = document.querySelector('.current-operand');

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

window.addEventListener('keydown', handleKeyboardInput)
equalsBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteNumber);
pointBtn.addEventListener('click', appendPoint);

numberBtn.forEach((button) => {
    button.addEventListener('click', () => appendNumber(button.textContent));
})

operatorBtn.forEach((button) => {
    button.addEventListener('click', () => setOperation(button.textContent));
})

function appendNumber(number) {
    if(currentOperand.textContent === '0' || shouldResetScreen)
    resetScreen();
    currentOperand.textContent += number;
}

function resetScreen() {
    currentOperand.textContent = '';
    shouldResetScreen = false;
}

function clear() {
    currentOperand.textContent = '0';
    previousOperand.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function deleteNumber() {
    currentOperand.textContent = currentOperand.textContent.toString().slice(0, -1);
}

function appendPoint() {
    if(shouldResetScreen) resetScreen();
    if(currentOperand.textContent === '')
     currentOperand.textContent = '0';
    if(currentOperand.textContent.includes('.')) return
     currentOperand.textContent += '.';
}

function setOperation(operator) {
    if(currentOperation !== null) evaluate();
    firstOperand = currentOperand.textContent;
    currentOperation = operator;
    previousOperand.textContent = `${firstOperand}${currentOperation}`;
    shouldResetScreen = true;
}

function evaluate() {
    if(currentOperation === null || shouldResetScreen) return;
    if(currentOperation === '÷' && currentOperand.textContent === '0') {
        alert("You can't divide by 0!")
        return;
    }
    secondOperand = currentOperand.textContent;
    currentOperand.textContent = roundResult(operate(firstOperand, secondOperand, currentOperation));
    console.log(currentOperand);
    previousOperand.textContent = `${firstOperand}${currentOperation}${secondOperand} =`;
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
    if(e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if(e.key === '.') appendPoint()
    if(e.key === '=' || e.key === 'Enter') evaluate()
    if(e.key === 'Backspace') deleteNumber()
    if(e.key === 'Escape') clear()
    if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
    if(keyboardOperator === '/') return '÷';
    if(keyboardOperator === '*') return '×';
    if(keyboardOperator === '+') return '+';
    if(keyboardOperator === '-') return '-';
}


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

function modulo(a, b) {
    return a % b;
}

function operate(num1, num2, operator) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "×":
            return multiply(num1, num2);
        case "÷":
            if(num2 === 0) return null;
            else return divide(num1, num2);
        case "%":
            return modulo(num1, num2);
        default:
            return null;
    }
}
