class World {
    canvas;
    ctx;
    keyboard;

    character = new Character();
    level = level1;
    throwableObject = [];
    bottle;
    statusbarEnergy = new StatusbarEnergy();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    statusbarEndboss = new StatusbarEndboss();

    camera_x = 0;
    audioOn = true;
    isThrowing = false;

    background_sound = new Audio('audio/music.mp3');
    buying_bottle_sound = new Audio('audio/buying_bottle2.mp3');
    throw_sound = new Audio('audio/throw.mp3');
    splash_sound = new Audio('audio/splash_glass.mp3');
    durationSound;

    /**
     * Initializes the game world.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkIfEnemyIsDead();
        this.run();
        this.exchangeCoinsForBottles();
        this.checkDurationMusic();
    }

    /**
    * Checks the duration of the music file and starts playing it.
    */
    checkDurationMusic() {
        if (!isNaN(this.background_sound.duration)) {
            this.durationSound = this.background_sound.duration;
            this.startMusic();
        } else {
            setTimeout(() => {
                this.checkDurationMusic();
            }, 100); // 
        }
    }

    /**
    * Starts playing the music at a regular interval based on its duration.
    */
    startMusic() {
        setInterval(() => {
            this.playAudio(this.background_sound)
        }, this.durationSound);
    }

    /**
     * Initiates the exchange of coins for bottles.
     */
    exchangeCoinsForBottles() {
        setInterval(() => {
            if (this.keyboard.F) {
                if (this.character.coins > 0 && this.character.bottles < 100) {
                    this.character.coins -= 20;
                    this.character.bottles += 20;
                    this.statusbarBottles.setPercentage(this.character.bottles);
                    this.statusbarCoins.setPercentage(this.character.coins)
                    this.playAudio(this.buying_bottle_sound)
                }
            }
        }, 100);
    }

    /**
     * Plays audio if audio is enabled.
     * @param {HTMLAudioElement} audio - The audio element to play.
     */
    playAudio(audio) {
        if (this.audioOn) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    /**
     * Sets up the world environment.
     */
    setWorld() {
        this.character.world = this;

        setInterval(() => {
            if (this.bottle) {
                this.bottle.world = this;
            }
        }, 100);
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
        let endBossIndex = this.level.enemies.findIndex(enemy => enemy instanceof Endboss);
        if (endBossIndex !== -1) {
            this.level.enemies[endBossIndex].world = this;
        }
    }

    /**
     * Initiates the main game loop.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000 / 65);
    }

    /**
     * Checks for the throw action and creates throwable objects.
     */
    checkThrowObjects() {
        let bottlesAvailable = this.character.bottles > 0;
        if (this.keyboard.D && bottlesAvailable && !this.isThrowing) {
            this.isThrowing = true
            this.bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(this.bottle);
            this.character.bottles -= 20;
            this.statusbarBottles.setPercentage(this.character.bottles);
            this.playAudio(this.throw_sound);
            setTimeout(() => {
                this.isThrowing = false;
            }, 500);
        }
    }

    /**
     * Checks for collisions between game objects.
     */
    checkCollisions() {
        this.destroyEnemiesWithJump();
        this.destroyEnemiesWithBottle();
        this.collectCoins();
        this.collectBottles();
    }

    /**
     * Destroys enemies upon collision with the main character's jump.
     */
    destroyEnemiesWithJump() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (!this.character.isCollidingFromTop && enemy.energy > 0) {
                    this.character.hit();
                    this.statusbarEnergy.setPercentage(this.character.energy);
                } else if (this.character.isCollidingFromTop) {
                    if (enemy.energy > 0) {
                        this.character.automaticJumpAfterHitEnemy();
                    }
                    enemy.hit();
                    this.character.isCollidingFromTop = false;
                }
            }
        });
    }

    /**
     * Destroys enemies upon collision with a throwable object (bottle).
     */
    destroyEnemiesWithBottle() {
        this.level.enemies.forEach((enemy) => {
            let lastBottle = this.throwableObject.length;
            let bottleIndex = lastBottle - 1;
            if (lastBottle > 0 && this.throwableObject[bottleIndex].isColliding(enemy)) {
                enemy.hit();
                this.throwableObject[bottleIndex].bottleSplash = true;
                let endBossIndex = this.level.enemies.findIndex(enemy => enemy instanceof Endboss);
                if (endBossIndex !== -1) {
                    enemy.isHurt = true;
                    this.statusbarEndboss.setPercentage(enemy.energy)
                    console.log(enemy.energy)
                }
            }
        });
    }

    /**
     * Collects coins upon collision with the main character.
     */
    collectCoins() {
        this.level.coinObjects.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoins();
                this.statusbarCoins.setPercentage(this.character.coins);
                this.playAudio(this.statusbarCoins.collect_coin_audio)
                this.level.coinObjects.splice(index, 1);
            }
        });
    }

    /**
     * Collects bottles upon collision with the main character.
     */
    collectBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottles();
                this.statusbarBottles.setPercentage(this.character.bottles);
                this.playAudio(this.statusbarBottles.collect_bottle_audio)
                this.level.bottles.splice(index, 1);
            }
        });
    }

    /**
     * Checks if enemies are dead and removes them from the level.
     */
    checkIfEnemyIsDead() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.energy <= 0) {
                    this.level.enemies.splice(index, 1);
                }
            });
        }, 2000);
    }

    /**
     * Draws the game environment.
     */
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

        requestAnimationFrame(this.draw.bind(this));
    }

    /**
     * Adds objects to the map for rendering.
     * @param {Array} objects - The array of objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object)
        });
    }

    /**
     * Adds an object to the map for rendering.
     * @param {DrawableObject} mo - The drawable object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            mo.flipImage(mo, this.ctx);
        } else {
            mo.drawImageNormal(mo, this.ctx);
        }
    }


}