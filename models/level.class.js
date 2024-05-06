class Level {
    enemies;
    clouds;
    backgroundObjects;
    coinObjects;
    bottles;
    level_end_x = 2200;

        /**
     * Constructs a Level instance with specified game objects.
     * @param {Array} enemies - Array of enemy objects.
     * @param {Array} clouds - Array of cloud objects.
     * @param {Array} backgroundObjects - Array of background object instances.
     * @param {Array} coinObjects - Array of coin object instances.
     * @param {Array} bottles - Array of bottle object instances.
     */
    constructor(enemies, clouds, backgroundObjects, coinObjects, bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coinObjects = coinObjects;
        this.bottles = bottles;
    }
}