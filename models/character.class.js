class Character extends MovableObject {

    x = 100;
    y = 70;
    width = 150;
    height = 250;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]
    world;
    speed = 10;
    walkking_sound = new Audio('audio/running.mp3')

    constructor() {
        super();
        this.loadImage(`img/2_character_pepe/2_walk/W-21.png`);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.applyGravity();
    }

    animate() {
        setInterval(() => {
            this.walkking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walkking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 100) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walkking_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);




        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // this.x += this.speed;
                // walk animation
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);

    }

    moveRight() {

    }

    jump() {

    }

}