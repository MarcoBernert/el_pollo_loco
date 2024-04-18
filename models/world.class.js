class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if(this.character.isColliding(enemy)){
                    this.character.energy -= 5;
                    this.character.checkIfDead();
                    console.log('energy', this.character.energy)
                }
            });
        }, 200);
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(this.draw.bind(this));
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object)
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            // Bild spiegelverkehrt zeichnen
            mo.flipImage(mo, this.ctx);
        } else {
            // Normales Bild zeichnen, ohne Spiegelung
            mo.drawImageNormal(mo, this.ctx);
        }
    }
}