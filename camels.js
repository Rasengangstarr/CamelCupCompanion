GameState = {"camels":
    [{ "color" : "white", "position" : -1, "stackpos" : 0, "moving" : false },
     { "color" : "blue", "position" : -2, "stackpos" : 0, "moving" : false },
     { "color" : "green", "position" : -3, "stackpos" : 0, "moving" : false },
     { "color" : "yellow", "position" : -4, "stackpos" : 0, "moving" : false },
     { "color" : "orange", "position" : -5, "stackpos" : 0, "moving" : false }      
    ]};

function sortCamels(prop, asc) {
    GameState.camels.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
}

function MoveCamel(color, distance) {

    camel = GameState.camels[0];
    // Get camel by color entered
    GameState.camels.forEach(element => {
        if (element.color == color) {
            camel = element;
            // initialize camel position
            if (camel.position < 0) {
                camel.position = 0;
            }
        }        
    });

    //get all camels at current position
    GameState.camels.forEach(element => {
        if (element.position == camel.position) {
            if (element.stackpos >= camel.stackpos) {
                element.moving = true;
            }
        }        
    });

    // Check if there's another camel in that position
    // Get the highest stackpos of a camel in that position
    // set our position to that plus 1

    highestCurrentStackpos = -1;

    GameState.camels.forEach(element => {
        //don't check against same camel
        if (element.color != camel.color) {
            if (element.position == camel.position + distance) {
                if (highestCurrentStackpos < element.stackpos) {
                    highestCurrentStackpos = element.stackpos + 1;
                }
            }
        }
    })

    if (highestCurrentStackpos == -1) {
        highestCurrentStackpos = 0;
    }

    sortCamels("stackpos", true);

    console.log("initial hcs=" + highestCurrentStackpos);

    GameState.camels.forEach(element => {
        if (element.moving) {
            element.position = element.position + distance;
            if (highestCurrentStackpos != 0) {
                element.stackpos = highestCurrentStackpos;
            }
            else {
                element.stackpos = 0;
            }
            console.log("current hcs= " + highestCurrentStackpos);
            highestCurrentStackpos += 1;
        }
        element.moving = false;
    })
    
 

}
