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

  let input = ''; 

  while ((input <= 0 || input > 100) || isNaN(input)) {
    input = parseInt(prompt("Please enter grid size"));
    
    if ((input <= 0 || input > 100)){
      alert("Please enter a value between 0 and 100");
    } else if (isNaN(input)) {
      alert("Please enter a valid grid size");
    }
  }

  let gridSize = input * input;

  removeGrid();

  for (i = 0; i < gridSize; i++) {
    let square = document.createElement('div');
    square.className = 'square';
    container.style.cssText = `grid-template-columns: repeat(${input}, 1fr); 
                                grid-template-rows: repeat(${input}, 1fr)`
    container.appendChild(square);
  }

  getGridArray();
} 

// Change color on mouse hover
function getGridArray() {
  let squares = Array.from(document.getElementsByClassName('square'));
  squares.forEach(square => {
    square.addEventListener('mouseover', changeColor);
  });
}

function changeColor(e) {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  e.target.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.5)`;  
};