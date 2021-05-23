import {Game} from "./game.js";

let game = new Game();
setInterval(loop, 30);

document.onkeydown = function(event){
    let key = event.key;
    game.onKey(key);
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
