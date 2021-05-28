import {Shape, ShapeHandler} from "./shapes.js"
import {Board} from "./board.js"
import {Physics} from "./physics.js"
import {Renderer} from "./render.js"
import meta from "./constants.js"


class Game{

    #showShapes = false;
    #score = 0;
    #level = 1;
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
        meta.fieldCanvas.width = window.innerWidth * 0.69;
        meta.fieldCanvas.height = window.innerHeight * 0.9;    
        this.#shapeHandler.createNewShape();
    }

    init(json){
        let obj = JSON.parse(json);      
        this.#board.loadFromString(obj.board);
        this.#level = obj.level;
        this.#score = obj.score;
        this.#removedLines = obj.lines;
        this.#shapeHandler.loadShapesFromJSONArray(obj.shapes[0], obj.shapes[1]);
    }
    
    exportToJson(){
        return JSON.stringify(
            {  board: this.#board.toString(),
                level: this.#level,
                score: this.#score,
                lines: this.#removedLines,
                shapes: [{
                    posX: this.#shapeHandler.getCurrentShape().getX(),
                    posY: this.#shapeHandler.getCurrentShape().getY(),
                    orientation: this.#shapeHandler.getCurrentShape().getOrientation(),
                    ID: this.#shapeHandler.getCurrentShape().getShapeID()
                }, {
                    posX: this.#shapeHandler.getNextShape().getX(),
                    posY: this.#shapeHandler.getNextShape().getY(),
                    orientation: this.#shapeHandler.getNextShape().getOrientation(),
                    ID: this.#shapeHandler.getNextShape().getShapeID()
                }]
            });
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
        }else if(key == "d" && this.#physics.canShapeMoveRight(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#shapeHandler.getCurrentShape().moveRight();
        }else if(key == "s" && this.#physics.canShapeMoveDown(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#moveShapeDown(this.#shapeHandler.getCurrentShape());
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

    writeToDataBase(){
        window.location.href = "http://localhost/accounting/usermod.php?score=" + this.#score;
    }

    #convertClearedLinesToScore(lines){
        if(lines == 1){
            return 40 * this.#level;
        }else if(lines == 2){
            return 100 * this.#level;
        }else if(lines == 3){
            return 300 * this.#level;
        }else if(lines == 4){
            return 1200 * this.#level;
        }else return 0;
    }

    #moveShapeDown(shape){
        if(this.#physics.canShapeMoveDown(this.#shapeHandler.getCurrentShape(), this.#board)){
            shape.moveDown();
        }else{ 
            this.#score += shape.getAmountOccupiedBlocks();
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
       
        let shape = this.#shapeHandler.getCurrentShape();
        if(this.#lastTime <= 0){
            this.#moveShapeDown(shape);
            this.#lastTime = 30 - this.#level;
            this.#level = 25;
        }
        this.#lastTime--;
    }

    render(){          
        // This is used to resize the canvas, maybe theres a better solution like an event which is fires if the windows is resized
        meta.fieldCanvas.width = window.innerWidth * 0.69;
        meta.fieldCanvas.height = window.innerHeight;
        
        this.#renderer.clear();
   

        if(this.#showShapes){
            this.#renderer.renderAllShapes(this.#shapeHandler.getShapes());
            return;
        }

        this.#renderer.renderBoard(this.#board);
        this.#renderer.renderShape(this.#shapeHandler.getCurrentShape());
        this.#renderer.renderShapePreview(this.#shapeHandler.getNextShape(), this.#board);  
        this.#renderer.renderText("Score: " + this.#score + "\n\nLevel: " + this.#level + "\n\nLines: " + this.#removedLines);          
         if(this.#paused){
            this.#renderer.renderPauseMenu();
            return;
        }

        if(this.#gameOver){
            this.#renderer.renderGameOverScreen(this.#score, this.#removedLines, this.#level);
            return;
        }
    }

}

export {Game}
