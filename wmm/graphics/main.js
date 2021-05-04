import {Game} from "./game.js";

console.log("ADD LISTENER");

let game = new Game();
setInterval(loop, 100);

document.onkeydown = function(event){
    let key = event.key;
    game.onKey(key);
    if(key == "Enter"){
        setState();
    }
}

function loop(){
    game.handleLogic();
    game.render();
}

function start(){
    game.start();
}

function pause(){
    game.pause();
}
