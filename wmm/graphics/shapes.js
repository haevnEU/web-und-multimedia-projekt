class Shape{
    /**
     * Width of the shape
     */
    #shapeWidth = 4;
    
    /**
     * Height of the shape
     */
    #shapeHeight = 4;
    
    /**
     * Current orientation of the shape
     */
    #orientation = 0;

    /**
     * 
     */
    #position_x = 0;
    #position_y = 0;
    
    /**
     * ID of the shape, should be in range from 0 to 8
     */
    #shapeID = 0;

    /**
     * Actual shape array
     */
    #shape = [];

    /**
     * Width of the game board
     */
    #boardWidth;

    /**
     * Height of the game board 
     */
    #boardHeight;
    
    /**
     * This class provides a complex shape based on an 1D array definition
     * Basic operation are provided by this class
     * - Left/Right rotation
     * - Moving to the left/right/down
     * - Access to the orientation and position
     * 
     * @author haevn
     * @version 1.0
     * @date Mai 01 2020
     * 
     * @param {Number[]} shape 1D Array of the shape
     * @param {Number} id ID of the shape
     * @param {Number} boardWidth Width of the underlying board
     * @param {Number} boardHeight Height of the underlying board
     */
    constructor(shape, id, boardWidth, boardHeight){
        this.#shape = shape;
        this.#shapeID = id;
        this.#boardWidth = boardWidth;
        this.#boardHeight = boardHeight;
        this.#position_x = Math.floor(boardWidth * 0.5);
    }

// Internal methods

    /**
     * INTERNAL
     * Map the x and y coordinates, with respect to the orientation, to an 1D array.
     * There are four possible orientation.
     * - 0°     First right rotation
     * - 90°    Second right rotation
     * - 180°   Third right rotation
     * - 270°   Fourth right rotation
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     * @returns Mapped index of the x/y coordinates
     */
    #rotate(x, y){
        switch(this.#orientation){
            case 0: return x + (4 * y);
            case 1: return 12 - (4 * x) + y;
            case 2: return 15 - x - (4 * y);
            case 3: return 3 + (4 * x) - y;            
        }
    }

    /**
     * INTERNAL
     * Verifies if the point specified by the x and y coordinates is inside the shape boundaries.
     * To be in range of the shape boundaries the following statements must be fulfilled
     * 1. x >= 0 and x < 4
     * 2. y >= 0 and y < 4
     * @param {Number} x X coordinate to validate
     * @param {Number} y Y coordinate to validate
     * @returns true if the point is inside the boundaries
     */
    #checkBoundary(x, y){
        return x >= 0 && x < 4 && y >= 0 && x < 4;
    }

// Public methods

    /**
     * Moves the shape to the left side
     * If the position will be less than 0 the operation will abort
     */
    moveLeft(){
        if(this.#position_x >= 0){
            this.#position_x--;
        }
    }

    /**
     * Moves the shape to the right side
     * If the position will be greater than the board width the operation will abort
     */
    moveRight(){
        if(this.#position_x < this.#boardWidth){
            this.#position_x++;
        }
    }
    
    /**
     * Moves the shape down
     * If the position will be greater than the board height the operation will abort
     */
     moveDown(){
        if(this.#position_y < this.#boardHeight){
            this.#position_y++;
        }
    }

    /**
     * Rotates the block 90° to the left
     */
    rotateLeft(){
        this.#orientation--;
        if(this.#orientation < 0){
            this.#orientation = 3;
        }
    }

    /**
     * Rotates the block 90° to the right
     */
    rotateRight(){
        this.#orientation = (this.#orientation + 1) % 4;
    }

    /**
     * Access the element of the shape
     * The coordinates specified by x and y must be inside the shapes boundaries
     * @param {Number} x X coordinate of the shape
     * @param {Number} y Y coordinate of the shape
     * @returns State of the element
     */
    getElement(x, y){
        if(!this.#checkBoundary(x, y)){
           return; 
        }
        return this.#shape[this.#rotate(x, y)];
    }

    /**
     * Access the orientation
     * @returns Orientation of the shape
     */
    getOrientation(){
        return this.#orientation;
    }

    /**
     * Access the shape ID
     * @returns ID of the shape
     */
    getShapeID(){
        return this.#shapeID;
    }

    /**
     * Access the width 
     * @returns Width of the shape
     */
    getShapeWidth(){
        return this.#shapeWidth;
    }

    /**
     * Access the height
     * @returns Height of the shape
     */
    getShapeHeight(){
        return this.#shapeHeight;
    }

    

    /**
     * Access the x position
     * @returns X coordinate of the shape
     */
    getX(){
        return this.#position_x;
    }

    /**
     * Access the y position
     * @returns Y coordinate of the shape
     */
    getY(){
        return this.#position_y;
    }

    /**
     * Copies a shape
     * @returns Copied shape
     */
    copy(){
        let tmpShape = new Shape(this.#shape, this.#shapeID, this.#boardWidth, this.#boardHeight);
        tmpShape.#orientation = this.#orientation;
        return tmpShape;
    }

    /**
     * Sets the board dimension
     * @param {Number} width Width of the board
     * @param {Number} height Height of the board
     */
    setBoardDimensions(width, height){
        this.#boardWidth = width;
        this.#boardHeight = height;
    }
}

class ShapeHandler{

    #amountShapes = 8;
    
    #blueRicky = new Shape(   [1, 0, 0, 0,  1, 1, 1, 0,  0, 0, 0, 0,  0, 0, 0, 0], 1);
    #orangeRIcky = new Shape( [0, 0, 2, 0,  2, 2, 2, 0,  0, 0, 0, 0,  0, 0, 0, 0], 2);
    #cleaveLandZ = new Shape( [3, 3, 0, 0,  0, 3, 3, 0,  0, 0, 0, 0,  0, 0, 0, 0], 3);
    #rhodeIslandZ = new Shape([0, 4, 4, 0,  4, 4, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0], 4);
    #hero = new Shape(        [5, 0, 0, 0,  5, 0, 0, 0,  5, 0, 0, 0,  5, 0, 0, 0], 5);
    #smashboy = new Shape(    [0, 0, 0, 0,  0, 6, 6, 0,  0, 6, 6, 0,  0, 0, 0, 0], 6);
    #teewee = new Shape(      [0, 7, 0, 0,  7, 7, 7, 0,  0, 0, 0, 0,  0, 0, 0, 0], 7);
    #baum = new Shape(      [1, 2, 5, 0,  8, 6, 5, 3,  3, 3, 8, 0,  0, 0, 1, 0], 8);
 
    /**
     * Simple access to shapes via IDs
     */
    #shapes = [this.#blueRicky, this.#orangeRIcky, this.#cleaveLandZ, this.#rhodeIslandZ, this.#hero, this.#smashboy, this.#teewee, this.#baum];
    
    /**
     * This attribute represents the current shape of the game
     */
    #currentShape = this.#shapes[0];
    
    /**
     * This attribute represents the next shape of the game
     */
    #nextShape = this.#shapes[Math.floor(Math.random() * 1000) % this.#amountShapes];

    /**
     * Tracks if the shape was switched
     */
    #switched = false;

    /**
     * This class provides an handler for all possible shapes.
     * Basic operations are provided
     * - Access to current and next shape
     * - New shape generation
     * 
     * @author haevn
     * @version 1.0
     * @date Mai 01 2020
     * @param {Number[]} shape 1D Array of the shape
     * 
     * @param {Number} boardWidth Width of the underlying board
     * @param {Number} boardHeight Height of the underlying board
     */
    constructor(boardWidth, boardHeight){
        this.#blueRicky.setBoardDimensions(boardWidth, boardHeight);  
        this.#orangeRIcky.setBoardDimensions(boardWidth, boardHeight);  
        this.#cleaveLandZ.setBoardDimensions(boardWidth, boardHeight);  
        this.#rhodeIslandZ.setBoardDimensions(boardWidth, boardHeight);  
        this.#hero.setBoardDimensions(boardWidth, boardHeight);  
        this.#smashboy.setBoardDimensions(boardWidth, boardHeight);  
        this.#teewee.setBoardDimensions(boardWidth, boardHeight);  
        this.#baum.setBoardDimensions(boardWidth, boardHeight);  
    }

    /**
     * This method returns the current shape
     * @returns Returns the current shape
     */
    getCurrentShape(){
        return this.#currentShape;
    }

    /**
     * This method returns the next shape
     * @returns Returns the next shape
     */
    getNextShape(){
        return this.#nextShape;
    }

    /**
     * This method creates a new shape.
     * Two operations will be performed
     *  - Reassign the current shape to next one
     *  - Create new shape as next one
     */
    createNewShape(){
        alert("DEBUG");
        this.#currentShape = this.#nextShape.copy();
        let id = (Math.floor(Math.random() + 43159) ^ Date.now()) % this.#amountShapes;
        if(id < 0){
            id *= -1;
            id %= this.#amountShapes;
        }
        this.#nextShape = this.#shapes[id].copy();
    }

    /**
     * Switches the current shape with the next one
     */
    switchShapes(){
        let tmp = this.#nextShape.copy();
        this.#nextShape = this.#currentShape.copy();
        this.#currentShape = tmp.copy();
    }

}
export{Shape, ShapeHandler}