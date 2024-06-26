class Character extends MovableObject {
    x = 100;
    y = 0;
    width = 150;
    height = 250;
    world;
    speed = 10;
    lastKeyPressTime;
    offset = {
        top: 150,
        left: 40,
        right: 40,
        bottom: 10
    }
    walking_sound = new Audio('audio/running.mp3')
    jumping_sound = new Audio('audio/jump.mp3')
    hurt_sound = new Audio('audio/ouch.mp3');
    long_idle_sound = new Audio('audio/long_idle2.mp3');

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    /**
     * Constructs a new Character object.
     */
    constructor() {
        super();
        this.loadImage(`img/2_character_pepe/2_walk/W-21.png`);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.animate();
        this.y = 170;
        this.applyGravity();
        this.checkIfCollidingFromTop();
    }

    /**
    * Initiates the animation loop for the character.
    */
    animate() {
        this.moveCharacter();
        this.showPlayAnimationCharacter();
    }

    /**
     * Moves the character based on keyboard inputs and updates camera position.
     */
    moveCharacter() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.world.playAudio(this.walking_sound);
            }
            if (this.world.keyboard.LEFT && this.x > 100) {
                this.moveLeft();
                this.otherDirection = true;
                this.world.playAudio(this.walking_sound);
            }
            if ((this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isAboveGround()) {
                this.jump();
                this.world.playAudio(this.jumping_sound);
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Shows and plays appropriate character animations.
     */
    showPlayAnimationCharacter() {
        this.showPlayAnimationMove();
        this.showPlayAnimationIdle();

    }

    /**
     * Plays animations for dead, hurt, jumping, and walking based on character state.
     */
    showPlayAnimationMove() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.world.playAudio(this.hurt_sound);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

    /**
     * Shows and plays idle animations based on character state.
     */
    showPlayAnimationIdle() {
        this.lastKeyPressTime = Date.now();
        setInterval(() => {
            const noKeyInputs = !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.world.keyboard.SPACE && !this.world.keyboard.D;
            if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT || this.world.keyboard.UP || this.world.keyboard.DOWN || this.world.keyboard.SPACE || this.world.keyboard.D) {
                this.lastKeyPressTime = Date.now();
            }
            if (!this.isAboveGround() && noKeyInputs && (Date.now() - this.lastKeyPressTime <= 7500)) {
                this.playAnimation(this.IMAGES_IDLE);
            } else if (!this.isAboveGround() && noKeyInputs && (Date.now() - this.lastKeyPressTime >= 7500)) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
                this.world.playAudio(this.long_idle_sound);
            }
        }, 200);
    }

    /**
     * Check if character is colliding from top.
     */
    checkIfCollidingFromTop() {
        setInterval(() => {
            if (this.isAboveGround() && this.speedY < 0) {
                this.isCollidingFromTop = true;
            } else {
                this.isCollidingFromTop = false;
            }
        }, 1000 / 65);
    }
}