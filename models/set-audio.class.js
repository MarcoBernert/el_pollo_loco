class SetAudio extends MovableObject {
    width = 30;
    height = 30;
    y = 20;
    x = 207;
    canvas;
    world;
    audioOnImage = 'img/10_settings/audio-on.svg';
    audioOffImage = 'img/10_settings/audio-off.svg'; 
    
    /**
     * Initializes the SetAudio object.
     * @param {HTMLElement} canvas - The canvas element.
     */
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.loadImage(this.audioOn ? this.audioOnImage : this.audioOffImage);
        this.canvas.addEventListener('click', (event) => this.handleClick(event));
        this.canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));
    }

    /**
     * Handles click event on the button to toggle audio.
     * @param {MouseEvent} event - The mouse click event.
     */
    handleClick(event) {
        let mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
        let mouseY = event.clientY - this.canvas.getBoundingClientRect().top;
        if (this.isMouseOverButton(mouseX, mouseY)) {
            this.toggleAudio();
        }
    }

    /**
     * Handles mouse move event to change cursor style.
     * @param {MouseEvent} event - The mouse move event.
     */
    handleMouseMove(event) {
        let mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
        let mouseY = event.clientY - this.canvas.getBoundingClientRect().top;
        if (this.isMouseOverButton(mouseX, mouseY)) {
            this.canvas.style.cursor = 'pointer';
        } else {
            this.canvas.style.cursor = 'default';
        }
    }

    /**
     * Toggles audio on or off.
     */
    toggleAudio() {
        this.audioOn = !this.audioOn;
        if (this.audioOn) {
            this.loadImage(this.audioOnImage); 
            this.world.character.audioOn = true;
            this.world.audioOn = true;
        } else {
            this.loadImage(this.audioOffImage); 
            this.world.audioOn = false;
        }
    }

    /**
     * Checks if the mouse is over the button.
     * @param {number} mouseX - The x-coordinate of the mouse pointer.
     * @param {number} mouseY - The y-coordinate of the mouse pointer.
     * @returns {boolean} - Indicates if the mouse is over the button.
     */
    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }
}


