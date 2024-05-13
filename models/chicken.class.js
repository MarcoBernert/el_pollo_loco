class Chicken extends MovableObject {
    y = 337;
    width = 80;
    height = 80;
    energy = 5;
    world;
    offset = {
        top: 8,
        left: 25,
        right: 25,
        bottom: 8
    }
    audioPlayed = false;
    dead_sound = new Audio('audio/chicken_dead.mp3');
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ]

    /**
     * Constructs a Chicken instance and initializes its properties.
     */
    constructor() {
        super();
        this.loadImage(`img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`);
        this.x = 800 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
    }

    /**
     * Initiates the animation loop for the chicken enemy.
     */
    animate() {
        setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.energy <= 0) {
                this.playAnimation(this.IMAGES_DEAD);
                if (!this.audioPlayed) {
                    this.world.playAudio(this.dead_sound);
                    this.audioPlayed = true;
                }
            }
        }, 250);
        setInterval(() => {
            if (this.energy > 0) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }
}

