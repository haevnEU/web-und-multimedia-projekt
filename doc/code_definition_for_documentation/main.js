import {Game} from "./game.js";
import meta from "./constants.js";

let game = new Game();
setInterval(loop, 30);


/**
 * This method sets an cookie.
 * If the ttl argument is not provided or zero the cookie will exists one year
 * @param {String} name Name of the cookie
 * @param {any} value Value of the cookie
 * @param {Number} ttl Time how long the cookie exists
 */
function setCookie(name, value, ttl = 0) {}

/**
 * Access the cookies from site and extract the given one,
 * if none can be found an empty string is returned
 * @param {String} name Name of the cookie
 * @returns Cookie as string
 */
function getCookie(name) {}

/**
 * Deletes a cookie. Deleting is done via setting Expires attribute to UTC 0
 * @param {String} name Name of the cookie
 */
function eraseCookie(name) {}

/**
 * This method rescale the game UI
 * <br>Should be called during loading and when the browser resizes
 */
function rescale(){}

/**
 * This is a modified typical gameloop
 * <br>1. <s>Get the user input</s>
 * <br>2. Handle logic
 * <br>3. Render the game
 * <br>The input is event based therefore the loop does not utilize this step
 */
function loop() {}

/**
 * This method sets the state of the game as a cookie
 * <br>Should only be called from document.onbeforeunload
 */
function onUnload(){}

/**
 * This method starts a new game if the new argument is provided by the URL
 * <br>Otherwise the game is initialized with a cookie which is previous set
 * <br>An rescaling is also done to scale the game 
 */
function onLoad(){}

window.onbeforeunload = onUnload;

window.onload = onLoad;

window.onresize = function () {}

document.onkeydown = function (event) {}