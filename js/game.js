let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  loadStartScreen();
  // world = new World(canvas, keyboard);
}

function loadStartScreen(){
  canvas.style.backgroundImage = 'url("img/9_intro_outro_screens/start/startscreen_1.png")';
  canvas.style.backgroundSize = 'cover';
}

function startGame(){
  initLevel1();
  world = new World(canvas, keyboard);
  document.getElementById('startGameBtn').classList.add('d-none');
}

window.addEventListener('keydown', function (event) {
  if (event.keyCode === 37) {
    keyboard.LEFT = true;
  }

  if (event.keyCode === 38) {
    keyboard.UP = true;
  }

  if (event.keyCode === 39) {
    keyboard.RIGHT = true;
  }

  if (event.keyCode === 40) {
    keyboard.DOWN = true;
  }

  if (event.keyCode === 32) {
    keyboard.SPACE = true;
  }

  if (event.keyCode === 68) {
    keyboard.D = true;
  }
});




window.addEventListener('keyup', function (event) {
  if (event.keyCode === 37) {
    keyboard.LEFT = false;
  }

  if (event.keyCode === 38) {
    keyboard.UP = false;
  }

  if (event.keyCode === 39) {
    keyboard.RIGHT = false;
  }

  if (event.keyCode === 40) {
    keyboard.DOWN = false;
  }

  if (event.keyCode === 32) {
    keyboard.SPACE = false;
  }

  if (event.keyCode === 68) {
    keyboard.D = false;
  }
});

