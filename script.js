// console.log("hi");
// Change Theme
const toggleElement = document.querySelector(".themes__toggle");
const toggleChangeFunc = () => {
  toggleElement.classList.toggle("themes__toggle--isActive");
};
const useToggleWithEnter = (event) => {
  event.key === "Enter" && toggleChangeFunc();
};
toggleElement.addEventListener("click", toggleChangeFunc);
toggleElement.addEventListener("keydown", useToggleWithEnter);

// logic of calculator
let storedNumber = "";
let currentNumber = "";
let operation = "";

let resultElement = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");

const updateValueScreen = (value) => {
  resultElement.innerText = !value ? "0" : value;
};

const numberButtonsHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;
  currentNumber += value;
  //   console.log(currentNumber);
  //   resultElement.innerText = currentNumber;
  updateValueScreen(currentNumber);
};
const resetButtonHandler = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";
  updateValueScreen(currentNumber);
};

const deleteButtonHandler = () => {
  if (!currentNumber || currentNumber === "0") return;
  if (currentNumber.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }
  updateValueScreen(currentNumber);
};

const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);

        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);

        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);

        break;
      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);

        break;
    }
    currentNumber = "";
    updateValueScreen(storedNumber);
  }
};

const operationButtonHandler = (operationValue) => {
  if (!currentNumber && !storedNumber) return;
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;
    if (currentNumber) executeOperation();
  }
};

const keyElementHandle = (element) => {
  element.addEventListener("click", () => {
    const type = element.dataset.type;
    if (type === "number") {
      numberButtonsHandler(element.dataset.value);
    } else if (type === "operation") {
      switch (element.dataset.value) {
        case "c":
          resetButtonHandler();
          break;

        case "Backspace":
          deleteButtonHandler();
          break;

        case "Enter":
          executeOperation();
          break;
        default:
          operationButtonHandler(element.dataset.value);
      }
    }
  });
};

keyElements.forEach(keyElementHandle);

// use keyboard as input source

const avaliableNumber = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const avaliableOperation = ["+", "*", "/", "-"];
const avaliableKeys = [
  ...avaliableNumber,
  ...avaliableOperation,
  "Enter",
  "c",
  "Backspace",
];

const keyboardWithoutHover = (key) => {
  if (avaliableNumber.includes(key)) {
    numberButtonsHandler(key);
  } else if (avaliableOperation.includes(key)) {
    operationButtonHandler(key);
  } else if (key === "Backspace") {
    deleteButtonHandler();
  } else if (key === "Enter") {
    executeOperation();
  } else if (key === "c") {
    resetButtonHandler();
  }
};

const keyboardWithHover = (key) => {
  if (avaliableKeys.includes(key)) {
    const element = document.querySelector(`[data-value="${key}"]`);
    element.classList.add("hover");
    element.click(); //simulation of click
    setTimeout(() => element.classList.remove("hover"), 100);
  }
};

window.addEventListener("keydown", (event) => {
  //   keyboardWithoutHover(event.key);
  keyboardWithHover(event.key);
});
