class DrawableObject {
    x = 120;
    y = 400;
    img;
    width;
    height;
    imageCache = [];
    currentImage = 0;



    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    drawImageNormal(mo, ctx) {
        try {
            ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
            this.drawFrame(mo.x, mo.y, mo.width, mo.height, ctx);

        } catch (e) {
            console.log('error', e);
            console.log('Could not load image', this.img);
        }
    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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
}