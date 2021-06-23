<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Login</title>
        <?php include "./scripts/styles.php"; ?>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>
    <body>
        <div class="root_div root_div_color" style="width: 50%; height: 50%">
            <div class="sub_div">
                <h1 class="heading_color">Tetris</h1>
                <div class="horizontal_centered">
                    <div>
                        <div class="tooltip">
                            <span aria-hidden="true" class="tooltiptext">Play</span>

                            <button aria-label="Start the game" class="custom_button custom_button_color" type="button"
                                    onclick="location.href='/game/game.php';">
                                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px"
                                     fill="#FFFFFF">
                                    <path d="M0 0h24v24H0V0z" fill="none"/>
                                    <path d="M10 16.5l6-4.5-6-4.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <br>
                    <div style="margin-bottom: 10%">
                        <div class="tooltip">
                            <span aria-hidden="true" class="tooltiptext">Leaderboard</span>
                            <button aria-label="Scoreboard" class="custom_button custom_button_color" type="button"
                                    onclick="location.href='/game/scoreboard.php';">
                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px"
                                     viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                                    <rect fill="none" height="24" width="24"/>
                                    <g><path d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"/></g>
                                </svg>
                            </button>
                        </div>
                        <?php if (session_status() === PHP_SESSION_NONE) {
                            session_start();
                        }
                        if (!isset($_SESSION["user_id"])) { ?>
                            <div class="tooltip">
                                <span aria-hidden="true" class="tooltiptext">Login</span>
                                <button aria-label="Login" class="custom_button custom_button_color"
                                        onclick="location.href='/accounting/login.php';">
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px"
                                         viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                                        <g><rect fill="none" height="24" width="24"/></g>
                                        <g><path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/></g>
                                    </svg>
                                </button>
                            </div>
                            <div class="tooltip">
                                <span aria-hidden="true" class="tooltiptext">Register</span>

                                <button aria-label="Register" class="custom_button custom_button_color"
                                        onclick="location.href='/accounting/register.php';">
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px"
                                         viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                                        <g><rect fill="none" height="24" width="24"/></g>
                                        <g><g><rect height="4" width="4" x="10" y="4"/><rect height="4" width="4" x="4" y="16"/><rect height="4" width="4" x="4" y="10"/><rect height="4" width="4" x="4" y="4"/><rect height="4" width="4" x="16" y="4"/><polygon points="11,17.86 11,20 13.1,20 19.08,14.03 16.96,11.91"/><polygon points="14,12.03 14,10 10,10 10,14 12.03,14"/><path d="M20.85,11.56l-1.41-1.41c-0.2-0.2-0.51-0.2-0.71,0l-1.06,1.06l2.12,2.12l1.06-1.06C21.05,12.07,21.05,11.76,20.85,11.56z"/></g></g>
                                    </svg>
                                </button>
                            </div>
                        <?php } else { ?>
                            <div class="tooltip">
                                <span aria-hidden="true" class="tooltiptext">Logout</span>
                                <button aria-label="Logout" class="custom_button custom_button_color"
                                        onclick="location.href='/scripts/user_logout.php';">
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px"
                                         viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                                        <g><path d="M0,0h24v24H0V0z" fill="none"/></g>
                                        <g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g>
                                    </svg>
                                </button>
                            </div>
                        <?php } ?>
                        <br>
                        <div aria-label="Credits" class="horizontal_centered"><a href="/credits.php">Credits</a> <a aria-label="License" href="/license.php">Licenses</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    <footer class="menu">
        <?php include "./common/floating_menu.php"; ?>
    </footer>
</html>;