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
    const numPositions = 16; // the number of spaces in a lap
    let boardContainer = document.createElement("section");
    boardContainer.setAttribute("id", "boardContainer");
    document.querySelector("#master").appendChild(boardContainer);
    for (let posNum = 0; posNum < numPositions; posNum++) {
        let boardPos = document.createElement("section");
        boardPos.setAttribute("id", "stepNum " + posNum);
        boardPos.setAttribute("class", "pos");
        boardPos.setAttribute("number", posNum);
        boardPos.innerText = "position: " + posNum;
        boardPos.addEventListener("click", (event) => {
            for (const camel of GameState.camels) {
                if (camel.color === SelectedCamel) {
                    const clickedPos = event.srcElement.getAttribute("number");
                    camel.position = Number(clickedPos);
                    displayGame();
                } 
            }
        });
        for (const camel of GameState.camels) {
            if (camel.position === posNum) {
                let camelIcon = document.createElement("p"); // this can be changed to an image or something
                camelIcon.innerText = camel.color;
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
        camelSelector.setAttribute("name", camel.color);
        camelSelector.setAttribute("class", "camelSelectorUnselected");
        camelSelector.addEventListener("click", (event) => {
            //clear previous selected camel
            for (const item of document.querySelector("#camelSelectorContainer").children) {
                item.setAttribute("class", "camelSelectorUnselected");
            }
            //highlight new selected camel
            document.querySelector("#"+event.srcElement.id).setAttribute("class", "camelSelectorSelected");
            SelectedCamel = event.srcElement.getAttribute("name");
        }); // this event trigger is extremely jank right now as you have to click in the right place
        let camelIcon = document.createElement("p"); // this can be changed to an image or something
        camelIcon.innerText = camel.color;
        camelSelector.appendChild(camelIcon);
        camelSelectorContainer.appendChild(camelSelector);
    }
}