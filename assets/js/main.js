let	canvas;
let	ctx;
let	gBArrayHeight = 20;
let	gBArrayWidth = 12;
let	startX = 4;
let	startY = 0;
let	coordinateArray = [...Array(gBArrayHeight)].map(e => Array(gBArrayWidth).fill(0));
let	curTetromino = [[1, 0], [0, 1], [1, 1], [2, 1]];
let	tetrominos = [];
let	tetrominoColors = ['purple', 'cyan', 'blue', 'yellow', 'orange', 'green', 'red']
let	curTetrominoColor;
let	gameBoardArray = [...Array(gBArrayHeight)].map(e => Array(gBArrayWidth).fill(0));
let	DIRECTION = {
	IDLE: 0,
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3
};
let	direction;

class Coordinates {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

function DeleteTetromino() {
	for (let i = 0; i < curTetromino.length; i++) {
		let x = curTetromino[i][0] + startX;
		let y = curTetromino[i][1] + startY;
		gameBoardArray[x][y] = 0;
		let	coorX = coordinateArray[x][y].x;
		let	coorY = coordinateArray[x][y].y;
		ctx.fillStyle = 'white';
		ctx.fillRect(coorX, coorY, 21, 21);
	}
}

function HandleKeyPress(key) {
	if (key.keyCode === 65) {
		direction = DIRECTION.LEFT;
		DeleteTetromino();
		startX--;
		DrawTetromino();
	} else if (key.keyCode === 68) {
		direction = DIRECTION.RIGHT;
		DeleteTetromino();
		startX++;
		DrawTetromino();
	} else if (key.keyCode === 83) {
		direction = DIRECTION.DOWN;
		DeleteTetromino();
		startY++;
		DrawTetromino();
	}
}

function CreateTetrominos(){
	// Push T
	tetrominos.push([[1,0], [0,1], [1,1], [2,1]]);
	// Push I
	tetrominos.push([[0,0], [1,0], [2,0], [3,0]]);
	// Push J
	tetrominos.push([[0,0], [0,1], [1,1], [2,1]]);
	// Push Square
	tetrominos.push([[0,0], [1,0], [0,1], [1,1]]);
	// Push L
	tetrominos.push([[2,0], [0,1], [1,1], [2,1]]);
	// Push S
	tetrominos.push([[1,0], [2,0], [0,1], [1,1]]);
	// Push Z
	tetrominos.push([[0,0], [1,0], [1,1], [2,1]]);
}

function CreateTetromino() {
	let	randomTetromino = Math.floor(Math.random() * tetrominos.length);
	curTetromino = tetrominos[randomTetromino];
	curTetrominoColor = tetrominoColors[randomTetromino];
}

function CreateCoordArray() {
	let	i;
	let	j;

	j = 0;
	for (let y = 9; y <= 446; y += 23) {
		i = 0;
		for (let x = 11; x <= 264; x += 23) {
			coordinateArray[i][j] = new Coordinates(x, y);
			i++;
		}
		j++;
	}
}

function DrawTetromino() {
	for (let i = 0; i < curTetromino.length; i++) {
		let	x = curTetromino[i][0] + startX;
		let	y = curTetromino[i][1] + startY;
		gameBoardArray[x][y] = 1;
		let	coorX = coordinateArray[x][y].x;
		let	coorY = coordinateArray[x][y].y;
		ctx.fillStyle = curTetrominoColor;
		ctx.fillRect(coorX, coorY, 21, 21);
	}
}

function SetupCanvas() {
	canvas = document.getElementById('my-canvas');
	ctx = canvas.getContext('2d');
	canvas.width = 936;
	canvas.height = 956;

	ctx.scale(2, 2);

	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = 'black';
	ctx.strokeRect(8, 8, 280, 462);

	document.addEventListener('keydown', HandleKeyPress);
	CreateTetrominos();
	CreateTetromino();

	CreateCoordArray();
	DrawTetromino();
}

document.addEventListener('DOMContentLoaded', SetupCanvas);
