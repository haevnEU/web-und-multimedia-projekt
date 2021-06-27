/**
 * This is the theme class.
 * <br>Theming is implemented in a not efficient way.
 * <br>Every UI element from the game, even different blocks, must be declared inside the <code>block_ids.html</code> to be accessible.
 * <br>The style of the theme is retrieve from the defined span tag inside the <code>block_ids.html</code>
 */
class Theme {
    /**
     * Instantiate a Theme
     */
    constructor() {}

    /**
     * Maps an ID to a color. 
     * <br>Note the color must be defined inside the <code>block_ids.html</code>
     * @param {Number} id ID of the block
     * @returns {String} Color mapped string, default blue
     */
    getColorByID(id) {    }

    /**
     * Access the color information about a block
     * <br>Note the color must be defined inside the <code>block_ids.html</code>
     * @param {Number} id Block ID
     * @returns Color of the block
     */
    getBlockColorByID(id) {}

    /**
     * Access the color information about the background
     * <br>Note the color must be defined inside the <code>block_ids.html</code>
     * @returns Color of the background
     */
    getBackgroundColor() {}

    /**
     * Access the color information about the preview background
     * <br>Note the color must be defined inside the <code>block_ids.html</code>
     * @returns Color of the preview background
     */
    getPreviewBackgroundColor() { }


    /**
     * Access the color information about the board
     * <br>Note the color must be defined inside the <code>block_ids.html</code>
     * @returns Color of the board
     */
    getBoardColor() { }

    /**
     * Access the color information about the font
     * <br>Note the color must be defined inside the <code>block_ids.html</code>
     * @returns Color of the font
     */
    getFontColor() { }

    /**
     * Access the font family for the game
     * <br>Note the color must be defined inside the <code>block_ids.html</code>
     *  @return Font family, default Arial
     */
    getFontFamily() {}

    /**
     * Access the fontsize for the game
     * <br>Note the color must be defined inside the <code>block_ids.html</code>
     * @returns Size of the font, default 26
     */
    getFontSize() {    }
}

/**
 * This class is a wrapper class for each theme.
 * <br>The handler is there to ensure that a single theme exists
 */
class ThemeHandler {
    /**
     * Theme which the game uses
     * @type {Theme}
     */
    #currentTheme = new Theme();

    /**
     * Access the current theme
     * @returns Theme
     */
    getTheme() { }

}

export {ThemeHandler, Theme}