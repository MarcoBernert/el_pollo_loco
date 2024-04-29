class FullScreen extends MovableObject {
    width = 40;
    height = 40;
    y = 65;
    x = 150;
    canvas;
    full = false;

    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.loadImage(`img/10_settings/fullscreen.svg`);
        this.canvas.addEventListener('click', () => this.handleClick()); // Nach Mausklick Funktion ausführen
    }

    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    handleClick() {
        // Vollbildmodus aktivieren, wenn das SVG geklickt wurde
        if (this.isMouseOverButton(event.offsetX, event.offsetY)) {
            this.canvas.requestFullscreen();
            console.log('click fullscreen');
            this.fullscreenOn = true;
        }
    }

    checkIfFullscreen() {
        if (document.fullscreenElement === this.canvas) {
            this.fullscreenOn = true;
        } else {
            this.fullscreenOn = false;
        }
    }
}






