// Getting x and y from inputs
function readInputs() {
  const x = document.querySelector('#xInput');
  const y = document.querySelector('#yInput');
  const regEx = /^[1-9]\d?$/;
  if (regEx.test(x.value) && regEx.test(y.value)) {
    return [x.value, y.value];
  } else {
    alert('Type a number between 1 and 99!');
  }
}

// Grid generating
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
  randomRGB();


}

// Gomb event handling
const btn = document.querySelector('#btn');
btn.addEventListener('click', event => {
   
   createGrid(readInputs());

});
// Mouseover handling


// Random color generating for cells
function randomRGB() {
  let rgb = '';
  for (let i = 0; i<3; i++){
    if (i == 0) {
      rgb += 'rgb(' + (Math.round(Math.random() * 255)) + ', ';
    } else if (i == 1) {
      rgb += (Math.round(Math.random() * 255)) + ', ';
    } else if (i == 2) {
      rgb += (Math.round(Math.random() * 255)) + ')';
    }
  }
  console.log(rgb);
}
