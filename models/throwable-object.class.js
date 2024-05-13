class ThrowableObject extends MovableObject {
    speedY = 10;
    bottleSplash = false;
    splash_sound = new Audio('audio/splash_glass.mp3');
    world;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Initializes the ThrowableObject.
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     */
    constructor(x, y) {
        super().loadImage(`img/6_salsa_bottle/salsa_bottle.png`);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.animate();
        this.throw();
    }

    /**
     * Throws the throwable object.
     */
    throw() {
        // this.speedY = 12;
        this.applyGravity();
        setInterval(() => {
            if (this.isAboveGround) {
                this.x += 15;
            } else if (!this.isAboveGround) {
                this.x = 0;
                this.y < 163;
            }
        }, 1000 / 25);
    }

    /**
     * Animates the throwable object.
     */
    animate() {
        this.rotationInterval = setInterval(() => {
            if (!this.bottleSplash) {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 60);
    
        this.splashInterval = setInterval(() => {
            if (this.bottleSplash || this.y > 340) {
                this.playAnimation(this.IMAGES_SPLASH);
                this.world.playAudio(this.world.splash_sound);
                this.stopAnimation();
            }
        }, 60);
    }
    
    /**
     * Stops the intervals of animate
     */
    stopAnimation() {
        clearInterval(this.rotationInterval);
        clearInterval(this.splashInterval);
    }
    
}