import {Board} from "./board.js"
import {Physics} from "./physics.js"
import {Renderer} from "./render.js"
import {ShapeHandler} from "./shapes.js"
import meta from "./constants.js"

/**
 * This class is the Gamehandler
 */
class Game {
    /**
     * Determines whether the game is paused or not
     * @type {boolean} 
     */
    #paused = false;

    /**
     * When the game is over this should be true
     * @type {boolean}
     */
    #gameOver = false;

    /**
     * This attributes locks the database insertion<br>If this is not updated to true multiple entries will be sent to the database
     * @type {boolean}
     */
    #scoreUpdated = false;

    /**
     * Tracks the score
     * @type {Number}
     */
    #score = 0;

    /**
     * Tracks the level
     * @type {Number}
     */
    #level = 0;

    /**
     * Score for the softdrop, should be updated during the game
     * @type {Number}
     */
    #SoftDropScore = 0;

    /**
     * Tracks the removed lines
     * @type {Number}
     */
    #removedLines = 0;

    /**
     * Interval between each logic call
     * @type {Number}
     */
    #timerInterval = 30;

    /**
     * Physics object<br>Contains all physic interaction
     * @type {Physics}
    */
    #physics = new Physics();

    /**
     * Render object<br>Handles screen rendering for shapes, text and the board
     * @type {Renderer}
     */
    #renderer = new Renderer();

    /**
     * Board object<br>Represents the game state
     * @type {Board}
     */
    #board = new Board(20, 30);
    
    /**
     * Shapehandler object<br>Handles the creation, destroying, switching, rotation of a shape
     * @type {ShapeHandler}
     */
    #shapeHandler = new ShapeHandler();

    /**
     * Score to reach
     * @type {Number}
     */
    #scoreGoal = 400;

    /**
     * Increment the score by this amount
     * @type {Number}
     */
    #scoreGoalIncrement = 400;
    
    #lastTime = 3;

    /**
     * Instantiates a new game object 
     */
    constructor() {    }

    /**
     * Loads a previous game from the provided json string
     * @param {String} json Json object
     */
    init(json) {}

    /**
     * Converts the game to a json string
     * @return {String} Json string
     */
    exportToJson() {}


    /**
     * Handles the key pressed event<br>This should be called by document.onKeyDown event 
     * @param {Key} key Pressed key
     */
    onKey(key) { }

    /**
     * Starts the game
     */
    start() {}

    /**
     * Pause the game
     */
    pause() {}

    /**
     * Handles the logic
     * <br>- Aborts if the game is over or paused
     * <br>- Increases the score
     * <br>- Calls a method which moves the shape one row down
     */
    handleLogic() {}

    /**
     * Call to the screen renderer
     * <br>Clears the screen
     * <br>Render the board at the lowest level
     * <br>Render the current shape at the middle level
     * <br>Render the UI element at the topmost level
     */
    render() {}

    /**
     * <b>INTERNAL / PRIVATE</b>
     * <br>Resets the game
     * <br>Every game relevant attribute is set to a equivalent fresh start state
     */
    INTERNAL_reset() {}

    /**
     * <b>INTERNAL / PRIVATE</b>
     * <br>Calls a php script to update the game database
     */
    INTERNAL_writeToDataBase() {}

    /**
     * <b>INTERNAL / PRIVATE</b>
     * <br>This method takes an amount of cleared lines and maps them to their equivalent score
     * @param {Number} lines cleared lines
     * @return Mapped score
     */
    INTERNAL_convertClearedLinesToScore(lines) {}

    /**
     * <b>INTERNAL / PRIVATE</b>
     * <br>This method uses the physics object to determine if a move downwards is possible.
     * <br>If the move is possible the shape y coordinate is updated.
     * <br>Otherwise four events will occur
     * <br>1. Shape is locked inside the board object
     * <br>2. The current shape is switched with the saved one and a new one is generated
     * <br>3. A gameover check is done
     * <br>4. The score is updated
     * @param {Shape} shape shape which should be moved down
     */
    INTERNAL_moveShapeDown(shape) {}
}

export {Game}
