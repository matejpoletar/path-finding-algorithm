import { UP, DOWN, LEFT, RIGHT } from './constants.js';

export function Position(row, column) {
	this.row = row;
	this.column = column;
}

Position.prototype.up = function () {
	return new Position(this.row - 1, this.column);
};

Position.prototype.down = function () {
	return new Position(this.row + 1, this.column);
};

Position.prototype.left = function () {
	return new Position(this.row, this.column - 1);
};

Position.prototype.right = function () {
	return new Position(this.row, this.column + 1);
};

export function getNextPosition(position, direction) {
	switch (direction) {
		case UP:
			return position.up();
		case DOWN:
			return position.down();
		case LEFT:
			return position.left();
		case RIGHT:
			return position.right();
	}
}
