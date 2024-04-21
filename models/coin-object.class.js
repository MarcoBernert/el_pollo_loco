class CoinObject extends MovableObject {
    x = 50;
    y = 150;
    width = 100;
    height = 100;

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 250;
        this.y = 80;
        this.loadImages(this.IMAGES);
        this.animate();
    }

    animate() {
      
        setInterval(() => {
            // this.walkking_sound.play();
            this.playAnimation(this.IMAGES);
        }, 500);

    }
    
}