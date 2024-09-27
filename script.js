const gridContainer = document.getElementById('grid-container');
const resetBtn = document.getElementById('resetBtn');
const randomColorBtn = document.getElementById('randomColorBtn');
const progressiveDarkenBtn = document.getElementById('progressiveDarkenBtn');

let currentMode = 'default';
let gridSize = 16;
let isDrawing = false;

function createGrid(size) {
    gridContainer.innerHTML = '';
    const squareSize = 960 / size;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.addEventListener('mouseover', handleMouseOver);
        square.addEventListener('mousedown', handleMouseDown);
        gridContainer.appendChild(square);
    }
}

function handleMouseDown(e) {
    isDrawing = !isDrawing;
    if (isDrawing) {
        changeColor(e);
    }
}

function handleMouseOver(e) {
    if (isDrawing) {
        changeColor(e);
    }
}

function changeColor(e) {
    if (currentMode === 'default') {
        e.target.style.backgroundColor = '#2c3e50';
    } else if (currentMode === 'random') {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        e.target.style.backgroundColor = "#" + randomColor;
    } else if (currentMode === 'darken') {
        let currentColor = e.target.style.backgroundColor;
        if (!currentColor || currentColor === 'rgb(236, 240, 241)') {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        } else {
            let opacity = parseFloat(currentColor.split(',')[3]);
            if (opacity < 0.9) {
                opacity += 0.1;
                e.target.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
            } else {
                e.target.style.backgroundColor = 'rgb(0, 0, 0)';
            }
        }
    }
}

function resetGrid() {
    let newSize = prompt('Enter the number of squares per side for the new grid (max 100):');
    newSize = parseInt(newSize);
    if (newSize && newSize > 0 && newSize <= 100) {
        gridSize = newSize;
        createGrid(gridSize);
    } else {
        alert('Please enter a valid number between 1 and 100.');
    }
}

resetBtn.addEventListener('click', resetGrid);
randomColorBtn.addEventListener('click', () => currentMode = 'random');
progressiveDarkenBtn.addEventListener('click', () => currentMode = 'darken');

// Add event listeners to handle drawing state
document.addEventListener('mouseup', () => isDrawing = false);
gridContainer.addEventListener('mouseleave', () => isDrawing = false);

// Initialize the grid
createGrid(gridSize);