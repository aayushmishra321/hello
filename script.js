const display = document.getElementById('display');
const keys = document.querySelector('.calculator-keys');

let currentInput = '';
let operator = '';
let previousInput = '';

keys.addEventListener('click', (event) => {
  const { target } = event;
  const { value } = target;

  if (!target.matches('button')) return;

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
      handleOperator(value);
      break;
    case '=':
      calculate();
      break;
    case 'C':
      clearDisplay();
      break;
    case '.':
      inputDecimal(value);
      break;
    default:
      inputNumber(value);
  }

  updateDisplay();
});

function handleOperator(nextOperator) {
  if (operator && currentInput) {
    calculate();
  }
  previousInput = currentInput;
  currentInput = '';
  operator = nextOperator;
}

function calculate() {
  let result = 0;
  const previous = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(previous) || isNaN(current)) return;

  switch (operator) {
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case '*':
      result = previous * current;
      break;
    case '/':
      result = previous / current;
      break;
  }

  currentInput = `${result}`;
  operator = '';
  previousInput = '';
}

function inputNumber(number) {
  currentInput = currentInput === '0' ? number : currentInput + number;
}

function inputDecimal(dot) {
  if (!currentInput.includes(dot)) {
    currentInput += dot;
  }
}

function clearDisplay() {
  currentInput = '';
  operator = '';
  previousInput = '';
}

function updateDisplay() {
  display.value = currentInput;
}
