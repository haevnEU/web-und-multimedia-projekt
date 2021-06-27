import meta from "./constants.js"


/**
 * This class represents a Tetris board<br>
 * The 2D Board is mapped to a 1D integer array.<br>
 * Every array index represents a state/block of the game<br>
 * Each block can be accessed via the corresponding getter and setter methods
 */
class Board {
    /**
     * 1D array representing the game states
     * @type {Number[]}
     */
    #field = [];


    /**
     * This class defines the game board.
     * The board contains<br>
     * - an array of every block<br>
     * - width and height of the field<br>
     * - methods to operate on the field
     *
     * @version 1.1
     * @date Mai 01 2020
     */
    constructor() {    }

    /**
     * This method loads already existing board into this one<br>
     * @param {Number[]} board Array representing the board
     */
    loadFromString(board) { }

    /**
     * This method converts the board into an comma separated string<br>
     * @returns String representation of the board
     */
    toString() { }

    /**
     * Access the width of the board
     * @return Width of the board
     */
    getWidth() { }

    /**
     * Access the height of the board
     * @return Height of the board
     */
    getHeight() { }


    /**
     * Access the element specified by the x and y coordinate.<br>
     * If the point is not in boundaries of the board -1 will be returned.
     * @param {Number} x X Coordinate of the element
     * @param {Number} y Y Coordinate of the element
     * @returns State of the element a position (x/y) in range 0 to 9
     */
    getElementAt(x, y) {  }

    /**
     * Sets the state of a field.<br>
     * This operation will yield false iff the field is already occupied
     * @param {Number} x X Coordinate of the element
     * @param {Number} y Y Coordinate of the element
     * @param {Number} state Value which should be set to the field
     * @returns True iff the field could be set
     */
    setElementAt(x, y, state) {}

    /**
     * This method removes a line from the board.<br>
     * It will fail in two scenarios<br>
     *  1. The line equals the board height<br>
     *  2. The line has one empty spot
     * @param {Number} line Line to remove
     * @returns nothing
     */
    removeLine(line) { }


    /**
     * <b>INTERNAL / PRIVATE</b><br>
     * This internal method is used to verify that a point lies inside the game boundaries
     * A point is inside the boundaries if booth statements are true.<br>
     * 1. Neither the x nor the y coordinate is negative<br>
     * 2. Neither the x nor the y coordinate exceed the width/height of the board
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     * @returns {Boolean} true if the point is inside the board
     */
    INTERNAL_checkBoundary(x, y) {}
}
export {Board}
