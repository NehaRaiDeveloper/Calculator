document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentValue = '0';
    let operator = null;
    let firstOperand = null;
    let shouldResetDisplay = false;

    // Update the display
    function updateDisplay() {
        display.textContent = currentValue;
    }

    // Clear the calculator
    function clearCalculator() {
        currentValue = '0';
        operator = null;
        firstOperand = null;
        shouldResetDisplay = false;
        updateDisplay();
    }

    // Append a number to the display
    function appendNumber(number) {
        if (currentValue === '0' || shouldResetDisplay) {
            currentValue = number;
            shouldResetDisplay = false;
        } else {
            currentValue += number;
        }
        updateDisplay();
    }

    // Choose an operator (+, -, *, /)
    function chooseOperator(selectedOperator) {
        if (operator !== null) calculate();
        firstOperand = parseFloat(currentValue);
        operator = selectedOperator;
        shouldResetDisplay = true;
    }

    // Perform the calculation
    function calculate() {
        if (!operator || firstOperand === null) return;
        const secondOperand = parseFloat(currentValue);

        switch (operator) {
            case '+':
                firstOperand += secondOperand;
                break;
            case '-':
                firstOperand -= secondOperand;
                break;
            case '*':
                firstOperand *= secondOperand;
                break;
            case '/':
                firstOperand = secondOperand === 0 ? 'Error' : firstOperand / secondOperand;
                break;
        }

        currentValue = firstOperand.toString();
        operator = null;
        updateDisplay();
    }

    // Event listeners for buttons
    document.querySelectorAll('.btn').forEach(button => {
        if (button.id === 'equal') button.addEventListener('click', calculate);
        else if (button.id === 'clear') button.addEventListener('click', clearCalculator);
        else if (button.classList.contains('operator'))
            button.addEventListener('click', () => chooseOperator(button.getAttribute('data-value')));
        else button.addEventListener('click', () => appendNumber(button.getAttribute('data-value')));
    });

    clearCalculator();
});
