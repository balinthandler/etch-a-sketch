// Returns array with 2 elements in it, Count X and Count Y
function readInputs() {
  const x = document.querySelector('#inputX');
  const y = document.querySelector('#inputY');
  const regEx = /^[1-9]\d?$/; // between 1 and 99
  if (regEx.test(x.value) && regEx.test(y.value)) {
    return [x.value, y.value];
  } else {
    alert('Type a number between 1 and 99!');
  }
}

// Grid generating based on array[0] (Count X) and array[1] (Count Y)
function createGrid(array) {
  const grid = document.querySelector('#gridContainer');
  grid.innerHTML = '';
  const containerWidth = grid.clientWidth;
  const containerHeight = grid.clientHeight;
  for (j = 0; j < array[1]; j++){
    const row = document.createElement('div');
    row.classList.add('row');
    grid.appendChild(row);
    for (let i = 0; i < array[0]; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.style.width = ((containerWidth / array[0]) - 2)+ 'px';
      cell.style.height = ((containerHeight / array[1]) - 2) + 'px';
      row.appendChild(cell);
    }
  } 
  mouseOver();
}


// Create the grid on button click, based on input values
const btn = document.querySelector('#button');
btn.addEventListener('click', event => {
  createGrid(readInputs());
  
});
// Handling mouseover
function mouseOver() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('mouseover', (event) => {
      // If cell color has been changed already
      if (cell.style.backgroundColor !== ''){

        // Get current rgb values, then decrease each of them by 25.5 (10% of 255)
        let r = Math.floor(cell.style.backgroundColor.slice(4,cell.style.backgroundColor.indexOf(',')) - 25.5);
        let g = Math.floor(cell.style.backgroundColor.slice(
          cell.style.backgroundColor.indexOf(',', cell.style.backgroundColor.indexOf(',')) + 1,
          cell.style.backgroundColor.lastIndexOf(',')) - 25.5);
        let b = Math.floor(cell.style.backgroundColor.slice(cell.style.backgroundColor.lastIndexOf(',') + 1, 
          cell.style.backgroundColor.lastIndexOf(')')) - 25.5);

        if (r < 0)  { r = 0;};
        if (g < 0)  { g = 0;};
        if (b < 0)  { b = 0;};
        
        // Set new bgColor
        cell.style.backgroundColor = `rgb(${r},${g},${b})`;

        console.log(cell.style.backgroundColor);
      
      } else {
        cell.style.backgroundColor = randomRGB();
      }
    });
  });
}


// Returns a random 'rgb(r,g,b)'
function randomRGB() {
  let rgb = '';
  for (let i = 0; i<3; i++){
    if (i == 0) {
      rgb += 'rgb(' + (Math.floor(Math.random() * 255)) + ',';
    } else if (i == 1) {
      rgb += (Math.floor(Math.random() * 255)) + ',';
    } else if (i == 2) {
      rgb += (Math.floor(Math.random() * 255)) + ')';
    }
  }
  return rgb;
}
