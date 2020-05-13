const cvs = document.getElementById('tetris');
const ctx = cvs.getContext('2d');
const scoreElement = document.getElementById('score');

const ROW = 20;
const COL = (COLUMN = 10);
const SQ = (squareSize = 20);
const VACANT = 'WHITE';

class DrawSquare {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	}
	drawSquare = () => {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x * SQ, this.y * SQ, SQ, SQ);

		ctx.strokeStyle = 'BLACK';
		ctx.strokeRect(this.x * SQ, this.y * SQ, SQ, SQ);
	};
}
