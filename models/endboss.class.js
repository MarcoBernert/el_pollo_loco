class Endboss extends MovableObject {
    y = -30;
    x = 2100;
    width = 300;
    height = 500;
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]


    constructor() {
        super();
        this.loadImage(`img/4_enemie_boss_chicken/1_walk/G1.png`);
        this.loadImages(this.IMAGES_ALERT);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 300);
    }

}