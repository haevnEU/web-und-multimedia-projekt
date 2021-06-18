import {Game} from "./game.js";

let game = new Game();
setInterval(loop, 30);


/**
 * This method sets an cookie.
 * If the ttl argument is not provided or zero the cookie will exists one year
 * @param {String} name Name of the cookie
 * @param {any} value Value of the cookie
 * @param {Number} ttl Time how long the cookie exists
 */
function setCookie(name, value, ttl = 0) {
    if (ttl === 0) {
        ttl = 365;
    }
    let expire_date = new Date();
    expire_date.setTime(expire_date.getTime() + (ttl * 24 * 60 * 60 * 1000));
    let expires = "expires=" + expire_date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/**
 * Access the cookies from site and extract the given one,
 * if none can be found an empty string is returned
 * @param {String} name Name of the cookie
 * @returns Cookie as string
 */
function getCookie(name) {
    name = name + "=";
    const cookie_list = document.cookie.split(';');
    for (let i = 0; i < cookie_list.length; i++) {
        let cookie = cookie_list[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

/**
 * Deletes a cookie. Deleting is done via setting Expires attribute to UTC 0
 * @param {String} name Name of the cookie
 */
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function loop() {
    game.handleLogic();
    game.render();
}

window.onbeforeunload = function () {
    setCookie("state", game.exportToJson(), 1);
};

window.onload = function () {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('new')) {
        eraseCookie("state");
    }

    if (document.cookie.indexOf('state=') >= 0) {
        game.init(getCookie("state"));
    }
};


document.onkeydown = function (event) {
    let key = event.key;
    game.onKey(key);
}