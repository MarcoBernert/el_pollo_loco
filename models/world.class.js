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
    }

    setWorld() {
        this.character.world = this;
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

    // Bild spiegelverkehrt zeichnen
    addToMap(mo) {
        // Überprüfen, ob mo.otherDirection true ist
        if (mo.otherDirection) {
          // Kontextzustand speichern, um später wiederherzustellen
          this.ctx.save();
          // Bild horizontal spiegeln (vertikal: this.ctx.scale(1, -1))
          this.ctx.scale(-1, 1);
          // Bild zeichnen, linksbündig, indem x-Position und Breite negativ gesetzt werden
          this.ctx.drawImage(mo.img, -mo.x - mo.width, mo.y, mo.width, mo.height);
          // Gespeicherten Kontextzustand wiederherstellen, um andere Zeichnungen nicht zu beeinflussen
          this.ctx.restore();
        } else {
          // Normales Bild zeichnen, ohne Spiegelung
          this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
      }
}