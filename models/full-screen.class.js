class FullScreen extends MovableObject {
    width = 30;
    height = 30;
    y = 60;
    x = 205;
    canvas;
    full = false;
    world;

    /**
     * Constructs a FullScreen instance and initializes its properties.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     */
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.loadImage(`img/10_settings/fullscreen.svg`);
        this.canvas.addEventListener('click', () => this.handleClick()); // Nach Mausklick Funktion ausführen
    }

    
    /**
     * Checks if the mouse is over the button.
     * @param {number} mouseX - The x-coordinate of the mouse cursor.
     * @param {number} mouseY - The y-coordinate of the mouse cursor.
     * @returns {boolean} - Indicates if the mouse is over the button.
     */
    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    /**
     * Handles the click event on the button.
     */
    handleClick() {
        if (this.isMouseOverButton(event.offsetX, event.offsetY)) {
            this.enterFullscreen(this.canvas);
            console.log('click fullscreen');
            this.fullscreenOn = true;
        }
    }

    /**
     * Requests full screen mode for the canvas.
     */
    enterFullscreen() {
        this.canvas.requestFullscreen();
    }

    /**
     * Exits full screen mode.
     */
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

