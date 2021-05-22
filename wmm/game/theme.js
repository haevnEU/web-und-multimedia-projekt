class Theme{
    #blockColors = ["magenta", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "", "black", "black"];
    #backgroundColor = "magenta";
    #boardColor = "blue";
    #fontColor = "black";

    /**
     * Contains color information
     */
    constructor(){}


    /**
     * This method sets the ... color and returns a reference to allow method chaining.
     * @param {String} color String representation of the color, e.g. red, #ff0000 rgba(255, 0, 0, 1);
     * @param {Number} Index Block ID
     * @returns Reference to this object
     */
    addBlockColor(color, index){
        this.#blockColors[index] = color;
        return this;
    }

    /**
     * This method sets the background color and returns a reference to allow method chaining.
     * @param {String} color String representation of the color, e.g. red, #ff0000 rgba(255, 0, 0, 1);
     * @returns Reference to this object
     */
    addBackground(color){
        this.#backgroundColor = color;
        return this;
    }

    /**
     * This method sets the board color and returns a reference to allow method chaining.
     * @param {String} color String representation of the color, e.g. red, #ff0000 rgba(255, 0, 0, 1);
     * @returns Reference to this object
     */
    addBoardBackground(color){
        this.#boardColor = color;
        return this;
    }


    /**
     * This method sets the font color and returns a reference to allow method chaining.
     * @param {String} color String representation of the color, e.g. red, #ff0000 rgba(255, 0, 0, 1);
     * @returns Reference to this object
     */
    addFontColor(color){
        this.#fontColor = color;
        return this;
    }






    #getColorByID(id){
        try{
            let element = document.querySelector(id);
            let style = getComputedStyle(element);
            return style.color; 
        }catch(e){
            return "magenta";
        }
    }


    /**
     * Access the color information about a block
     * @param {Number} id Block ID
     * @returns Color of the block
     */
    getBlockColorByID(id){
        let block = ".blockID" + id;
        return this.#getColorByID(block);     
    }

    /**
     * Access the color information about the background
     * @returns Color of the background
     */
    getBackgroundColor(){
        return this.#backgroundColor;
    }
    
    /**
     * Access the color information about the board
     * @returns Color of the board
     */
    getBoardColor(){
      return this.#boardColor;
    }

    /**
     * Access the color information about the font
     * @returns Color of the font
     */
    getFontColor(){
        return this.#fontColor;
    }
}

class ThemeHandler{
    #themes = new Map();
    #currentTheme = "dark";
    constructor(){
        this.addTheme("dark", new Theme().addBackground("#1E1E1E")
                                          .addBoardBackground("#1E1E1E")
                                          .addFontColor("white")
                                          .addBlockColor("transparent", 0)
                                          .addBlockColor("#568CA1", 1)
                                          .addBlockColor("#DCDC8B", 2)
                                          .addBlockColor("#AC4B1E", 3)
                                          .addBlockColor("#68CDFE", 4)
                                          .addBlockColor("#E44F26", 5)
                                          .addBlockColor("#C09553", 6)
                                          .addBlockColor("magenta", 8)
                                          .addBlockColor("magenta", 9)
                                          .addBlockColor("#063970", 10)
                                          .addBlockColor("#873e23", 11)
                                          .addBlockColor("#21130d", 12)
                                          .addBlockColor("#e28743", 13)
                                          .addBlockColor("#1e81b0", 14)
                                          .addBlockColor("brown", -1)
                                          .addBlockColor("#4EC990", -2)
                                          .addBlockColor("magenta", 10));
                                          
        this.addTheme("light", new Theme()
        .addBackground("#CCC8BE")
        .addBoardBackground("#CCC8BE")
        .addFontColor("black")
        .addBlockColor("transparent", 0)
        .addBlockColor("#21353D", 1)
        .addBlockColor("#8C6A19", 2)
        .addBlockColor("#AC4B1E", 3)
        .addBlockColor("#733214", 4)
        .addBlockColor("#7DE449", 5)
        .addBlockColor("#7A1F78", 6)
        .addBlockColor("#7A4776", 7)
        .addBlockColor("transparent", 8)
        .addBlockColor("black", 9)
        .addBlockColor("black", 10));

        this.addTheme("DEBUG_INTERNAL", new Theme());
        this.addTheme("RGBA_TEST", new Theme().addBackground("rgba(0,0,0,1)")
                                          .addBoardBackground("rgba(0,0,0,1)")
                                          .addFontColor("rgba(0,0,0,1)")
                                          .addBlockColor("rgba(128,128,128,0)", 0)
                                          .addBlockColor("#rgba(128,128,128,0.5)", 1)
                                          .addBlockColor("rgba(255,255,128,1)", 2)
                                          .addBlockColor("rgba(255,255,128,0.5)", 3)
                                          .addBlockColor("rgba(128,255,128,1)", 4)
                                          .addBlockColor("rgba(128,255,128,0.5)", 5)
                                          .addBlockColor("rgba(255,128,128,1)", 6)
                                          .addBlockColor("rgba(255,128,128,0.5)", 7)
                                          .addBlockColor("rgba(128,255,255,1)", 8)
                                          .addBlockColor("rgba(255,255,255,1)", 9));
    }

    #getSelectedThemeName(){
        let select = document.getElementById('themes');
        let d = select.options[select.selectedIndex].text;
        return d;
    }

    addTheme(name, theme){
        this.#themes.set(name, theme);
        let select = document.getElementById('themes');
        let entries = "";
        this.#themes.forEach((key, val) => entries += "<option value=" + key + ">" + val +"</option>");
        select.innerHTML = entries;
    }

    getTheme(){
        let str = this.#getSelectedThemeName();
        return this.#themes.get(str);
    }

    setTheme(name){
        if(this.#themes.has(name)){
            this.#currentTheme = name;
        }
    }

    getKeys(){
        return this.#themes.keys();
    }
}

export {ThemeHandler, Theme}