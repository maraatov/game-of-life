export class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.buffer = new Uint8Array(rows * cols);
        for (let i = 0; i < this.buffer.length; i++) {
            this.buffer[i] = Math.random() < 0.5 ? 1 : 0;
        }
    }

    get(row, col) {
        return this.buffer[this.getIndex(row, col)];
    }

    set(row, col, value) {
        this.buffer[this.getIndex(row, col)] = value;
    }

    getIndex(row, col) {
        return col * this.rows + row;
    }
}
