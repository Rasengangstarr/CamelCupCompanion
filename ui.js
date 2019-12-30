// display game
displayGame();

function displayGame() {
    clearDisplay();
    displayBoard();
    displayCamelSelector(); 
}

function clearDisplay() {
    document.querySelector("#master").innerHTML = "";
}

function displayBoard() {
    //display tiles (currently called positions)
    const numPositions = 16; // the number of spaces in a lap
    let boardContainer = document.createElement("section");
    boardContainer.setAttribute("id", "boardContainer");
    document.querySelector("#master").appendChild(boardContainer);
    for (let posNum = 0; posNum < numPositions; posNum++) {
        let boardPos = document.createElement("section");
        boardPos.setAttribute("id", "stepNum" + posNum);
        boardPos.setAttribute("class", "pos");
        boardPos.setAttribute("number", posNum);
        let position = document.createElement("p");
        position.innerText = posNum;
        boardPos.appendChild(position);
        for (const camel of GameState.camels) {
            if (camel.position === posNum) {
                let camelIcon = document.createElement("p"); // this can be changed to an image or something
                camelIcon.innerText = "camel: "+camel.color + "\n stackPos: " + camel.stackpos;
                boardPos.appendChild(camelIcon);
            }
        }
        boardContainer.appendChild(boardPos);
    }
    //display pyramid
    let pyramidContainer = document.createElement("section");
    pyramidContainer.setAttribute("id", "pyramidContainer");
    boardContainer.appendChild(pyramidContainer);
    let horus = document.createElement("img");
    horus.setAttribute("src", "resources/Eye_of_Horus.svg.png");
    horus.setAttribute("alt", "horus");
    horus.setAttribute("height", "100%");
    horus.setAttribute("width", "100%");
    document.querySelector("#pyramidContainer").appendChild(horus);
}

function getReadyCamels() {
    //make a list of ready camels and find the index of the currently selected camel
    let readyCamels = [];
    for (const camel of GameState.camels) {
        if (camel.hasMoved === false) {
            readyCamels.push(camel);
        }
    }
    return readyCamels;
}

function updateCamelSelector() {
    let readyCamels = getReadyCamels();
    let currentIndex = 0;
    let nextIndex = 0;
    //get current camel index
    for (const camel of readyCamels) {
        if (camel.color === camelSelector.getAttribute("camel")) {
            currentIndex = readyCamels.indexOf(camel);
        }
    }
    //if all the camels have moved set all the camels to not moved as it must be the end of the round
    if (readyCamels.length === 0) {
        for (const camel of GameState.camels) {
            camel.hasMoved = false;
        }
        readyCamels = getReadyCamels();
    }
    //get next camel index
    if (readyCamels.length === 1) {
        nextIndex = currentIndex;
    } else {
        nextIndex = (currentIndex + 1) % readyCamels.length; // % so if current index is in final position next will be 1 
    }
    camelSelector.setAttribute("camel", readyCamels[nextIndex].color);
    camelSelector.setAttribute("style", "background-color: "+ readyCamels[nextIndex].color+";");
    camelSelector.innerText = readyCamels[nextIndex].color;
    camelSelectionContainer.appendChild(camelSelector);
}

function updateDiceSelector() {
    const diceRolls = ["1", "2", "3"];
    let currentIndex = 0;
    let nextIndex = 0;
    //get index of current roll (upon init this will be "none" so currentIndex will remain at 0)
    for (const roll of diceRolls) {
        if (roll === diceSelector.getAttribute("roll")) {
            currentIndex = diceRolls.indexOf(roll);
        }
    }
    nextIndex = (currentIndex + 1) % diceRolls.length;
    //updatebutton
    diceSelector.setAttribute("roll", diceRolls[nextIndex]);
    diceSelector.innerText = "roll for " + diceRolls[nextIndex];
}

function makeMove() {
    //make move
    let selectedCamel = camelSelector.getAttribute("camel");
    let selectedDiceRoll = Number(diceSelector.getAttribute("roll"));
    MoveCamel(selectedCamel, selectedDiceRoll);
    for (const camel of GameState.camels) {
        if (camel.color === selectedCamel) {
            camel.hasMoved = true;
        } 
    }
    //clear selected dice roll
    for (const button of document.querySelector("#diceRollContainer").childNodes) {
        button.setAttribute("style", "")
    }
    //update camel selector as current camel can't move again
    updateCamelSelector();
    //reset selection attributes
    SelectedCamel = null;
    SelectedDiceRoll = null;
    //refresh display
    displayGame();
}

function displayCamelSelector() {
    //generate interface container
    let interfaceContainer = document.createElement("section");
    interfaceContainer.setAttribute("id", "interfaceContainer");
    document.querySelector("#master").appendChild(interfaceContainer);
    //generate camel selection container
    let camelSelectionContainer = document.createElement("section");
    camelSelectionContainer.setAttribute("id", "camelSelectionContainer");
    document.querySelector("#interfaceContainer").appendChild(camelSelectionContainer);
    //generate camel selector
    let camelSelector = document.createElement("p");
    camelSelector.setAttribute("id", "camelSelector");
    camelSelector.addEventListener("click", updateCamelSelector);
    camelSelectionContainer.appendChild(camelSelector);
    updateCamelSelector();
    //generate enter move button container
    let enterMoveButtonContainer = document.createElement("section");
    enterMoveButtonContainer.setAttribute("id", "enterMoveButtonContainer");
    document.querySelector("#interfaceContainer").appendChild(enterMoveButtonContainer);
    //generate enter move button
    let enterMoveButton = document.createElement("p");
    enterMoveButton.setAttribute("class", "button");
    enterMoveButton.setAttribute("id", "enterMoveButton");
    enterMoveButton.innerText = "enterMove";
    enterMoveButton.addEventListener("click", makeMove);
    enterMoveButtonContainer.appendChild(enterMoveButton);
    //generate dice roll container
    let diceSelectionContainer = document.createElement("section");
    diceSelectionContainer.setAttribute("id", "diceRollContainer");
    document.querySelector("#interfaceContainer").appendChild(diceSelectionContainer);
    //generate dice selector
    let diceSelector = document.createElement("p");
    diceSelector.setAttribute("id", "diceSelector");
    diceSelector.setAttribute("roll", "none");
    diceSelector.addEventListener("click", updateDiceSelector);
    diceRollContainer.appendChild(diceSelector);
    updateDiceSelector();
    // for (let i = 1; i < 4; i++) {
    //     let moveButton = document.createElement("p");
    //     moveButton.setAttribute("moves", i);
    //     moveButton.setAttribute("class", "button");
    //     moveButton.innerText = "Move " + i;
    //     moveButton.addEventListener("click", (event) => {
    //         for (const button of document.querySelector("#diceRollContainer").childNodes) {
    //             button.setAttribute("style", "")
    //         }
    //         event.srcElement.setAttribute("style", "border: 2px gold solid");
    //         SelectedDiceRoll = Number(event.srcElement.getAttribute("moves"));
    //     });
    //     diceRollContainer.appendChild(moveButton);
    // }
}