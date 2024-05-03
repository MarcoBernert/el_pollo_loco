let canvas;
let world;
let keyboard = new Keyboard();
let ctx;

function init() {
  canvas = document.getElementById('canvas');
  loadStartScreen();
  // world = new World(canvas, keyboard);

}

function home(){
  location.reload();
}

function loadStartScreen() {
  canvas.style.backgroundImage = 'url("img/9_intro_outro_screens/start/startscreen_1.png")';
  canvas.style.backgroundSize = 'cover';
  canvas.style.backgroundPosition = 'center'; 
}

function startGame() {
  initLevel1();
  world = new World(canvas, keyboard);
  document.getElementById('startButton').classList.add('d-none');
  document.getElementById('faqButton').classList.add('d-none');
  document.getElementById('overlayLostGame').classList.add('d-none');
  document.getElementById('overlayWonGame').classList.add('d-none');
  checkIfGameIsOver();
}

function checkIfGameIsOver() {

  setInterval(() => {
    let energyCharacter = world.character.energy;
    let endbossIndex = world.level.enemies.findIndex((element) => element instanceof Endboss);
    let energyEndboss = world.level.enemies[endbossIndex].energy;

    if (energyCharacter == 0) {
      lostGame()
    } else if (energyEndboss <= 0) {
      wonGame();
    }

  }, 1000 / 65);
}

function lostGame() {
  setTimeout(() => {
    let overlay = document.getElementById('overlayLostGame');
    stopGame();
    overlay.classList.remove('d-none')
  }, 100);

}

function wonGame() {
  setTimeout(() => {
    let overlay = document.getElementById('overlayWonGame');
    stopGame();
    overlay.classList.remove('d-none')
  }, 100);
}




function stopGame() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
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

  if (event.keyCode === 70) {
    keyboard.F = true;
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

  if (event.keyCode === 70) {
    keyboard.F = false;
  }
});

