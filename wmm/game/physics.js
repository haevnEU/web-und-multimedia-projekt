import {Shape, ShapeHandler} from "./shapes.js"
import {Board} from "./board.js"

class Physics{
    constructor(){

    }

doesCollideDrop(shape,board){
let shapeX = shape.getX();
let shapeY = shape.getY()+1;

for(let x=0;x<4;x++){
    for(let y=0;y<4;y++){
        if(shape.getElement(x,y)!=0){
            if(board.getBoardElementAt(shapeX+x,shapeY+y)!=0){
                return true;
            }
        }
    }
}
}

doesCollideSlideLeft(shape,board){
    let shapeX = shape.getX();
    let shapeY = shape.getY();

        for(let y=0;y<4;y++){
            for(let x=0;x<4;x++){
                if(shape.getElement(x,y)!=0){
                    if(board.getBoardElementAt(shapeX+x-1,shapeY+y)){
                return true;
                    }
                }
            }
        }
    }

doesCollideSlideRight(shape,board){
    let shapeX = shape.getX();
    let shapeY = shape.getY();

        for(let y=0;y<4;y++){
            for(let x=0;x<4;x++){
                if(shape.getElement(x,y)!=0){
                    if(board.getBoardElementAt(shapeX+x+1,shapeY+y)){
                return true;
                    }
                }
            }
        }
}

doesCollideRotate



}
export{Physics};