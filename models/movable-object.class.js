class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    coins = 0;
    bottles = 0;
    lastHit = 0;
    isCollidingFromSide = false;
    isCollidingFromTop = false;
    audioOn = true;
    fullscreenOn = false;

    /**
     * Applies gravity to the object, making it fall if not supported by a surface.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - Indicates if the object is above the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 163;
        }
    }

    /**
     * Flips the image horizontally for the given object.
     * @param {object} mo - The movable object.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    flipImage(mo, ctx) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(mo.img, -mo.x - mo.width, mo.y, mo.width, mo.height);
        // this.drawFrame(-mo.x - mo.width, mo.y, mo.width, mo.height, ctx);
        ctx.restore();
    }

    /**
     * Checks if the object is colliding with another object in a normal manner (not considering falling).
     * @param {object} mo - The other movable object.
     * @returns {boolean} - Indicates if the collision occurs.
     */
    isCollidingNormal(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {object} mo - The other movable object.
     * @returns {boolean} - Indicates if the collision occurs.
     */
    isColliding(mo) {
        let fromLeft = this.x + this.width >= mo.x && this.x + this.width <= mo.x + mo.width && this.y < mo.y + mo.height && this.y + this.height > mo.y;
        let fromRight = this.x <= mo.x + mo.width && this.x >= mo.x && this.y < mo.y + mo.height && this.y + this.height > mo.y;
        let fromTop = this.y + this.height >= mo.y && this.y + this.height <= mo.y + mo.height && this.x < mo.x + mo.width && this.x + this.width > mo.x;
        if (fromLeft || fromRight) {
            return fromLeft || fromRight;
        } else if (fromTop) {
            this.isCollidingFromTop = true;
            return !fromLeft || !fromRight;
        }
    }

    /**
     * Reduces the energy of the object after being hit.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces the energy of the object after hitting an enemy.
     */
    hitEnemy() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Increases the number of collected coins.
     */
    collectCoins() {
        this.coins += 20;
        if (this.coins > 100) {
            this.coins = 100;
        }
    }

    /**
     * Increases the number of collected bottles.
     */
    collectBottles() {
        this.bottles += 20;
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }

    /**
     * Checks if the object is hurt within the last second.
     * @returns {boolean} - Indicates if the object is hurt.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead (energy depleted).
     * @returns {boolean} - Indicates if the object is dead.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays animation by updating the current image.
     * @param {Array} images - Array of image paths for animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates a jump action for the object.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Initiates an automatic jump action after hitting an enemy.
     */
    automaticJumpAfterHitEnemy() {
        this.speedY = 27;
    }
}