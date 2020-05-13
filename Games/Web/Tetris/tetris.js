const cvs = document.getElementById('tetris');
const ctx = cvs.getContext('2d');
const scoreElement = document.getElementById('score');

const ROW = 20;
const COL = (COLUMN = 10);
const SQ = (squareSize = 20);
const VACANT = 'WHITE';

// Draw a square
function drawSquare(x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

	ctx.strokeStyle = 'BLACK';
	ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// create the board
let board = [];
for (r = 0; r < ROW; r++) {
	board[r] = [];
	for (c = 0; c < COL; c++) {
		board[r][c] = VACANT;
	}
}

// Draw the board
function drawBoard() {
	for (r = 0; r < ROW; r++) {
		for (c = 0; c < COL; c++) {
			drawSquare(c, r, board[r][c]);
		}
	}
}

drawBoard();

// The places and their colors
const PIECES = [
	[ Z, 'red' ],
	[ S, 'green' ],
	[ T, 'yellow' ],
	[ O, 'blue' ],
	[ L, 'purple' ],
	[ I, 'cyan' ],
	[ J, 'orange' ]
];

// generate random pieces
function randomPiece() {
	let r = (randomN = Math.floor(Math.random() * PIECES.length)); // 0 - 6
	return new Piece(PIECES[r][0], PIECES[r][1]);
}

// initate a piece
let p = randomPiece();

// The object Piece
function Piece(tetromino, color) {
	this.tetromino = tetromino;
	this.color = color;
	this.tetrominoN = 0;
	this.activeTetromino = this.tetromino[this.tetrominoN];
	this.x = 4;
	this.y = -1;
}

// fill function
Piece.prototype.fill = function(color) {
	for (r = 0; r < this.activeTetromino.length; r++) {
		for (c = 0; c < this.activeTetromino.length; c++) {
			if (this.activeTetromino[r][c]) {
				drawSquare(this.x + c, this.y + r, color);
			}
		}
	}
};

// Draw a piece to the board
Piece.prototype.draw = function() {
	this.fill(this.color);
};

// Undraw a piece
Piece.prototype.unDraw = function() {
	this.fill(VACANT);
};

// Move down the piece
Piece.prototype.moveDown = function() {
	if (!this.collition(0, 1, this.activeTetromino)) {
		this.unDraw();
		this.y++;
		this.draw();
	} else {
		// lock the piece and generate a new piece
		this.lock();
		p = randomPiece();
	}
};

// move right the piece
Piece.prototype.moveRight = function() {
	if (!this.collition(1, 0, this.activeTetromino)) {
		this.unDraw();
		this.x++;
		this.draw();
	}
};

// move left the piece
Piece.prototype.moveLeft = function() {
	if (!this.collition(-1, 0, this.activeTetromino)) {
		this.unDraw();
		this.x--;
		this.draw();
	}
};

// rotate the piece
Piece.prototype.rotate = function() {
	let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
	let kick = 0;

	if (this.collition(0, 0, nextPattern)) {
		if (this.x > COL / 2) {
			// it's the right wall
			kick = -1;
		} else {
			// it's the left wall
			kick = 1;
		}
	}

	if (!this.collition(kick, 0, nextPattern)) {
		this.unDraw();
		this.x += kick;
		this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
		this.activeTetromino = this.tetromino[this.tetrominoN];
		this.draw();
	}
};

let score = 0;
Piece.prototype.lock = function() {
	for (r = 0; r < this.activeTetromino.length; r++) {
		for (c = 0; c < this.activeTetromino.length; c++) {
			// skip the vacant squares
			if (!this.activeTetromino[r][c]) {
				continue;
			}
			if (this.y + r < 0) {
				alert('Game over');
				// stop amination
				gameOver = true;
				break;
			}
			// lock the piece
			board[this.y + r][this.x + c] = this.color;
		}
	}
	// remove full rows
	for (r = 0; r < ROW; r++) {
		let isRowsFull = true;
		for (c = 0; c < COL; c++) {
			isRowsFull = isRowsFull && board[r][c] != VACANT;
		}
		if (isRowsFull) {
			// Remove the rows
			for (y = r; y > 1; y--) {
				for (c = 0; c < COL; c++) {
					board[y][c] = board[y - 1][c];
				}
			}
			// the top row board [0][...] has no row above it
			for (c = 0; c < COL; c++) {
				board[0][c] = VACANT;
			}
			// increment the score
			score += 10;
		}
	}
	// update the board
	drawBoard();
	//update score
	scoreElement.innerHTML = score;
};

// collison function
Piece.prototype.collition = function(x, y, piece) {
	for (r = 0; r < piece.length; r++) {
		for (c = 0; c < piece.length; c++) {
			// If the square is empty
			if (!piece[r][c]) {
				continue;
			}
			let newX = this.x + c + x;
			let newY = this.y + r + y;

			// conditions
			if (newX < 0 || newX >= COL || newY >= ROW) {
				return true;
			}
			// skip newY < 0;
			if (newY < 0) {
				continue;
			}
			// check if there is a locked piece already in piece
			if (board[newY][newX] != VACANT) {
				return true;
			}
		}
	}
	return false;
};

// Control the piece
document.addEventListener('keydown', CONTROL);
function CONTROL(event) {
	if (event.keyCode == 37) {
		p.moveLeft();
		dropStart = Date.now();
	} else if (event.keyCode == 38) {
		p.rotate();
		dropStart = Date.now();
	} else if (event.keyCode == 39) {
		p.moveRight();
		dropStart = Date.now();
	} else if (event.keyCode == 40) {
		p.moveDown();
	}
}

// Drop the piece every 1 sec
let dropStart = Date.now();
let gameOver = false;
function drop() {
	let now = Date.now();
	let delta = now - dropStart;

	if (delta > 1000) {
		p.moveDown();
		dropStart = Date.now();
	}
	if (!gameOver) {
		requestAnimationFrame(drop);
	}
}

drop();
