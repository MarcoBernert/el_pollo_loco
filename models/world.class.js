class World {
    character = new Character();
    statusbarEnergy = new StatusbarEnergy();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    statusbarEndboss = new StatusbarEndboss();
    info;
    setAudio;
    fullScreen;
    throwableObject = [];
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    audioOn = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setIcons();
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkIfEnemyIsDead();
        this.run();
        this.exchangeCoinsForBottles();
    }

    exchangeCoinsForBottles() {
        setInterval(() => {
            if (this.keyboard.F) {
                if (this.character.coins > 0 && this.character.bottles < 100) {
                    this.character.coins -= 20;
                    this.character.bottles += 20;
                    this.statusbarBottles.setPercentage(this.character.bottles);
                    this.statusbarCoins.setPercentage(this.character.coins)
                }
            }
        }, 1000 / 65);
    }

    setIcons() {
        this.info = new Info(this.canvas);
        this.setAudio = new SetAudio(this.canvas);
        this.fullScreen = new FullScreen(this.canvas);
    }

    playAudio(audio) {
        if (this.audioOn) {
            audio.play();
        } else {
            audio.pause();
        }
    }


    setWorld() {
        this.character.world = this;
        this.info.world = this;
        this.setAudio.world = this;
        this.fullScreen.world = this;


        let endBossIndex = this.level.enemies.findIndex(enemy => enemy instanceof Endboss);
        if (endBossIndex !== -1) {
            this.level.enemies[endBossIndex].world = this;
        }
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
                    enemy.hitEnemy();
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
        // this.level.enemies.forEach((enemy, index) => {
        //     let lastBottle = this.throwableObject.length;
        //     let bottleIndex = lastBottle - 1;

        //     if (lastBottle > 0 && this.throwableObject[bottleIndex].isCollidingNormal(enemy)) {
        //         enemy.hit();
        //         this.throwableObject[bottleIndex].bottleSplash = true;
        //         setTimeout(() => {
        //             this.throwableObject.splice((bottleIndex), 1);
        //         }, 300);

        //         if (enemy.energy <= 0) {
        //             setTimeout(() => {
        //                 this.level.enemies.splice(index, 1);
        //             }, 300);
        //         }
        //     }
        // });

        //Hühner mit Flaschenwurf vernichten
        this.level.enemies.forEach((enemy, index) => {
            let lastBottle = this.throwableObject.length;
            let bottleIndex = lastBottle - 1;

            if (lastBottle > 0 && this.throwableObject[bottleIndex].isCollidingNormal(enemy)) {
                enemy.hitEnemy();
                this.throwableObject[bottleIndex].bottleSplash = true;
                setTimeout(() => {
                    this.throwableObject.splice((bottleIndex), 1);
                }, 300);

                if (enemy.energy <= 0) {
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 300);
                }

                let endBossIndex = this.level.enemies.findIndex(enemy => enemy instanceof Endboss);
                if (endBossIndex !== -1) {
                    enemy.isHurt = true;
                    this.statusbarEndboss.setPercentage(enemy.energy)
                    console.log('hitEeeenemy')
                }

            }
        });

        //Coins einsammeln
        this.level.coinObjects.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoins();
                this.statusbarCoins.setPercentage(this.character.coins);
                this.playAudio(this.statusbarCoins.collect_coin_audio)
                this.level.coinObjects.splice(index, 1);
            }
        });

        //flasche einsammeln
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottles();
                this.statusbarBottles.setPercentage(this.character.bottles);
                this.playAudio(this.statusbarBottles.collect_bottle_audio)
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
        }, 1000);
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
        this.addToMap(this.statusbarEndboss);
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