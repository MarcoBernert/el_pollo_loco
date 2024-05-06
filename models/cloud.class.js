class Cloud extends MovableObject {
    y = 20;
    width = 450;
    height = 225;

    /**
     * Constructs a Cloud instance and initializes its properties.
     */
    constructor() {
        super().loadImage(`img/5_background/layers/4_clouds/1.png`);
        this.x = Math.random() * 1500;
        this.animate();
    }

    /**
     * Animates the object by continuously moving it to the left at a fixed interval.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}