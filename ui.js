// display game
let SelectedCamel = null;
let SelectedDiceRoll = null;
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

function displayCamelSelector() {
    /*this interface could be improved by having just 3 buttons
    one to scroll through the camels, one to scroll through the dice rolls
    and one to submit the move*/

    //generate interface container
    let interfaceContainer = document.createElement("section");
    interfaceContainer.setAttribute("id", "interfaceContainer");
    document.querySelector("#master").appendChild(interfaceContainer);
    //generate camel selection container
    let camelSelectionContainer = document.createElement("section");
    camelSelectionContainer.setAttribute("id", "camelSelectionContainer");
    document.querySelector("#interfaceContainer").appendChild(camelSelectionContainer);
    //generate camel selection
    for (const camel of GameState.camels) {
        let camelSelector = document.createElement("p");
        camelSelector.setAttribute("id", "camelSelector" + camel.color);
        camelSelector.setAttribute("camel", camel.color);
        camelSelector.setAttribute("class", "camelSelector");
        camelSelector.innerText = camel.color;
        camelSelector.addEventListener("click", (event) => {
            for (const button of document.querySelector("#camelSelectionContainer").childNodes) {
                button.setAttribute("style", "")
            }
            event.srcElement.setAttribute("style", "border: 2px gold solid");
            SelectedCamel = event.srcElement.getAttribute("camel");
        })
        camelSelectionContainer.appendChild(camelSelector);
    }
    //generate enter move button container
    let enterMoveButtonContainer = document.createElement("section");
    enterMoveButtonContainer.setAttribute("id", "enterMoveButtonContainer");
    document.querySelector("#interfaceContainer").appendChild(enterMoveButtonContainer);
    //generate enter move button
    let enterMoveButton = document.createElement("p");
    enterMoveButton.setAttribute("class", "button");
    enterMoveButton.setAttribute("id", "enterMoveButton");
    enterMoveButton.innerText = "enterMove";
    enterMoveButton.addEventListener("click", (event) => {
        //make move
        MoveCamel(SelectedCamel, SelectedDiceRoll);
        //clear selected dice roll
        for (const button of document.querySelector("#diceRollContainer").childNodes) {
            button.setAttribute("style", "")
        }
        //clear selected camel selection
        for (const button of document.querySelector("#camelSelectionContainer").childNodes) {
            button.setAttribute("style", "")
        }
        //reset selection attributes
        SelectedCamel = null;
        SelectedDiceRoll = null;
        //refresh display
        displayGame();
    });
    enterMoveButtonContainer.appendChild(enterMoveButton);
    //generate dice roll container
    let diceRollContainer = document.createElement("section");
    diceRollContainer.setAttribute("id", "diceRollContainer");
    document.querySelector("#interfaceContainer").appendChild(diceRollContainer);
    for (let i = 1; i < 4; i++) {
        let moveButton = document.createElement("p");
        moveButton.setAttribute("moves", i);
        moveButton.setAttribute("class", "button");
        moveButton.innerText = "Move " + i;
        moveButton.addEventListener("click", (event) => {
            for (const button of document.querySelector("#diceRollContainer").childNodes) {
                button.setAttribute("style", "")
            }
            event.srcElement.setAttribute("style", "border: 2px gold solid");
            SelectedDiceRoll = Number(event.srcElement.getAttribute("moves"));
        });
        diceRollContainer.appendChild(moveButton);
    }
}