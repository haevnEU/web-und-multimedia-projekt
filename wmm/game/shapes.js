import meta from "./constants.js"

class Shape{    
    #orientation = 0;
    #position_x = 0;
    #position_y = 0;
    #shapeID = 0;
    #shape = [];
    #amountOccupiedBlocks = 0;
    #boardWidth = meta.BOARD_WIDTH;

    #boardHeight = meta.BOARD_HEIGHT;
    #w = 0;
    /**
     * This class provides a complex shape based on an 1D array definition
     * Basic operation are provided by this class
     * - Left/Right rotation
     * - Moving to the left/right/down
     * - Access to the orientation and position
     * 
     * @version 1.1
     * @date Mai 01 2020
     * 
     * @param {Number[]} shape 1D Array of the shape
     * @param {Number} id ID of the shape
     * @param {Number} boardWidth Width of the underlying board
     * @param {Number} boardHeight Height of the underlying board
     */
    constructor(shape, id, w = 12){
        this.#shape = shape;
        this.#shapeID = id;
        this.w = w;
        this.#position_x = Math.floor(this.#boardWidth * 0.5) - 2;
        this.#position_y = 0;
        for(let i = 0; i < shape.length; i++){
            if(shape[i] != 0){
                this.#amountOccupiedBlocks++;
            }
        }
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
    

    /**
     * Access the element of the shape
     * The coordinates specified by x and y must be inside the shapes boundaries
     * @param {Number} x X coordinate of the shape
     * @param {Number} y Y coordinate of the shape
     * @returns State of the element
     */
    getElementAt(x, y){
        return this.#shape[this.#rotate(x, y)];
    }

    getOrientation(){
        return this.#orientation;
    }

    getShapeID(){
        return this.#shapeID;
    }

    getShapeWidth(){
        return meta.SHAPE_SIZE;
    }

    getShapeHeight(){
        return meta.SHAPE_SIZE;
    }
    
    getX(){
        return this.#position_x;
    }

    getY(){
        return this.#position_y;
    }

    getAmountOccupiedBlocks(){
        return this.#amountOccupiedBlocks;
    }   
    
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
     * Make a deep copy of the shape
     * @returns A exact copy of the shape
     */
    copy(){
        let tmpShape = new Shape(this.#shape, this.#shapeID);
        // disable for switching
        //tmpShape.#position_x = this.#position_x;
        //tmpShape.#position_y = this.#position_y;
        tmpShape.#orientation = this.#orientation;
        return tmpShape;
    }

    weight(){
        return this.w;
    }

}

class ShapeHandler{
    #shapes = [   
        new Shape([1, 0, 0, 0,  1, 1, 1, 0,  0, 0, 0, 0,  0, 0, 0, 0], 1, 10),  // blue ricky
        new Shape([0, 0, 2, 0,  2, 2, 2, 0,  0, 0, 0, 0,  0, 0, 0, 0], 2, 11),  // orange ricky
        new Shape([3, 3, 0, 0,  0, 3, 3, 0,  0, 0, 0, 0,  0, 0, 0, 0], 3, 20),  // cleaveland Z
        new Shape([0, 4, 4, 0,  4, 4, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0], 4, 30),  // rhodeisland z
        new Shape([0, 5, 0, 0,  0, 5, 0, 0,  0, 5, 0, 0,  0, 5, 0, 0], 5, 50),  // hero
        new Shape([0, 0, 0, 0,  0, 6, 6, 0,  0, 6, 6, 0,  0, 0, 0, 0], 6, 10),  // smashboy
        new Shape([0, 7, 0, 0,  7, 7, 7, 0,  0, 0, 0, 0,  0, 0, 0, 0], 7, 5)   // teewee
    ];        
//        new Shape([1, 0, 0, 0,  1, 1, 1, 0,  0, 0, 0, 0,  0, 0, 0, 0], 1),  // blue ricky
//        new Shape([0, 0, 2, 0,  2, 2, 2, 0,  0, 0, 0, 0,  0, 0, 0, 0], 2),  // orange ricky
//        new Shape([3, 3, 0, 0,  0, 3, 3, 0,  0, 0, 0, 0,  0, 0, 0, 0], 3),  // cleaveland Z
//        new Shape([0, 4, 4, 0,  4, 4, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0], 4),  // rhodeisland z
//        new Shape([0, 5, 0, 0,  0, 5, 0, 0,  0, 5, 0, 0,  0, 5, 0, 0], 5),  // hero
//        new Shape([0, 0, 0, 0,  0, 6, 6, 0,  0, 6, 6, 0,  0, 0, 0, 0], 6),  // smashboy
//        new Shape([0, 7, 0, 0,  7, 7, 7, 0,  0, 0, 0, 0,  0, 0, 0, 0], 7)   // teewee
        
        //,
        //new Shape([10, 10, 10, 10,  10,  0, 0,  10,   10, 0, 0, 10,  10, 10,  10,  10], 8),   
        //new Shape([11, 11, 0, 11,  11, 11, 0, 11,  11, 11, 11, 11,  11, 0, 11, 0], 9)

    addNewShape(shape, id){
        this.#shapes.push(new Shape(shape, id));
        this.#refreshWeights();
    }
   
    /**
     * This attribute represents the current shape of the game
     */
    #currentShape = this.#shapes[0];
    
    /**
     * This attribute represents the next shape of the game
     */
    #nextShape;

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
     * @version 1.0
     * @date Mai 01 2020 
     */
    constructor(){
        this.#refreshWeights();
        this.#nextShape = this.#shapes[this.#nextID()];
    }

    getCurrentShape(){
        return this.#currentShape;
    }

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
        if(null == this.#nextShape || undefined == this.#nextShape){
            this.#nextShape = this.#shapes[this.#nextID()];
        }
        this.#currentShape = this.#nextShape.copy();
        let id = this.#nextID();
        if(id < 0){
            id *= -1;
            id %= this.#shapes.length;
        }

        this.#nextShape = this.#shapes[id].copy();
        this.#switched = false;
    }

    /**
     * Switches the current shape with the next one
     */
    switchShapes(){
        if(this.#switched){
            return;
        }
        let tmp = this.#nextShape.copy();
        this.#nextShape = this.#currentShape.copy();
        this.#currentShape = tmp.copy();
        this.#switched = true;
    }

    getShapes(){
        return this.#shapes;
    }



    sum_of_weight = 0;
    #refreshWeights(){
        this.sum_of_weight = 0;
        for(let i = 0; i < this.#shapes.length; i++) {
           this.sum_of_weight += this.#shapes[i].weight();
        }
    }

    #nextID(){        
        let rnd =  (Math.floor(Math.random() * this.sum_of_weight));
        for(let i = 0; i < this.#shapes.length; i++){
            if(rnd < this.#shapes[i].weight()){
                return i;
            }
            rnd -= this.#shapes[i].weight();
        }
        let rng = (Math.floor(Math.random() * 41368) ^ Date.now()) % this.#shapes.length;
        return rnd;
    }

}
export{Shape, ShapeHandler}