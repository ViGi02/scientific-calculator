function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function appendCharacter(character) {
    document.getElementById('display').value += character;
}

function calculate() {
    const display = document.getElementById('display').value;
    try {
        const result = evaluateExpression(display);
        document.getElementById('display').value = result;
    } catch (error) {
        alert('Invalid calculation');
    }
}

function evaluateExpression(expression) {
    const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/|\(|\))/g);
    if (!tokens) throw new Error('Invalid Expression');

    return evaluateTokens(tokens);
}

function evaluateTokens(tokens) {
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    };

    const values = [];
    const ops = [];

    const applyOperation = () => {
        const b = values.pop();
        const a = values.pop();
        const op = ops.pop();
        values.push(operators[op](a, b));
    };

    tokens.forEach((token) => {
        if (!isNaN(token)) {
            values.push(parseFloat(token));
        } else if (token === '(') {
            ops.push(token);
        } else if (token === ')') {
            while (ops.length && ops[ops.length - 1] !== '(') applyOperation();
            ops.pop();
        } else if (operators[token]) {
            while (ops.length && precedence(ops[ops.length - 1]) >= precedence(token)) applyOperation();
            ops.push(token);
        }
    });

    while (ops.length) applyOperation();
    return values.pop();
}

function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
}

function evaluateExpression(expression) {
    return Function(
        '"use strict"; return (' +
        expression
            .replace(/π/g, Math.PI)
            .replace(/e/g, Math.E)
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/log\(/g, 'Math.log10(') +
        ')'
    )();
}