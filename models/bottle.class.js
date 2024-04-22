class Bottle extends MovableObject {
    y = 340;
    width = 80;
    height = 120;

    constructor(imagePath){
        super().loadImage(imagePath);
        this.x = Math.random() * 1500 + 200;
    }
}