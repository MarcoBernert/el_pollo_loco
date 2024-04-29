// class SetAudio extends MovableObject {
//     width = 40;
//     height = 40;
//     y = 65;
//     x = 100;
//     canvas;

//     constructor(canvas) {
//         super();
//         this.canvas = canvas;
//         this.loadImage(`img/10_settings/audio-on.svg`);
//         this.canvas.addEventListener('click', (event) => this.handleClick(event)); //nach Mausklick Funktion ausführen
//         this.canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event)); //curso: pointer anzeigen lassen.
//     }

//     isMouseOverButton(mouseX, mouseY) {
//         return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
//     }

//     handleClick(event) {
//         var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
//         var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

//         if (this.isMouseOverButton(mouseX, mouseY)) {
//             alert('Audio wurde geklickt!');
//         }
//     }

//     // Funktion, um den Cursorstil zu ändern, wenn die Maus über das Bild gleitet
//     handleMouseMove(event) {
//         var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
//         var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

//         if (this.isMouseOverButton(mouseX, mouseY)) {
//             this.canvas.style.cursor = 'pointer';
//         } else {
//             this.canvas.style.cursor = 'default';
//         }
//     }
// }


// class SetAudio extends MovableObject {
//     width = 40;
//     height = 40;
//     y = 65;
//     x = 100;
//     canvas;
//     audioOn = true;
//     world;
//     audioOnImage = 'img/10_settings/audio-on.svg';
//     audioOffImage = 'img/10_settings/audio-off.svg'; // Bildpfad für den ausgeschalteten Zustand

//     constructor(canvas) {
//         super();
//         this.canvas = canvas;
//         this.loadImage(this.audioOn ? this.audioOnImage : this.audioOffImage); // Initialisiert das Bild basierend auf dem aktuellen audioOn-Status
//         this.canvas.addEventListener('click', () => this.toggleAudio());
//         this.canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));
//     }

//     toggleAudio() {
//         this.audioOn = !this.audioOn;
//         if (this.audioOn) {
//             this.loadImage(this.audioOnImage); // Lade das Bild für den eingeschalteten Zustand
//             this.world.character.walking_sound.play(); // Ton einschalten
            
//         } else {
//             this.loadImage(this.audioOffImage); // Lade das Bild für den ausgeschalteten Zustand
//             this.world.character.walking_sound.pause(); // Ton ausschalten
//         }
//     }

//     handleMouseMove(event) {
//         var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
//         var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

//         if (this.isMouseOverButton(mouseX, mouseY)) {
//             this.canvas.style.cursor = 'pointer';
//         } else {
//             this.canvas.style.cursor = 'default';
//         }
//     }

//     isMouseOverButton(mouseX, mouseY) {
//         return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
//     }
// }


class SetAudio extends MovableObject {
    width = 40;
    height = 40;
    y = 65;
    x = 100;
    canvas;
    // audioOn = true;
    world;
    audioOnImage = 'img/10_settings/audio-on.svg';
    audioOffImage = 'img/10_settings/audio-off.svg'; // Bildpfad für den ausgeschalteten Zustand

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
            this.loadImage(this.audioOnImage); // Lade das Bild für den eingeschalteten Zustand
            this.world.character.audioOn = true;
            
        } else {
            this.loadImage(this.audioOffImage); // Lade das Bild für den ausgeschalteten Zustand
            this.world.character.audioOn = false;
        }
    }

    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }
}


