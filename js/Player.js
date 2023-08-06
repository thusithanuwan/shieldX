export default class player {
    rightPressed = false;
    leftPressed = false;

    constructor(canvas, velocity) {
        this.canvas = canvas;
        this.velocity = velocity;

        this.x = this.canvas.width / 2 - 75;
        this.y = this.canvas.height - 100;
        this.width = 150;
        this.height = 150;
        this.image = new Image();
        this.image.src = "img/player.gif";

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.move();
        this.collideWithWalls();
    }

    keydown = (event) => {
        if (event.code == "ArrowRight") {
            this.rightPressed = true;
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = true;
        }
    }
    keyup = (event) => {
        if (event.code == "ArrowRight") {
            this.rightPressed = false;
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = false;
        }
    }
    move() {
        if (this.rightPressed) {
            this.x += this.velocity;
        } else if (this.leftPressed) {
            this.x += -this.velocity;
        }
    }

    collideWithWalls() {
        //left
        if (this.x < -75) {
            this.x = -75;
        }

        //right
        if (this.x > this.canvas.width - this.width/2) {
            this.x = this.canvas.width - this.width/2;
        }
    }

}