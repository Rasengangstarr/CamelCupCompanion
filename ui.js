let SelectedCamel = null;
// display game
displayGame();

function displayGame() {
    displayBoard();
    displayCamelSelector();    
}

function clearDisplay() {
    document.querySelector("#master").innerHTML = "";
}

function displayBoard() {
    clearDisplay();
    console.log(GameState.camels);
    const linebreak = document.createElement("br");
    const numPositions = 16; // the number of spaces in a lap
    let boardContainer = document.createElement("section");
    boardContainer.setAttribute("id", "boardContainer");
    document.querySelector("#master").appendChild(boardContainer);
    for (let posNum = 0; posNum < numPositions; posNum++) {
        let boardPos = document.createElement("section");
        boardPos.setAttribute("id", "stepNum " + posNum);
        boardPos.setAttribute("class", "pos");
        boardPos.setAttribute("number", posNum);
        let position = document.createElement("p");
        position.innerText = "position: " + posNum;
        boardPos.appendChild(position);
        boardPos.appendChild(linebreak);
        for (const camel of GameState.camels) {
            if (camel.position === posNum) {
                let camelIcon = document.createElement("p"); // this can be changed to an image or something
                //camelIcon.setAttribute("style", "display: inline-block;")
                camelIcon.innerText = "camel: "+camel.color + "\n stackPos: " + camel.stackpos;
                boardPos.appendChild(camelIcon);
            }
        }
        boardContainer.appendChild(boardPos);
    }
}

function displayCamelSelector() {
    let camelSelectorContainer = document.createElement("section");
    camelSelectorContainer.setAttribute("id", "camelSelectorContainer");
    document.querySelector("#master").appendChild(camelSelectorContainer);
    for (const camel of GameState.camels) {
        let camelSelector = document.createElement("section");
        camelSelector.setAttribute("id", "camelSelector" + camel.color);
        camelSelector.setAttribute("camel", camel.color);
        camelSelector.setAttribute("class", "camelSelector");
        let camelIcon = document.createElement("p"); // this can be changed to an image or something
        camelIcon.innerText = camel.color;
        camelSelector.appendChild(camelIcon);
        for (let i = 1; i < 4; i++) {
            let moveButton = document.createElement("p");
            moveButton.setAttribute("camel", camel.color);
            moveButton.setAttribute("moves", i);
            moveButton.setAttribute("class", "button");
            moveButton.setAttribute("style", "display: inline-block;");
            moveButton.innerText = "Move " + i;
            moveButton.addEventListener("click", (event) => {
                const camelToMove = event.srcElement.getAttribute("camel");
                const placesToMove = event.srcElement.getAttribute("moves");
                console.log("----");
                console.log("ran 'MoveCamel(camelToMove, placesToMove'");
                console.log("camelToMove: "+camelToMove + " / placesToMove: " + placesToMove);
                console.log("----");
                MoveCamel(camelToMove, Number(placesToMove));
                displayGame();
            });
            camelSelector.appendChild(moveButton);
        }
        camelSelectorContainer.appendChild(camelSelector);
    }
}