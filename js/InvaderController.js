import Invader from "./Invader.js";
import MovingDir from "./MovingDir.js";

export default class InvaderController {
    invaderMap = [
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    ];
    invaderRows = [];


    currentDirection = MovingDir.right;
    xVelocity = 0;
    yVelocity = 0;
    defaultXVelocity = 1;
    defaultYVelocity = 10;
    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault;
    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;


    constructor(canvas,invaderBulletController, playerBulletController) {
        this.canvas = canvas;
        this.createInvader();
        this.enemyBulletController = invaderBulletController;
        this.playerBulletController = playerBulletController;

        this.invaderDethSound = new Audio("sound/enemy-death.wav");
        this.invaderDethSound.volume = 0.1;
    }


    createInvader() {
        this.invaderMap.forEach((row, rowIndex) => {
            this.invaderRows[rowIndex] = [];
            row.forEach((invaderNumber, invaderIndex) => {
                if (invaderNumber > 0) {
                    this.invaderRows[rowIndex].push(
                        new Invader(invaderIndex * 60, rowIndex * 35, invaderNumber)
                    );
                }
            });
        });
    }

    draw(context) {
        this.drawInvader(context);
        this.updateVelocityAndDirection();
        this.resetMoveDownTimer();
        this.decrementMoveDownTimer();
        this.fireBullet();
        this.collisionDetection();

    }

    drawInvader(context) {
        this.invaderRows.flat().forEach((invader) => {
            invader.move(this.xVelocity, this.yVelocity);
            invader.draw(context);

        });
    }

    updateVelocityAndDirection() {
        for (const invaderRow of this.invaderRows) {
            if (this.currentDirection === MovingDir.right) {
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightMostInvader = invaderRow[invaderRow.length - 1];
                if (rightMostInvader.x + rightMostInvader.width >= this.canvas.width) {
                    this.currentDirection = MovingDir.downLeft;
                    break;
                }
            } else if (this.currentDirection === MovingDir.downLeft) {
                if (this.moveDown(MovingDir.left)) {
                    break;
                }
            } else if (this.currentDirection === MovingDir.left) {
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0;
                const leftMostEnemy = invaderRow[0];
                if (leftMostEnemy.x <= 0) {
                    this.currentDirection = MovingDir.downRight;
                    break;
                }
            } else if (this.currentDirection === MovingDir.downRight) {
                if (this.moveDown(MovingDir.right)) {
                    break;
                }
            }
        }
    }

    moveDown(newDirection) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.moveDownTimer <= 0) {
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    }

    resetMoveDownTimer() {
        if (this.moveDownTimer <= 0) {
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    decrementMoveDownTimer() {
        if (this.currentDirection === MovingDir.downLeft || this.currentDirection === MovingDir.downRight) {
            this.moveDownTimer--;
        }
    }

    fireBullet() {
        this.fireBulletTimer--;
        if (this.fireBulletTimer <= 0) {
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allInvaders = this.invaderRows.flat();
            const invaderIndex = Math.floor(Math.random() * allInvaders.length);
            const enemy = allInvaders[invaderIndex];
            this.enemyBulletController.shoot(enemy.x + enemy.width / 2, enemy.y, -3);
        }
    }

    collisionDetection() {
        this.invaderRows.forEach((invaderRow) => {
            invaderRow.forEach((invader, invaderIndex) => {
                if (this.playerBulletController.collideWith(invader)) {
                    this.invaderDethSound.currentTime = 0;
                    this.invaderDethSound.play();
                    invaderRow.splice(invaderIndex, 1);
                }
            });
        });

        this.invaderRows = this.invaderRows.filter((invaderRow) => invaderRow.length > 0);
    }

    collideWith(player) {
        return this.invaderRows.flat().some((invader) => invader.collideWith(player));
    }
}