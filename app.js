const container = document.getElementById('container');
const clear = document.getElementById('clear');

defaultGrid();
clear.addEventListener('click', resetGrid);

// Create default 8x8 grid
function defaultGrid() {  
  for (i = 0; i < 64; i++) {
    let square = document.createElement('div');
    square.className = 'square';
    container.appendChild(square);
  }

  roundCorners(8);
  getGridArray();
}

// Ask the user for new grid size, remove previous grid and create new one
// Make sure the input is of type number, and between 0 and 100
function resetGrid() {
  let input = parseInt('');

  while ((input <= 0 || input > 100) || isNaN(input)) {
    input = parseInt(prompt("Please enter grid size"));
    
    if ((input <= 0 || input > 100)){
      alert("Please enter a value between 1 and 100");
    } else if (isNaN(input)) {
      alert("Please enter a valid grid size");
    }
  }

  removeGrid();
  createGrid(input);
  roundCorners(input);
} 

// Loop through the grid container's children and remove each one
function removeGrid() {
  let squares = Array.from(container.children);
  squares.forEach(square => square.remove());
}

// Create new grid with user's input
function createGrid(input) {
  let gridSize = input * input;
  
  for (i = 0; i < gridSize; i++) {
    let square = document.createElement('div');
    square.className = 'square';
    container.appendChild(square);     
  }
  
  // Get the grid container's CSS rule from CSSOM and set columns/rows to input value
  let containerRules = document.styleSheets[0].cssRules[3].style;
  containerRules.setProperty('grid-template-columns', `repeat(${input}, 1fr)`);
  containerRules.setProperty('grid-template-rows', `repeat(${input}, 1fr)`);

  getGridArray();
}

// Get array from all square classes and add mouseover color change event
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

// Round the corners of the grid/squares
function roundCorners(input) {
  let squares = container.children;

  if (input == 1) {
    squares[0].style.borderRadius = '5rem';
  } else {
    let upperLeft = container.firstElementChild;
    let upperRight = squares[input-1];
    let lowerLeft = squares[squares.length-input];
    let lowerRight = container.lastElementChild;
    
    upperLeft.style.borderRadius = '5rem 0px 0px 0px';
    upperRight.style.borderRadius = '0px 5rem 0px 0px';
    lowerLeft.style.borderRadius = '0px 0px 0px 5rem';
    lowerRight.style.borderRadius = '0px 0px 5rem 0px';
  }
}

