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

let isGameOver = false;
let didWin = false;



function shield(){
    checkGameOver();
    context.drawImage(background,0,0,canvas.width,canvas.height);
    displayGameOver();
    if (!isGameOver) {
        invadersController.draw(context);
        player.draw(context);
        playerBulletController.draw(context);
        invaderBulletController.draw(context);
    }

}
function checkGameOver() {
    if (isGameOver) {
        return;
    }

    if (invaderBulletController.collideWith(player)) {
        isGameOver = true;
    }

    if (invadersController.collideWith(player)) {
        isGameOver = true;
    }

    if (invadersController.invaderRows.length === 0) {
        didWin = true;
        isGameOver = true;
    }
}

function displayGameOver() {
    if (isGameOver) {
        let text = didWin ? "You Win" : "Game Over";
        let textOffset = didWin ? 3.1 : 3.1;

        context.fillStyle = "white";
        context.font = "70px Arial";
        context.fillText(text, canvas.width / textOffset , canvas.height / 2);
    }
}

setInterval(shield,1000/60);