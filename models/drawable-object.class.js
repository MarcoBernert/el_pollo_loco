class DrawableObject {
    x = 120;
    y = 400;
    img;
    width;
    height;
    imageCache = [];
    currentImage = 0;

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the image of the given movable object on the canvas.
     * @param {MovableObject} mo - The movable object to be drawn.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    drawImageNormal(mo, ctx) {
        // try {
            ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
            this.drawFrame(mo.x, mo.y, mo.width, mo.height, ctx);

        // } catch (e) {
        //     console.log('error', e);
        //     console.log('Could not load image', this.img);
        // }
    }

    /**
     * Preloads images from the provided array of paths into the image cache.
     * @param {string[]} array - Array of image paths to preload.
     */
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