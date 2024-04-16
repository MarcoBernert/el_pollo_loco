class Cloud extends MovableObject {

    y = 20;
    width = 450;
    height = 225;
    speed = 0.2 * Math.random();

    constructor(){
        super().loadImage(`img/5_background/layers/4_clouds/1.png`);
        this.x = Math.random() * 500;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 70);
    }

}