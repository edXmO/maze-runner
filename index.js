const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const WIDTH = 400;
const HEIGHT = 400;
const RES = 40;

canvas.style.height = WIDTH;
canvas.style.width = HEIGHT;

const rows = HEIGHT / RES;
const cols = WIDTH / RES;

const grid = [];

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

    findIndex(x, y) {
        if (x < 0 || y < 0 || x > cols < 1 || y > rows - 1) return -1;
        return x + y * cols;
    }

    isNeighborVisited() {
        const neighbors = [
            grid[this.findIndex(i, j + 1)], // bottom neighbor
            grid[this.findIndex(i + 1, j)], // right neighbor
            grid[this.findIndex(i, j - 1)], // top neighbor
            grid[this.findIndex(i - 1, j)]  // left neighbor
        ].filter(neighbor => !neighbor.visited);

        if (neighbors.length) {
            const rand = Math.floor(Math.random() * neighbors.length);
            return neighbors[rand];
        } else {
            return undefined;
        }
        // recursive implementation
        // 1. Given a current cell as a parameter,
        // 2. Mark the current cell as visited
        // 3. While the current cell has any unvisited neighbour cells
        // Neighbors
        // 
        // 4. Choose one of the unvisited neighbours
        // 5. Remove the wall between the current cell and the chosen cell
        // 6. Invoke the routine recursively for a chosen cell
    }

    show() {
        ctx.strokeStyle = 'white';
        ctx.beginPath();

        if (this.visited) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.fillStyle = 'yellow';
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

const drawGrid = () => {
    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}

const fillGrid = () => {
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            let cell = new Cell(x * RES, y * RES, RES, RES);
            grid.push(cell);
        }
    }
}


const init = () => {
    fillGrid();

    grid[0].visited = true;

    drawGrid();
}

init();




