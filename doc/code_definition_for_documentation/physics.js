import {Shape} from "./shapes.js"
import {Board} from "./board.js"
import meta from "./constants.js"

/**
 * Handles the Tetris physics
 * <br>Tetris physic is a quite simple one.
 * <br>It comes down to test if the coming move is legit.
 */
class Physics {
    /**
     * Instantiate the physics object
     */
    constructor() {    }

    /**
     * Validates if the shape is allowed to rotate left.
     * <br>This method yield true iff the shape is able to rotate left.
     * @param {Shape} shape shape which should be validated
     * @param {Board} board board object where the shape shall be validated
     * @returns true iff the shape can rotate
     */
    canShapeRotatedLeft(shape, board) {}

    /**
     * Validates if the shape is allowed to rotate right.
     * <br>This method yield true iff the shape is able to rotate right.
     * @param {Shape} shape shape which should be validated
     * @param {Board} board board object where the shape shall be validated
     * @returns true iff the shape can rotate
     */
    canShapeRotatedRight(shape, board) { }

    /**
     * Validates if the shape is allowed to move one block down.
     * <br>This method yield true iff the shape is able to move a block.
     * @param {Shape} shape shape which should be validated
     * @param {Board} board board object where the shape shall be validated
     * @returns true iff the shape can move
     */
    canShapeMoveDown(shape, board) { }

    /**
     * Validates if the shape is allowed to move one block to the left side.
     * <br>This method yield true iff the shape is able move a block.
     * @param {Shape} shape shape which should be validated
     * @param {Board} board board object where the shape shall be validated
     * @returns true iff the shape can move
     */
    canShapeMoveLeft(shape, board) { }

    /**
     * Validates if the shape is allowed to move one block to the right side.
     * <br>This method yield true iff the shape is able move a block.
     * @param {Shape} shape shape which should be validated
     * @param {Board} board board object where the shape shall be validated
     * @returns true iff the shape can move
     */
    canShapeMoveRight(shape, board) {  }

    /**
     * This method checks if a line can be removed. IF a line can be removed
     * the line will be removed. Total removed lines will be returned
     * @param {Board} board Board where the operation should occur
     * @returns Removed lines
     */
    canLinesBeRemoved(board) { }

    /**
     * This method is used to validate if a shape can move into a certain direction.
     * <br>This method yields true iff the shape can move in this direction
     * @param {Shape} shape shape which should be validated
     * @param {Board} board board object where the shape shall be validated
     * @param {Number} offset_y Y direction in which the validation occurs
     * @returns true iff the shape can move in the direction specified by offset
     */
    detectCollision(shape, board, offset_y = 0) {
    }
    
    /**
     * <b>INTERNAL / PRIVATE</b>
     * <br>This internal method is used to validate if a shape can move into a certain direction.
     * <br>This method yields true iff the shape can move in this direction
     * @param {Shape} shape shape which should be validated
     * @param {Board} board board object where the shape shall be validated
     * @param {Number} offset_x X direction in which the validation occurs
     * @param {Number} offset_y Y direction in which the validation occurs
     * @returns true iff the shape can move in the direction specified by offset
     */
    INTERNAL_detectCollision(shape, board, offset_x = 0, offset_y = 0) {   }

}

export {Physics};