function add(...num) {
    let res = num.reduce((num1, num2) => num1 + num2)
    return res;
}
console.log(add(5, 6));

function subtract(a, b) {
    return a - b;
}
// console.log(subtract(5, 6));

function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

