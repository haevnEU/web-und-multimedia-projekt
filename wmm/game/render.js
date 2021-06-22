import meta from "./constants.js"
import {ThemeHandler} from "./theme.js"

class Renderer {
    #theme = new ThemeHandler();
    #fieldCanvas = document.getElementById('fieldCanvas');
    #context = this.#fieldCanvas.getContext('2d');
    #previewDimension = Math.floor(meta.BLOCK_SIZE);

    constructor() {
    }

    /**
     * This method renders a pause text on screen
     */
    renderPauseMenu() {
        let offset_x = (this.#fieldCanvas.width - 6 * this.#previewDimension) * (0.5 * meta.SCALING);
        let offset_y = this.#fieldCanvas.height * 0.3;
        this.#context.fillStyle = this.#theme.getTheme().getFontColor();
        this.#context.font = (62 * meta.SCALING) + 'px arial';
        this.#context.textAlign = 'center';
        this.#context.textBaseline = 'middle';
        this.#context.fillText('PAUSE', offset_x , offset_y * meta.SCALING );
        this.#context.font = (26 * meta.SCALING) + 'px arial';

        this.#context.fillText('HIT ESC TO CONTINUE', offset_x, (offset_y + 80) * meta.SCALING);
        this.#context.fillText('HIT N TO RESTART', offset_x, (offset_y + 160) * meta.SCALING);
    }

    /**
     * This methods renders a shape on the screen
     * @param {Shape} shape Shape which shall be rendered
     */
    renderShape(shape) {
        let size =  meta.BLOCK_SIZE * meta.SCALING;

        for (let x = 0; x < shape.getShapeWidth(); x++) {
            for (let y = 0; y < shape.getShapeHeight(); y++) {
                let color = shape.getElementAt(x, y);
                if (color === 0) {
                    continue;
                }
                this.#INTERNAL_drawRectangle(meta.RENDER_OFFSET + (shape.getX() * size) + (x * size),
                    (shape.getY() * size) + (y * size),
                    size, size, this.#theme.getTheme().getBlockColorByID(color));


            }
        }

    }

    /**
     * This method renders a preview of the block specified
     * @param {Shape} shape Shape which should be rendered as preview
     * @param {Board} board board of the
     */
    renderShapePreview(shape, board) {
        let size =  meta.BLOCK_SIZE * meta.SCALING;

        let offset_x = (meta.RENDER_OFFSET + meta.BLOCK_SIZE * board.getWidth() + meta.UI_OFFSET) * meta.SCALING;
        let offset_y = 0;//meta.UI_OFFSET_Y + 2 * meta.BLOCK_SIZE;
        for (let x = 0; x < shape.getShapeWidth(); x++) {
            for (let y = 0; y < shape.getShapeHeight(); y++) {
                let color = shape.getElementAt(x, y);
                if (color === 0) {
                    this.#INTERNAL_drawRectangle(offset_x + (x * size),
                        offset_y + y * size,
                        size, size, this.#theme.getTheme().getPreviewBackgroundColor(), false);
                    continue;
                }

                this.#INTERNAL_drawRectangle(offset_x + (x * size),
                    offset_y + y * size,
                    size, size, this.#theme.getTheme().getBlockColorByID(color));
            }
        }

    }

    /**
     * This methods renders a board on screen
     * @param {Board} board board which shall be rendered on screen
     */
    renderBoard(board) {
        let size =  meta.BLOCK_SIZE * meta.SCALING;
        for (let x = 0; x < board.getWidth(); x++) {
            for (let y = 0; y < board.getHeight(); y++) {
                let color = board.getElementAt(x, y);
                if (color === 0) {
                    continue;
                }
                let color2 = this.#theme.getTheme().getBlockColorByID(color);
                this.#INTERNAL_drawRectangle(meta.RENDER_OFFSET + (x * size), (y * size), size, size, color2);
            }
        }
    }

    /**
     * Clears the screen
     */
    clear() {
        this.#fieldCanvas.width = Math.round((meta.BOARD_WIDTH * meta.BLOCK_SIZE + meta.UI_OFFSET_X + this.#previewDimension * 4 + 24) * meta.SCALING);
        this.#fieldCanvas.height = Math.round((meta.BLOCK_SIZE * meta.BOARD_HEIGHT) * meta.SCALING);

          // Clearing screen
        this.#context.clearRect(0, 0, this.#fieldCanvas.width, this.#fieldCanvas.height);

        // Render Background
        this.#context.fillStyle = this.#theme.getTheme().getBackgroundColor();
        this.#context.fillRect(0, 0, this.#fieldCanvas.width, this.#fieldCanvas.height);

    }

    /**
     * Renders a text on screen
     * @param {String} text Text which should be rendered
     */
    renderText(text) {
        this.#context.fillStyle = this.#theme.getTheme().getFontColor();
        let fontFamily = this.#theme.getTheme().getFontFamily();
        let fontSize = this.#theme.getTheme().getFontSize();
        this.#context.font = "" + (26 * meta.SCALING) + "px " + fontFamily + "";

        let offset_x = (meta.RENDER_OFFSET + meta.BLOCK_SIZE * (meta.BOARD_WIDTH) + meta.UI_OFFSET) * meta.SCALING;
        let offset_y = (2 * meta.BLOCK_SIZE + 4 * meta.BLOCK_SIZE + 50) * meta.SCALING;
        let lines = text.split("\n");
        let index = 0;
        lines.forEach(element => {
            this.#context.fillText(element, offset_x, offset_y + (index * 25) * meta.SCALING);
            index++;
        });
    }

    /**
     * This method renders the game over screen
     * @param {Number} score Score which the user achieved
     * @param {Number} removedLines Lines which the user removed
     * @param {Number} level Level which the user was playing
     */
    renderGameOverScreen(score, removedLines, level) {

        let offset_x = (this.#fieldCanvas.width - 6 * this.#previewDimension) * (0.5 * meta.SCALING);
        let offset_y = this.#fieldCanvas.height * 0.3;


        this.#context.fillStyle = this.#theme.getTheme().getFontColor();
        let fontFamily = this.#theme.getTheme().getFontFamily();
        this.#context.font = "" + (62 * meta.SCALING) + "px " + fontFamily + "";

        this.#context.textAlign = 'center';
        this.#context.textBaseline = 'middle';
        this.#context.fillText('GAME OVER', offset_x, offset_y);
        this.#context.font = "" + (26 * meta.SCALING) + "px " + fontFamily + "";

        this.#context.fillText('HIT N TO START A NEW GAME', offset_x, (offset_y + 80) * meta.SCALING);
        this.#context.fillText('Level ' + level, offset_x, (offset_y + 160) * meta.SCALING);
        this.#context.fillText('Score ' + score, offset_x, (offset_y + 240) * meta.SCALING);
        this.#context.fillText('Lines removed ' + removedLines, offset_x, (offset_y + 300) * meta.SCALING);

    }


    /**
     * This method renders a border around a rectangle
     * @param {Number} xPos X position where the border shall start
     * @param {Number} yPos Y position where the border shall start
     * @param {Number} width Width of the rectangle
     * @param {Number} height Height of the rectangle
     * @param {Number} thickness Thickness of the border, default is 1
     */
    #INTERNAL_drawBorder(xPos, yPos, width, height, thickness = 1) {
        this.#context.fillStyle = '#000';
        this.#context.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
    }

    /**
     * This method renders a rectangle with a border on the screen
     * @param {Number} x X coordinate where the rectangle shall start
     * @param {Number} y Y coordinate where the rectangle shall start
     * @param {Number} w Width of the rectangle
     * @param {Number} h Height of the rectangle
     * @param {String} color Color of the Rectangle
     * @param {Boolean} border Determines if a border shall be drawn
     */
    #INTERNAL_drawRectangle(x, y, w, h, color, border = true) {
        if (border) {
            this.#INTERNAL_drawBorder(x, y, w, h);
        }
        this.#context.fillStyle = color;
        this.#context.fillRect(x, y, w, h);
    }
}

export {Renderer}