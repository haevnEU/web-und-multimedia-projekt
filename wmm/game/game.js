import {Shape, ShapeHandler} from "./shapes.js"
import {Board} from "./board.js"
import {Theme, ThemeHandler} from "./theme.js"
import {Physics} from "./physics.js"

import {DebugTools} from "./debug_tools.js"

class Game{
    
    #board = new Board(20, 30);
    #theme = new ThemeHandler();
    #shapeHandler = new ShapeHandler(20, 30); 
    #physics = new Physics();

    #blockSize = 25;
    #paused = false;
    
    #fieldCanvas = document.getElementById('fieldCanvas');  
    #context = fieldCanvas.getContext('2d');

    constructor(){    
        this.#fieldCanvas.width = window.innerWidth * 0.7;
        this.#fieldCanvas.height = window.innerHeight * 0.9;
    
        this.#shapeHandler.createNewShape();
        this.#theme.setTheme("default");
    }

    onKey(key){
        if(key == "Escape"){
            this.#paused ? this.start() : this.pause();
        }else if(key == "a" || key == "A"){
            if(this.#physics.doesCollideSlideLeft(this.#shapeHandler.getCurrentShape(),this.#board)){

            }else{
                this.#shapeHandler.getCurrentShape().moveLeft();
            }
        }else if(key == "d" || key == "D"){
            if(this.#physics.doesCollideSlideRight(this.#shapeHandler.getCurrentShape(),this.#board)){
                
            }else{
                this.#shapeHandler.getCurrentShape().moveRight();
            }
        }else if(key == "s" || key == "S"){
            if(this.#physics.doesCollideDrop(this.#shapeHandler.getCurrentShape(),this.#board)){
                
            }else{
                this.#shapeHandler.getCurrentShape().moveDown();
            }
        }else if(key == "q" || key == "Q"){
            this.#shapeHandler.getCurrentShape().rotateLeft();
        }else if(key == "e" || key == "E"){
            this.#shapeHandler.getCurrentShape().rotateRight();
        }else if(key == " "){
            
        }else if(key == "1"){
            this.#shapeHandler.createNewShape();
        }else if(key == "2"){
            this.#shapeHandler.switchShapes();
        }else if(key == "3"){
            this.#shapeHandler.DEBUG_setShape(8);
        }
    }

    start(){
        DebugTools.updateState("Running");
        this.#paused = false;
    }

    pause(){
        DebugTools.updateState("Paused");
        this.#paused = true;
    }

    #lastTime = 10;

    handleLogic(){
        if(this.#paused){
            return;
        }
        let copyBoard = this.#board.copyBoard();
        let execute = false;
        if(this.#lastTime <= 0){
            if(this.#physics.doesCollideDrop(this.#shapeHandler.getCurrentShape(),this.#board)){
                let shapeX = this.#shapeHandler.getCurrentShape().getX();
                let shapeY = this.#shapeHandler.getCurrentShape().getY();

                for(let x=0;x<4;x++){
                    for(let y=0;y<4;y++){
                        if(this.#shapeHandler.getCurrentShape().getElement(y,x)!=0){
                            this.#board.setBoardElement(shapeX+y,shapeY+x,this.#shapeHandler.getCurrentShape().getShapeID());
                            
                        }
                    }
                }
                this.#shapeHandler.createNewShape();
            }
            else{
                this.#shapeHandler.getCurrentShape().moveDown();
            }
            this.#lastTime = 10;
        }
        
        this.#lastTime--;
        // TODO


        if(execute){
            this.#board = copyBoard.copyBoard();
        }        
    }

    render(){
        //Clears the screen
        this.#context.clearRect(0,0, this.#fieldCanvas.width, this.#fieldCanvas.height);
        this.#fieldCanvas.width = window.innerWidth * 0.7;
        this.#fieldCanvas.height = window.innerHeight * 0.9;
        this.#context.fillStyle = this.#theme.getTheme().getBackgroundColor();
        this.#context.fillRect(0, 0, this.#fieldCanvas.width, this.#fieldCanvas.height);
        //Render pause screen (if required)
        if(this.#paused){
            this.#context.fillStyle = this.#theme.getTheme().getFontColor();
            this.#context.font = '62px arial';
            this.#context.textAlign = 'center';
            this.#context.textBaseline = 'middle';
            this.#context.fillText('PAUSE', this.#fieldCanvas.width * 0.5, this.#fieldCanvas.height * 0.3);
            this.#context.font = '26px arial';
            this.#context.fillText('HIT ESC TO CONTINUE', this.#fieldCanvas.width * 0.5, this.#fieldCanvas.height * 0.3 + 80);
            return;
        }
        //Render board
        for(let x = 0; x <= this.#board.getBoardWidth(); x++){
            for(let y = 0; y <= this.#board.getBoardHeight(); y++){
                let color = this.#board.getBoardElementAt(x, y);
                this.#context.fillStyle = this.#theme.getTheme().getBlockColorByID(color);
                this.#context.fillRect(this.#blockSize + (x * this.#blockSize), this.#blockSize + (y * this.#blockSize), this.#blockSize, this.#blockSize);
            }
        }
        //Render shape
        for(let x = 0; x < 4; x++){
            for(let y = 0; y < 4; y++){
                let color = this.#shapeHandler.getCurrentShape().getElement(x, y);
                this.#context.fillStyle = this.#theme.getTheme().getBlockColorByID(color);
               
                this.#context.fillRect((this.#shapeHandler.getCurrentShape().getX() * this.#blockSize+25) + (x * this.#blockSize),
                (this.#shapeHandler.getCurrentShape().getY() * this.#blockSize)+ (y * this.#blockSize),this.#blockSize, this.#blockSize);
         
            }
        }
        //Renders next Block
        let previewDimension = Math.floor(this.#blockSize * 0.7);
        for(let x = 0; x < this.#shapeHandler.getNextShape().getShapeWidth(); x++){
            for(let y = 0; y < this.#shapeHandler.getNextShape().getShapeHeight(); y++){
                let color = this.#shapeHandler.getNextShape().getElement(x, y);
                this.#context.fillStyle = this.#theme.getTheme().getBlockColorByID(color);
               
                this.#context.fillRect(this.#blockSize * (this.#board.getBoardWidth() + 5)  + (x * previewDimension),
                 (2*this.#blockSize) + y * previewDimension,
                 previewDimension, previewDimension);
         
            }
        }
    }

}

export {Game}

/*
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 4 0 3 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 4 0 3 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 4 0 3 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 4 0 3 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
*/