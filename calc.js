const screen = document.getElementById("screen");
const expressionDisplay = document.getElementById("expression");

let currentNumber = "0";
let previousNumber = "";
let operation = null;
let shouldResetDisplay = false;
let lastExpression = ""; // Track the completed expression

// Event listeners for all buttons
const buttons = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

Object.values(buttons).forEach((id) => {
  document
    .getElementById(id)
    .addEventListener("click", (e) => handleNumberInput(e.target.id));
});

document
  .getElementById("add")
  .addEventListener("click", () => handleOperation("+"));
document
  .getElementById("sub")
  .addEventListener("click", () => handleOperation("-"));
document
  .getElementById("mult")
  .addEventListener("click", () => handleOperation("×"));
document
  .getElementById("divide")
  .addEventListener("click", () => handleOperation("÷"));
document.getElementById("period").addEventListener("click", handleDecimal);
document.getElementById("delete").addEventListener("click", deleteDigit);
document.getElementById("clear").addEventListener("click", clearDisplay);
document.getElementById("eq").addEventListener("click", calculate);
document.getElementById("percent").addEventListener("click", handlePercent);
document.getElementById("toggle-sign").addEventListener("click", toggleSign);
document.getElementById("sqrt").addEventListener("click", handleSquareRoot);

function handleNumberInput(buttonId) {
  const numberMap = {
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  const digit = numberMap[buttonId];

  // If display should reset, start fresh
  if (shouldResetDisplay) {
    currentNumber = digit;
    shouldResetDisplay = false;
  } else {
    // Prevent leading zeros (unless it's just "0")
    if (currentNumber === "0" && digit !== ".") {
      currentNumber = digit;
    } else {
      currentNumber += digit;
    }
  }

  updateDisplay();
}

function handleDecimal() {
  if (shouldResetDisplay) {
    currentNumber = "0.";
    shouldResetDisplay = false;
  } else if (!currentNumber.includes(".")) {
    currentNumber += ".";
  }
  updateDisplay();
}

function deleteDigit() {
  if (shouldResetDisplay) return;

  currentNumber = currentNumber.slice(0, -1);

  // Show "0" if nothing left
  if (currentNumber === "" || currentNumber === "-") {
    currentNumber = "0";
  }

  updateDisplay();
}

function clearDisplay() {
  currentNumber = "0";
  previousNumber = "";
  operation = null;
  lastExpression = "";
  shouldResetDisplay = false;
  updateDisplay();
}

function handleOperation(op) {
  // If there's a pending operation, calculate it first (chain calculation)
  if (operation && !shouldResetDisplay) {
    calculate();
  }

  previousNumber = currentNumber;
  operation = op;
  shouldResetDisplay = true;
  updateDisplay();
}

function calculate() {
  if (!operation || shouldResetDisplay) return;

  let result;
  const prev = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);

  // Handle division by zero
  if (operation === "÷" && current === 0) {
    currentNumber = "Error";
    updateDisplay();
    previousNumber = "";
    operation = null;
    shouldResetDisplay = true;
    return;
  }

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      result = prev / current;
      break;
    default:
      return;
  }

  // Format result to avoid long decimals
  result = parseFloat(result.toFixed(10));
  // Store the expression before clearing operation
  lastExpression = previousNumber + " " + operation + " " + currentNumber;

  currentNumber = result.toString();
  previousNumber = "";
  operation = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function handlePercent() {
  const num = parseFloat(currentNumber);

  if (operation && previousNumber) {
    // Calculate percentage of the first number
    const prev = parseFloat(previousNumber);
    currentNumber = ((prev * num) / 100).toString();
  } else {
    // Just convert to percentage
    currentNumber = (num / 100).toString();
  }

  updateDisplay();
}

function toggleSign() {
  const num = parseFloat(currentNumber);
  currentNumber = (num * -1).toString();
  updateDisplay();
}

function handleSquareRoot() {
  const num = parseFloat(currentNumber);

  if (num < 0) {
    currentNumber = "Error";
  } else {
    currentNumber = Math.sqrt(num).toString();
  }

  shouldResetDisplay = true;
  updateDisplay();
}

function updateDisplay() {
  screen.innerText = currentNumber;

  // Show expression - either current operation or last completed expression
  if (operation) {
    expressionDisplay.innerText = previousNumber + " " + operation;
  } else if (lastExpression) {
    expressionDisplay.innerText = lastExpression;
  } else {
    expressionDisplay.innerText = "";
  }
}
