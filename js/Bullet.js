export default class Bullet {
    constructor(canvas, x, y, velocity, bulletColor) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.bulletColor = bulletColor;

        this.width = 5;
        this.height = 20;
    }
    draw(ctx) {
        this.y -= this.velocity;
        ctx.fillStyle = this.bulletColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    collideWith(invader) {
        if (
            this.x + this.width > invader.x &&
            this.x < invader.x + invader.width &&
            this.y + this.height > invader.y &&
            this.y < invader.y + invader.height
        ) {
            return true;
        } else {
            return false;
        }
    }
}