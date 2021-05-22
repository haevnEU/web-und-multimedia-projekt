import meta from "./constants.js"

class Board{
    #field = []

    /**
     * This class defines the game board.
     * The board contains 
     * - an array of every block
     * - width and height of the field
     * - methods to operate on the field
     * 
     * @version 1.1
     * @date Mai 01 2020
     */
    constructor(){     
        for(var x = 0; x < meta.BOARD_WIDTH; x++){
            for(var y = 0; y < meta.BOARD_HEIGHT; y++){
                if(x == 0 || x == (meta.BOARD_WIDTH - 1)){
                    this.#field[y * meta.BOARD_WIDTH + x] = 254;                    
                }else if(y == (meta.BOARD_HEIGHT - 1)){
                    this.#field[y * meta.BOARD_WIDTH + x] = 255;                        
                }else{
                    this.#field[y * meta.BOARD_WIDTH + x] = 0;
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
        if(x < 0 || x >= meta.BOARD_WIDTH){
            return false;
        }else if(y < 0 || y >= meta.BOARD_HEIGHT){
            return false;
        }
        return true;
    }

    getWidth(){
        return meta.BOARD_WIDTH;
    }
    
    getHeight(){
        return meta.BOARD_HEIGHT;
    }


    /**
     * Access the element specified by the x and y coordinate.
     * If the point is not in boundaries of the board -1 will be returned.
     * @param {Number} x X Coordinate of the element
     * @param {Number} y Y Coordinate of the element
     * @returns State of the element a position (x/y) in range 0 to 9
     */
     getElementAt(x, y){
        if(!this.#checkBoundary(x, y)){
            return -1;
        }
<<<<<<< Updated upstream
        return this.#field[y  * this.#width + x];

        /*
            900009
            900009
            900009
            888888

        */
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
        if(this.#isValidState(state) 
          && this.#checkBoundary(mappedX, mappedY) 
          && this.#field[mappedY * this.#width + mappedX] != this.#WALL_STATE){
            this.#field[mappedY * this.#width + mappedX] = state;
        }
    }

 

    /**
     * Creates a copy of this board
     * @returns Copy of the board
=======
        return this.#field[y * meta.BOARD_WIDTH + x];
    }

    /**
     * Sets the state of a field.
     * This operation will yield false iff the field is already occupied
     * @param {Number} x X Coordinate of the element
     * @param {Number} y Y Coordinate of the element
     * @param {Number} state Value which should be set to the field 
     * @returns True iff the field could be set
>>>>>>> Stashed changes
     */
    setElementAt(x, y, state){
        if(this.#field[y * meta.BOARD_WIDTH + x] != 0){
            return false;
        }
        this.#field[y * meta.BOARD_WIDTH + x] = state;    
        return true;
    }
}

export {Board}