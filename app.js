const container = document.getElementById('container');
const clear = document.getElementById('clear');
clear.addEventListener('click', resetGrid);

defaultGrid();

// Create default 8x8 grid
function defaultGrid() {  
  for (i = 0; i < 64; i++) {
    let square = document.createElement('div');
    square.className = 'square';
    container.appendChild(square);
  }

  getGridArray();
}

// Remove grid
function removeGrid() {
  let squares = Array.from(container.children);
  squares.forEach(square => square.remove());
}

// Ask the user for new grid size, remove previous grid and replace it
function resetGrid() {

  // Make sure the input is of type number, and between 0 and 100
  let input = parseInt('');

  while ((input <= 0 || input > 100) || isNaN(input)) {
    input = parseInt(prompt("Please enter grid size"));
    
    if ((input <= 0 || input > 100)){
      alert("Please enter a value between 0 and 100");
    } else if (isNaN(input)) {
      alert("Please enter a valid grid size");
    }
  }

  removeGrid();

  let gridSize = input * input;
  
  for (i = 0; i < gridSize; i++) {
    let square = document.createElement('div');
    square.className = 'square';
    container.appendChild(square);     
  }
  
  // Get the container's CSS rule from CSSOM and set columns/rows to input value
  let containerRules = document.styleSheets[0].cssRules[3].style;
  containerRules.setProperty('grid-template-columns', `repeat(${input}, 1fr)`);
  containerRules.setProperty('grid-template-rows', `repeat(${input}, 1fr)`);

  getGridArray();
} 

// Get array from all square classes and add mouseover event
function getGridArray() {
  let squares = Array.from(document.getElementsByClassName('square'));
  squares.forEach(square => {
    square.addEventListener('mouseover', changeColor);
  });
}

// Change RGB color 
function changeColor(e) {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  e.target.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.5)`;  
};