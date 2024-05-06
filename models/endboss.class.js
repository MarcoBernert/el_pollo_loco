class Endboss extends MovableObject {
    y = -30;
    x = 2100;
    width = 300;
    height = 500;
    speed = 10;
    world;
    isHurt = false;
    energy = 100;

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    /**
     * Constructs an Endboss instance and initializes its properties.
     * @param {World} world - The game world.
     */
    constructor(world) {
        super();
        this.loadImage(`img/4_enemie_boss_chicken/1_walk/G1.png`);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.world = world;
        this.animate();
        setTimeout(() => {
            this.moveTowardsCharacter();
        }, 1000);
    }

    /**
     * Moves the end boss towards the character.
     */
    moveTowardsCharacter() {
        setInterval(() => {
            let distance = Math.abs(this.x - this.world.character.x);
            if (distance < 500) {
                if (this.x < this.world.character.x) {
                    this.moveRight();
                } else {
                    this.moveLeft();
                }
            }
        }, 200);
    }

    /**
     * Moves the end boss to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = true;
    }

    /**
     * Moves the end boss to the left.
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = false;
    }

    /**
     * Initiates the animation loop for the end boss.
     */
    animate() {
        setInterval(() => {
            let distance = Math.abs(this.x - this.world.character.x);
            if (this.isHurt) {
                this.playAnimation(this.IMAGES_HURT);
                setTimeout(() => {
                    this.isHurt = false;
                }, 1500);
            } else if (distance < 250) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (distance < 400) {
                this.playAnimation(this.IMAGES_WALK);
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 300);
    }
}