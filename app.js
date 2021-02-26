const container = document.getElementById('container');
const clear = document.getElementById('clear');

// Current color scheme, scheme options container
let currentScheme = 'rainbow';
const schemesContainer = document.getElementById('schemes-container');
const schemeOptions = Array.from(document.getElementsByClassName('scheme'));
schemeOptions.forEach(option => {
  option.addEventListener('click', changeColorScheme);
})

// Default color for color mixer and subsequent changes upon event
let mixerColor = document.getElementById("monochrome").value;
let mixer = document.getElementById("monochrome");
mixer.addEventListener('change', () => {
  mixerColor = mixer.value;
});

// UI on document load
defaultGrid();
clear.addEventListener('change', resetGrid);

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
  let input = parseInt(clear.value);

  if ((input <= 0 || input > 100)){
    alert("Please enter a value between 1 and 100");
    input = 8;
  } else if (isNaN(input)) {
    alert("Please enter a valid grid size");
    input = 8;
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
  let containerRules = document.styleSheets[0].cssRules[10].style;
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

// Called upon clicking a scheme button, changes current scheme variable
function changeColorScheme(e) {
  if (e.target.id == 'monochrome') {
    currentScheme = 'monochrome';    
  } else if (e.target.id == 'blackandwhite') {
    currentScheme = 'blackandwhite';
  } else {
    currentScheme = 'rainbow';
  }
}

// Change hover color 
function changeColor(e) {
  
  if (currentScheme === 'rainbow') {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    e.target.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.5)`; 

  } else if (currentScheme === 'monochrome') {
    e.target.style.backgroundColor = mixerColor;

  } else {
    e.target.style.backgroundColor = 'black';
  }
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


/*Makes a color mixer appear when "Monochrome" color scheme is selected
// and retrieves its value
function createColorMixer() {
  let mixer = document.createElement('input');
  mixer.setAttribute('id', 'color-mixer');
  mixer.setAttribute('type', 'color');
  mixer.setAttribute('value', '#FF4500');
  schemesContainer.appendChild(mixer);
  
  mixer.addEventListener('change', () => {
    mixerColor = mixer.value;
  });
}*/