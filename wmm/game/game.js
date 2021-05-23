import {Shape, ShapeHandler} from "./shapes.js"
import {Board} from "./board.js"
import {Physics} from "./physics.js"
import {Renderer} from "./render.js"
import meta from "./constants.js"


class Game{

    #showShapes = false;

    #paused = false; 
    #lastTime = 10;
    #physics = new Physics();
    #renderer = new Renderer();
    #board = new Board(20, 30);    
    #shapeHandler = new ShapeHandler(meta.BOARD_WIDTH, meta.BOARD_HEIGHT); 
    
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
        }else if(key == "g"){
            this.#showShapes = !this.#showShapes;
        }
    }

    start(){
        this.#paused = false;
    }

    pause(){
        this.#paused = true;
    }

    
    handleLogic(){
        if(this.#paused){
            return;
        }
       
        let shape = this.#shapeHandler.getCurrentShape();
        if(this.#lastTime <= 0){
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

        if(this.#showShapes){
            this.#renderer.renderAllShapes(this.#shapeHandler.getShapes());
            return;
        }

        this.#renderer.renderBoard(this.#board);
        this.#renderer.renderShape(this.#shapeHandler.getCurrentShape());
        this.#renderer.renderShapePreview(this.#shapeHandler.getNextShape(), this.#board);            
    }

}

export {Game}
