import Invader from "./Invader.js";
export default class InvaderController {
    invaderMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    invaderRows = [];

   constructor(canvas) {
       this.canvas = canvas;
       this.createInvader();
   }


    createInvader() {
        this.invaderMap.forEach((row, rowIndex) => {
            this.invaderRows[rowIndex] = [];
            row.forEach((invaderNumber, invaderIndex) => {
                if (invaderNumber > 0) {
                    this.invaderRows[rowIndex].push(
                        new Invader(invaderIndex * 50, rowIndex * 35, invaderNumber)
                    );
                }
            });
        });
    }
    draw(context){
        this.drawInvader(context);
    }
    drawInvader(context){

    }

}