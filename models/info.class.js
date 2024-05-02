// class Info extends MovableObject {
//     width = 40;
//     height = 40;
//     x = 200;
//     y = 101;
//     canvas;

//     constructor(canvas) {
//         super();
//         this.canvas = canvas;
//         this.loadImage(`img/10_settings/info-circle-svgrepo-com.svg`);
        
//         // Eventlistener für Mausbewegungen hinzufügen
//         this.canvas.addEventListener('click', (event) => this.handleClick(event));

//     }

//     isMouseOverButton(mouseX, mouseY) {
//         return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
//     }

//     handleClick(event) {
//         var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
//         var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

//         if (this.isMouseOverButton(mouseX, mouseY)) {
//             let infoSection = document.getElementById('infoSection');
//             infoSection.classList.remove('d-none');
//         }
//     }

// }

class Info extends MovableObject {
    width = 40;
    height = 40;
    x = 200;
    y = 101;
    canvas;
    infoOn = false; // Zustand für Info-Anzeige
    infoOnImage = 'img/10_settings/info-on.svg';
    infoOffImage = 'img/10_settings/info-off.svg';

    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.loadImage(this.infoOffImage);
        this.canvas.addEventListener('click', (event) => this.handleClick(event));
    }

    handleClick(event) {
        var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
        var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

        if (this.isMouseOverButton(mouseX, mouseY)) {
            this.toggleInfo();
        }
    }

    toggleInfo() {
        this.infoOn = !this.infoOn;
        if (this.infoOn) {
            this.loadImage(this.infoOnImage);
            let infoSection = document.getElementById('infoSection');
            infoSection.classList.remove('d-none');
        } else {
            this.loadImage(this.infoOffImage);
            let infoSection = document.getElementById('infoSection');
            infoSection.classList.add('d-none');
        }
    }

    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }
}


