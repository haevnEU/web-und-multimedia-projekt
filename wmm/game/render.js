import meta from "./constants.js"
import {ThemeHandler, Theme} from "./theme.js"

class Renderer{
    #theme = new ThemeHandler();
    
    constructor(){ }

    /**
     * This method renders a border around a rectangle
     * @param {Number} xPos X position where the border shall start
     * @param {Number} yPos Y position where the border shall start
     * @param {Number} width Width of the rectangle
     * @param {Number} height Height of the rectangle
     * @param {Number} thickness Thickness of the border, default is 1
     */
    drawBorder(xPos, yPos, width, height, thickness = 1){
        meta.context.fillStyle='#000';
        meta.context.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
    }

    /**
     * This method renders a rectangle with a border on the screen
     * @param {Number} x X coordinate where the rectangle shall start
     * @param {Number} y Y coordiante where the rectangle shall start
     * @param {Number} w Width of the rectangle
     * @param {Number} h Height of the rectangle
     * @param {String} color Color of the Rectangle
     */
    drawRectangle(x, y, w, h, color, border = true){
        if(border){
            this.drawBorder(x, y, w, h);
        }
        meta.context.fillStyle = color;
        meta.context.fillRect(x, y, w, h);
    }

    /**
     * This method renders a pause text on screen
     */
    renderPauseMenu(){
        meta.context.fillStyle = this.#theme.getTheme().getFontColor();
        meta.context.font = '62px arial';
        meta.context.textAlign = 'center';
        meta.context.textBaseline = 'middle';
        meta.context.fillText('PAUSE', meta.fieldCanvas.width * 0.5, meta.fieldCanvas.height * 0.3);
        meta.context.font = '26px arial';
        meta.context.fillText('HIT ESC TO CONTINUE', meta.fieldCanvas.width * 0.5, meta.fieldCanvas.height * 0.3 + 80);
    }

    /**
     * This methods renders a shape on the screen
     * @param {Shape} shape Shape which shall be rendered
     */
    renderShape(shape){      
        for(let x = 0; x < shape.getShapeWidth(); x++){
            for(let y = 0; y < shape.getShapeHeight(); y++){
                let color = shape.getElementAt(x, y);
                if(color == 0){
                    continue;
                }
                this.drawRectangle(meta.RENDER_OFFSET + (shape.getX() * meta.BLOCK_SIZE) + (x * meta.BLOCK_SIZE),
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
        let previewDimension = Math.floor(meta.BLOCK_SIZE * 1);
        let offset_x = meta.RENDER_OFFSET +  meta.BLOCK_SIZE * (board.getWidth()) + meta.UI_OFFSET;
        let offset_y = meta.UI_OFFSET_Y + 2 * meta.BLOCK_SIZE;
        for(let x = 0; x < shape.getShapeWidth(); x++){
            for(let y = 0; y < shape.getShapeHeight(); y++){
                let color = shape.getElementAt(x, y);
                if(color == 0){
                    this.drawRectangle(offset_x +  (x * previewDimension),
                    offset_y + y * previewDimension,
                    previewDimension, previewDimension, this.#theme.getTheme().getPreviewBackgroundColor(), false);         
                    continue;
                }

                this.drawRectangle(offset_x  + (x * previewDimension),
                                    offset_y + y * previewDimension,
                                    previewDimension, previewDimension, this.#theme.getTheme().getBlockColorByID(color));         
            }
        }
        
    }

    /**
     * This methods renders a board on screen
     * @param {Board} board board which shall be rendered on screen
     */
    renderBoard(board, paused = false){
        for(let x = 0; x < board.getWidth(); x++){
            for(let y = 0; y < board.getHeight(); y++){
                let color = board.getElementAt(x, y);   
                if(color == 0){
                    continue;
                }
                let color2 = this.#theme.getTheme().getBlockColorByID(color);
                this.drawRectangle(meta.RENDER_OFFSET +(x * meta.BLOCK_SIZE),meta.UI_OFFSET_Y + meta.BLOCK_SIZE + (y * meta.BLOCK_SIZE), meta.BLOCK_SIZE, meta.BLOCK_SIZE, color2);
            }
        }
    }

    /**
     * Clears the screen
     */
    clear(){
        // Clearing screen
        meta.context.clearRect(0,0, meta.fieldCanvas.width, meta.fieldCanvas.height);
        
        // Render Background
        meta.context.fillStyle = this.#theme.getTheme().getBackgroundColor();
        meta.context.fillRect(0, 0, meta.fieldCanvas.width, meta.fieldCanvas.height);

    }


    renderText(text){
        meta.context.fillStyle = this.#theme.getTheme().getFontColor();
        let fontFamily = this.#theme.getTheme().getFontFamily();
        let fontSize = this.#theme.getTheme().getFontSize();
        meta.context.font = "" + fontSize + " " + fontFamily + "";

        let offset_x = meta.RENDER_OFFSET +  meta.BLOCK_SIZE * (meta.BOARD_WIDTH) + meta.UI_OFFSET;
        let offset_y = meta.UI_OFFSET_Y + 2 * meta.BLOCK_SIZE + 4 * meta.BLOCK_SIZE + 50;
        let lines = text.split("\n");
        let index = 0;
        lines.forEach(element => {
            meta.context.fillText(element, offset_x,offset_y + index * 25);
            index++;
        });
    }


    renderGameOverScreen(score, removedLines, level){
        meta.context.fillStyle = this.#theme.getTheme().getFontColor();
        meta.context.font = '62px arial';
        meta.context.textAlign = 'center';
        meta.context.textBaseline = 'middle';
        meta.context.fillText('GAME OVER', meta.fieldCanvas.width * 0.5, meta.fieldCanvas.height * 0.3);
        meta.context.font = '26px arial';
        meta.context.fillText('HIT N TO START A NEW GAME', meta.fieldCanvas.width * 0.5, meta.fieldCanvas.height * 0.3 + 80);
        meta.context.fillText('Level ' + level, meta.fieldCanvas.width * 0.5, meta.fieldCanvas.height * 0.3 + 160);
        meta.context.fillText('Score ' + score, meta.fieldCanvas.width * 0.5, meta.fieldCanvas.height * 0.3 + 240);
        meta.context.fillText('Lines removed ' + removedLines, meta.fieldCanvas.width * 0.5, meta.fieldCanvas.height * 0.3 + 300);
        
    }

    renderAllShapes(shapes){
        let offsetX = 25;
        let offsetY = 25;
        for(let i = 0; i < 7; i++){
            let shape = shapes[i];
            for(let x = 0; x < shape.getShapeWidth(); x++){
                for(let y = 0; y < shape.getShapeHeight(); y++){
                    let color = shape.getElementAt(x, y);
                    if(color == 0){  
                        this.drawRectangle(offsetX + (x * meta.BLOCK_SIZE),
                                        offsetY + (y * meta.BLOCK_SIZE),
                                        meta.BLOCK_SIZE, meta.BLOCK_SIZE, this.#theme.getTheme().getPreviewBackgroundColor(), false);
                        
                    }
                    this.drawRectangle(offsetX + (x * meta.BLOCK_SIZE),
                                        offsetY + (y * meta.BLOCK_SIZE),
                                        meta.BLOCK_SIZE, meta.BLOCK_SIZE, this.#theme.getTheme().getBlockColorByID(color));
    
             
                }
            }
            offsetX += 5*25;
            if(i % 2){
                offsetX = 25;
                offsetY += 5*25;
            }
        }

        offsetY = 25;
        offsetX = 50 + 2*5 * 25
        for(let i = 7; i < shapes.length; i++){
            let shape = shapes[i];
            for(let x = 0; x < shape.getShapeWidth(); x++){
                for(let y = 0; y < shape.getShapeHeight(); y++){
                    let color = shape.getElementAt(x, y);
                    if(color == 0){
                        this.drawRectangle(offsetX + (x * meta.BLOCK_SIZE),
                                        offsetY + (y * meta.BLOCK_SIZE),
                                        meta.BLOCK_SIZE, meta.BLOCK_SIZE, this.#theme.getTheme().getPreviewBackgroundColor(), false);
                    }
                    this.drawRectangle(offsetX + (x * meta.BLOCK_SIZE),
                                        offsetY + (y * meta.BLOCK_SIZE),
                                        meta.BLOCK_SIZE, meta.BLOCK_SIZE, this.#theme.getTheme().getBlockColorByID(color));
    
             
                }
            }
            offsetX += 5*25;
            if(i % 2){
                offsetX = 50 + 2*5 * 25
                offsetX = 50 + 2*5 * 25
                offsetY += 5*25;
            }
        }
    }
}

export {Renderer}