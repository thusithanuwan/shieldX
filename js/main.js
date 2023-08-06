console.log($ == jQuery);
const canvas = $('#game')[0];
const context = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 500;

const background = new Image();
background.src = "img/Star Wars Space Background 69 images.jpg";

function shield(){
    context.drawImage(background,0,0,canvas.width,canvas.height);
}

setInterval(shield,1000/60);