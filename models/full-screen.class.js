// class FullScreen extends MovableObject {
//     width = 30;
//     height = 30;
//     y = 60;
//     x = 205;
//     canvas;
//     full = false;

//     constructor(canvas) {
//         super();
//         this.canvas = canvas;
//         this.loadImage(`img/10_settings/fullscreen.svg`);
//         this.canvas.addEventListener('click', () => this.handleClick()); // Nach Mausklick Funktion ausführen
//     }

//     isMouseOverButton(mouseX, mouseY) {
//         return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
//     }

//     handleClick() {
//         // Vollbildmodus aktivieren, wenn das SVG geklickt wurde
//         if (this.isMouseOverButton(event.offsetX, event.offsetY)) {
//             this.canvas.requestFullscreen();
//             console.log('click fullscreen');
//             this.fullscreenOn = true;
//         }
//     }

//     checkIfFullscreen() {
//         if (document.fullscreenElement === this.canvas) {
//             this.fullscreenOn = true;
//         } else {
//             this.fullscreenOn = false;
//         }
//     }
// }

class FullScreen extends MovableObject {
    width = 30;
    height = 30;
    y = 60;
    x = 205;
    canvas;
    full = false;
    world;
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
            // let fullscreen = document.getElementById('fullscreenArea');
            this.enterFullscreen(this.canvas);
            console.log('click fullscreen');
            this.fullscreenOn = true;
        }
    }

    // enterFullscreen(element) {
    //     if (element.requestFullscreen) {
    //         element.requestFullscreen();
    //     } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
    //         element.msRequestFullscreen();
    //     } else if (element.webkitRequestFullscreen) {  // iOS Safari
    //         element.webkitRequestFullscreen();
    //     }
    // }

    enterFullscreen() {
        this.canvas.requestFullscreen();
    }




    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

}


// class FullScreen extends MovableObject {
//     // width = 20;
//     // height = 20;
//     // y = 30;
//     // x = 240;
//     // canvas;

//     width = 30;
//     height = 30;
//     y = 60;
//     x = 205;
//     canvas;
//     world;
    

//     constructor(canvas) {
//         super();
//         this.canvas = canvas;
//         this.loadImage('img/10_settings/fullscreen.svg');
//         this.canvas.addEventListener('click', () => this.handleClick());
//     }


//     isMouseOverButton(mouseX, mouseY) {
//         return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
//     }

//     handleClick() {
//         if (this.isMouseOverButton(event.offsetX, event.offsetY)) {
//             let fullscreenArea = document.getElementById('fullscreenArea');
//             this.canvas.style.height = 100 + 'vh'; // Setze die Höhe auf die Bildschirmhöhe
//             this.canvas.style.width = 100 + 'vw'; // Setze die Breite auf die Bildschirmbreite
//         }
    
//     }
// }


//  fullscreen(event) {
//     let fullscreen = document.getElementById('mainScreen');
//     if(event.type === 'click') {
//         if(!document.fullscreenElement) {
//             enterFullscreen(fullscreen);
//             showMenu(false);
//         } else {
//             exitFullscreen();
//         }
//     }
// }


// /**
//  * Requests fullscreen mode for the specified element.
//  * @param {HTMLElement} element - The element to display in fullscreen mode.
//  */
// function enterFullscreen(element) {
//     if(element.requestFullscreen) {
//       element.requestFullscreen();
//     } else if(element.msRequestFullscreen) {
//       element.msRequestFullscreen();
//     } else if(element.webkitRequestFullscreen) {
//       element.webkitRequestFullscreen();
//     }
//   }