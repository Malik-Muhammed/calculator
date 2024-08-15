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
toggleButton.addEventListener('mousedown', (e) => {
    // Calculates the offset between the mouse and the button's position
    offsetX = e.clientX - toggleButton.offsetLeft;
    console.log("e.clientX:",e.clientX, "toggleButton.offsetLeft:",toggleButton.offsetLeft, "offsetX:",offsetX)

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
    const buttonRect = toggleButton.getBoundingClientRect();

    let newLeft;
    if (themeNumber === "1") {
        newLeft = 0;
    } else if (themeNumber === "2") {
        // newLeft = (containerRect.width - buttonRect.width) / 2;
        newLeft == Math.round((containerRect.width / 3));
    } else if (themeNumber === "3") {
        // newLeft = containerRect.width - buttonRect.width;
        newLeft == Math.round((2 * (containerRect.width / 3)));
    }
    toggleButton.style.left = `${newLeft}px`;
}
