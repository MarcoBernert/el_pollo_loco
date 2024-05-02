class Cloud extends MovableObject {

    y = 20;
    width = 450;
    height = 225;


    constructor() {
        super().loadImage(`img/5_background/layers/4_clouds/1.png`);
        this.x = Math.random() * 1500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}