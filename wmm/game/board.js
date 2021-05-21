import {DebugTools} from "./debug_tools.js"

class Board{
    /**
     * Width of the board
     */
    #width = 0;

    /**
     * Height of the board
     */
    #height = 0;

    /**
     * Actual field array
     */
    #field = []

    /**
     * State of the walls (Default 9)
     */
    #WALL_STATE = 9;
    #GROUND_STATE = 10;
    /**
     * This class defines the game board.
     * The board contains 
     * - an array of every block
     * - width and height of the field
     * - methods to operate on the field
     * 
     * @author haevn
     * @version 1.0
     * @date Mai 01 2020
     * @param {Number} width Desired width of the game field
     * @param {Number} height Desired height of the game field
     */
    constructor(width, height){
        this.#init(width, height);
    }

// Internal stuff

    /**
     * INTERNAL
     * This internal method initializes the game board. 
     * The provided width will be increased by two to accomplished a wall on booth sides.
     * The provided height is increased by one two accomplish a wall on the bottom. 
     * @param {Number} width Width of the board
     * @param {Number} height Height of the board
     */
    #init(width, height){
        this.#width = width + 2 ;
        this.#height = height + 1;
        
        for(var x = 0; x <= this.#width; x++){
            for(var y = 0; y <= this.#height; y++){
                if(x == 0 || x == this.#width){
                    this.#field[y * this.#width + x] = this.#WALL_STATE; 
                }else if(y == this.#height){
                    this.#field[y * this.#width + x] = this.#GROUND_STATE;
                }
                else{
                    this.#field[y * this.#width + x] = 0;
                }
            }
        }
    }

    /**
     * INTERNAL
     * This internal method is used to verify that a point lies inside the game boundaries
     * A point is inside the boundaries if booth statements are true.
     * 1. Neither the x nor the y coordinate is negative
     * 2. Neither the x nor the y coordinate exceed the width/height of the board
     * @param {Number} x X coordinate 
     * @param {Number} y Y coordinate
     * @returns {Boolean} true if the point is inside the board
     */
    #checkBoundary(x, y){
        if(x < 0 || x > this.#width){
            return false;
        }else if(y < 0 || y > this.#height){
            return false;
        }

        return true;
    }

    /**
     * INTERNAL
     * This internal method is used to verify that a state is valid.
     * A valid state must be in range from 0 to 8. 
     * @param {Number} state State which should be validated 
     * @returns True if the state is valid.
     */
    #isValidState(state){
        return state == 0;
    }

// Public methods

    /**
     * Access the element specified by the x and y coordinate.
     * If the point is not in boundaries of the board -1 will be returned.
     * @param {Number} x X Coordinate of the element
     * @param {Number} y Y Coordinate of the element
     * @returns State of the element a position (x/y) in range 0 to 9
     */
    getBoardElementAt(x, y){
        if(!this.#checkBoundary(x, y)){
            return -1;
        }
        return this.#field[y  * this.#width + x];
    }

    /**
     * Request the width of the board, include the walls
     * @returns Width of the board.
     */
    getBoardWidth(){
        return this.#width;
    }

    /**
     * Request the height of the board, include the walls
     * @returns Height of the board.
     */
    getBoardHeight(){
        return this.#height;
    }

    /**
     * Access the element specified by the x and y coordinate.
     * This method operates on the field without the walls.
     * If the point (x/y) is out of boundary -1 will be returned
     * @param {Number} x X coordinate mapped to the field
     * @param {Number} y Y coordinate mapped to the field
     * @returns State of the element a position (x/y) in range 0 to 9
     */
    getFieldElement(x, y){

    }

    /**
     * Sets an element based 
     * The operation will abort if one of the following condition cannot satisfied.
     * 1. The x and y coordinate are not inside the board boundaries.
     * 2. The state is in an invalid range, allowed 0 to 8
     * @param {Number} x X coordinate mapped to the field
     * @param {Number} y Y coordinate mapped to the field
     * @param {Number} state State of the field in range 0 to 8
     */
    setFieldElement(x, y, state){
        // 1. Map provided x and y coordinates to the board coordination system
        let mappedX = x + 1;
        let mappedY = y + 1;
        // 2. Verify mapped coordinates, state and execute the operation
        /*if(this.#isValidState(state) 
          && this.#checkBoundary(mappedX, mappedY) 
          && this.#field[mappedY * this.#width + mappedX] != this.#WALL_STATE){
        }*/ 
          this.#field[mappedY * this.#width + mappedX] = state;
    }

    /**
     * Creates a copy of this board
     * @returns Copy of the board
     */
    copyBoard(){
        let width = this.#width;
        let height = this.#height;
        let outBoard = new Board(width - 2, height - 1);
        for(let x = 0; x <= width; x++){
            for(let y = 0; y <= height; y++){
                outBoard.#field[y * width + x] = this.#field[y * width + x];
            }
        }

        return outBoard;
    }
    setBoardElement(x, y, state){
        // 1. Map provided x and y coordinates to the board coordination system
        let mappedX = x ;
        let mappedY = y ;
        // 2. Verify mapped coordinates, state and execute the operation
            this.#field[mappedY * this.#width + mappedX] = state;    }
}

export {Board}