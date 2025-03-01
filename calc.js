const container = document.getElementById("container")

let currentNumber = '';
let previousNumber = '';
let operation = null;

document.getElementById("one").addEventListener('click', getInput)
document.getElementById("two").addEventListener('click', getInput)
document.getElementById("three").addEventListener('click', getInput)
document.getElementById("four").addEventListener('click', getInput)
document.getElementById("five").addEventListener('click', getInput)
document.getElementById("six").addEventListener('click', getInput)
document.getElementById("seven").addEventListener('click', getInput)
document.getElementById("eight").addEventListener('click', getInput)
document.getElementById("nine").addEventListener('click', getInput)
document.getElementById("zero").addEventListener('click', getInput)
document.getElementById("divide").addEventListener('click', getInput)
document.getElementById("add").addEventListener('click', getInput)
document.getElementById("sub").addEventListener('click', getInput)
document.getElementById("mult").addEventListener('click', getInput)
document.getElementById("delete").addEventListener('click', getInput)
document.getElementById("clear").addEventListener('click', getInput)
document.getElementById("eq").addEventListener('click', getInput)
document.getElementById("period").addEventListener('click', getInput)

const screen = document.getElementById('screen')

 function getInput(e){
   
    e.preventDefault()
    const buttonValue=e.target.id 
    switch (buttonValue) {
      case "one": 
      appendNumber(1)
      break
      case "two":
         appendNumber(2)
         break
      case "three":
         appendNumber(3)
         break
      case "four":
         appendNumber(4)
         break
      case "five":
         appendNumber(5)
         break
      case "six":
         appendNumber(6)
         break
      case "seven":
         appendNumber(7)
         break
      case "eight":
         appendNumber(8)
         break
      case "nine":
         appendNumber(9)
         break
      case "zero":
         appendNumber(0);
         break;
     case "period":
         appendDecimal();
         break;
     case "delete":
         deleteDigit();
         break;
     case "clear":
         clearDisplay();
         break;
     case "divide":
     case "add":
     case "sub":
     case "mult":
         setOperation(buttonValue);
         break;
 }
    }
    function appendNumber(number) {
      currentNumber += number;
      screen.innerText = currentNumber;
  }
  
  function appendDecimal() {
   if (!currentNumber.includes('.')) {
       currentNumber += '.';
       screen.innerText = currentNumber;
   }
}

function deleteDigit() {
   currentNumber = currentNumber.slice(0, -1);
   screen.innerText = currentNumber;
}

function clearDisplay() {
   currentNumber = '';
   previousNumber = '';
   operation = null;
   screen.innerText = '0';
}
 