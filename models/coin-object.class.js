class CoinObject extends MovableObject {
    width = 120;
    height = 120;

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = Math.random() * 2000 + 100;
        this.y = Math.random() * 200 + 80;
        this.loadImages(this.IMAGES);
        this.animate();
    }

    animate() {
        setInterval(() => {
            // this.walkking_sound.play();
            this.playAnimation(this.IMAGES);
        }, 250);
    }
    
}