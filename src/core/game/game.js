import { Matrix } from "../matrix/matrix.js";

const COLORS = {
    background: '#f0f0f0',
    grid: '#cccccc',
    cell: 'black',
};

export class Game {
    constructor(rows, cols, cellSize, ctx, canvas) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.ctx = ctx;
        this.canvas = canvas;
        this.matrix = new Matrix(rows, cols);
    }

    getCellValue(row, col) {
        return (row >= 0 && col >= 0 && row < this.rows && col < this.cols) ? this.matrix.get(row, col) : 0;
    }

    getNeighbors(row, col) {
        return [
            this.getCellValue(row - 1, col - 1),
            this.getCellValue(row, col - 1),
            this.getCellValue(row + 1, col - 1),
            this.getCellValue(row - 1, col),
            this.getCellValue(row + 1, col),
            this.getCellValue(row - 1, col + 1),
            this.getCellValue(row, col + 1),
            this.getCellValue(row + 1, col + 1)
        ].reduce((sum, cell) => sum + cell, 0);
    }

    update() {
        const newMatrix = new Matrix(this.rows, this.cols);

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const neighbors = this.getNeighbors(row, col);
                const cell = this.matrix.get(row, col);

                if (cell && (neighbors < 2 || neighbors > 3)) {
                    newMatrix.set(row, col, 0);
                } else if (!cell && neighbors === 3) {
                    newMatrix.set(row, col, 1);
                } else {
                    newMatrix.set(row, col, cell);
                }
            }
        }

        this.matrix = newMatrix;
    }

    draw() {
        this.ctx.fillStyle = COLORS.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = COLORS.grid;
        this.ctx.lineWidth = 1;

        for (let i = 0; i <= this.cols; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.cellSize, 0);
            this.ctx.lineTo(i * this.cellSize, this.canvas.height);
            this.ctx.stroke();
        }

        for (let j = 0; j <= this.rows; j++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, j * this.cellSize);
            this.ctx.lineTo(this.canvas.width, j * this.cellSize);
            this.ctx.stroke();
        }

        this.ctx.fillStyle = COLORS.cell;
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.matrix.get(row, col)) {
                    this.ctx.fillRect(row * this.cellSize, col * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
    }

    start() {
        this.draw();
        setInterval(() => {
            this.update();
            this.draw();
        }, 100);
    }
}

