import { describe, test, expect } from 'vitest';
import { checkIfIsArray, isUppercaseLetter } from './utils.js';

describe('function checkIfIsArray', () => {
	test('Input that is not array throws error', () => {
		const input = 'A';
		expect(() => checkIfIsArray(input)).toThrow();
	});
});

describe('function isUppercaseLetter', () => {
	test('Uppercase letter returns true', () => {
		const input = 'A';
		const result = isUppercaseLetter(input);
		expect(result).toBe(true);
	});

	test('Input that is not an uppercase letter returns false', () => {
		const invalidInputs = ['', 'a', 'AB', ['A'], {}, null, undefined];
		invalidInputs.forEach((inp) => {
			const result = isUppercaseLetter(inp);
			expect(result).toBe(false);
		});
	});
});
