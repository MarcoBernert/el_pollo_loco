// class FullScreen extends MovableObject {
//         width = 40;
//         height = 40;
//         y = 65;
//         x = 150;
//         canvas;

//         constructor(canvas) {
//             super();
//             this.canvas = canvas;
//             this.loadImage(`img/10_settings/fullscreen.svg`);
//             this.canvas.addEventListener('click', (event) => this.handleClick(event)); //nach Mausklick Funktion ausführen
//         }

//         isMouseOverButton(mouseX, mouseY) {
//             return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
//         }

//         handleClick(event) {
//             var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
//             var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

//             if (this.isMouseOverButton(mouseX, mouseY)) {
//                 alert('Fullscreen wurde geklickt!');
//             }
//         }




//     }



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
        this.full = !this.full;

        // Vollbildmodus aktivieren, wenn das SVG geklickt wurde
        if (this.isMouseOverButton(event.offsetX, event.offsetY)) {
            this.canvas.requestFullscreen().catch((err) => {
                console.error('Fullscreen request failed:', err);
            });
        }
    }
}






