import * as typeHelper from "./../core/typeHelper";

const memoize = fn => {
  let cache = {};
  return (a1, a2) => {
    let key = `${a1}-${a2}`;
    if (key in cache) {
      return cache[key];
    } else {
      cache[key] = fn(a1, a2);
      return cache[key];
    }
  };
};

const sideLength = 4;
const pathLimit = 5;
const nbEl = sideLength * sideLength;
const limit = Math.pow(2, nbEl);
const matrixStates = [...Array(limit).keys()].map(i =>
  typeHelper
    .intToStrOf16Bits(i)
    .split("")
    .map(typeHelper.strToInt)
);

const toggleCross = memoize((mIndex, idx) => {
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
  const matrixIntRepresentation = parseInt(
    matrixStates[mIndex]
      .map((el, idx) => {
        if (rowIndexes.includes(idx) || colIndexes.includes(idx)) {
          return +!el;
        } else {
          return el;
        }
      })
      .join(""),
    2
  );
  return matrixIntRepresentation;
});

const makeSolutionChecker = mIndex => solution =>
  !matrixStates[
    solution.reduce((acc, cur) => toggleCross(acc, cur), mIndex)
  ].includes(0);

const makeSolutionFinder = mIndex => {
  const checkSolution = makeSolutionChecker(mIndex);
  let tryNumber = 0;
  const findSolution = (solution = []) => {
    process.stdout.write(
      ((++tryNumber / Math.pow(16, pathLimit)) * 100).toFixed(2) + "%\r"
    );
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

    if (solution.length < pathLimit) {
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

/* matrixStates.forEach((matrix, index) => {
  const findSolution = makeSolutionFinder(index);
  const finalSolution = findSolution();
  if (finalSolution) {
    console.log("finalSolution for", matrix, finalSolution);
  }
}); */

const stateIndex = parseInt("0000010110001000", 2);
console.log("state", stateIndex, matrixStates[stateIndex]);
console.log("calculating...");
const findSolution = makeSolutionFinder(stateIndex);
const finalSolution = findSolution();
if (finalSolution) {
  console.log("finalSolution for", finalSolution);
} else {
  console.log(pathLimit, " path limit reached without any solution");
}
