class SetAudio extends MovableObject {
    width = 40;
    height = 40;
    y = 65;
    x = 100;
    canvas;
    // audioOn = true;
    world;
    audioOnImage = 'img/10_settings/audio-on.svg';
    audioOffImage = 'img/10_settings/audio-off.svg'; 
    
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.loadImage(this.audioOn ? this.audioOnImage : this.audioOffImage);
        this.canvas.addEventListener('click', (event) => this.handleClick(event));
        this.canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));
    }

    handleClick(event) {
        var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
        var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

        if (this.isMouseOverButton(mouseX, mouseY)) {
            this.toggleAudio();
        }
    }

    handleMouseMove(event) {
        var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
        var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

        if (this.isMouseOverButton(mouseX, mouseY)) {
            this.canvas.style.cursor = 'pointer';
        } else {
            this.canvas.style.cursor = 'default';
        }
    }

    toggleAudio() {
        this.audioOn = !this.audioOn;
        if (this.audioOn) {
            this.loadImage(this.audioOnImage); 
            this.world.character.audioOn = true;
        } else {
            this.loadImage(this.audioOffImage); 
            this.world.character.audioOn = false;
        }
    }

    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }
}


