class CoinObject extends MovableObject {
    x = 50;
    y = 150;
    width = 100;
    height = 100;

    constructor(imagePath, x,) {
        super().loadImage(imagePath);
        this.x = x;
    }
    
}