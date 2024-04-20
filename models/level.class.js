class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    coinObjects;

    constructor(enemies, clouds, backgroundObjects, coinObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coinObjects = coinObjects;
    }
}