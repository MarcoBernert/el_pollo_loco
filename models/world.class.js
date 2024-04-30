class World {
    character = new Character();
    statusbarEnergy = new StatusBarEnergy();
    statusbarCoins = new statusbarCoins();
    statusbarBottles = new StatusbarBottles();
    info;
    setAudio;
    fullScreen;
    throwableObject = [];
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;




    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.setIcons();
        this.keyboard = keyboard;

        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkIfEnemyIsDead();
        this.run();


    }

    setIcons() {
        this.info = new Info(this.canvas);
        this.setAudio = new SetAudio(this.canvas);
        this.fullScreen = new FullScreen(this.canvas);
    }

    setWorld() {
        this.character.world = this;
        this.info.world = this;
        this.setAudio.world = this;
        this.fullScreen.world = this;
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

        //Hühner mit Sprung vernichten
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (!this.character.isCollidingFromTop) {
                    this.character.hit();
                    this.statusbarEnergy.setPercentage(this.character.energy);
                } else if (this.character.isCollidingFromTop) {
                    this.character.automaticJumpAfterHitEnemy();
                    enemy.hit();
                    this.character.isCollidingFromTop = false;
                    if (enemy.energy <= 0) {
                        setTimeout(() => {
                            this.level.enemies.splice(index, 1);
                        }, 300);
                    }
                }
            }
        });


        //Hühner mit Flaschenwurf vernichten
        this.level.enemies.forEach((enemy, index) => {
            let lastBottle = this.throwableObject.length;
            let bottleIndex = lastBottle - 1;

            if (lastBottle > 0 && this.throwableObject[bottleIndex].isCollidingNormal(enemy)) {
                enemy.hit();
                this.throwableObject[bottleIndex].bottleSplash = true;
                setTimeout(() => {
                    this.throwableObject.splice((bottleIndex), 1);
                }, 300);

                if (enemy.energy <= 0) {
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 300);
                }
            }
        });


        this.level.coinObjects.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoins();
                this.statusbarCoins.setPercentage(this.character.coins);
                if (this.character.audioOn) {
                    this.statusbarCoins.collect_coin_audio.play();
                }
                this.level.coinObjects.splice(index, 1);
            }
        });

        //flasche einsammeln
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottles();
                this.statusbarBottles.setPercentage(this.character.bottles);
                if (this.character.audioOn) {
                    this.statusbarBottles.collect_bottle_audio.play();
                }
                this.level.bottles.splice(index, 1);
            }
        });
    }

    checkIfEnemyIsDead() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.energy <= 0) {
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 300);
                }
            });
        }, 500);
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coinObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        // ----SPACE FOR FIXED OBJECTS----
        this.addToMap(this.statusbarEnergy);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        this.addToMap(this.info);
        this.addToMap(this.setAudio);
        this.addToMap(this.fullScreen);

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