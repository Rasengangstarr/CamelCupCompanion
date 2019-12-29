GameState = {"camels":
    [{ "color" : "white", "position" : 0, "stackpos" : 0 },
     { "color" : "blue", "position" : 0, "stackpos" : 0 },
     { "color" : "green", "position" : 0, "stackpos" : 0 },
     { "color" : "yellow", "position" : 0, "stackpos" : 0 },
     { "color" : "orange", "position" : 0, "stackpos" : 0 }      
    ]};

function MoveCamel(color, distance) {

    camel = GameState.camels[0];
    // Get camel by color entered
    GameState.camels.forEach(element => {
        if (element.color == color) {
            camel = element;
        }        
    });
    
    camel.position += distance;

    // Check if there's another camel in that position
    // Get the highest stackpos of a camel in that position
    // set our position to that plus 1

    highestCurrentStackpos = -1;

    GameState.camels.forEach(element => {
        //don't check against same camel
        if (element.color != camel.color) {
            if (element.position == camel.position) {
                if (highestCurrentStackpos < element.stackpos) {
                    highestCurrentStackpos = element.stackpos;
                }
            }
        }
    })
    
    if (highestCurrentStackpos > -1) {
        camel.stackpos = highestCurrentStackpos + 1;
    }
    else {
        camel.stackpos = 0;
    }

}
