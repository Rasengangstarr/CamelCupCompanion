
console.log(GameState);
// create array to track camels and their positions on the board
let camelArr = [
    {color: "blue", position: 0},
    {color: "green", position: 0},
    {color: "orange", position: 0},
    {color: "yellow", position: 0},
    {color: "white", position: 0}
]; // all start at position 0 by default but maybe should be white
// display game
displayGame();

function displayGame() {
    displayBoard();
    displayCamelSelector();    
}

function displayBoard() {
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
        for (const camel of camelArr) {
            if (camel.position === posNum) {
                let camelIcon = document.createElement("p");
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
}