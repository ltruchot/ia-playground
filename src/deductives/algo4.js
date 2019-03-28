import * as typeHelper from "./../core/typeHelper";

const sideLength = 4;
const nbEl = sideLength * sideLength;
const limit = Math.pow(2, nbEl);

const toggleCross = (matrix, idx) => {
  const rowIndexes = [];
  const colIndexes = [];

  // calculate row
  const segment = Math.floor(idx / 4);
  for (let i = segment * 4; i < (segment + 1) * 4; i++) {
    rowIndexes.push(i);
  }

  // calculate col
  for (let i = 0; i < sideLength; i++) {
    const last = colIndexes[i - 1];
    if (!isNaN(last)) {
      if (last + 4 > 15) {
        colIndexes.unshift(last - i * 4);
      } else {
        colIndexes.push(last + 4);
      }
    } else {
      colIndexes.push(idx);
    }
  }

  // toggle each calculated
  return matrix.map((el, idx) => {
    if (rowIndexes.includes(idx) || colIndexes.includes(idx)) {
      return +!el;
    } else {
      return el;
    }
  });
};

const makeSolutionChecker = matrix => solution =>
  !solution
    .reduce((acc, cur) => {
      const flipped = toggleCross(acc, cur);
      return flipped;
    }, matrix)
    .includes(0);

// a simple memoize function that takes in a function
// and returns a memoized function
const memoize = fn => {
  let cache = {};
  return (...args) => {
    let n = args[0]; // just taking one argument here
    if (n in cache) {
      console.log("Fetching from cache");
      return cache[n];
    } else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  };
};

const makeSolutionFinder = matrix => {
  const checkSolution = memoize(makeSolutionChecker(matrix));
  const findSolution = (solution = []) => {
    let invalid = [];
    // build queue
    for (let j = 0; j < nbEl; j++) {
      const prev = solution.slice(-1)[0];
      if (prev !== j) {
        const newSolution = [...solution, j];
        if (checkSolution(newSolution)) {
          return newSolution;
        } else {
          invalid.push(newSolution);
        }
      }
    }

    if (solution.length < 1) {
      for (let j = 0; j < invalid.length; j++) {
        const solution = findSolution(invalid[j]);
        if (solution) {
          return solution;
        }
      }
    }
  };
  return findSolution;
};

for (let i = 0; i < limit; i++) {
  // get an initial state
  const matrix = typeHelper
    .intToStrOf16Bits(i)
    .split("")
    .map(typeHelper.strToInt);
  // console.log(matrix);
  const findSolution = makeSolutionFinder(matrix);
  const finalSolution = findSolution();
  if (finalSolution) {
    console.log("finalSolution for", matrix, finalSolution);
  }
}
