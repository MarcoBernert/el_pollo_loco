class BackgroundObject extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;

    /**
     * Constructs a BackgroundObject instance with the provided image path and x-coordinate.
     * @param {string} imagePath - The path to the image of the background object.
     * @param {number} x - The initial x-coordinate of the background object.
     */
    constructor(imagePath, x,){
        super().loadImage(imagePath);
        this.x = x;
    }
}