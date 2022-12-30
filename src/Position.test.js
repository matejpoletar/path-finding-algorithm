import { describe, test, expect } from 'vitest';
import { DOWN, LEFT, RIGHT, UP } from './constants.js';
import { getNextPosition, Position } from './Position.js';

describe('function getNextPosition', () => {
	const currentPosition = new Position(1, 1);

	test('Moving in direction UP decrements row index by one', () => {
		const newPosition = getNextPosition(currentPosition, UP);
		expect(newPosition).toEqual({ ...currentPosition, row: currentPosition.row - 1 });
	});

	test('Moving in direction DOWN increments row index by one', () => {
		const newPosition = getNextPosition(currentPosition, DOWN);
		expect(newPosition).toEqual({ ...currentPosition, row: currentPosition.row + 1 });
	});

	test('Moving in direction LEFT decrements column index by one', () => {
		const newPosition = getNextPosition(currentPosition, LEFT);
		expect(newPosition).toEqual({ ...currentPosition, column: currentPosition.column - 1 });
	});

	test('Moving in direction RIGHT increments column index by one', () => {
		const newPosition = getNextPosition(currentPosition, RIGHT);
		expect(newPosition).toEqual({ ...currentPosition, column: currentPosition.column + 1 });
	});
});
