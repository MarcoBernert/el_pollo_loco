class ChickenSmall extends MovableObject {
    y = 365;
    width = 50;
    height = 50;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ]
    walkking_sound = new Audio('audio/chicken.mp3')

    constructor() {
        super();
        this.loadImage(`img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`);
        this.x = 600 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.speed = 1 + Math.random() * 0.25;
    }

    animate() {
        setInterval(() => {
            if (!this.isCollidingFromTop) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 250);

        setInterval(() => {
            if (!this.isCollidingFromTop) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }
}

