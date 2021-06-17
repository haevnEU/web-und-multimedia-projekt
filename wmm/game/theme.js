class Theme{
    /**
     * Contains color information
     */
    constructor(){}

    static #getColorByID(id){
        try{
            let element = document.querySelector(id);
            let style = getComputedStyle(element);
            return style.color; 
        }catch(e){
            return "blue";
        }
    }

    /**
     * Access the color information about a block
     * @param {Number} id Block ID
     * @returns Color of the block
     */
    getBlockColorByID(id){
        let block = ".blockID" + id;
        return Theme.#getColorByID(block);
    }

    /**
     * Access the color information about the background
     * @returns Color of the background
     */
    getBackgroundColor(){
        return Theme.#getColorByID(".background_");
    }

    
    getPreviewBackgroundColor(){
        return Theme.#getColorByID(".background_preview");
    }
    


    /**
     * Access the color information about the board
     * @returns Color of the board
     */
    getBoardColor(){
      return Theme.#getColorByID(".board");
    }

    /**
     * Access the color information about the font
     * @returns Color of the font
     */
    getFontColor(){
        return Theme.#getColorByID(".font_");
    }
    
    getFontFamily(){
        try{
            let element = document.querySelector(".font_");
            let style = getComputedStyle(element);
            return style.fontFamily; 
        }catch(e){
            return "Arial";
        }
    }
    
    getFontSize(){
        try{
            let element = document.querySelector(".font_");
            let style = getComputedStyle(element);
            return style.fontSize; 
        }catch(e){
            return 26;
        }
    }
}

class ThemeHandler{
    #currentTheme = new Theme();
                                          
    getTheme(){
        return this.#currentTheme;
    }

}

export {ThemeHandler, Theme}