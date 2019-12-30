GameState = {"camels":
    [
     { "color" : "blue", "position" : -2, "stackpos" : 0, "moving" : false, "odds" : 0, "hasMoved" : false },
     { "color" : "green", "position" : -3, "stackpos" : 0, "moving" : false, "odds" : 0, "hasMoved" : false },
     { "color" : "orange", "position" : -5, "stackpos" : 0, "moving" : false, "odds" : 0, "hasMoved" : false },
     { "color" : "white", "position" : -1, "stackpos" : 0, "moving" : false, "odds" : 0, "hasMoved" : false },
     { "color" : "yellow", "position" : -4, "stackpos" : 0, "moving" : false, "odds" : 0, "hasMoved" : false }      
    ]};

initialCamels = [];

function sortCamels(prop, asc) {
    GameState.camels.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
}

function sortFakeCamels(prop, asc) {
    initialCamels.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
}

function NewRound() {
    GameState.camels.forEach(element => {
        element.hasMoved = false;
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
                camel.hasMoved = true;
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

    highestCurrentStackpos = 0;

    GameState.camels.forEach(element => {
        //don't check against same camel
        if (element.color != camel.color) {
            if (element.position == camel.position + distance) {
                    highestCurrentStackpos += 1;
            
            }
        }
    })

    if (highestCurrentStackpos == -1) {
        highestCurrentStackpos = 0;
    }

    sortCamels("stackpos", true);

    GameState.camels.forEach(element => {
        if (element.moving) {
            element.position = element.position + distance;
            if (highestCurrentStackpos != 0) {
                element.stackpos = highestCurrentStackpos;
            }
            else {
                element.stackpos = 0;
            }
            
            highestCurrentStackpos += 1;
        }
        element.moving = false;
    })
    //sortCamels("color", true);

    CalculateOdds()
}

function MoveFakeCamel(color, distance) {

    camel = initialCamels[0];
    
    // Get camel by color entered
    initialCamels.forEach(element => {
        if (element.color == color) {
            camel = element;
            // initialize camel position
            if (camel.position < 0) {
                camel.position = 0;
                //camel.hasMoved = true;
            }
        }        
    });

    //get all camels at current position
    initialCamels.forEach(element => {
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

    initialCamels.forEach(element => {
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

    sortFakeCamels("stackpos", true);

    initialCamels.forEach(element => {
        if (element.moving) {
            element.position = element.position + distance;
            if (highestCurrentStackpos != 0) {
                element.stackpos = highestCurrentStackpos;
            }
            else {
                element.stackpos = 0;
            }
            highestCurrentStackpos += 1;
        }
        element.moving = false;
    })

}

function CalculateOdds() {
    //reset odds
    initialCamels = JSON.parse(JSON.stringify(GameState.camels))

    initialCamels.forEach(cr => {cr.odds = 0})
    c1m =0;
    c2m=0;
    c3m=0;
    c4m=0;
    c5m=0;

    initialCamels.forEach(camel1 => {
        for (let c1 = 1; c1 <= 3; c1++) {
        initialCamels.forEach(camel2 => {
            for (let c2 = 1; c2 <= 3; c2++) {
            initialCamels.forEach(camel3 => {
                for (let c3 = 1; c3 <= 3; c3++) {
                initialCamels.forEach(camel4 => {
                    for (let c4 = 1; c4 <= 3; c4++) {
                    initialCamels.forEach(camel5 => {
                        for (let c5 = 1; c5 <= 3; c5++) {
                            if (camel1.color != camel2.color && camel1.color != camel3.color && camel1.color != camel4.color && camel1.color != camel5.color){
                                if (camel2.color != camel3.color && camel2.color != camel4.color && camel2.color != camel5.color ) {
                                    if (camel3.color != camel4.color && camel3.color != camel5.color) {
                                        if(camel4.color != camel5.color) {
                                            
                                            if (!camel1.hasMoved) {
                                                MoveFakeCamel(camel1.color, c1);
                                                c1m++;
                                            }
                                            
                                            if (!camel2.hasMoved) {
                                                MoveFakeCamel(camel2.color, c2);
                                                c2m++;
                                            }
                                            if (!camel3.hasMoved) {
                                                MoveFakeCamel(camel3.color, c3);
                                                c3m++;
                                            }
                                            if (!camel4.hasMoved) {
                                                MoveFakeCamel(camel4.color, c4);
                                                c4m++;
                                            }
                                            if (!camel5.hasMoved) {
                                                MoveFakeCamel(camel5.color, c5);
                                                c5m++;
                                            }
                                            winningColor = ""
                                            winningPosition = 0
                                            initialCamels.forEach(element => {
                                                if (element.position + (element.stackpos * 0.1) > winningPosition) {
                                                    winningPosition = element.position + (element.stackpos * 0.1);
                                                    winningColor = element.color;
                                                }
                                            })
                                            initialCamels.forEach(element => {
                                                if (element.color == winningColor) {
                                                    element.odds += 1;
                                                }
                                            })

                                            GameState.camels.forEach(element => {
                                                initialCamels.forEach(camel => {
                                                    if (element.color == camel.color) {
                                                        camel.position = element.position;
                                                        camel.stackpos = element.stackpos;
                                                        //camel.hasMoved = element.hasMoved;
                                                        
                                                    }
                                                })
                                            })
                                            sortFakeCamels("color", true);
                                        }
                                    }
                                }
                            }
                            
                        }
                    })
                }
                })
            }
            })
        }
        })
    }
    })
    GameState.camels.forEach(element => {
        initialCamels.forEach(camel => {
            if (element.color == camel.color) {
                camel.odds = Math.floor( (camel.odds / 29160) * 100);
                element.odds = camel.odds;
            }
        })
        
    })
    console.log(c1m);
    console.log(c2m);
    console.log(c3m);
    console.log(c4m);
    console.log(c5m);
}
