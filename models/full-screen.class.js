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
        this.canvas.addEventListener('click', () => this.handleClick());
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
            this.canvas.requestFullscreen();
            world.fullscreenOn = true;
        }
    }
}