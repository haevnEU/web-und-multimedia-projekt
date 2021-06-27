import meta from "./constants.js"
import {ThemeHandler} from "./theme.js"

/**
 * This class handles the screen rendering
 * <br>Couple utility method are provided to an easy rendering
 * <br>For each render call a scaling is used. The scalefactor is used from the constant.js script
 */
class Renderer {
    /**
     * This is the current used theme
     * @type {ThemeHandler}
     */
    #theme = new ThemeHandler();

    /**
     * The HTML5 Canvas element
     * @type {Canvas}
     */
    #fieldCanvas = document.getElementById('fieldCanvas');
    
    /**
     * Context of the used canvas
     * @type {Context}
     */
    #context = this.#fieldCanvas.getContext('2d');

    /**
     * This attribute is the size for the block preview
     */
    #previewDimension = Math.floor(meta.BLOCK_SIZE);

    /**
     * Instantiate the render engine
     */
    constructor() {}

    /**
     * This method renders a pause text on screen
     */
    renderPauseMenu() {}

    /**
     * This methods renders a shape on the screen
     * @param Shape 
     */
    renderShape(shape) {}

    /**
     * This method renders a preview of the block specified
     * @param {Shape} shape Shape which should be rendered as preview
     * @param {Board} board 
     */
    renderShapePreview(shape, board) {}

    /**
     * This methods renders a board on screen
     * @param {Board} board board which shall be rendered on screen
     */
    renderBoard(board) {}

    /**
     * Clears the screen
     */
    clear() {}

    /**
     * Renders a text on screen
     * @param {String} text Text which should be rendered
     */
    renderText(text) {}

    /**
     * This method renders the game over screen
     * @param {Number} score Score which the user achieved
     * @param {Number} removedLines Lines which the user removed
     * @param {Number} level Level which the user was playing
     */
    renderGameOverScreen(score, removedLines, level) {}


    /**
     * <b>INTERNAL / PRIVATE</b>
     * <br>This method renders a border around a rectangle
     * @param {Number} xPos X position where the border shall start
     * @param {Number} yPos Y position where the border shall start
     * @param {Number} width Width of the rectangle
     * @param {Number} height Height of the rectangle
     * @param {Number} thickness Thickness of the border, default is 1
     */
    INTERNAL_drawBorder(xPos, yPos, width, height, thickness = 1) {}

    /**
     * <b>INTERNAL / PRIVATE</b>
     * <br>This method renders a rectangle with a border on the screen
     * @param {Number} x X coordinate where the rectangle shall start
     * @param {Number} y Y coordinate where the rectangle shall start
     * @param {Number} w Width of the rectangle
     * @param {Number} h Height of the rectangle
     * @param {String} color Color of the Rectangle
     * @param {Boolean} border Determines if a border shall be drawn
     */
    INTERNAL_drawRectangle(x, y, w, h, color, border = true) {}
}

export {Renderer}