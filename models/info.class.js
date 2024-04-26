// class Info extends MovableObject {
//     width = 50;
//     height = 50;
//     y = 60;
//     x = 40;
    


//     constructor() {
//         super();
//         this.loadImage(`img/10_settings/info-circle-svgrepo-com.svg`);
//     }


//     isMouseOverButton(mouseX, mouseY) {
//         return mouseX >= 40 && mouseX <= 90 && mouseY >= 60 && mouseY <= 110;
        
//     }

//     this.world.canvas.addEventListener('click', function(event) {
//         var mouseX = event.clientX - canvas.getBoundingClientRect().left;
//         var mouseY = event.clientY - canvas.getBoundingClientRect().top;

//         if (isMouseOverButton(mouseX, mouseY)) {
//             alert('Button wurde geklickt!');
//         }
//     });

// }

class Info extends MovableObject {
    width = 50;
    height = 50;
    y = 60;
    x = 40;
    canvas;

    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.loadImage(`img/10_settings/info-circle-svgrepo-com.svg`);
        this.canvas.addEventListener('click', (event) => this.handleClick(event));
    }
    
    
    
    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    handleClick(event) {
        var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
        var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

        if (this.isMouseOverButton(mouseX, mouseY)) {
            alert('Button wurde geklickt!');
        }
    }
}