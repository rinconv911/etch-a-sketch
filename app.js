const container = document.getElementById('container');
const clear = document.getElementById('clear');

// Current color scheme, scheme options container
let currentScheme = 'rainbow';
const fakeBtn = document.getElementById('fake-button')
const schemesContainer = document.getElementById('schemes-container');
const schemeOptions = Array.from(document.getElementsByClassName('scheme'));
schemeOptions.forEach(scheme => {
  scheme.addEventListener('click', changeColorScheme);
})
console.log(schemeOptions);

function changeColorScheme(e) {
  let scheme = e.target;

  if (scheme.id == 'monochrome') {
    currentScheme = 'monochrome';   
    schemeOptions[0].classList.remove('selected-btn');
    schemeOptions[2].classList.remove('selected-btn');
    fakeBtn.classList.add('selected-btn')
  } else if (scheme.id == 'grayscale') {
    currentScheme = 'grayscale';
    schemeOptions[0].classList.remove('selected-btn');
    fakeBtn.classList.remove('selected-btn');
    scheme.classList.add('selected-btn')
  } else {
    currentScheme = 'rainbow';
    schemeOptions[1].classList.remove('selected-btn');
    schemeOptions[2].classList.remove('selected-btn');
    scheme.classList.add('selected-btn')
  }
}

// Coloring mode, which changes from hover to click 'n' drag depending on button clicked
let coloringMode = 'drag';
const colorModes = Array.from(document.getElementsByClassName('mode'));
colorModes.forEach(mode => {
  mode.addEventListener('click', changeColorMode);
});

function changeColorMode (e) {
  if (e.target.id == 'drag-button') {
    coloringMode = 'drag';
    colorModes[1].classList.remove('selected-btn');
    colorModes[0].classList.add('selected-btn');
    setArrayColorMode(coloringMode);
  } else if (e.target.id == 'hover-button') {
    coloringMode = 'hover';
    colorModes[0].classList.remove('selected-btn');
    colorModes[1].classList.add('selected-btn');
    setArrayColorMode(coloringMode);
  }
}

// Default color mixer and value changes upon event
const mixer = document.getElementById("monochrome");
let mixerColor = mixer.value;
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
  setArrayColorMode(coloringMode);
}

// Ask the user for new grid size, remove previous grid and create new one
// Make sure the input is of type number, and between 0 and 100
function resetGrid() {
  let input = parseInt(clear.value);

  if ((input <= 0 || input > 35)){
    alert("Please enter a value between 1 and 35");
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

  setArrayColorMode(coloringMode);
}

// Get array from all squares and set coloring mode
function setArrayColorMode(coloringMode) {
  let squares = Array.from(document.getElementsByClassName('square'));

  if (coloringMode === 'hover') {
    squares.forEach(square => {
      square.removeEventListener('mousedown', colorByHovering);
      square.removeEventListener('mouseenter', colorByDragging);

      square.addEventListener('mouseover', colorByHovering);
    });

  } else if (coloringMode === 'drag') {
    squares.forEach(square => {
      square.removeEventListener('mouseover', colorByHovering);

      square.addEventListener('mousedown', colorByHovering);
      square.addEventListener('mouseenter', colorByDragging);
    });
  }

}

// Change color by hovering over square 
function colorByHovering(e) {
  
  if (currentScheme === 'rainbow') {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    e.target.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.5)`; 

  } else if (currentScheme === 'monochrome') {
    e.target.style.backgroundColor = mixerColor;

  } else {
    e.target.style.backgroundColor = `hsl(0, 0%, 50%)`;
  }
};

// Change color if the event target was clicked and the button held down
// Checks whether there are > 0 mouse buttons pressed when the cursor enters a new square
function colorByDragging(e) {
  if (e.buttons > 0) {  
    if (currentScheme === 'rainbow') {
      let red = Math.floor(Math.random() * 255);
      let green = Math.floor(Math.random() * 255);
      let blue = Math.floor(Math.random() * 255);
      e.target.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.5)`; 
  
    } else if (currentScheme === 'monochrome') {
      e.target.style.backgroundColor = mixerColor;
  
    } else {
      e.target.style.backgroundColor = `hsl(0, 0%, 50%)`;
    }
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