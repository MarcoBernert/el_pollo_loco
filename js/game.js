let canvas;
let ctx;
let world = new World();

function init() {
    canvas = document.getElementById('canvas');
    // world(canvas);

    ctx = canvas.getContext("2d");

    console.log('my character is', world.character)
}