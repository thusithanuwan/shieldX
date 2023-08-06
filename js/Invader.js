
export default class Invader {
    constructor(x, y, imageNumber) {
        this.x = x;
        this.y = y;
        this.width = 44;
        this.height = 32;

        this.image = new Image();
        this.image.src = `img/invader${imageNumber}.gif`;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    move(xVelocity, yVelocity) {
        this.x += xVelocity;
        this.y += yVelocity;
    }
    collideWith(player) {
        if (
            this.x + this.width > player.x &&
            this.x < player.x + player.width &&
            this.y + this.height > player.y &&
            this.y < player.y + player.height
        ) {
            return true;
        } else {
            return false;
        }
    }
}