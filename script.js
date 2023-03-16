const displayOutput = document.querySelector(".real-calculation");
const buttonsNumber = document.querySelectorAll("button.number");
const buttonOperator = document.querySelectorAll("button.operator");
const minusOperator = document.querySelector("button.special-operator");
const allClear = document.querySelector("button.all-clear");
const backspace = document.querySelector("button.backspace");
const history = document.querySelector(".history-calculation");
const comma = document.querySelector(".comma");
const darkMode = document.querySelector(".toggle-switch");

const result = document.querySelector("button.equal-to");
let expression = "";
let lastCalculation = "";
let lastClickedOperator = true;
let lastClickedNumber = true;
let lastClickedComma = false;
let lastClickedMinus = false;

buttonsNumber.forEach((button) => {
	button.addEventListener("click", function () {
		addNumber(button.textContent);
	});
});

buttonOperator.forEach((button) => {
	button.addEventListener("click", function () {
		addOperator(button.textContent);
	});
});

comma.addEventListener("click", function () {
	if (lastClickedComma || lastClickedOperator) {
		return;
	}

	expression += comma.textContent;
	displayOutput.textContent += comma.textContent;
	lastClickedNumber = false;
	lastClickedOperator = true;
	lastClickedMinus = false;
	lastClickedComma = true;
});

result.addEventListener("click", function () {
	showResult(expression);
});

allClear.addEventListener("click", function () {
	expression = ``;
	displayOutput.textContent = "";
	lastClickedOperator = true;
	lastClickedNumber = false;
	lastClickedMinus = false;
	lastClickedComma = false;
	lastCalculation = "";
	history.textContent = lastCalculation;
});

backspace.addEventListener("click", function () {
	lastClickedMinus = false;
	lastClickedOperator = false;
	lastClickedNumber = false;
	lastClickedComma = false;
	expression = expression.slice(0, -1);
	displayOutput.textContent = displayOutput.textContent.slice(0, -1);
});

minusOperator.addEventListener("click", function () {
	if (lastClickedMinus) {
		return;
	}
	lastClickedComma = false;
	lastClickedOperator = true;
	lastClickedNumber = false;
	lastClickedMinus = true;
	expression += minusOperator.textContent;
	displayOutput.textContent += minusOperator.textContent;
});

darkMode.addEventListener("click", function () {
	darkMode.classList.toggle("active");
	document.body.classList.toggle("dark");
});

function addNumber(number) {
	lastClickedMinus = false;
	lastClickedOperator = false;
	lastClickedNumber = true;
	expression += number;
	displayOutput.textContent += number;
}

function addOperator(operator) {
	if (lastClickedOperator || expression === "") {
		return;
	}

	switch (operator) {
		case "x":
			expression += "*";
			displayOutput.textContent += operator;
			break;
		case "÷":
			expression += "/";
			displayOutput.textContent += operator;
			break;

		default:
			expression += operator;
			displayOutput.textContent += operator;
			break;
	}

	lastClickedComma = false;
	lastClickedOperator = true;
	lastClickedNumber = false;
	lastClickedMinus = false;
}

function showResult(result) {
	lastClickedOperator = false;
	lastClickedNumber = false;
	lastClickedComma = false;
	lastClickedMinus = false;
	lastCalculation = displayOutput.textContent;
	history.textContent = lastCalculation;
	if (Number.isInteger(eval(result))) {
		expression = eval(result);
	} else {
		expression = eval(result).toFixed(2);
	}
	displayOutput.textContent = expression;
}
