import meta from "./constants.js"

class Shape {
    #shape = [];

    #shapeID = 0;
    #positionX = 0;
    #positionY = 0;
    #orientation = 0;
    #probabilityWeight = 0;
    #amountOccupiedBlocks = 0;
    #boardWidth = meta.BOARD_WIDTH;
    #boardHeight = meta.BOARD_HEIGHT;

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
     * @param {Number} probabilityWeight Weight how often the shape should be used
     */
    constructor(shape, id, probabilityWeight = 12) {
        this.#shape = shape;
        this.#shapeID = id;
        this.#probabilityWeight = probabilityWeight;
        this.#positionX = Math.floor(this.#boardWidth * 0.5) - 1;
        this.#positionY = 1;
        for (let i = 0; i < shape.length; i++) {
            if (shape[i] !== 0) {
                this.#amountOccupiedBlocks++;
            }
        }
    }

    /**
     * Make a deep copy of the shape
     * @returns A exact copy of the shape
     */
    copy() {
        let tmpShape = new Shape(this.#shape, this.#shapeID);
        // disable for switching
        //tmpShape.#positionX = this.#positionX;
        //tmpShape.#positionY = this.#positionY;
        tmpShape.#orientation = this.#orientation;
        return tmpShape;
    }

    /**
     * Initializes this shape with given parameter
     * @param {Number} posX X Coordinate where the shape is located
     * @param {Number} posY Y Coordinate where the shape is located
     * @param {Number} orientation Orientation from the shape (Range 0 - 3)
     * @param {Number} ID ID of the shape
     */
    init(posX, posY, orientation, ID) {
        this.#positionX = posX;
        this.#positionY = posY;
        this.#shapeID = ID;
        this.#orientation = orientation;
    }


    getX() {
        return this.#positionX;
    }

    getY() {
        return this.#positionY;
    }

    getOrientation() {
        return this.#orientation;
    }

    getShapeID() {
        return this.#shapeID;
    }

    getShapeWidth() {
        return meta.SHAPE_SIZE;
    }

    getShapeHeight() {
        return meta.SHAPE_SIZE;
    }

    getAmountOccupiedBlocks() {
        return this.#amountOccupiedBlocks;
    }

    weight() {
        return this.#probabilityWeight;
    }


    /**
     * Access the element of the shape
     * The coordinates specified by x and y must be inside the shapes boundaries
     * @param {Number} x X coordinate of the shape
     * @param {Number} y Y coordinate of the shape
     * @returns State of the element
     */
    getElementAt(x, y) {
        return this.#shape[this.#INTERNAL_rotate(x, y)];
    }

    /**
     * Moves the shape to the left side
     * If the position will be less than 0 the operation will abort
     */
    moveLeft() {
        if (this.#positionX >= 0) {
            this.#positionX--;
        }
    }

    /**
     * Moves the shape to the right side
     * If the position will be greater than the board width the operation will abort
     */
    moveRight() {
        if (this.#positionX < this.#boardWidth) {
            this.#positionX++;
        }
    }

    /**
     * Moves the shape down
     * If the position will be greater than the board height the operation will abort
     */
    moveDown() {
        if (this.#positionY < this.#boardHeight) {
            this.#positionY++;
        }
    }

    /**
     * Rotates the block 90° to the left
     */
    rotateLeft() {
        this.#orientation--;
        if (this.#orientation < 0) {
            this.#orientation = 3;
        }
    }

    /**
     * Rotates the block 90° to the right
     */
    rotateRight() {
        this.#orientation = (this.#orientation + 1) % 4;
    }

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
    #INTERNAL_rotate(x, y) {
        switch (this.#orientation) {
            case 0:
                return x + (4 * y);
            case 1:
                return 12 - (4 * x) + y;
            case 2:
                return 15 - x - (4 * y);
            case 3:
                return 3 + (4 * x) - y;
        }
    }

}

class ShapeHandler {

    #shapes = [
        new Shape([1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1, 20),  // blue ricky
        new Shape([0, 0, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0], 2, 20),  // orange ricky
        new Shape([3, 3, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0], 3, 20),  // cleaveland Z
        new Shape([0, 4, 4, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 4, 20),  // rhodeisland z
        new Shape([0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0], 5, 20),  // hero
        new Shape([0, 0, 0, 0, 0, 6, 6, 0, 0, 6, 6, 0, 0, 0, 0, 0], 6, 15),  // smashboy
        new Shape([0, 7, 0, 0, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0], 7, 15)   // teewee
    ];

    #nextShape;
    #sumOfWeight = 0;
    #currentShape = this.#shapes[0];
    #blockMemorySwitched = false;


    /**
     * This class provides an handler for all possible shapes.
     * Basic operations are provided
     * - Access to current and next shape
     * - New shape generation
     *
     * @version 1.0
     * @date Mai 01 2020
     */
    constructor() {
        this.#INTERNAL_refreshWeights();
        this.#nextShape = this.#shapes[this.#INTERNAL_nextID()];
    }

    /**
     * This method will load the current and next shape from a json array
     */
    loadShapes(shape, nextShape) {
        let ID = shape.ID;
        let posX = shape.posX;
        let posY = shape.posY;
        let orientation = shape.orientation;
        this.#currentShape = this.#shapes[ID - 1].copy();
        this.#currentShape.init(posX, posY, orientation, ID);

        ID = nextShape.ID;
        posX = nextShape.posX;
        posY = nextShape.posY;
        orientation = shape.orientation;
        this.#nextShape = this.#shapes[ID - 1].copy();
        this.#nextShape.init(posX, posY, orientation, ID);

    }


    getShapes() {
        return this.#shapes;
    }

    getCurrentShape() {
        return this.#currentShape;
    }

    getNextShape() {
        return this.#nextShape;
    }

    /**
     * This method sets the block memory saved shape as primary
     * and creates a new shape into the block memory
     */
    createNewShape() {
        if (null == this.#nextShape) {
            this.#nextShape = this.#shapes[this.#INTERNAL_nextID()];
        }
        this.#currentShape = this.#nextShape.copy();
        let id = this.#INTERNAL_nextID();
        if (id < 0) {
            id *= -1;
            id %= this.#shapes.length;
        }

        this.#nextShape = this.#shapes[id].copy();
        this.#blockMemorySwitched = false;
    }

    /**
     * Adds a new shape to the game
     * @param {Array} shape 4x4 Number array representing the shape
     * @param {Number} id ID of the shape
     */
    addNewShape(shape, id) {
        this.#shapes.push(new Shape(shape, id));
        this.#INTERNAL_refreshWeights();
    }

    /**
     * Switches the current shape with the next one
     */
    switchShapes() {
        if (this.#blockMemorySwitched) {
            return;
        }
        let tmp = this.#nextShape.copy();
        this.#nextShape = this.#currentShape.copy();
        this.#currentShape = tmp.copy();
        this.#blockMemorySwitched = true;
    }

    /**
     * This internal method refreshes the total sum of possibility for each shape
     */
    #INTERNAL_refreshWeights() {
        this.#sumOfWeight = 0;
        for (let i = 0; i < this.#shapes.length; i++) {
            this.#sumOfWeight += this.#shapes[i].weight();
        }
    }

    /**
     * This method creates a random number as ID.
     * The random number is based on the probability that each shape has
     * @returns Random ID
     */
    #INTERNAL_nextID() {
        let rnd = (Math.floor(Math.random() * this.#sumOfWeight));
        for (let i = 0; i < this.#shapes.length; i++) {
            if (rnd < this.#shapes[i].weight()) {
                return i;
            }
            rnd -= this.#shapes[i].weight();
        }
        return rnd;
    }

}

export {Shape, ShapeHandler}