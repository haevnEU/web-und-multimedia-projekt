import {Board} from "./board.js"
import {Physics} from "./physics.js"
import {Renderer} from "./render.js"
import {ShapeHandler} from "./shapes.js"

class Game {
    #paused = false;
    #gameOver = false;
    #scoreUpdated = false;

    #score = 0;
    #level = 0;
    #SoftDropScore = 0;
    #removedLines = 0;

    #timerInterval = 30;

    #physics = new Physics();
    #renderer = new Renderer();
    #board = new Board(20, 30);
    #shapeHandler = new ShapeHandler();

    #scoreGoal = 400;
    #scoreGoalIncrement = 400;
    #lastTime = 3;

    constructor() {
        this.#scoreUpdated = false;
        this.#shapeHandler.createNewShape();
        this.pause();
    }

    init(json) {
        let obj = JSON.parse(json);
        this.#board.loadFromString(obj.board);
        this.#level = obj.level;
        this.#score = obj.score;
        this.#removedLines = obj.lines;
        this.#shapeHandler.loadShapesFromJSONArray(obj.shapes[0], obj.shapes[1]);
        this.pause();
    }

    exportToJson() {
        return JSON.stringify(
            {
                board: this.#board.toString(),
                level: this.#level,
                score: this.#score,
                lines: this.#removedLines,
                shapes: [{
                    posX: this.#shapeHandler.getCurrentShape().getX(),
                    posY: this.#shapeHandler.getCurrentShape().getY(),
                    orientation: this.#shapeHandler.getCurrentShape().getOrientation(),
                    ID: this.#shapeHandler.getCurrentShape().getShapeID()
                }, {
                    posX: this.#shapeHandler.getNextShape().getX(),
                    posY: this.#shapeHandler.getNextShape().getY(),
                    orientation: this.#shapeHandler.getNextShape().getOrientation(),
                    ID: this.#shapeHandler.getNextShape().getShapeID()
                }]
            });
    }


    onKey(key) {
        key = key.toLowerCase();
        if (key === "escape" && !this.#gameOver) {
            this.#paused ? this.start() : this.pause();
        } else if (key === "n") {
            this.#INTERNAL_reset();
        }

        if (this.#gameOver || this.#paused) {
            return;
        }






        if (key === "a" && this.#physics.canShapeMoveLeft(this.#shapeHandler.getCurrentShape(), this.#board)) {
            this.#shapeHandler.getCurrentShape().moveLeft();
            this.#SoftDropScore = 0;
        } else if (key === "d" && this.#physics.canShapeMoveRight(this.#shapeHandler.getCurrentShape(), this.#board)) {
            this.#shapeHandler.getCurrentShape().moveRight();
            this.#SoftDropScore = 0;
        } else if (key === "s" && this.#physics.canShapeMoveDown(this.#shapeHandler.getCurrentShape(), this.#board)) {
            this.#SoftDropScore += 1;
            this.#INTERNAL_moveShapeDown(this.#shapeHandler.getCurrentShape());
        } else if (key === "q" && this.#physics.canShapeRotatedLeft(this.#shapeHandler.getCurrentShape(), this.#board)) {
            this.#shapeHandler.getCurrentShape().rotateLeft();
        } else if (key === "e" && this.#physics.canShapeRotatedRight(this.#shapeHandler.getCurrentShape(), this.#board)) {
            this.#shapeHandler.getCurrentShape().rotateRight();
        } else if (key === " ") {
            this.#shapeHandler.switchShapes();
        }
    }

    start() {
        this.#paused = false;
    }

    pause() {
        this.#paused = true;
    }

    handleLogic() {
        if (this.#paused || this.#gameOver) {
            return;
        }

        while (this.#score >= this.#scoreGoal) {
            this.#level += 1;
            this.#scoreGoalIncrement += (this.#level + 1) * 100;
            this.#scoreGoal += this.#scoreGoalIncrement;
        }
        let shape = this.#shapeHandler.getCurrentShape();
        if (this.#lastTime <= 0) {
            this.#INTERNAL_moveShapeDown(shape);
            if (this.#level < 17) {
                this.#lastTime = 20 - this.#level;
            } else {
                this.#lastTime = 3
            }
        }
        this.#lastTime--;

        this.#timerInterval--;
    }

    render() {
        this.#renderer.clear();
        this.#renderer.renderBoard(this.#board);
        this.#renderer.renderShape(this.#shapeHandler.getCurrentShape());
        this.#renderer.renderShapePreview(this.#shapeHandler.getNextShape(), this.#board);
        this.#renderer.renderText("Score: " + this.#score + "\n\nLevel: " + this.#level + "\n\nLines: " + this.#removedLines);

        if (this.#paused) {
            this.#renderer.renderPauseMenu();
            return;
        }

        if (this.#gameOver) {
            this.#renderer.renderGameOverScreen(this.#score, this.#removedLines, this.#level);

        }
    }


    #INTERNAL_reset() {
        if(this.#score > 0 && this.#gameOver) {
            this.#INTERNAL_writeToDataBase();
        }
        this.#board = new Board();
        this.#shapeHandler.createNewShape();
        this.#gameOver = false;
        this.#score = 0;
        this.#level = 1;
        this.#removedLines = 0;
        this.start();
    }

    #INTERNAL_writeToDataBase() {
        if(!this.#scoreUpdated){
            this.#scoreUpdated = true;
            window.location.href = "/scripts/game_update_scoreboard.php?score=" + this.#score;
        }
    }

    #INTERNAL_convertClearedLinesToScore(lines) {
        if (lines === 1) {
            return 40 * this.#level;
        } else if (lines === 2) {
            return 100 * this.#level;
        } else if (lines === 3) {
            return 300 * this.#level;
        } else if (lines === 4) {
            return 1200 * this.#level;
        } else return 0;
    }

    #INTERNAL_moveShapeDown(shape) {
        if (this.#physics.canShapeMoveDown(this.#shapeHandler.getCurrentShape(), this.#board)) {
            shape.moveDown();
        } else {
            this.#score += this.#SoftDropScore;
            this.#SoftDropScore = 0;
            for (let x = 0; x < 4; x++) {
                for (let y = 0; y < 4; y++) {
                    if (shape.getElementAt(x, y) !== 0) {
                        this.#board.setElementAt(shape.getX() + x, shape.getY() + y, shape.getElementAt(x, y));
                    }
                }
            }

            this.#shapeHandler.createNewShape();
            this.#gameOver = !this.#physics.detectCollision(this.#shapeHandler.getCurrentShape(), this.#board, -1);
            let lines = this.#physics.canLinesBeRemoved(this.#board);
            if (lines > 0) {
                this.#removedLines += lines;
                this.#score += this.#INTERNAL_convertClearedLinesToScore(lines);
            }
        }
    }
}

export {Game}
