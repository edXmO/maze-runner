const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const WIDTH = 400;
const HEIGHT = 400;
const RES = 20;
const maxFps = 5;

canvas.style.height = WIDTH;
canvas.style.width = HEIGHT;

const rows = HEIGHT / RES;
const cols = WIDTH / RES;

const grid = [];
let frameTime;
let current;

class Cell {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.visited = false;
        this.walls = {
            bottom: true,
            right: true,
            top: true,
            left: true
        };
    }

    isNeighborVisited() {
        // https://en.wikipedia.org/wiki/Maze_generation_algorithm
        // Recursive implementation
        // 1. Given a current cell as a parameter,
        // 2. Mark the current cell as visited
        // 3. While the current cell has any unvisited neighbour cells
        // 4. Choose one of the unvisited neighbours
        // 5. Remove the wall between the current cell and the chosen cell
        // 6. Invoke the routine recursively for a chosen cell

        const topNeighbor = grid[grid.findIndex(cell => cell.x === this.x && cell.y == this.y - this.h)]
        const bottomNeighbor = grid[grid.findIndex(cell => cell.x === this.x && cell.y === this.y + this.h)];
        const rightNeighbor = grid[grid.findIndex(cell => cell.x === this.x + this.w && cell.y === this.y)];
        const leftNeighbor = grid[grid.findIndex(cell => cell.x === this.x - this.w && cell.y + this.h === this.y + this.h)]

        const neighbors = [
            bottomNeighbor,
            rightNeighbor,
            topNeighbor,
            leftNeighbor
        ].filter(neighbor => neighbor && !neighbor.visited);

        if (neighbors.length) {
            const rand = Math.floor(Math.random() * neighbors.length);
            return neighbors[rand];
        } else {
            return undefined;
        }
    }

    show() {
        ctx.strokeStyle = 'white';
        ctx.beginPath();

        if (this.visited) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.fillStyle = 'royalblue';
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }

        // Bottom
        if (this.walls.bottom) {
            ctx.moveTo(this.x, this.y + this.h);
            ctx.lineTo(this.x + this.w, this.y + this.h);
            ctx.stroke();
        }

        // Right
        if (this.walls.right) {
            ctx.moveTo(this.x + this.w, this.y + this.h);
            ctx.lineTo(this.x + this.w, this.y);
            ctx.stroke();
        }

        // Top
        if (this.walls.top) {
            ctx.moveTo(this.x + this.w, this.y);
            ctx.lineTo(this.x, this.y)
            ctx.stroke();
        }

        // Left
        if (this.walls.left) {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.h);
            ctx.stroke();
        }
    }

    removeWalls(next) {
        const x = this.x - next.x;
        const y = this.y - next.y;
        if (x == RES) {
            this.walls.left = false;
            next.walls.right = false;
        } else if (x == -RES) {
            this.walls.right = false;
            next.walls.left = false;
        }
        if (y == RES) {
            this.walls.top = false;
            next.walls.bottom = false;
        } else if (y == -RES) {
            this.walls.bottom = false;
            next.walls.top = false;
        }
    }

    drawSide(rand) {
        ctx.strokeStyle = '#565656';
        ctx.lineWidth = 2
        ctx.beginPath();
        switch (rand) {
            case 0:
                ctx.moveTo(this.x, this.y + this.h);
                ctx.lineTo(this.x + this.w, this.y + this.h);
                ctx.stroke();
                break;
            case 1:
                ctx.moveTo(this.x + this.w, this.y + this.h);
                ctx.lineTo(this.x + this.w, this.y);
                ctx.stroke();
                break;
            case 2:
                ctx.moveTo(this.x + this.w, this.y);
                ctx.lineTo(this.x, this.y)
                ctx.stroke();
                break;
            case 3:
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y + this.h);
                ctx.stroke();
        }
    }
}

const fillGrid = () => {
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            let cell = new Cell(x * RES, y * RES, RES, RES);
            grid.push(cell);
        }
    }
    // 1. Choose the initial cell
    current = grid[0];
}


const drawGrid = () => {
    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    // 1.1 Mark it as visited
    current.visited = true;
    // 2. Check its neighbors
    next = current.isNeighborVisited();
    // 3. Choose one of the neighbours of the current cell
    // that has not been visited
    if (next) {
        next.visited = true;
        current.removeWalls(next);
        current = next;
        // 4. Remove the wall between 
        // the current cell and the next cell
    }
}

const setup = () => {
    fillGrid();
    drawGrid();
}

setup();

const tick = (timestamp) => {
    if (timestamp < frameTime + (1000 / maxFps)) {
        animationFrameID = requestAnimationFrame(tick);
        return;
    }
    frameTime = timestamp;

    drawGrid();

    animationFrameID = requestAnimationFrame(tick);
};

tick();
