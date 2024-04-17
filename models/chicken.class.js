class Chicken extends MovableObject {
    y = 320;
    width = 100;
    height = 100;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]
    walkking_sound = new Audio('audio/chicken.mp3')

    constructor(){
        super();
        this.loadImage(`img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`);
        this.x = 200 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        this.moveLeft()
        setInterval(() => {
            // this.walkking_sound.play();
            this.playAnimation(this.IMAGES_WALKING);
        }, 250 );

    }
}