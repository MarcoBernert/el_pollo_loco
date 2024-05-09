class Info extends MovableObject {
    width = 40;
    height = 40;
    x = 200;
    y = 101;
    canvas;
    world;
    infoOn = false; // Zustand für Info-Anzeige
    infoOnImage = 'img/10_settings/info-on.svg';
    infoOffImage = 'img/10_settings/info-off.svg';

    /**
     * Constructs an Info instance and initializes its properties.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     */
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.loadImage(this.infoOffImage);
        this.canvas.addEventListener('click', (event) => this.handleClick(event));
    }

    /**
     * Handles the click event on the button.
     * @param {MouseEvent} event - The mouse click event.
     */
    handleClick(event) {
        let mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
        let mouseY = event.clientY - this.canvas.getBoundingClientRect().top;
        if (this.isMouseOverButton(mouseX, mouseY)) {
            this.toggleInfo();
        }
    }

    /**
     * Toggles the information display.
     */
    toggleInfo() {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        if (screenWidth >= 720 && screenHeight >= 480) {
            this.infoOn = !this.infoOn;
            let infoSection = document.getElementById('infoSection');
            if (this.infoOn) {
                this.loadImage(this.infoOnImage);
                infoSection.classList.remove('d-none');
            } else {
                this.loadImage(this.infoOffImage);
                infoSection.classList.add('d-none');
            }
        }
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
}
