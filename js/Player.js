export default class player{
    constructor(canvas, velocity){
        this.canvas = canvas;
        this.velocity = velocity;

        this.x = this.canvas.width / 2 -75;
        this.y = this.canvas.height - 100;
        this.width = 150;
        this.height = 150;
        this.image = new Image();
        this.image.src = "img/player.gif";

    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}