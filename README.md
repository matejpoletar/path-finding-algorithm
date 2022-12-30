# path-finding-algorithm

Suggested solution to an assignement: https://github.com/softwaresauna/code-challenge 

## Usage

1. Clone the repository

2. In the root folder run `npm install` to install all the dependencies

## Running tests

Run `npm run test` to run all tests

## Code coverage

Run `npm run coverage` get code coverage output

## Usage of class PathFinder

Here example shows how to use class PathFinder

1. Pass input data as a 2D array to the PathFinder constructor:

```
import PathFinder from './PathFinder.js';

const data = [['@'], ['|', ' ', 'x'], ['A', ' ', '|'], ['+', '-', 'B']];

const pathFinder = new PathFinder(data);
```

2. Call class method `constructPath` on `PathFinder` object:
```
const pathFinder = new PathFinder(data);
const [path, letters] = pathFinder.constructPath();

console.log(path);
console.log(letters);
```
