class CoinObject extends MovableObject {
    width = 120;
    height = 120;

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    /**
     * Constructs a CoinObject instance and initializes its properties.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = Math.random() * 2000 + 100;
        this.y = Math.random() * 200 + 80;
        this.loadImages(this.IMAGES);
        this.animate();
    }

    /**
     * Initiates an animation loop by cycling through a set of images at regular intervals. 
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 250);
    }
}