export function checkIfIsArray(arr) {
	if (!Array.isArray(arr)) {
		throw new Error('Not an array');
	}
}

export function isUppercaseLetter(letter) {
	return typeof letter === 'string' && letter?.length === 1 && /[A-Z]/.test(letter);
}
