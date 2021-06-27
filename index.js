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
        this.walls = [];
    }

    show() {
        ctx.strokeStyle = 'white';
        ctx.beginPath();

        // Bottom
        ctx.moveTo(this.x, this.y + this.h);
        ctx.lineTo(this.x + this.w, this.y + this.h);
        ctx.stroke();

        // Right
        ctx.moveTo(this.x + this.w, this.y + this.h);
        ctx.lineTo(this.x + this.w, this.y);
        ctx.stroke();

        // Top
        ctx.moveTo(this.x + this.w, this.y);
        ctx.lineTo(this.x, this.y)
        ctx.stroke();

        // Left
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.h);
        ctx.stroke();
    }

    drawSide(rand) {
        ctx.strokeStyle = 'white';
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
        grid[i].drawSide(Math.floor(Math.random() * 4));
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

fillGrid();
drawGrid();

