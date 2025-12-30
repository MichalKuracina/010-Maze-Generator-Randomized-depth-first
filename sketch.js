let mode = "manual";
let cells = [];
let stack = [28];

function setup() {
    createCanvas(700, 700);
    createGrid();
    cells[stack.at(-1)].visited = true;

    addButton();
}

function draw() {
    background(0, 0, 0);

    if (mode === "manual") {
        noLoop();
    }

    if (stack.length > 0) {
        getNeighbour(stack.at(-1));
    }

    cells.forEach((cell) => {
        cell.show();
    });
}

function getNeighbour(current) {
    let x = cells[current].x;
    let y = cells[current].y;

    let potentialNextCells = [];

    let aboveCell = cells.find((cell) => cell.x === x && cell.y === y - 1);
    if (aboveCell && !aboveCell.visited) {
        potentialNextCells.push(aboveCell);
    }
    let rigthCell = cells.find((cell) => cell.x === x + 1 && cell.y === y);
    if (rigthCell && !rigthCell.visited) {
        potentialNextCells.push(rigthCell);
    }
    let belowCell = cells.find((cell) => cell.x === x && cell.y === y + 1);
    if (belowCell && !belowCell.visited) {
        potentialNextCells.push(belowCell);
    }
    let leftCell = cells.find((cell) => cell.x === x - 1 && cell.y === y);
    if (leftCell && !leftCell.visited) {
        potentialNextCells.push(leftCell);
    }

    let randomNextCell =
        potentialNextCells[
            Math.floor(Math.random() * potentialNextCells.length)
        ];

    if (randomNextCell === undefined) {
        stack.pop();
        return;
    }

    randomNextCell.visited = true;

    nextCellIndex = cells.findIndex(
        (c) => c.x === randomNextCell.x && c.y === randomNextCell.y
    );

    stack.push(nextCellIndex);

    removeWalls(cells[current], cells[nextCellIndex]);
}

function removeWalls(currentCell, nextCell) {
    let x = currentCell.x - nextCell.x;
    let y = currentCell.y - nextCell.y;

    if (x === 1) {
        currentCell.walls[3] = false;
        nextCell.walls[1] = false;
    } else if (x === -1) {
        currentCell.walls[1] = false;
        nextCell.walls[3] = false;
    }

    if (y === 1) {
        currentCell.walls[0] = false;
        nextCell.walls[2] = false;
    } else if (y === -1) {
        currentCell.walls[2] = false;
        nextCell.walls[0] = false;
    }
}

function stepPlusOne() {
    mode = "manual";
    loop();
}

function stepRun() {
    mode = "auto";
    frameRate(20);
    loop();
}

function addButton() {
    let buttonContainer = createDiv();
    buttonContainer.style("display", "flex");
    buttonContainer.style("align-items", "center");
    buttonContainer.style("gap", "10px");

    let stepText = createP("Click to step");
    stepText.parent(buttonContainer);
    let stepButton = createButton("+1");
    stepButton.mousePressed(stepPlusOne);
    stepButton.parent(buttonContainer);

    let runText = createP("Click to run");
    runText.parent(buttonContainer);
    let runButton = createButton(" >> ");
    runButton.mousePressed(stepRun);
    runButton.parent(buttonContainer);
}

function createGrid() {
    let size = 50;
    let rows = width / size;
    let cols = height / size;
    let index = 0;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            cells.push(new Cell(x, y, size, index));
            index++;
        }
    }
}
