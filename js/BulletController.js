import Bullet from "./Bullet.js";
export default class BulletController {
    bullets = [];
    timeTillNextBulletAllowed = 0;

    constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;

        this.shootSound = new Audio("sounds/shoot.wav");
        this.shootSound.volume = 0.1;
    }

    shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
        if (this.timeTillNextBulletAllowed <= 0 && this.bullets.length < this.maxBulletsAtATime) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
            this.bullets.push(bullet);
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
    }
    draw(context) {
        this.bullets = this.bullets.filter(
            (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
        );

        this.bullets.forEach((bullet) => bullet.draw(context));
        if (this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    }


}