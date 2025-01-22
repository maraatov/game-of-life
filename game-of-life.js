import { Game } from './src/core/game/game.js';

const root = document.getElementById('root');
const canvas = document.createElement('canvas');

const CELL_SIZE = 20;
const ROWS = 40;
const COLS = 40;

canvas.width = CELL_SIZE * COLS;
canvas.height = CELL_SIZE * ROWS;
canvas.style.border = '1px solid black';

const ctx = canvas.getContext('2d');

root.appendChild(canvas);

const game = new Game(ROWS, COLS, CELL_SIZE, ctx, canvas);
game.start();
