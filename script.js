const switchInputs = document.querySelectorAll('input[name="themeSwitch"]');
const switchEl = document.querySelector(".header__switch");
const numberKeys = document.querySelectorAll(".calculator__number");
const operatorsBtns = document.querySelectorAll(".operator");
const currentNumber = document.querySelector(".calculator__current");
const previousNumber = document.querySelector(".calculator__previous");
const mathOperator = document.querySelector(".calculator__mathSign");
const delBtn = document.querySelector(".del");
const resetBtn = document.querySelector(".reset");
const equalBtn = document.querySelector(".equal");

let result = "";

// SWITCHING THEMES

switchInputs.forEach((inp) => {
  inp.addEventListener("change", function () {
    setTheme(inp.value);
  });
});

switchEl.addEventListener("click", function () {
  let themeNum = Number(switchEl.dataset.theme);
  themeNum++;
  if (themeNum > 3) {
    themeNum = 1;
  }
  setTheme(themeNum);
});

function setTheme(themeNum) {
  switchEl.dataset.theme = themeNum;
  document.body.removeAttribute("class");
  document.body.classList.add(`theme-${themeNum}`);
}

// FUNCTIONS CONNECTED TO MATH OPERATIONS

function displayNumber() {
  if (this.textContent === "." && currentNumber.innerHTML.includes(".")) return;
  if (this.textContent === "." && currentNumber.innerHTML === "") {
    return (currentNumber.innerHTML = ".0");
  }
  currentNumber.innerHTML += this.textContent;
}

function mathOperation() {
  if (currentNumber.innerHTML === "" && this.textContent === "-")
    return (currentNumber.innerHTML = "-");

  if (currentNumber.innerHTML === "") return;

  if (isNaN(+currentNumber.innerHTML)) {
    return;
  }
  if (mathOperator.innerHTML !== "") {
    displayResult();
  }

  if (currentNumber.innerHTML.slice(-1) === ".") {
    previousNumber.innerHTML = currentNumber.innerHTML.slice(0, -1);
  } else {
    previousNumber.innerHTML = currentNumber.innerHTML;
  }
  mathOperator.innerHTML = this.textContent;
  currentNumber.innerHTML = "";
}

function displayResult() {
  if (previousNumber.innerHTML === "" || currentNumber.innerHTML === "") return;

  const prev = +previousNumber.innerHTML;
  const cur = +currentNumber.innerHTML;

  switch (mathOperator.innerHTML) {
    case "+":
      result = cur + prev;
      break;
    case "-":
      result = prev - cur;
      break;
    case "x":
      result = cur * prev;
      break;
    case "/":
      result = prev / cur;
      break;
  }
  previousNumber.innerHTML = "";
  mathOperator.innerHTML = "";
  currentNumber.innerHTML = result;
}

function removeKey() {
  currentNumber.innerHTML = currentNumber.innerHTML.slice(0, -1);
}

function resetCalc() {
  currentNumber.innerHTML = "";
  previousNumber.innerHTML = "";
  mathOperator.innerHTML = "";
}

numberKeys.forEach((key) => {
  key.addEventListener("click", displayNumber);
});

operatorsBtns.forEach((operator) => {
  operator.addEventListener("click", mathOperation);
});

delBtn.addEventListener("click", removeKey);

resetBtn.addEventListener("click", resetCalc);

equalBtn.addEventListener("click", displayResult);
