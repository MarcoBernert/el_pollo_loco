class Level {
    enemies;
    clouds;
    backgroundObjects;
    coinObjects;
    bottles;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, coinObjects, bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coinObjects = coinObjects;
        this.bottles = bottles;
    }
}