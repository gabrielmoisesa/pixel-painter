function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function loadColors() {
  const savedColorPalette = localStorage.getItem('colorPalette');

  if (savedColorPalette) {
    const { color1, color2, color3 } = JSON.parse(savedColorPalette);
    document.getElementById('two').style.backgroundColor = color1;
    document.getElementById('three').style.backgroundColor = color2;
    document.getElementById('four').style.backgroundColor = color3;
  }
}

function addRandomColors() {
  const button = document.getElementById('button-random-color');
  button.addEventListener('click', () => {
    const color1 = getRandomColor();
    document.getElementById('two').style.backgroundColor = color1;
    const color2 = getRandomColor();
    document.getElementById('three').style.backgroundColor = color2;
    const color3 = getRandomColor();
    document.getElementById('four').style.backgroundColor = color3;

    const colorPalette = {
      color1,
      color2,
      color3,
    };
    localStorage.setItem('colorPalette', JSON.stringify(colorPalette));
  });
  loadColors();
}
addRandomColors();

const boardSizeInput = document.getElementById('board-size');
const pixelBoard = document.getElementById('pixel-board');

const isMobile = window.innerWidth <= 768;
const inputValue = isMobile ? 8 : 9;
boardSizeInput.value = inputValue;

function generateBoard(boardSize) {
  pixelBoard.innerHTML = '';
  const pixelSize = 40;

  pixelBoard.style.gridTemplateColumns = `repeat(${boardSize}, ${pixelSize}px)`;
  pixelBoard.style.gridTemplateRows = `repeat(${boardSize}, ${pixelSize}px)`;

  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixelBoard.appendChild(pixel);
    }
  }
}
generateBoard(inputValue);

function changeBoardSize() {
  const newBoardSize = Number(boardSizeInput.value);

  if (newBoardSize === '' || newBoardSize < 5 || newBoardSize > 12) {
    alert('Invalid board! Choose a size from 5 to 12');
  } else {
    generateBoard(newBoardSize);
  }
}

const generateButton = document.getElementById('generate-board');
generateButton.addEventListener('click', changeBoardSize);

function selectColor() {
  const colorPixels = document.getElementsByClassName('color');

  function clickHandler() {
    const selectedPixel = document.querySelector('.color.selected');

    if (selectedPixel) {
      selectedPixel.classList.remove('selected');
    }
    this.classList.add('selected');
  }

  for (let i = 0; i < colorPixels.length; i += 1) {
    colorPixels[i].addEventListener('click', clickHandler);
  }
}
selectColor();

function saveBoard() {
  const pixels = document.getElementsByClassName('pixel');
  const pixelColors = [];

  for (let i = 0; i < pixels.length; i += 1) {
    pixelColors[i] = pixels[i].style.backgroundColor;
  }
  localStorage.setItem('pixelBoard', JSON.stringify(pixelColors));
}

// Paint Pixel Logic
let isPainting = false;

function stopPainting() {
  isPainting = false;
}

function getSelectedColor() {
  const selectedColor = document.querySelector('.color.selected');
  return selectedColor
    ? window
      .getComputedStyle(selectedColor)
      .getPropertyValue('background-color')
    : '';
}

function isPixelElement(element) {
  return element.classList.contains('pixel');
}

function paint(event) {
  if (isPainting) {
    const color = getSelectedColor();
    const pixelTarget = event.target;

    if (isPixelElement(pixelTarget)) {
      pixelTarget.style.backgroundColor = color;
      saveBoard();
    }
  }
}

function paintPixel() {
  function startPainting(event) {
    isPainting = true;
    paint(event);
  }

  pixelBoard.addEventListener('mousedown', startPainting);
  pixelBoard.addEventListener('mouseup', stopPainting);
  pixelBoard.addEventListener('mousemove', paint);
}
paintPixel();

function clearBoard() {
  const pixels = document.getElementsByClassName('pixel');

  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = '';
  }

  localStorage.removeItem('pixelBoard');
}
const clearButton = document.getElementById('clear-board');
clearButton.addEventListener('click', clearBoard);

function loadBoard() {
  const pixels = document.getElementsByClassName('pixel');
  const savedBoard = localStorage.getItem('pixelBoard');

  const pixelColors = JSON.parse(savedBoard);

  for (let i = 0; i < pixels.length; i += 1) {
    if (pixelColors[i]) {
      pixels[i].style.backgroundColor = pixelColors[i];
    }
  }
}
loadBoard();
