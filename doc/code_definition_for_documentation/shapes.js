import meta from "./constants.js"

/**
 * This class represents a shape
 */
class Shape {
    /**
     * The internal 1D shape array
     * @type {Number}
     */
    #shape = [];

    /**
     * The ID of the shape.<br>The ID determines the color of the shape
     * @type {Number}
     */
    #shapeID = 0;

    /**
     * X Coordinate of the shape
     * @type {Number}
     */
    #positionX = 0;

    /**
     * Y Coordinate of the shape
     * @type {Number}
     */
    #positionY = 0;

    /**
     * Shape orientation from 0 to 3
     * @type {Number}
     */
    #orientation = 0;

    /**
     * Determines how often the shape shall occur<br>Zero (0) disables the shape and One (1) show the shape with a high priority
     * @type {Number}
     */
    #probabilityWeight = 0;

    /**
     * Describes how many none zero (0) fields are occupied by the shape
     * @type {Number}
     */
    #amountOccupiedBlocks = 0;

    /**
     * Width of the board where the shape is located
     * @type {Number}
     */
    #boardWidth = meta.BOARD_WIDTH;
    
    /**
     * Width of the board where the shape is located
     * @type {Number}
     */
    #boardHeight = meta.BOARD_HEIGHT;

    /**
     * This class provides a complex shape based on an 1D array definition
     * <br>Basic operation are provided by this class
     * <br>- Left/Right rotation
     * <br>- Moving to the left/right/down
     * <br>- Access to the orientation and position
     *
     * @version 1.1
     * @date Mai 01 2020
     *
     * @param {Number[]} shape 1D Array of the shape
     * @param {Number} id ID of the shape
     * @param {Number} probabilityWeight Weight how often the shape should be used
     */
    constructor(shape, id, probabilityWeight = 12) {}

    /**
     * Make a deep copy of the shape
     * @returns A exact copy of the shape
     */
    copy() {}

    /**
     * Initializes this shape with given parameter
     * @param {Number} posX X Coordinate where the shape is located
     * @param {Number} posY Y Coordinate where the shape is located
     * @param {Number} orientation Orientation from the shape (Range 0 - 3)
     * @param {Number} ID ID of the shape
     */
    init(posX, posY, orientation, ID) {    }


    /**
     * Access the X coordinate
     * @return {Number} X coordinate
     */
    getX(){}

    /**
     * Access the Y coordinate
     * @return {Number} Y coordinate
     */
    getY() {}

    /**
     * Access the orientation of the shape.
     * <br>0 => 0°
     * <br>1 => 90°
     * <br>2 => 180°   
     * <br>3 => 270°   
     * @returns {Number} Orientation of the shape
     */
    getOrientation() { }

    /**
     * Access the shape ID
     * @returns {Number} ID of the shape
     */
    getShapeID() { }


    /**
     * Access the shape width
     * @returns {Number} Width of the shape
     */
    getShapeWidth() { }

    /**
     * Access the shape height
     * @returns {Number} Height of the shape
     */
     getShapeHeight() { }

    /**
     * Access the amount occupied block by the shape
     * @returns {Number} Amount of occupied blocks
     */
    getAmountOccupiedBlocks() {}

    /**
     * Access the shape probability
     * @returns {Number} Probability of the shape
     */
    weight() { }


    /**
     * Access the element of the shape
     * <br>The coordinates specified by x and y must be inside the shapes boundaries
     * @param {Number} x X coordinate of the shape
     * @param {Number} y Y coordinate of the shape
     * @returns State of the element
     */
    getElementAt(x, y) { }

    /**
     * Moves the shape to the left side
     * <br>If the position will be less than 0 the operation will abort
     */
    moveLeft() {}

    /**
     * Moves the shape to the right side
     * <br>If the position will be greater than the board width the operation will abort
     */
    moveRight() { }

    /**
     * Moves the shape down
     * <br>If the position will be greater than the board height the operation will abort
     */
    moveDown() { }

    /**
     * Rotates the block 90° to the left
     */
    rotateLeft() {}

    /**
     * Rotates the block 90° to the right
     */
    rotateRight() { }

    /**
     * <b>INTERNAL / PRIVATE</b>
     * <br>Map the x and y coordinates, with respect to the orientation, to an 1D array.
     * There are four possible orientation.
     * - 0°     First right rotation
     * - 90°    Second right rotation
     * - 180°   Third right rotation
     * - 270°   Fourth right rotation
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     * @returns Mapped index of the x/y coordinates
     */
    INTERNAL_rotate(x, y) { }

}

/**
 * This class handles the interaction with shapes
 * <br> Seven (7) Shapes are provided by default but more can be added during runtime
 */
class ShapeHandler {

    /**
     * Array of all possible shapes
     * @type {Shape[]}
     * */
    #shapes = [
        new Shape([1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1, 20),  // blue ricky
        new Shape([0, 0, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0], 2, 20),  // orange ricky
        new Shape([3, 3, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0], 3, 20),  // cleaveland Z
        new Shape([0, 4, 4, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 4, 20),  // rhodeisland z
        new Shape([0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0], 5, 20),  // hero
        new Shape([0, 0, 0, 0, 0, 6, 6, 0, 0, 6, 6, 0, 0, 0, 0, 0], 6, 15),  // smashboy
        new Shape([0, 7, 0, 0, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0], 7, 15)   // teewee
    ];

    /**
     * Holds the next shape
     * @type {Shape}
     */
    #nextShape;

    /**
     * This attribute is the sum of all probabilities from each shape
     * @type {Number}
     */
    #sumOfWeight = 0;

    /**
     * Holds the current shape, during initialization its the first one of the shape array
     * @type {Shape}
     */
    #currentShape = this.#shapes[0];

    /**
     * Determines if a block was switched
     * @type {Boolean}
     */
    #blockMemorySwitched = false;


    /**
     * This class provides an handler for all possible shapes.
     * <br>Basic operations are provided
     * <br>- Access to current and next shape
     * <br>- New shape generation
     *
     * @version 1.0
     * @date Mai 01 2020
     */
    constructor() {}

    /**
     * This method will load the current and next shape
     * @param {Shape} shape 
     * @param {Shape} nextShape 
     */
    loadShapes(shape, nextShape) { }

    /**
     * Access the shape array
     * @returns {Shape[]}
     */
    getShapes() {
    }

    /**
     * Access the current shape
     * @returns {Shape}
     */
    getCurrentShape() {
    }

    /**
     * Access the next shape
     * @returns {Shape} 
     */
    getNextShape() {
    }

    /**
     * This method sets the block memory saved shape as primary
     * and creates a new shape into the block memory
     */
    createNewShape() {}

    /**
     * Adds a new shape to the game
     * @param {Array} shape 4x4 Number array representing the shape
     * @param {Number} id ID of the shape
     */
    addNewShape(shape, id) {}

    /**
     * Switches the current shape with the next one
     * <br>The shape is not switched if a shape was already switched
     */
    switchShapes() {}

    /**
     * <b>INTERNAL / PRIVATE</b>
     * <br>This internal method refreshes the total sum of possibility for each shape
     */
    INTERNAL_refreshWeights() {}

    /**
     * <b>INTERNAL / PRIVATE</b>
     * <br>This method creates a random number as ID.
     * <br>The random number is based on the probability that each shape has
     * @returns {Number} Random ID
     */
    INTERNAL_nextID() {}

}

export {Shape, ShapeHandler}