class World {
    character = new Character();
    statusbarEnergy = new StatusBarEnergy();
    statusbarCoins = new statusbarCoins();
    statusbarBottles = new StatusbarBottles();
    throwableObject = [];
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
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        //Check collisions
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
       let bottlesAvailable = this.character.bottles > 0;
        if (this.keyboard.D && bottlesAvailable) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.character.bottles -= 20;
            this.statusbarBottles.setPercentage(this.character.bottles);  
        }
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbarEnergy.setPercentage(this.character.energy);
            }
        });
        this.level.coinObjects.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoins();
                this.statusbarCoins.setPercentage(this.character.coins);
                this.statusbarCoins.collect_coin_audio.play();
                this.level.coinObjects.splice(index, 1);
            }
        });
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottles();
                this.statusbarBottles.setPercentage(this.character.bottles);               
                this.statusbarBottles.collect_bottle_audio.play();
                this.level.bottles.splice(index, 1);
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coinObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);

        // ----SPACE FOR FIXED OBJECTS----
        this.addToMap(this.statusbarEnergy);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);

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