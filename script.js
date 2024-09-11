// Selects the theme elements (1, 2, 3)
const themeElem = document.querySelectorAll(".theme");

// Selects the toggle button and its container
const toggleButton = document.querySelector(".toggle-button");
const toggleButtonContainer = document.querySelector(".toggle-button-container");


// Adds an event listener for each theme element
themeElem.forEach(element => {
    element.addEventListener("click", () => {
        // Changes the body class based on the theme number clicked
        document.body.className = `theme_${element.textContent}`;

        // Moves the toggle button to the corresponding position
        moveToThemePosition(element.textContent);
    });
});

//Declaring a variable to monitor the horizontal movement of the button
let offsetX;

// Handles the dragging of the toggle button
toggleButton.addEventListener('mousedown', (e)=> {
    // Calculates the offset between the mouse and the button's position
    offsetX = e.clientX - toggleButton.offsetLeft;
    // console.log("e.clientX:",e.clientX, "toggleButton.offsetLeft:",toggleButton.offsetLeft, "offsetX:",offsetX)

    // Adds event listeners for mouse move and mouse up events
    document.addEventListener('mousemove', moveButton);
    document.addEventListener('mouseup', stopMovingButton);
});

function moveButton(e) {
    // Calculates the new position of the button within the container
    let newLeft = e.clientX - offsetX;
    console.log("e.clientX:", e.clientX, "offsetX:",offsetX, "newLeft:",newLeft)
    const containerRect = toggleButtonContainer.getBoundingClientRect();
    const buttonRect = toggleButton.getBoundingClientRect();

    console.log(containerRect.width, (containerRect.width / 3))

    // Ensures the button stays within the boundaries of the container
    if (newLeft < 0) {
        newLeft = 0;
    } else if (newLeft + buttonRect.width > containerRect.width) {
        newLeft = containerRect.width - buttonRect.width;
    }

    // Sets the new position of the button
    toggleButton.style.left = `${newLeft}px`;

    // Changes the theme based on the position of the button
    if (newLeft == 0){
        document.body.className = 'theme_1';
    } 
    
    else if(newLeft == Math.round((containerRect.width / 3))){
        document.body.className = 'theme_2';
    }
    
    else if (newLeft == Math.round((2 * (containerRect.width / 3)))) {
        document.body.className = 'theme_3';
    }
}

function stopMovingButton() {
    // Removes the event listeners when the mouse is released
    document.removeEventListener('mousemove', moveButton);
    document.removeEventListener('mouseup', stopMovingButton);
}

// Function to move the toggle button to the correct position when a theme number is clicked
function moveToThemePosition(themeNumber) {
    const containerRect = toggleButtonContainer.getBoundingClientRect();
    

    let newLeft;
    if (themeNumber === "1") {
        newLeft = 0;
    }
    
    else if (themeNumber === "2") {
        newLeft = Math.round((containerRect.width / 3));
    }
    
    else if (themeNumber === "3") {
        newLeft = Math.round((2 * (containerRect.width / 3)));
    }
    
    toggleButton.style.left = `${newLeft}px`;
}



// Selects the number button elements
const numberButtons = document.querySelectorAll(".number_btn");
console.log(numberButtons)

// Selects the calc_screen elements
const calculatorScreen = document.querySelector(".calc_screen");

// Selects the operator buttons

const operatorButtons = document.querySelectorAll(".operator");
console.log(operatorButtons)

// Selects the delete button

const deleteButton = document.getElementById("del_btn");
console.log(deleteButton)

//Selects the equal button

const equalButton = document.querySelector(".equal_btn");

// Selects the reset button

const resetButton = document.querySelector(".reset_btn");


let firstNumber = null;
let currentNumber = "";
let gettingTheNextNumber = false;
let operator = null;
let operatorSelected = false;


numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        console.log(gettingTheNextNumber)

        if (gettingTheNextNumber) {
            currentNumber = button.textContent;
            console.log(currentNumber)
            gettingTheNextNumber = false;
        }

        else {
            
            if (currentNumber.length >= 15) {
                return;
            }

            if (button.textContent === "." && currentNumber.includes(".")) {
                return;
            }

            currentNumber += button.textContent;
            console.log(currentNumber,":",  currentNumber.length)
        
        }

        calculatorScreen.textContent = updateScreen(currentNumber)


    })
})


operatorButtons.forEach(button => {

    button.addEventListener("click", ()=> {

        console.log(operator, gettingTheNextNumber, currentNumber)
        

        if (operator && gettingTheNextNumber === false) {

            firstNumber = calculate(firstNumber, Number(currentNumber), operator);
            calculatorScreen.textContent = firstNumber
            console.log(typeof firstNumber,  firstNumber)
            
        }

        else if (operator === null) {
            console. log(currentNumber)
            firstNumber = Number(currentNumber)
            operatorSelected = true;

            console.log(typeof firstNumber,  firstNumber)
        }

        else if (operator && gettingTheNextNumber) {
            currentNumber = "";
        }

    
        operator = button.textContent;
        console.log(operator, "f:", firstNumber, "c:",currentNumber)
        gettingTheNextNumber = true;


    })
})

// Adds an event listener for equal button
equalButton.addEventListener("click", () => {
   
    console.log(gettingTheNextNumber)

    if (operator && firstNumber !== null && currentNumber !=="" ) {
       
        const result = calculate(firstNumber, Number(currentNumber), operator);
        calculatorScreen.textContent = commaSeparator(result);
        currentNumber = Number(calculatorScreen.textContent.replace(/,/g, ""))
        gettingTheNextNumber = false;
        operator = null;
        firstNumber = null;
    }   
    
   
})

// Adds an event listener for reset button
resetButton.addEventListener("click", () => {
    gettingTheNextNumber = false;
    currentNumber = "";
    firstNumber = null;
    operator = null;
    calculatorScreen.textContent = currentNumber
})


// Adds an event listener for the delete button
deleteButton.addEventListener("click", () => {
   currentNumber = calculatorScreen.textContent.slice(0, -1).replace(/,/g, "");
   calculatorScreen.textContent = updateScreen(currentNumber)

})


function commaSeparator(numberValue) {
   
    if (numberValue - Math.floor(numberValue) !== 0) {

        const decimalLength = numberValue.toString().split(".")[1].length;
        return numberValue.toLocaleString("en-us", {
            minimumFractionDigits: decimalLength,
            maximumFractionDigits: 16,
        });
        
    }

    else {
        return numberValue.toLocaleString("en-us")
    }
}   

// Function to perform basic arithmetic operations
function calculate(firstOperand, secondOperand, operatorSign) {
    let result;

    // Convert numbers to Decimal.js objects for precise calculations
    const firstDecimal = new Decimal(firstOperand);
    const secondDecimal = new Decimal(secondOperand);

    switch (operatorSign) {
        case "+":
            result = firstDecimal.plus(secondDecimal);
            break;
        
        case "-":
            result = firstDecimal.minus(secondDecimal);
            break;
        
        case "x":
            result = firstDecimal.times(secondDecimal);
            break;
        
        case "/":
            result = firstDecimal.div(secondDecimal);
            break;
    }

   
    return result.toNumber(); 
}



function updateScreen(value) {
    const [integerPart, decimalPart] = value.split(".");

    console.log(integerPart, decimalPart)

    const formattedIntegerPart = Number(integerPart).toLocaleString("en-US");

    return decimalPart === undefined 
        ? formattedIntegerPart 
        : `${formattedIntegerPart}.${decimalPart}`;
}












