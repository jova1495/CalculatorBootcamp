const btnNumbers = document.getElementsByName("data-number");
const btnOperation = document.getElementsByName("data-operation");
const btnEqual = document.getElementsByName("data-equal")[0];
const btnDelete = document.getElementsByName("data-delete")[0];
const btnClear = document.getElementsByName("data-clear")[0];
const btnDot = document.getElementsByName("data-dot")[0];
const btnMinPlus = document.getElementsByName("data-minPlus")[0];
let displayResult = document.getElementById("result");
let displayBfResult = document.getElementById("bf-result");


let actualOperation = "";
let beforeOperation = "";
let operation = undefined;
let isResult = false;

//functions about buttons
btnNumbers.forEach(function(btn){
  btn.addEventListener('click',function(){
    console.log(isResult);
     addingNumbers(btn.innerText);
  })
});

btnOperation.forEach(function(op){
  op.addEventListener('click',function(){
    console.log(isResult);
     selectingOperations(op.innerText);
  })
});

btnEqual.addEventListener('click', function(){
  calculate();
  updateDisplay();
});

btnDelete.addEventListener('click',function(){
  actualOperation = actualOperation.toString();
  actualOperation = actualOperation.slice(0,actualOperation.length-1);
  updateDisplay();
});

btnClear.addEventListener('click',function(){
  clear();
  updateDisplay();
});

btnDot.addEventListener('click', function(){
  actualOperation = actualOperation.toString();
  if(actualOperation.indexOf(".")=== -1){
  actualOperation = actualOperation + ".";
  updateDisplay();
  }
});

btnMinPlus.addEventListener('click', function(){
  actualOperation = actualOperation.toString()
  if(actualOperation[0]!=="-"){
  actualOperation = "-" + actualOperation;
  }else{
    actualOperation = actualOperation.slice(1);
    console.log(actualOperation);
  }
  updateDisplay();
});


//Functions for especific operation

function selectingOperations(op){
  isResult = false;
  displayBfResult.innerText = actualOperation+op;
  if(actualOperation === "") return;
  if(beforeOperation !== ""){
    calculate();
  }
  operation = op.toString();
  beforeOperation = actualOperation;
  actualOperation = "";

}

function calculate(){
  let result
  const before = parseFloat(beforeOperation);
  const actual = parseFloat(actualOperation);
  console.log(before + " " + actual + " " + operation);
  if(isNaN(before)  || isNaN(actual)) return;
  switch(operation){
    case "+":
      result = before + actual;
      break;
    case "-":
      result = before - actual;
      break;
    case "*":
      result = before * actual;
      break;
    case "÷":
      result = before / actual;
      break;
    default: 
      return;
  }
  displayBfResult.innerText = result;
  actualOperation = result;
  operation = undefined;
  beforeOperation = "";
  isResult = true;
}

function addingNumbers(num){
  if(isResult){
    clear();
  }
  isResult = false;
  actualOperation = actualOperation.toString() + num.toString();
  updateDisplay();
}

function updateDisplay(){
  displayResult.innerText = actualOperation;
}

function clear(){
  actualOperation = "";
  beforeOperation = "";
  operation = undefined;
  displayBfResult.innerText = "";
}