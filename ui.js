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
    const numTiles = 16; // the number of spaces in a lap
    let boardContainer = document.createElement("section");
    boardContainer.setAttribute("id", "boardContainer");
    document.querySelector("#master").appendChild(boardContainer);
    for (let tileNum = 0; tileNum < numTiles; tileNum++) {
        let camelsOnTile = []; //list of camels on this tile
        let tile = document.createElement("section");
        tile.setAttribute("id", "stepNum" + tileNum);
        tile.setAttribute("class", "tile");
        tile.setAttribute("number", tileNum);
        let tileLabel = document.createElement("p");
        tileLabel.setAttribute("class", "tileLabel")
        tileLabel.innerText = tileNum;
        tile.appendChild(tileLabel);
        for (const camel of GameState.camels) {
            if (camel.position == tileNum) {
                camelsOnTile.push(camel);
                let camelIcon = document.createElement("p"); // this can be changed to an image or something
                camelIcon.setAttribute("class", "camelIcon");
                camelIcon.setAttribute("style", "color: "+camel.color+";");
                camelIcon.innerText = "■";
                camel.icon = camelIcon;
            }
        }
        camelsOnTile = sortCamelStack(camelsOnTile);
        for (const camel of camelsOnTile) {
            tile.appendChild(camel.icon);
        }
        boardContainer.appendChild(tile);
    }
    //camel data
    let oddsContainer = document.createElement("section");
    oddsContainer.setAttribute("id", "oddsContainer");
    boardContainer.appendChild(oddsContainer);
    for (const camel of GameState.camels) {
        let camelDataContainer = document.createElement("section");
        camelDataContainer.setAttribute("class", "camelDataContainer");
        let camelColor = document.createElement("section");
        camelColor.innerText = "camel: \n"+camel.color;
        camelDataContainer.appendChild(camelColor);
        let camelOdds = document.createElement("section");
        camelOdds.innerText = "odds: \n"+camel.odds;
        camelDataContainer.appendChild(camelOdds);
        let camelPosition = document.createElement("section");
        camelPosition.innerText = "position: \n"+camel.position;
        camelDataContainer.appendChild(camelPosition);
        let camelStackpos = document.createElement("section");
        camelStackpos.innerText = "stack: \n"+camel.stackpos;
        camelDataContainer.appendChild(camelStackpos);
        let camelMoved = document.createElement("section");
        camelMoved.innerText = "moved: \n"+camel.hasMoved;
        camelDataContainer.appendChild(camelMoved);
        oddsContainer.appendChild(camelDataContainer);
    }
}

function sortCamelStack(camelArr) {
    let sortedArr = [];
    for (let i = 0; i < camelArr.length; i++) {
        for (const camel of camelArr) {
            if (camel.stackpos === i) {
                sortedArr.push(camel);
            }
        }
    }
    return sortedArr;
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
    let currentIndex = -1;
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
    //generate dice roll container
    let diceSelectionContainer = document.createElement("section");
    diceSelectionContainer.setAttribute("id", "diceRollContainer");
    document.querySelector("#interfaceContainer").appendChild(diceSelectionContainer);
    //generate dice selector
    let diceSelector = document.createElement("p");
    diceSelector.setAttribute("id", "diceSelector");
    diceSelector.setAttribute("roll", "3");
    diceSelector.addEventListener("click", updateDiceSelector);
    diceRollContainer.appendChild(diceSelector);
    updateDiceSelector();
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
}