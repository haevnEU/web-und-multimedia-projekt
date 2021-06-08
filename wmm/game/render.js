import meta from "./constants.js"
import {ThemeHandler} from "./theme.js"

class Renderer{
    #theme = new ThemeHandler();
    #fieldCanvas = document.getElementById('fieldCanvas');
    #context = this.#fieldCanvas.getContext('2d');
    #previewDimension = Math.floor(meta.BLOCK_SIZE);
    constructor(){ }
    
    /**
     * This method renders a pause text on screen
     */
    renderPauseMenu(){
        this.#context.fillStyle = this.#theme.getTheme().getFontColor();
        this.#context.font = '62px arial';
        this.#context.textAlign = 'center';
        this.#context.textBaseline = 'middle';
        this.#context.fillText('PAUSE', this.#fieldCanvas.width * 0.5, this.#fieldCanvas.height * 0.3);
        this.#context.font = '26px arial';
        this.#context.fillText('HIT ESC TO CONTINUE', this.#fieldCanvas.width * 0.5, this.#fieldCanvas.height * 0.3 + 80);
        this.#context.fillText('HIT N TO RESTART', this.#fieldCanvas.width * 0.5, this.#fieldCanvas.height * 0.3 + 160);
    }

    /**
     * This methods renders a shape on the screen
     * @param {Shape} shape Shape which shall be rendered
     */
    renderShape(shape){      
        for(let x = 0; x < shape.getShapeWidth(); x++){
            for(let y = 0; y < shape.getShapeHeight(); y++){
                let color = shape.getElementAt(x, y);
                if(color === 0){
                    continue;
                }
                this.#INTERNAL_drawRectangle(meta.RENDER_OFFSET + (shape.getX() * meta.BLOCK_SIZE) + (x * meta.BLOCK_SIZE),
                                    meta.UI_OFFSET_Y + (shape.getY() * meta.BLOCK_SIZE) + (y * meta.BLOCK_SIZE),
                                    meta.BLOCK_SIZE, meta.BLOCK_SIZE, this.#theme.getTheme().getBlockColorByID(color));

         
            }
        }
        
    }
    
    /**
     * This method renders a preview of the block specified
     * @param {Shape} shape Shape which should be rendered as preview 
     * @param {Board} board board of the
     */
    renderShapePreview(shape, board){
        
        let offset_x = meta.RENDER_OFFSET +  meta.BLOCK_SIZE * board.getWidth()  + meta.UI_OFFSET;
        let offset_y = meta.UI_OFFSET_Y + 2 * meta.BLOCK_SIZE;
        for(let x = 0; x < shape.getShapeWidth(); x++){
            for(let y = 0; y < shape.getShapeHeight(); y++){
                let color = shape.getElementAt(x, y);
                if(color === 0){
                    this.#INTERNAL_drawRectangle(offset_x +  (x * this.#previewDimension),
                    offset_y + y * this.#previewDimension,
                    this.#previewDimension, this.#previewDimension, this.#theme.getTheme().getPreviewBackgroundColor(), false);         
                    continue;
                }

                this.#INTERNAL_drawRectangle(offset_x  + (x * this.#previewDimension),
                                    offset_y + y * this.#previewDimension,
                                    this.#previewDimension, this.#previewDimension, this.#theme.getTheme().getBlockColorByID(color));         
            }
        }
        
    }

    /**
     * This methods renders a board on screen
     * @param {Board} board board which shall be rendered on screen
     */
    renderBoard(board){
        for(let x = 0; x < board.getWidth(); x++){
            for(let y = 0; y < board.getHeight(); y++){
                let color = board.getElementAt(x, y);   
                if(color === 0){
                    continue;
                }
                let color2 = this.#theme.getTheme().getBlockColorByID(color);
                this.#INTERNAL_drawRectangle(meta.RENDER_OFFSET +(x * meta.BLOCK_SIZE),meta.UI_OFFSET_Y + meta.BLOCK_SIZE + (y * meta.BLOCK_SIZE), meta.BLOCK_SIZE, meta.BLOCK_SIZE, color2);
            }
        }
    }

    /**
     * Clears the screen
     */
    clear(){
        this.#fieldCanvas.width = meta.BOARD_WIDTH * meta.BLOCK_SIZE + meta.UI_OFFSET_X + this.#previewDimension * 4;
        this.#fieldCanvas.height = window.innerHeight;
        // Clearing screen
        this.#context.clearRect(0,0, this.#fieldCanvas.width, this.#fieldCanvas.height);
        
        // Render Background
        this.#context.fillStyle = this.#theme.getTheme().getBackgroundColor();
        this.#context.fillRect(0, 0, this.#fieldCanvas.width, this.#fieldCanvas.height);

    }

    /**
     * Renders a text on screen
     * @param {String} text Text which should be rendered
     */
    renderText(text){
        this.#context.fillStyle = this.#theme.getTheme().getFontColor();
        let fontFamily = this.#theme.getTheme().getFontFamily();
        let fontSize = this.#theme.getTheme().getFontSize();
        this.#context.font = "" + fontSize + " " + fontFamily + "";

        let offset_x = meta.RENDER_OFFSET +  meta.BLOCK_SIZE * (meta.BOARD_WIDTH) + meta.UI_OFFSET;
        let offset_y = meta.UI_OFFSET_Y + 2 * meta.BLOCK_SIZE + 4 * meta.BLOCK_SIZE + 50;
        let lines = text.split("\n");
        let index = 0;
        lines.forEach(element => {
            this.#context.fillText(element, offset_x,offset_y + index * 25);
            index++;
        });
    }

    /**
     * This method renders the game over screen
     * @param {Number} score Score which the user achieved
     * @param {Number} removedLines Lines which the user removed 
     * @param {Number} level Level which the user was playing
     */
    renderGameOverScreen(score, removedLines, level){
        this.#context.fillStyle = this.#theme.getTheme().getFontColor();
        this.#context.font = '62px arial';
        this.#context.textAlign = 'center';
        this.#context.textBaseline = 'middle';
        this.#context.fillText('GAME OVER', this.#fieldCanvas.width * 0.5, this.#fieldCanvas.height * 0.3);
        this.#context.font = '26px arial';
        this.#context.fillText('HIT N TO START A NEW GAME', this.#fieldCanvas.width * 0.5, this.#fieldCanvas.height * 0.3 + 80);
        this.#context.fillText('Level ' + level, this.#fieldCanvas.width * 0.5, this.#fieldCanvas.height * 0.3 + 160);
        this.#context.fillText('Score ' + score, this.#fieldCanvas.width * 0.5, this.#fieldCanvas.height * 0.3 + 240);
        this.#context.fillText('Lines removed ' + removedLines, this.#fieldCanvas.width * 0.5, this.#fieldCanvas.height * 0.3 + 300);
        
    }


    /**
         * This method renders a border around a rectangle
         * @param {Number} xPos X position where the border shall start
         * @param {Number} yPos Y position where the border shall start
         * @param {Number} width Width of the rectangle
         * @param {Number} height Height of the rectangle
         * @param {Number} thickness Thickness of the border, default is 1
         */
    #INTERNAL_drawBorder(xPos, yPos, width, height, thickness = 1){
        this.#context.fillStyle='#000';
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
    #INTERNAL_drawRectangle(x, y, w, h, color, border = true){
        if(border){
            this.#INTERNAL_drawBorder(x, y, w, h);
        }
        this.#context.fillStyle = color;
        this.#context.fillRect(x, y, w, h);
    }
}

export {Renderer}