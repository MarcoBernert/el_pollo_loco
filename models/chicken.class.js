class Chicken extends MovableObject {
    y = 320;
    width = 100;
    height = 100;

    constructor(){
        super().loadImage(`img/3_enemies_chicken/chicken_normal/1_walk/1_w.png`);

        this.x = 200 + Math.random() * 500;

    }

    moveLeft(){

    }
}