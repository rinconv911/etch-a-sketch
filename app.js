const container = document.getElementById('container');

for (i = 0; i < 256; i++) {
  let gridSquare = document.createElement('div');
  gridSquare.className = 'square'
  container.appendChild(gridSquare);
}

const squares = Array.from(document.getElementsByClassName('square'));
squares.forEach(square => {
  square.addEventListener('mouseover', changeColor);  
});

function changeColor(e) {
  e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';  
};