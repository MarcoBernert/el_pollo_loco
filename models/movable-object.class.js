class MovableObject {
    x = 120;
    y = 400;
    img;
    width;
    height;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 170;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    
    
    flipImage(mo, ctx) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(mo.img, -mo.x - mo.width, mo.y, mo.width, mo.height);
        this.drawFrame(-mo.x - mo.width, mo.y, mo.width, mo.height, ctx);
        ctx.restore();
    }

    drawImageNormal(mo, ctx) {
        ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        this.drawFrame(mo.x, mo.y, mo.width, mo.height, ctx);
    }

    drawFrame(x, y, width, height, ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '6';
            ctx.strokeStyle = 'red';
            ctx.rect(x, y, width, height);
            ctx.stroke();
        }
    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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


    
}