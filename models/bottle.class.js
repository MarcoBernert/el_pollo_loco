class Bottle extends MovableObject {
    y = 340;
    width = 80;
    height = 120;
    offset = {
        top: 8,
        left: 25,
        right: 15,
        bottom: 8
    }

    /**
     * Constructs a Bottle instance with the provided image path and sets its x-coordinate randomly.
     * @param {string} imagePath - The path to the image of the bottle object.
     */
    constructor(imagePath){
        super().loadImage(imagePath);
        this.x = Math.random() * 1400 + 400;
    }
}