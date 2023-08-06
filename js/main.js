import InvaderController from "./InvaderController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
const canvas = $('#game')[0];
const context = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 500;

const background = new Image();
background.src = "img/Star Wars Space Background 69 images.jpg";

const playerBulletController = new BulletController(canvas, 10, "red", true);
const invaderBulletController = new BulletController(canvas, 4, "white", false);
const invadersController = new InvaderController(canvas,invaderBulletController,playerBulletController);
const player = new Player(canvas,5, playerBulletController);
function shield(){
    context.drawImage(background,0,0,canvas.width,canvas.height);
    invadersController.draw(context);
    player.draw(context);
    playerBulletController.draw(context);
    invaderBulletController.draw(context);

}

setInterval(shield,1000/60);