import { shapesTetrominos } from "./shapesTetrominos.js"

function main() {
	const	WIDTH = 10;;
	const	GRID = document.querySelector('.grid');;
	const	SQUARES = Array.from(document.querySelectorAll('.grid div'));;
	let		startBtn;
	let		scoreDisplay;
	const	theTetrominoes = shapesTetrominos(WIDTH);
}

document.addEventListener("DOMContentLoaded", main)
