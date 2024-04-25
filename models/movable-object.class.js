class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    coins = 0;
    bottles = 100;
    lastHit = 0;
    isCollidingFromSide = false;
    isCollidingFromTop = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 163;
        }
    }

    flipImage(mo, ctx) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(mo.img, -mo.x - mo.width, mo.y, mo.width, mo.height);
        this.drawFrame(-mo.x - mo.width, mo.y, mo.width, mo.height, ctx);
        ctx.restore();
    }

    // isColliding(mo) {
    //     return this.x + this.width > mo.x &&
    //         this.y + this.height > mo.y &&
    //         this.x < mo.x &&
    //         this.y < mo.y + mo.height
    // }

    isCollidingNormal(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }


    isColliding(mo) {
        // Kollisionsprüfung für seitliche Berührung
        let fromLeft = this.x + this.width >= mo.x && this.x + this.width <= mo.x + mo.width && this.y < mo.y + mo.height && this.y + this.height > mo.y;
        let fromRight = this.x <= mo.x + mo.width && this.x >= mo.x && this.y < mo.y + mo.height && this.y + this.height > mo.y;

        // Kollisionsprüfung für Berührung von oben
        let fromTop = this.y + this.height >= mo.y && this.y + this.height <= mo.y + mo.height && this.x < mo.x + mo.width && this.x + this.width > mo.x;

        // Rückgabe true, wenn eine seitliche oder obere Berührung stattfindet
        if (fromLeft || fromRight) {
            return fromLeft || fromRight;
        } else if (fromTop) {
            this.isCollidingFromTop = true;
            return !fromLeft || !fromRight;
        }
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        console.log(this.energy)
    }

    collectCoins() {
        this.coins += 20;
        if (this.coins > 100) {
            this.coins = 100;
        }
        // console.log(this.coins)
    }

    collectBottles() {
        this.bottles += 20;
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    automaticJumpAfterHitEnemy() {
        this.speedY = 27;
    }
}