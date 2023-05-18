function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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
  });
}
addRandomColors();
