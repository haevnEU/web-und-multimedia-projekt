import {Shape, ShapeHandler} from "./shapes.js"
import {Board} from "./board.js"
<<<<<<< Updated upstream
import {Theme, ThemeHandler} from "./theme.js"
=======
import {Physics} from "./physics.js"
import {Renderer} from "./render.js"
import meta from "./constants.js"
>>>>>>> Stashed changes


class Game{
<<<<<<< Updated upstream
    
    #board = new Board(20, 30);
    #theme = new ThemeHandler();
    #shapeHandler = new ShapeHandler(20, 30); 

    #blockSize = 25;
    #paused = false;
=======
    #paused = false; 
    #lastTime = 10;
    #physics = new Physics();
    #renderer = new Renderer();
    #board = new Board(20, 30);    
    #shapeHandler = new ShapeHandler(meta.BOARD_WIDTH, meta.BOARD_HEIGHT); 
>>>>>>> Stashed changes
    
    constructor(){    
        meta.fieldCanvas.width = window.innerWidth * 0.7;
        meta.fieldCanvas.height = window.innerHeight * 0.9;    
        this.#shapeHandler.createNewShape();
    }

    onKey(key){
        key = key.toLowerCase();
        if(key == "escape"){
            this.#paused ? this.start() : this.pause();
        }else if(key == "a" && this.#physics.canShapeMoveLeft(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#shapeHandler.getCurrentShape().moveLeft();   
        }else if(key == "d" && this.#physics.canShapeMoveRight(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#shapeHandler.getCurrentShape().moveRight();
        }else if(key == "s" && this.#physics.canShapeMoveDown(this.#shapeHandler.getCurrentShape(), this.#board)){
            this.#shapeHandler.getCurrentShape().moveDown();
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

<<<<<<< Updated upstream
    #lastTime = 10;
=======
    
>>>>>>> Stashed changes
    handleLogic(){
        if(this.#paused){
            return;
        }
       
        let shape = this.#shapeHandler.getCurrentShape();
        if(this.#lastTime <= 0){
<<<<<<< Updated upstream
            this.#shapeHandler.getCurrentShape().moveDown();
            this.#lastTime = 10;
        }
        this.#lastTime--;
        // TODO 

        let shapeY = this.#shapeHandler.getCurrentShape().getY();
        let shapeX = this.#shapeHandler.getCurrentShape().getX();
            for(let y = 0;y < 4; y++){
                console.log(copyBoard.getBoardElementAt(shapeX, shapeY + y + 1));
                if(copyBoard.getBoardElementAt(shapeX, shapeY + y + 1) != 0){
                    console.log("COLLISION");
                }
        }


        if(execute){
            this.#board = copyBoard.copyBoard();
        }        
=======
            if(this.#physics.canShapeMoveDown(this.#shapeHandler.getCurrentShape(), this.#board)){
                shape.moveDown();
            }else{
				for (let x = 0; x < 4; x++){
                    for (let y = 0; y < 4; y++){
                        if (shape.getElementAt(x, y) != 0){
                            this.#board.setElementAt(shape.getX() + x, shape.getY() + y, shape.getElementAt(x, y));
                        }
                    }
                }

                
                this.#shapeHandler.createNewShape();
                
            }
            this.#lastTime = 10;
        }
        this.#lastTime--;
>>>>>>> Stashed changes
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

        this.#renderer.renderBoard(this.#board);
        this.#renderer.renderShape(this.#shapeHandler.getCurrentShape());
        this.#renderer.renderShapePreview(this.#shapeHandler.getNextShape(), this.#board);            
    }

}

<<<<<<< Updated upstream
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
=======
export {Game}
>>>>>>> Stashed changes
