import {Shape, ShapeHandler} from "./shapes.js"
import {Board} from "./board.js"
import {Physics} from "./physics.js"
import {Renderer} from "./render.js"
import meta from "./constants.js"


class Game{

    #showShapes = false;
    #score = 0;
    #level = 1;
    #SoftDropScore =0;
    #removedLines = 0;
    #paused = false; 
    #lastTime = 30;
    #physics = new Physics();
    #renderer = new Renderer();
    #board = new Board(20, 30);    
    #shapeHandler = new ShapeHandler(); 
    #nextLevel = Math.floor(new Date() / 1000) + 10;
    #gameOver = false;
    constructor(){    
        meta.fieldCanvas.width = window.innerWidth * 0.7;
        meta.fieldCanvas.height = window.innerHeight * 0.9;    
        this.#shapeHandler.createNewShape();
    }

    #currentSeconds(){
        return Math.floor(new Date() / 1000);
    }

    #nextLevelIn(seconds){
        return this.#currentSeconds() + seconds;
    }

    onKey(key){
        key = key.toLowerCase();
        if(key == "escape" && !this.#gameOver){
            this.#paused ? this.start() : this.pause();
        }else if(key == "a" && this.#physics.canShapeMoveLeft(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#shapeHandler.getCurrentShape().moveLeft();
            this.#SoftDropScore = 0;   
        }else if(key == "d" && this.#physics.canShapeMoveRight(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#shapeHandler.getCurrentShape().moveRight();
            this.#SoftDropScore = 0;
        }else if(key == "s" && this.#physics.canShapeMoveDown(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#moveShapeDown(this.#shapeHandler.getCurrentShape());
            this.#SoftDropScore += 1*(this.#level+1);
        }else if(key == "q" && this.#physics.canShapeRotatedLeft(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#shapeHandler.getCurrentShape().rotateLeft();
        }else if(key == "e" && this.#physics.canShapeRotatedRight(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#shapeHandler.getCurrentShape().rotateRight();
        }else if(key == " "){
            this.#shapeHandler.switchShapes();
        }else if(key == "g"){
            this.#showShapes = !this.#showShapes;
        }else if(key == "n"){
            this.#board = new Board();
            this.#shapeHandler.createNewShape();
            this.#gameOver = false;  
            this.#score = 0;
            this.#level = 1;
            this.#removedLines = 0;
        }
    }

    start(){
        this.#paused = false;
    }

    pause(){
        this.#paused = true;
    }

    #convertClearedLinesToScore(lines){
        if(lines == 1){
            return 40* (this.#level+1);
        }else if(lines == 2){
            return 100* (this.#level+1);
        }else if(lines == 3){
            return 300* (this.#level+1);
        }else if(lines == 4){
            return 1200* (this.#level+1);
        }else return 0;
    }


    #moveShapeDown(shape){
        if(this.#physics.canShapeMoveDown(this.#shapeHandler.getCurrentShape(), this.#board)){
            shape.moveDown();
        }else{ 
            this.#score += this.#SoftDropScore;
            this.#SoftDropScore = 0;
            for (let x = 0; x < 4; x++){
                for (let y = 0; y < 4; y++){
                    if (shape.getElementAt(x, y) != 0){
                        this.#board.setElementAt(shape.getX() + x, shape.getY() + y, shape.getElementAt(x, y));
                    }
                }
            }
            this.#shapeHandler.createNewShape();   
            this.#gameOver = !this.#physics.canShapeMoveDown(this.#shapeHandler.getCurrentShape(), this.#board);
            let lines = this.#physics.canLinesBeRemoved(this.#board);
            if(lines > 0){
                this.#removedLines += lines;
                this.#score += this.#convertClearedLinesToScore(lines);
            }
        }
    }
    
    handleLogic(){
        if(this.#paused || this.#gameOver){
            return;
        }

        this.#level = this.#score /400 - this.#score /400 % 1;
       
        let shape = this.#shapeHandler.getCurrentShape();
        if(this.#lastTime <= 0){
            this.#moveShapeDown(shape);
            if(this.#level < 17){
            this.#lastTime = 20 - this.#level;
        }else{
            this.#lastTime = 3
        }
    }
        this.#lastTime--;
    }

    render(){          
        // This is used to resize the canvas, maybe theres a better solution like an event which is fires if the windows is resized
        meta.fieldCanvas.width = window.innerWidth * 0.7;
        meta.fieldCanvas.height = window.innerHeight * 0.9;
        
        this.#renderer.clear();
        if(this.#paused){
            this.#renderer.renderPauseMenu();
            return;
        }

        if(this.#gameOver){
            this.#renderer.renderGameOverScreen(this.#score, this.#removedLines, this.#level);
            return;
        }

        if(this.#showShapes){
            this.#renderer.renderAllShapes(this.#shapeHandler.getShapes());
            return;
        }

        this.#renderer.renderBoard(this.#board);
        this.#renderer.renderShape(this.#shapeHandler.getCurrentShape());
        this.#renderer.renderShapePreview(this.#shapeHandler.getNextShape(), this.#board);  
        this.#renderer.renderText("Score: " + this.#score + "\n\nLevel: " + this.#level + "\n\nLines: " + this.#removedLines);          
    }

}

export {Game}
