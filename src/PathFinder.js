import { UP, DOWN, LEFT, RIGHT } from './constants.js';
import { checkIfIsArray, isUppercaseLetter } from './utils.js';
import { Position, getNextPosition } from './Position.js';

class PathFinder {
	#markedPositions;
	#path;

	constructor(array) {
		this.array = array;
		this.#path = '';
		this.#markedPositions = [];

		this.checkInputData();
	}

	checkInputData() {
		let foundStart = false;
		let foundEnd = false;

		checkIfIsArray(this.array);

		this.array.forEach((row) => {
			checkIfIsArray(row);
			row.forEach((item) => {
				// 1. Check if each entry is single character
				if (typeof item !== 'string' || item.length !== 1) {
					throw new Error('Invalid input');
				}
				// 2. Check if each character is valid
				if (!/[A-Z @x|+-]/.test(item)) {
					throw new Error('Invalid character found');
				}

				// 3. Check for starting character
				if (item === '@' && foundStart) {
					throw new Error('Multiple starting points detected');
				}

				if (item === '@' && !foundStart) {
					foundStart = true;
				}

				// 4. Check for ending character
				if (item === 'x') {
					foundEnd = true;
				}
			});
		});

		if (!foundStart) {
			throw new Error('Missing starting character');
		}
		if (!foundEnd) {
			throw new Error('Missing ending character');
		}

		return true;
	}

	getCharacter({ row, column }) {
		return this.array[row] ? this.array[row][column] : null;
	}

	isValidPosition({ row, column }) {
		return this.array[row] && this.array[row][column] && this.array[row][column].trim();
	}

	addCurrentPositionToMarkedPositions({ row, column }) {
		const visited = Boolean(
			this.#markedPositions.find((item) => item.column === column && item.row === row)
		);
		if (!visited) {
			this.#markedPositions.push({ row, column });
		}
	}

	newDirection(currentPosition, currentDirection, initial = false) {
		let validDirections = 0;
		let newDirection;
		if (initial || currentDirection === LEFT || currentDirection === RIGHT) {
			if (this.isValidPosition(currentPosition.up())) {
				validDirections++;
				newDirection = UP;
			}
			if (this.isValidPosition(currentPosition.down())) {
				validDirections++;
				newDirection = DOWN;
			}
		}

		if (initial || currentDirection === UP || currentDirection === DOWN) {
			if (this.isValidPosition(currentPosition.left())) {
				validDirections++;
				newDirection = LEFT;
			}
			if (this.isValidPosition(currentPosition.right())) {
				validDirections++;
				newDirection = RIGHT;
			}
		}
		if (validDirections === 0) {
			throw new Error('No possible moves');
		}

		if (validDirections > 1) {
			throw new Error('Fork in path');
		}
		return newDirection;
	}

	getStartingPosition() {
		let startingPosition;
		this.array.some((row, rowIndex) => {
			return row.some((item, columnIndex) => {
				if (item === '@') {
					startingPosition = new Position(rowIndex, columnIndex);
					return true;
				}
			});
		});
		return startingPosition;
	}

	traverse(position, direction) {
		const currentCharacter = this.getCharacter(position);
		this.#path = this.#path.concat(currentCharacter);
		if (currentCharacter === 'x') {
			return;
		}
		if (currentCharacter === '+') {
			direction = this.newDirection(position, direction);
		}
		if (isUppercaseLetter(currentCharacter)) {
			this.addCurrentPositionToMarkedPositions(position);
		}

		let nextPosition = getNextPosition(position, direction);
		if (!this.isValidPosition(nextPosition)) {
			direction = this.newDirection(position, direction);
			nextPosition = getNextPosition(position, direction);
		}

		return this.traverse(nextPosition, direction);
	}

	getLetters() {
		return this.#markedPositions.map((position) => this.getCharacter(position)).join('');
	}

	constructPath() {
		let startingPosition = this.getStartingPosition();

		const initialDirection = this.newDirection(startingPosition, '', true);

		this.traverse(startingPosition, initialDirection);

		const letters = this.getLetters();

		return [this.#path, letters];
	}
}

export default PathFinder;
