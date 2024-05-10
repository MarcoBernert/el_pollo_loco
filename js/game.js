let canvas;
let world;
let keyboard = new Keyboard();
let ctx;
let infoOn = false;
let won_sound = new Audio('audio/won.mp3');
let lost_sound = new Audio('audio/lost1.mp3')

/**
 * Initializes the game by setting up the canvas, loading the start screen, and setting up keyboard and touch events.
 */
function init() {
  canvas = document.getElementById('canvas');
  touchEvents();
}

/**
 * Reloads the page, essentially taking the player back to the home screen.
 */
function home() {
  location.reload();
}

/**
 * Starts the game by initializing level 1, creating the game world, and hiding/showing appropriate elements.
 */
function startGame() {
  initLevel1();
  world = new World(canvas, keyboard);
  setTimeout(() => {
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('startButton').classList.add('d-none');
    document.getElementById('faqButton').classList.add('d-none');
    document.getElementById('overlayLostGame').classList.add('d-none');
    document.getElementById('overlayWonGame').classList.add('d-none');
    document.getElementById('mobileButtonsSection').classList.remove('d-none');
    document.getElementById('settingsSection').classList.remove('d-none');
  }, 200);
  checkIfGameIsOver();
}

/**
 * Checks if the game is over by monitoring the character's energy and the end boss's energy.
 */
function checkIfGameIsOver() {
  setInterval(() => {
    let energyCharacter = world.character.energy;
    let endbossIndex = world.level.enemies.findIndex((element) => element instanceof Endboss);
    let energyEndboss = world.level.enemies[endbossIndex].energy;
    if (energyCharacter == 0) {
      lostGame();
    } else if (energyEndboss <= 0) {
      wonGame();
    }
  }, 1000 / 65);
}

/**
 * Displays the overlay for the game over screen and stops the game.
 */
function lostGame() {
  setTimeout(() => {
    let overlay = document.getElementById('overlayLostGame');
    world.background_sound.pause();
    world.playAudio(lost_sound);
    stopGame();
    overlay.classList.remove('d-none')
    document.getElementById('mobileButtonsSection').classList.add('d-none');
  }, 100);

}

/**
 * Displays the overlay for the game won screen and stops the game.
 */
function wonGame() {
  setTimeout(() => {
    let overlay = document.getElementById('overlayWonGame');
    world.playAudio(won_sound);
    world.background_sound.pause();
    stopGame();
    overlay.classList.remove('d-none');
    document.getElementById('mobileButtonsSection').classList.add('d-none');

  }, 100);
}

/**
 * Stops the game by clearing all intervals.
 */
function stopGame() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Toggle audio on or off.
 */
function toggleAudio() {
  world.audioOn = !world.audioOn;
  let audio = document.getElementById('audioIcon');
  if (world.audioOn) {
    audio.src = "img/10_settings/audio-on.svg"
    world.audioOn = true;
  } else {
    audio.src = "img/10_settings/audio-off.svg";
    world.audioOn = false;
  }
}

/**
 * Open fullscreen mode for the canvas element.
 */
function openFullscreen() {
  let elem = document.getElementById('canvas');
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/**
 * Toggle the display of information section.
 */
function toggleInfo() {
  let info = document.getElementById('infoIcon');
  infoOn = !infoOn;
  let infoSection = document.getElementById('infoSection');
  if (infoOn) {
    info.src = "img/10_settings/info-on.svg"
    infoSection.classList.remove('d-none');
  } else {
    info.src = "img/10_settings/info-off.svg"
    infoSection.classList.add('d-none');
  }
}

/**
 * Handles keydown events for controlling the character's movement and actions.
 */
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

/**
 * Handles keyup events for controlling the character's movement and actions.
 */
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

/**
 * Sets up touch events for mobile controls.
 */
function touchEvents() {
  document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  })

  document.getElementById('btnLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  })

  document.getElementById('btnRight').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  })

  document.getElementById('btnRight').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  })

  document.getElementById('btnJump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.UP = true;
  })

  document.getElementById('btnJump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.UP = false;
  })

  document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
  })

  document.getElementById('btnThrow').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
  })

  document.getElementById('btnExchange').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.F = true;
  })

  document.getElementById('btnExchange').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.F = false;
  })
}
