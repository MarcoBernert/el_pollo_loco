class ThrowableObject extends MovableObject {
    speedY = 30;
    speedX = 20;
    // width = 75 ;
    // height = 100;

    constructor(x, y) {
        super().loadImage(`img/6_salsa_bottle/salsa_bottle.png`);      
        this.x = x;
        this.y = y; 
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            this.x += 10;
        }, 25);



        // if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        //     this.moveRight();
        //     this.walkking_sound.play();
        // }
    }
}