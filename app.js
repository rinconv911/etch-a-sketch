const container = document.getElementById('container');

for (i = 0; i < 256; i++) {

  let gridSquare = document.createElement('div');
  gridSquare.className = 'square'
  container.appendChild(gridSquare);

}