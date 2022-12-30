import { describe, test, expect, beforeEach } from 'vitest';
import PathFinder from './PathFinder';

describe('class PathFinder test suite', () => {
	describe('Test class constructor/initial checks', () => {
		let data;
		let pathFinderConstr;
		beforeEach(() => {
			pathFinderConstr = () => new PathFinder(data);
		});

		test('Valid input data does not throw error', () => {
			data = [['@', '-', '+', 'x']];
			expect(pathFinderConstr).not.toThrow();
		});

		test('Input that is not a 2D array throws error', () => {
			data = ['@--A--x'];
			expect(pathFinderConstr).toThrow();
		});

		test('Input array that does not have single characters throws error', () => {
			data = [['abc']];
			expect(pathFinderConstr).toThrow('Invalid input');
		});

		test('Input with not allowed character throws error', () => {
			data = [['#']];
			expect(pathFinderConstr).toThrow('Invalid character found');
		});

		test('Check for missing start character', () => {
			data = [[' ']];
			expect(pathFinderConstr).toThrow('Missing starting character');
		});

		test('Check if starting character is unique', () => {
			data = [['@', '+', '@']];
			expect(pathFinderConstr).toThrow('Multiple starting points detected');
		});

		test('Check for missing end character', () => {
			data = [['@']];
			expect(pathFinderConstr).toThrow('Missing ending character');
		});
	});

	describe('Test path finding algorithm', () => {
		test('Basic example', () => {
			const data = [
				['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
				['x', '-', 'B', '-', '+', ' ', ' ', ' ', 'C'],
				[' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
				[' ', ' ', ' ', ' ', '+', '-', '-', '-', '+'],
			];
			const pathFinder = new PathFinder(data);
			const [path, letters] = pathFinder.constructPath();
			expect(path).toBe('@---A---+|C|+---+|+-B-x');
			expect(letters).toBe('ACB');
		});

		test('Example with intersections', () => {
			const data = [
				['@'],
				['|', ' ', '+', '-', 'C', '-', '-', '+'],
				['A', ' ', '|', ' ', ' ', ' ', ' ', '|'],
				['+', '-', '-', '-', 'B', '-', '-', '+'],
				[' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', 'x'],
				[' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
				[' ', ' ', '+', '-', '-', '-', 'D', '-', '-', '+'],
			];
			const pathFinder = new PathFinder(data);
			const [path, letters] = pathFinder.constructPath();
			expect(path).toBe('@|A+---B--+|+--C-+|-||+---D--+|x');
			expect(letters).toBe('ABCD');
		});

		test('Keep direction, even in a compact space', () => {
			const data = [
				[' ', '+', '-', 'L', '-', '+'],
				[' ', '|', ' ', ' ', '+', 'A', '-', '+'],
				['@', 'B', '+', ' ', '+', '+', ' ', 'H'],
				[' ', '+', '+', ' ', ' ', ' ', ' ', 'x'],
			];
			const pathFinder = new PathFinder(data);
			const [path, letters] = pathFinder.constructPath();
			expect(path).toBe('@B+++B|+-L-+A+++A-+Hx');
			expect(letters).toBe('BLAH');
		});

		test('Letters may be found on turns', () => {
			const data = [
				['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
				['x', '-', 'B', '-', '+', ' ', ' ', ' ', '|'],
				[' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
				[' ', ' ', ' ', ' ', '+', '-', '-', '-', 'C'],
			];
			const pathFinder = new PathFinder(data);
			const [path, letters] = pathFinder.constructPath();
			expect(path).toBe('@---A---+|||C---+|+-B-x');
			expect(letters).toBe('ACB');
		});

		test('Do not collect a letter with same location twice', () => {
			const data = [
				[' ', ' ', ' ', ' ', '+', '-', 'O', '-', 'N', '-', '+'],
				[' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', '|'],
				[' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '+', '-', 'I', '-', '+'],
				['@', '-', 'G', '-', 'O', '-', '+', ' ', '|', ' ', '|', ' ', '|'],
				[' ', ' ', ' ', ' ', '|', ' ', '|', ' ', '+', '-', '+', ' ', 'E'],
				[' ', ' ', ' ', ' ', '+', '-', '+', ' ', ' ', ' ', ' ', ' ', 'S'],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
				[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x'],
			];
			const pathFinder = new PathFinder(data);
			const [path, letters] = pathFinder.constructPath();
			expect(path).toBe('@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x');
			expect(letters).toBe('GOONIES');
		});

		test('Ignore stuff after end of path', () => {
			const data = [
				['@', '-', 'A', '-', '-', '+'],
				[' ', ' ', ' ', ' ', ' ', '|'],
				[' ', ' ', ' ', ' ', ' ', '+', '-', 'B', '-', '-', 'x', '-', 'C', '-', '-', 'D'],
			];
			const pathFinder = new PathFinder(data);
			const [path, letters] = pathFinder.constructPath();
			expect(path).toBe('@-A--+|+-B--x');
			expect(letters).toBe('AB');
		});

		test('Multiple starting directions throw error', () => {
			const data = [['x', '-', 'B', '-', '@', '-', 'A', '-', 'x']];
			const pathFinder = new PathFinder(data);
			expect(() => pathFinder.constructPath()).toThrow('Fork in path');
		});

		test('Fake turn throws error', () => {
			const data = [['@', '-', 'A', '-', '+', '-', 'B', '-', 'x']];
			const pathFinder = new PathFinder(data);
			expect(() => pathFinder.constructPath()).toThrow('No possible moves');
		});

		test('Broken path throws error', () => {
			const data = [
				['@', '-', 'A', '-', '+'],
				[' ', ' ', ' ', ' ', '|'],
				[' ', ' ', ' ', ' ', ' '],
				[' ', ' ', ' ', ' ', 'B', 'x'],
			];
			const pathFinder = new PathFinder(data);
			expect(() => pathFinder.constructPath()).toThrow('No possible moves');
		});
	});
});
