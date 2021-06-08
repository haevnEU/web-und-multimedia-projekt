import meta from "./constants.js"
import {Board} from "./board.js"
import {Physics} from "./physics.js"
import {Renderer} from "./render.js"
import {Shape, ShapeHandler} from "./shapes.js"


class Game{

    #paused = false; 
    #gameOver = false;
    
    #score = 0;
    #level = 0;
    #SoftDropScore =0;
    #removedLines = 0;

    #timerInterval = 30;
    #nextLevel = Math.floor(new Date() / 1000) + 10;
    
    #physics = new Physics();
    #renderer = new Renderer();
    #board = new Board(20, 30);    
    #shapeHandler = new ShapeHandler(); 
    #gameOver = false;
    #scoreGoal = 400;
    #scoreGoalIncrement = 400;
    constructor(){    
        meta.fieldCanvas.width = window.innerWidth * 0.7;
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
        this.pause();
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
    
    onKey(key){
        key = key.toLowerCase();
         if(key == "escape" && !this.#gameOver){
            this.#paused ? this.start() : this.pause();
        }else if(key == "n"){
            this.#INTERNAL_reset();
        }
        
        if(this.#gameOver || this.#paused){
            return;
        }
        if(key == "a" && this.#physics.canShapeMoveLeft(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#shapeHandler.getCurrentShape().moveLeft();   
            this.#SoftDropScore = 0;   
        }else if(key == "d" && this.#physics.canShapeMoveRight(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#shapeHandler.getCurrentShape().moveRight();
            this.#SoftDropScore = 0;
        }else if(key == "s" && this.#physics.canShapeMoveDown(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#INTERNAL_moveShapeDown(this.#shapeHandler.getCurrentShape());
            this.#SoftDropScore += 1;
        }else if(key == "q" && this.#physics.canShapeRotatedLeft(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#shapeHandler.getCurrentShape().rotateLeft();
        }else if(key == "e" && this.#physics.canShapeRotatedRight(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#shapeHandler.getCurrentShape().rotateRight();
        }else if(key == " "){
            this.#shapeHandler.switchShapes();
        }
    }

    start(){
        this.#paused = false;
    }

    pause(){
        this.#paused = true;
    }


    #INTERNAL_reset(){
        this.#board = new Board();
        this.#shapeHandler.createNewShape();
        this.#gameOver = false;  
        this.#score = 0;
        this.#level = 1;
        this.#removedLines = 0;
        this.start();
    }

    #INTERNAL_currentSeconds(){
        return Math.floor(new Date() / 1000);
    }

    #nextLevelIn(seconds){
        return this.#INTERNAL_currentSeconds() + seconds;
    }

    #INTERNAL_writeToDataBase(){
        window.location.href = "http://localhost/accounting/usermod.php?score=" + this.#score;
    }

    #INTERNAL_convertClearedLinesToScore(lines){
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

    #INTERNAL_moveShapeDown(shape){
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
                this.#score += this.#INTERNAL_convertClearedLinesToScore(lines);
            }
        }
    }
    
    handleLogic(){
        if(this.#paused || this.#gameOver){
            return;
        }
        while(this.#score >= this.#scoreGoal){
          this.#level+=1;
          this.#scoreGoalIncrement += (this.#level+1)*100;
          this.#scoreGoal += this.#scoreGoalIncrement;
        }
       
        let shape = this.#shapeHandler.getCurrentShape();
        if(this.#lastTime <= 0){
            this.#moveShapeDown(shape);
            if(this.#level < 17){
            this.#lastTime = 20 - this.#level;
        }else{
            this.#lastTime = 3
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
