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

    if (color1) {
      document.getElementById('two').style.backgroundColor = color1;
    }
    if (color2) {
      document.getElementById('three').style.backgroundColor = color2;
    }
    if (color3) {
      document.getElementById('four').style.backgroundColor = color3;
    }
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

function createPixels(rows, columns) {
  const pixelBoard = document.getElementById('pixel-board');

  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < columns; j += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixelBoard.appendChild(pixel);
    }
  }
}

function generateBoard() {
  const boardSizeInput = document.getElementById('board-size');
  const pixelBoard = document.getElementById('pixel-board');
  const inputValue = boardSizeInput.value.trim();
  const boardSize = inputValue !== '' ? parseInt(inputValue) : 5;

  if (inputValue === '') {
    alert('Board inválido!')
    return;
  }

  if (isNaN(boardSize) || boardSize <= 0) {
    alert('Board inválido!');
    return;
  }

  pixelBoard.innerHTML = '';
  pixelBoard.style.gridTemplateColumns = `repeat(${boardSize}, 40px)`;
  pixelBoard.style.gridTemplateRows = `repeat(${boardSize}, 40px)`;

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixelBoard.appendChild(pixel);
    }
  }
}

generateBoard();

const generateButton = document.getElementById('generate-board');
generateButton.addEventListener('click', generateBoard);

function selectColor() {
  const colorPixels = document.getElementsByClassName('color');

  for (let i = 0; i < colorPixels.length; i += 1) {
    colorPixels[i].addEventListener('click', function () {
      const selectedPixel = document.querySelector('.color.selected');

      if (selectedPixel) {
        selectedPixel.classList.remove('selected');
      }
      this.classList.add('selected');
    });
  }
}
selectColor();

function paintPixel() {
  const pixels = document.getElementsByClassName('pixel');

  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', function () {
      const selectedColor = document.querySelector('.color.selected');

      if (selectedColor) {
        const color = window.getComputedStyle(selectedColor).getPropertyValue('background-color');
        this.style.backgroundColor = color;

        saveBoard();
      }
    });
  }
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

  if (savedBoard) {
    const pixelColors = JSON.parse(savedBoard);

    for (let i = 0; i < pixels.length; i += 1) {
      if (pixelColors[i]) {
        pixels[i].style.backgroundColor = pixelColors[i];
      }
    }
  }
}
loadBoard();

function saveBoard() {
  const pixels = document.getElementsByClassName('pixel');
  const pixelColors = [];

  for (let i = 0; i < pixels.length; i += 1) {
    pixelColors[i] = pixels[i].style.backgroundColor;
  }
  localStorage.setItem('pixelBoard', JSON.stringify(pixelColors));
}
